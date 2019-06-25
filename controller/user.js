const conn = require("../db/user.js")

module.exports = {

    //首页
    index: (req, res) => {
        res.render('index', {})
    },

    //登录页
    registerPage: (req, res) => {
        res.render("./user/register.ejs")
    },

    //登录功能
    register: (req, res) => {
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

    },

    //登录页
    loginPage: (req, res) => {
        res.render("./user/login.ejs")
    },

    //登录功能
    login: (req, res) => {
        const user = req.body
        const sql = 'select * from t_blog where username = ? and password = ?'
        conn.query(sql, [user.username, user.password], (err, result) => {
            if (err) return res.send({ msg: "登录失败", status: 502 })
            if (result.length != 1) return res.send({ msg: "登录查询失败", status: 503 })

            // //将用户信息和是否登录的状态挂载到session身上
            req.session.user = result[0]
            req.session.isLogin = true

            res.send({ msg: "登录成功", status: 200 })
        })
    },

    //注销功能
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) throw err;
            console.log('用户退出成功！');
            // 实现服务器端的跳转，这个对比于 客户端跳转
            res.redirect('/');
        });
    }

}