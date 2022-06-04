const { redirect } = require("express/lib/response");
const profileModel = require('../models/profileModel')


exports.getProfile = (req, res, next) => {
    let id = req.params.id;
    if (!id) return res.redirect('/profile/' + req.session.userID)
    profileModel.getData(id).then((data) => {

        res.render('profile', {
            pageName: 'Profile',
            myID: req.session.userID,
            myName: req.session.name,
            myImage: req.session.image,
            friendID: data._id,
            username: data.username,
            userImage: data.image,
            friendRequests: req.friendRequests,
            isUser: req.session.userID,
            pagetitle: data.username,
            isOwner: id === req.session.userID,
            isFriends: data.friends.find(friend => friend.id === req.session.userID),
            isFriendRequest: data.friendRequests.find(friend => friend.id === req.session.userID),
            isFriendReceived: data.sentRequests.find(friend => friend.id === req.session.userID)
        })
    })
}
exports.changePhoto = (req, res, next) => {
    try {
        profileModel.updatePhoto(req.session.userID, req.file.filename).then(() => {
            res.redirect('/')
        }).catch((err) => {
            console.log(err)
            res.redirect('/error')
        })
    } catch (error) {
        res.render('error', {
            pageName: 'error',
            isUser: req.session.userID,
            friendRequests: req.friendRequests
        })
        throw new Error(error)

    }

}

