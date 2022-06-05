const { sendfriendRequest, getFriends } = require('../models/userModel')
module.exports = (io) => {
    io.on('connection', socket => {
        socket.on('sendFriendRequest', data => {


            sendfriendRequest(data).then(() => {
                //  console.log(data)
                socket.emit('requestSent')
                io.to(data.friendID).emit('newFriendRequest', { name: data.myName, id: data.myId })
            }).catch((err) => {
                socket.emit('requestFailed')
            })

            console.log(data);
        })

        socket.on('isOnline', id => {
            getFriends(id).then((friends) => {
                let onlineFriends = friends.filter(friend => io.onlineUsers[friend.id])
                console.log(onlineFriends)
                socket.emit('onlineFriends', onlineFriends)
            }).catch((err) => {
                console.log(err);
            })
        })
    })
}