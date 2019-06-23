const express = require('express')
const app = express()
const bodyParser = require("body-parser")

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
// 设置模板页面的存放路径
app.set('views', './views')

app.use('/node_modules', express.static('node_modules'))

app.use(bodyParser.urlencoded({ extended: false }))

const router = require("./router/index.js")
app.use(router)

app.listen(80, () => {
  console.log("http://127.0.0.1:80")
})