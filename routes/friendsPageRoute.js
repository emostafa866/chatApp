const Router = require('express').Router()
const friendsPage = require('../controllers/friendsPageController')
const authGaurd = require('./guards/authGaurd')
const chatController = require('../controllers/chatController')


Router.get('/friends', authGaurd.IsAuth, friendsPage.getfriends)

module.exports = Router