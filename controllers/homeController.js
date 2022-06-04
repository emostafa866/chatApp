
exports.gethome = (req, res, next) => {
    res.render("home", {
        pageName: 'Home',
        isUser: req.session.userID,
        friendRequests: req.friendRequests
    })
}
