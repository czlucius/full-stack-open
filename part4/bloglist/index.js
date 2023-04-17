const logger = require("./utils/logger")
const app = require("./app")
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const express = require("express")

const blogsRouter = require("./controllers/blogs")

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

