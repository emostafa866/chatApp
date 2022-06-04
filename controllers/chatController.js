const messageModel = require('../models/messageModel');
const chatModel = require('../models/chatModel')

exports.getMessages = (req, res, next) => {
    let chatId = req.params.id
    messageModel.viewMessage(chatId).then((msg) => {
        if (msg.length === 0) {
            chatModel.viewChat(chatId).then((chat) => {
                let data = chat.users.find(user => user._id != req.session.userID)
                res.render('chat', {
                    isUser: req.session.userID,
                    pageName: data.username,
                    friendRequests: req.friendRequests,
                    friendData: data,
                    messages: msg,
                    chatId: chatId
                })
            })
        } else {
            let data = msg[0].chat.users.find(user => user._id != req.session.userID)
            res.render('chat', {
                isUser: req.session.userID,
                pageName: data.username,
                friendRequests: req.friendRequests,
                friendData: data,
                messages: msg,
                chatId: chatId
            })
        }
    }).catch((err) => {
        console.log(err)
        res.render('error', {
            isUser: req.session.userID,
            pageName: 'error'
        })
    })
} 
