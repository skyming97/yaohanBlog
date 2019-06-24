const express = require('express')
const app = express()
const fs = require("fs")
const path = require("path")
const bodyParser = require("body-parser")
// 引入session模块
const session = require("express-session")

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
// 设置模板页面的存放路径
app.set('views', './views')

app.use('/node_modules', express.static('node_modules'))

app.use(bodyParser.urlencoded({ extended: false }))

//给session注册
app.use(session({
  secret: '这是加密的密钥',
  resave: false,
  saveUninitialized: false
})
)

//使用循环的方式，自动注册对应的路由
fs.readdir(path.join(__dirname, "./router"), (err, filenames) => {
  if (err) return console.log("读取 router 目录中的路由失败！")

  filenames.forEach(fname => {
    const router = require(path.join(__dirname, "./router", fname))
    app.use(router)
  })

})

app.listen(80, () => {
  console.log("http://127.0.0.1:80")
})