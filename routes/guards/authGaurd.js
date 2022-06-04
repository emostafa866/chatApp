exports.NotAuth = (req, res, next) => {
    if (!req.session.userID) next();
    else res.redirect('/');
}
exports.IsAuth = (req, res, next) => {
    if (req.session.userID) next();
    else res.redirect('/');
}

exports.IsRegistered = (req, res, next) => {
    if (req.session.userID) next();
    else res.redirect('/login');
}
