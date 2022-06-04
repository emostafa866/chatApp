const { promise } = require("bcrypt/promises")
const { default: mongoose } = require("mongoose")
const db_url = 'mongodb+srv://emostafa866:MUSTAFA11jbq011450@cluster0.jr3nq.mongodb.net/chatApp?retryWrites=true&w=majority'
const User = require('./userModel').User

exports.getData = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db_url).then(() => {
            return User.findById(id)
        }).then((data) => {
            mongoose.disconnect();
            resolve(data);
        }).catch((err) => {
            mongoose.disconnect();
            reject(err)
        })
    })
}


exports.updatePhoto = async (id, image) => {
    try {

        await mongoose.connect(db_url);
        let user = await User.findByIdAndUpdate(id, { image: image });
        await user.save();
        return

    } catch (error) {
        throw new Error(error)
    }
}