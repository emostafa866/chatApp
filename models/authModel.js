const mongoose = require('mongoose');
const db_url = 'mongodb+srv://emostafa866:MUSTAFA11jbq011450@cluster0.jr3nq.mongodb.net/chatApp?retryWrites=true&w=majority'
const bcrypt = require('bcrypt');
const { reject } = require('bcrypt/promises');
const User = require('./userModel').User


exports.createAccount = (email, username, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db_url).then(() => {
            return User.findOne({ email: email })
        }).then((user) => {
            if (user) {
                mongoose.disconnect();
                reject('user is already existed')
            }
            else {
                return bcrypt.hash(password, 10)
            }
        }).then((pass) => {
            let user = new User({
                username: username,
                email: email,
                password: pass
            });
            return user.save();
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch((err) => {
            console.log(err)
            reject(err);
            mongoose.disconnect();
        })
    })
}
exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db_url).then(() => {
            return User.findOne({ email: email })
        }).then((user) => {
            if (!user) {
                console.log('email isnt exist log')
                reject("email isn't exist")
            } else {
                console.log('check pass')
                bcrypt.compare(password, user.password).then(same => {

                    if (!same) {
                        mongoose.disconnect();
                        reject('wrong password')
                        //console.log('not same pass')
                    } else {
                        mongoose.disconnect();
                        resolve(user)
                        console.log('email logged')
                    }
                })
            }
        })
    }).catch(err => reject(err))
};

/*exports.Login = async (email, pass) => {
    await mongoose.connect(db_url);
    let user = await User.findOne({ email: email })
    if (!user) {
        console.log('user not found')
        return 'user not found'
    } else {
        same = await bcrypt.compare(pass, email.password)
        if (!same) {
            console.log('error pass')
        } else {
            return user
        }
    }
}*/