const express = require("express")

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const model = require("./model")
const Chat = model.getModel("chat")

const app = express()
//work with express
const server = require("http").Server(app)

const io = require("socket.io")(server)
io.on("connection", function (socket) {
    //console.log("user login")
    socket.on("sendmsg", function (data) {
        const {from, to, msg} = data
        const chatid = [from, to].sort().join("_")
        Chat.create({chatid: chatid, from: from, to: to, content: msg}, function (err, doc) {
            io.emit("recvmsg", Object.assign({}, doc._doc))
        })
        // console.log(data)
        // io.emit("recvmsg", data)
    })
})

const userRouter = require("./user")
const path = require("path")
app.use(cookieParser())
app.use(bodyParser())


app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
})

app.use("/user", userRouter)

server.listen(9093, function () {
    console.log("Node app atart at port 9093")
})
























