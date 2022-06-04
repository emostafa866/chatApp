const mongoose = require('mongoose');
const db_url = 'mongodb+srv://emostafa866:MUSTAFA11jbq011450@cluster0.jr3nq.mongodb.net/chatApp?retryWrites=true&w=majority'
const user = require('./userModel').User

exports.viewFriends = async (id) => {
    try {
        await mongoose.connect(db_url);
        let data = await user.findOne({ _id: id }, { friends: true })
        console.log(data.friends)
        return data.friends

    } catch (error) {
        throw new Error(error)
    }


}