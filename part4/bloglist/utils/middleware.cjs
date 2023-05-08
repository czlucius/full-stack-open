const logger = require('./logger')
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const tokenExtractor = (req, res, next) => {
    req.token = getTokenFrom(req)
    // if (!req.token) {
    //     return res.status(401).json({error: 'no token sent'})
    // }
    next()
}

const userExtractor = async (req, res, next) => {
    const token = getTokenFrom(req)
    if (!token) return next()
    console.log("Token is supplied", token, req.method + req.url)
    let decodedToken
    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (error) {
        return res.status(401).json({error})
    }
    req.user = await User.findById(decodedToken.id)
    console.log("User, id", req.user, decodedToken.id)
    next()
}

function getTokenFrom(request) {
    const auth = request.get("authorization")
    // console.log(auth)
    if (auth && auth.startsWith("Bearer ")) {
        return auth.replace("Bearer ", "")
    } else {
        return null
    }

}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}
