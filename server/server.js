const express = require("express")
const mongoose = require("mongoose")
//连接mongo 并且使用imooc这个集合
const DB_URL = "mongodb://127.0.0.1:27017/imooc"
mongoose.connect(DB_URL)
mongoose.connection.on("connected", function () {
    console.log("mongo connect success1")
})

//类似于mysql的表 mongo里有文档、字段的概念
const User = mongoose.model("user", new mongoose.Schema({
    user: {type: String, require: true},
    age: {type: Number, require: true},
    isAuth: {type: Boolean, require: true}
}))

// // //新增数据
// User.create({
//     user:'xiaoming',
//     age:20
// }, function(err, doc){
//     if(!err){
//         console.log(doc)
//     }else {
//         console.log(err)
//     }
// })

// //删除数据
// User.remove({age: 18}, function (err, doc) {
//     console.log(doc)
// })

// //更新数据
// User.update({"user":"xiaoming"}, {"$set":{isAuth:true}}, function(err, doc){
//     console.log(doc)
// })


//新建app
const app = express()

app.use(express.static("build"));

app.get("/", function (req, res) {
    res.send("<h1>hello world 111</h1>")

})


//条件查询
app.get("/data", function (req, res) {
    User.findOne({"user": "xiaoming"}, function (err, doc) {
        // setTimeout(() => {
        //     return res.json(doc)
        // }, 2000)
        return res.json(doc)
    })
    //res.json({"name":"imooc", type:"IT"})
})


app.listen(9093, function () {
    console.log("Node app atart at port 9093")
})
























