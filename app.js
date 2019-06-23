const express = require('express')
const app = express()

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
// 设置模板页面的存放路径
app.set('views', './views')

app.use('/node_modules', express.static('node_modules'))

//======首页
app.get('/', (req, res) => {
  res.render('index', {})
})

// 注意：当在调用模板引擎的res.render函数的时候，
// ./相对路径，是相对于app.set（'views'）指定的目录，来进行查找的
//=====注册
app.get("/register", (req, res) => {
  res.render("./user/register.ejs")
})

//=====登录
app.get("/login", (req, res) => {
  res.render("./user/login.ejs")
})

app.listen(80, () => {
  console.log("http://127.0.0.1:80")
})