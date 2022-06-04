const userModel = require('../models/userModel')

/*exports.add = (req, res, next) => {
    console.log(req.body)
    console.log(typeof (req.body.myID))
    console.log(typeof (req.body.friendID))
    userModel.sendfriendRequest(req.body).then(() => {
        res.redirect('/profile/' + req.body.friendID)
    }).catch((err) => console.log(err))
};
 I used event to call sendFriendRequest fun .. 
*/

exports.cancel = (req, res, next) => {
    userModel.cancelFriendRequest(req.body).then(() => {
        res.redirect('/profile/' + req.body.friendID)
    }).catch((err) => console.log(err))
};

exports.confirm = (req, res, next) => {
    userModel.confirmFriendRequest(req.body).then(() => {
        return userModel.cancelFriendRequest(req.body).then(() => {
            res.redirect('/profile/' + req.body.friendID)
        })
    }).catch((err) => console.log(err))
};

exports.delete = (req, res, next) => {
    userModel.deleteFriend(req.body).then(() => {
        res.redirect('/profile/' + req.body.friendID)
    }).catch((err) => console.log(err))
};