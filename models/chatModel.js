const mongoose = require('mongoose');
const db_url = 'mongodb+srv://emostafa866:MUSTAFA11jbq011450@cluster0.jr3nq.mongodb.net/chatApp?retryWrites=true&w=majority'

const chatSchema = {
    users: [{ type: mongoose.Schema.Types.String, ref: 'user' }]
}

const chat = mongoose.model('chat', chatSchema);
exports.chat = chat;

exports.viewChat = async (chatId) => {
    try {

        await mongoose.connect(db_url);
        let data = await chat.findById(chatId).populate('users')
        return data;
    } catch (error) {
        throw new Error(error)
    }

}