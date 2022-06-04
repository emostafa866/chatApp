const authModel = require('../models/authModel')
const validationResult = require('express-validator').validationResult

exports.getLogin = (req, res, next) => {

    res.render("login", {
        isUser: false,
        pageName: "login",
        authError: req.flash('authError')[0]

    })

};
exports.getSignup = (req, res, next) => {

    res.render("signup", {
        isUser: false,
        pageName: "Sign Up",
        signuperror: req.flash('signuperrors')
    })
    console.log(signuperror)
}

exports.postSignup = (req, res, next) => {

    if (validationResult(req).errors.length === 0) {
        authModel.createAccount(req.body.email, req.body.username, req.body.password
        ).then(() => {
            res.redirect('/')
        }).catch((err) => {
            console.log(err)
            res.redirect('/signup')
        })
    } else {
        req.flash('signuperrors', validationResult(req).errors)
        res.redirect('/signup')

    }

};
exports.postLogin = (req, res, next) => {
    console.log(req.body)
    authModel.login(req.body.email, req.body.password).then((data) => {
        req.session.userID = String(data._id);
        req.session.name = data.username;
        req.session.image = data.image;
        res.redirect('/')


    }).catch((err) => {
        res.redirect('/login')
        console.log(err)
        req.flash('authError', err)
        console.log(req.flash('authError')[0])
    })
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        isUser = true,
            res.redirect('/login')
    })
}
