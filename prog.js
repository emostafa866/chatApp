const express = require('express')
const bodyparser = require('body-parser')
const prog = express();
const authRouter = require('./routes/authRoute')
const homeRouter = require('./routes/homeRoute')
const profileRouter = require('./routes/profileRoute')
const friendRouter = require('./routes/friendRoute')
const chatRouter = require('./routes/chatRoute')
const friendsRouter = require('./routes/friendsPageRoute')
const getfriendRequest = require('./models/userModel').getfriendRequests
const server = require('http').createServer(prog);
const io = require('socket.io')(server);
const flash = require('connect-flash')
const check = require('express-validator').check

io.onlineUsers = {}

require('./sockets/friend.socket')(io)
require('./sockets/chat.socket')(io)
io.on('connection', socket => {
    socket.on('notificationRoom', id => {
        socket.join(id)
    })
    socket.on("isOnline", id => {
        io.onlineUsers[id] = true;
        // console.log(io.onlineUsers);
        socket.on('disconnect', () => {
            io.onlineUsers[id] = false;
            //  console.log(io.onlineUsers);
        })
    })
})
prog.use(flash());
prog.use(check());

const path = require('path')
const session = require('express-session');
const { append } = require('express/lib/response');
const sessionStorage = require('connect-mongodb-session')(session)

prog.set('view engine', 'ejs')
prog.set('views')

const storage = new sessionStorage({
    uri: 'mongodb+srv://emostafa866:MUSTAFA11jbq011450@cluster0.jr3nq.mongodb.net/chatApp?retryWrites=true&w=majority',
    collection: 'sessions'
})

prog.use(session({
    secret: 'i love nodjs',
    resave: true,
    saveUninitialized: false,
    store: storage
}))

const requestMenu = (req, res, next) => {
    if (req.session.userID) {

        getfriendRequest(req.session.userID).then((requests) => {
            req.friendRequests = requests;


            next();
        }).catch(error => console.log(error))

    } else {
        next();
    }

}
/*prog.get('/error', (req, res, next) => {
    console.log(typeof (req.friendRequests))
    res.render('error', {
        pageName: 'error',
        isUser: req.session.userID,
        friendRequests: req.friendRequests
    })
})*/
prog.use(requestMenu)
prog.use('/', authRouter)
prog.use('/', homeRouter)
prog.use('/profile', profileRouter)
prog.use('/friend', friendRouter)
prog.use('/chat', chatRouter)
prog.use('/', friendsRouter)

/*prog.use((req, res, next) => {
    res.status(404);
    res.render('error', {
        pageName: 'error',
        isUser: req.session.userID,
        friendRequests: req.friendRequests
    })
})*/

prog.use(express.static(path.join(__dirname, 'assets')))
prog.use(express.static(path.join(__dirname, 'images')))

const port = process.env.PORT || 3000;

server.listen(port, () => console.log('sever listend on port' + port));