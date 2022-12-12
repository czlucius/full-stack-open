import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'



const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = asObject(content)
    const response = await axios.post(baseUrl, object)
    return response.data
}

const modifyObject = async (id, newObject) => {
    // const all = (await (axios.get(baseUrl))).data
    // all.map(item => {
    //     if (item.id === id) {
    //         return newObject
    //     } else {
    //         return item
    //     }
    // })

    const response = await axios.put(baseUrl + "/" + id, newObject)
    return response.data



}

const services = {getAll, createNew, modifyObject};
export default services