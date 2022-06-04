const Router = require('express').Router()
const multer = require('multer')
const profilecontroller = require('../controllers/profileController')
const authGaurd = require('./guards/authGaurd')


Router.get('/:id', authGaurd.IsAuth, profilecontroller.getProfile)
Router.get('/', authGaurd.IsAuth, profilecontroller.getProfile)
Router.post('/changePhoto', multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
}).single('image'), authGaurd.IsAuth, profilecontroller.changePhoto)
module.exports = Router