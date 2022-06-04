
socket.emit('isOnline', id)

socket.on('onlineFriends', friends => {
    console.log(friends)
})
