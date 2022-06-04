const mongoose = require('mongoose');
const { chat } = require('./chatModel');
const db_url = 'mongodb+srv://emostafa866:MUSTAFA11jbq011450@cluster0.jr3nq.mongodb.net/chatApp?retryWrites=true&w=majority'

const messageSchema = {
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'chat' },
    content: String,
    image: String,
    sender: String,
    timestamp: Number
}


const msg = mongoose.model('message', messageSchema);

exports.viewMessage = async (chatId) => {
    try {

        await mongoose.connect(db_url);

        let msgs = await msg.find({ chat: chatId }).populate({
            path: 'chat', //field
            model: 'chat',// model refernce name
            populate: {
                path: 'users',
                model: 'user',
                select: 'username image'
            }

        })

        return msgs;
    } catch (error) {
        throw new Error(error)
    }

}

exports.newMessage = async data => {
    try {
        await mongoose.connect(db_url);
        data.timestamp = Date.now();
        let message = new msg(data);
        await message.save();
        return
    } catch (error) {
        throw new Error(error)
    }
}
