const Router = require('express').Router()
const homecontroller = require('../controllers/homeController')
const authGaurd = require('./guards/authGaurd')

Router.get('/', authGaurd.IsRegistered, homecontroller.gethome)

module.exports = Router