const friendsModel = require('../models/friendsPageModel');

exports.getfriends = (req, res, next) => {
    let id = req.session.req.session.userID
    friendsModel.viewFriends(id).then((data) => {
        res.render("friends", {
            pageName: 'Friends',
            isUser: req.session.userID,
            friendRequests: req.friendRequests,
            friends: data
        })
    })


}
