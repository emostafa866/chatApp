const messageModel = require('../models/messageModel').newMessage

module.exports = io => {
    io.on('connection', socket => {
        socket.on('joinChat', chatId => {
            socket.join(chatId)
            socket.on('sendMsg', (message, cb) => {

                messageModel(message).then(() => {
                    io.to(chatId).emit('messageContent', message.content, message.sender)
                    cb();

                }).catch((err) => {
                    console.log(err);
                })

            })
        })
    })
}

