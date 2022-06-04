const mongoose = require('mongoose');
const db_url = 'mongodb+srv://emostafa866:MUSTAFA11jbq011450@cluster0.jr3nq.mongodb.net/chatApp?retryWrites=true&w=majority'
const chat = require('./chatModel').chat

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image: { type: String, default: "default-profile picture.png" },
    isOnline: { type: Boolean, default: false },
    friends: {
        type: [{ name: String, image: String, id: String, chatId: String }],
        default: []
    },
    friendRequests: {
        type: [{ name: String, id: String }],
        default: []
    },
    sentRequests: {
        type: [{ name: String, id: String }],
        default: []
    },

})

const User = mongoose.model('user', userSchema);
exports.User = User;

exports.sendfriendRequest = async (data) => {
    //add my data to his friendrequest array 
    //add friend data to my friendsent array 
    try {
        await mongoose.connect(db_url);
        await User.updateOne({ _id: data.friendID },
            { $push: { friendRequests: { name: data.myName, id: data.myId } } })
        await User.updateOne({ _id: data.myId },
            { $push: { sentRequests: { name: data.friendName, id: data.friendID } } })

        mongoose.disconnect();
        console.log('sent request')
        return
    } catch (error) {
        console.log('failed request')
        mongoose.disconnect();
        throw new Error(error)
    }

}

exports.cancelFriendRequest = async (data) => {
    // delete friend data from my requestsent arr
    // delete my data from friend requests arr 
    console.log(data)
    try {
        await mongoose.connect(db_url);
        await User.updateOne({ _id: data.myID },
            { $pull: { sentRequests: { id: data.friendID } } }
        );
        await User.updateOne({ _id: data.friendID },
            { $pull: { friendRequests: { id: data.myID } } }
        );
        mongoose.disconnect();
        console.log('successed cancel')
        return
    } catch (error) {
        mongoose.disconnect();
        console.log('failed cancel')
        throw new Error(error)

    }
}

exports.confirmFriendRequest = async (data) => {
    // add my data to my friend friends array 
    // add friend data to my friend array 
    // deleta data from request and sent arrays
    try {
        let newChat = new chat({
            users: [data.myID, data.friendID]
        })
        let chatDoc = await newChat.save()
        await mongoose.connect(db_url);

        await User.updateOne({ _id: data.myID },
            { $push: { friends: { name: data.friendName, image: data.friendImage, id: data.friendID, chatId: chatDoc._id } } }
        );
        await User.updateOne({ _id: data.friendID },
            { $push: { friends: { name: data.myName, image: data.myImage, id: data.myID, chatId: chatDoc._id } } }
        );

        await User.updateOne({ _id: data.myID },
            { $pull: { friendRequests: { name: data.friendName, id: data.friendID } } }
        );
        await User.updateOne({ _id: data.friendID },
            { $pull: { sentRequests: { name: data.myName, id: data.myID } } }
        );

        mongoose.disconnect();
        console.log('successed confirm')
        return
    } catch (error) {
        mongoose.disconnect();
        console.log('failed confirm')
        throw new Error(error)

    }
}

exports.deleteFriend = async (data) => {
    // delete friend data from my friends arr
    // delete my data from friend friends arr 

    try {
        await mongoose.connect(db_url);
        await User.updateOne({ _id: data.myID },
            { $pull: { friends: { id: data.friendID } } }
        );
        await User.updateOne({ _id: data.friendID },
            { $pull: { friends: { id: data.myID } } }
        );
        await User.updateOne({ _id: data.myID },
            { $pull: { friendRequests: { id: data.friendID } } }
        );
        await User.updateOne({ _id: data.friendID },
            { $pull: { sentRequests: { id: data.myID } } }
        );
        mongoose.disconnect();
        console.log('successed deletion')

    } catch (error) {
        mongoose.disconnect();
        console.log('failed deletion')
        throw new Error(error)

    }
}

exports.getfriendRequests = async (id) => {
    try {
        await mongoose.connect(db_url);
        let data = await User.findOne({ _id: id }, { friendRequests: true })

        return data.friendRequests
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
exports.getFriends = async (id) => {
    try {
        await mongoose.connect(db_url);
        let data = await User.findOne({ _id: id }, { friends: true })
        console.log(data.friends)
        return data.friends

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}