const Router = require('express').Router()
const chatController = require('../controllers/chatController')
const authGaurd = require('./guards/authGaurd')


Router.get('/:id', authGaurd.IsAuth, chatController.getMessages)

module.exports = Router
