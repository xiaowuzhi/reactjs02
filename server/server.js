const express = require("express")

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const userRouter = require("./user")
const path = require("path")
const app = express()
app.use(cookieParser())
app.use(bodyParser())


app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
})

app.use("/user", userRouter)
app.listen(9093, function () {
    console.log("Node app atart at port 9093")
})
























