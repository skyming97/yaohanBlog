const express = require('express')
const router = express.Router()
const moment = require("moment")
const mysql = require("mysql")
const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'myblog'
})

//======首页
router.get('/', (req, res) => {
    res.render('index', {})
  })
  
// 注意：当在调用模板引擎的res.render函数的时候，
// ./相对路径，是相对于app.set（'views'）指定的目录，来进行查找的
//=====注册
router.get("/register", (req, res) => {
    res.render("./user/register.ejs")
})

//注册业务逻辑
router.post("/register", (req, res) => {
    const user = req.body
    console.log(user);

    //首先校验用户输入合法性
    if (user.username.trim().lenth <= 0 || user.password.trim().lenth <= 0 || user.nickname.trim().lenth <= 0) {
        return res.send({ msg: "请填写完整", status: 501 })
    }

    const sqlSearch = 'select count(*) as count from t_blog where username = ?'
    conn.query(sqlSearch, user.username, (err, result) => {
        if (err) return res.send({ status: 502, msg: "用户名查重失败" })
        if (result[0].count != 0) return res.send({ status: 503, msg: "该用户名已存在", err: result })

        //执行业务逻辑
        user.ctime = moment().format("YYYY-MM-DD HH:mm:ss")

        const sqlInsert = "insert into t_blog set ?"
        conn.query(sqlInsert, user, (err, result) => {
            if (err) return res.send({ status: 504, msg: "注册失败" })
            res.send({ status: 200, msg: "恭喜，注册成功" })
        })
    })

})
//=====登录
router.get("/login", (req, res) => {
    res.render("./user/login.ejs")
})

//登录业务逻辑
router.post("/login", (req, res) => {
    const user = req.body
    console.log(user);


    const sql = 'select * from t_blog where username = ? and password = ?'
    conn.query(sql, [user.username, user.password], (err, result) => {
        if (err) return res.send({ msg: "登录失败", status: 502 })
        if (result.length != 1) return res.send({ msg: "登录查询失败", status: 503 })
        res.send({ msg: "登录成功", status: 200 })
    })
})

module.exports = router