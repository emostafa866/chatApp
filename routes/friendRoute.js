const Router = require('express').Router()
const bodyparser = require('body-parser').urlencoded({ extended: true });
const friendcontroller = require('../controllers/friendController')
const authGaurd = require('./guards/authGaurd')

//Router.post('/add', bodyparser, friendcontroller.add)
Router.post('/cancel', bodyparser, friendcontroller.cancel)
Router.post('/confirm', bodyparser, friendcontroller.confirm)
Router.post('/delete', bodyparser, friendcontroller.delete)
module.exports = Router