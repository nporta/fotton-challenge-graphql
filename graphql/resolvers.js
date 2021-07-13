import validator from 'validator'

import { signup, login } from '../controllers/auth.js'
import { createPost, getPosts, getPost } from '../controllers/feed.js'


export default {
  createUser: async function ({ userInput }) {
    const errors = []
    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: 'Email is invalid.' })
    }
    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({ message: 'Password too short!' })
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input.')
      error.data = errors
      error.statusCode = 422
      throw error
    }
    return signup(userInput)
  },
  login: async function ({ email, password }) {
    return login(email, password)
  },
  createPost: async function({ postInput }, req) {
    const errors = []
    if (
      validator.isEmpty(postInput.title) ||
      !validator.isLength(postInput.title, { min: 5 })
    ) {
      errors.push({ message: 'Title is invalid.' })
    }
    if (
      validator.isEmpty(postInput.description) ||
      !validator.isLength(postInput.description, { min: 5 })
    ) {
      errors.push({ message: 'Description is invalid.' })
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input.')
      error.data = errors
      error.statusCode = 422
      throw error
    }
    return createPost(postInput, req)
  },
  posts: async function(_, req) {
    return getPosts(req)
  },
  post: async function({ id }, req) {
    return getPost(id, req)
  },
}