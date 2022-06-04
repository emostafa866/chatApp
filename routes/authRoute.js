const Router = require('express').Router();
const bodyparser = require('body-parser').urlencoded({ extended: true });
const check = require('express-validator').check
const authController = require('../controllers/authController')
const authGaurd = require('./guards/authGaurd')



Router.get('/login', authGaurd.NotAuth, authController.getLogin);
Router.get('/signup', authGaurd.NotAuth, authController.getSignup);
Router.post('/signup',
    bodyparser,
    check('username').notEmpty().withMessage('user field is empty'),
    check('email').notEmpty().withMessage('E-mail field is empty').isEmail().withMessage('invalid format'),
    check('password').isLength({ min: 6 }).withMessage('password must be at least 6 charachters'),
    check('confirmpassword').custom((value, { req }) => {
        if (value === req.body.password) return true
        else throw 'password is not the same'
    }),
    authController.postSignup);
Router.post('/login', bodyparser, authController.postLogin);
Router.all('/logout', authController.logout)

module.exports = Router;