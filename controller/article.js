const conn = require("../db/user.js")
const moment = require("moment")
const marked = require("marked")

module.exports = {

    articlePageAdd: (req, res) => {
        //如果用户未登录访问了文章添加页，则跳转到首页
        if (!req.session.isLogin) return res.redirect("/") //页面重定向

        res.render("./article/add.ejs", {
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    },

    //详情页渲染
    articleDetailPage: (req, res) => {

        const id = req.params.id
        const sql = 'select * from t_article where id=?'

        conn.query(sql, id, (err, result) => {
            if (err) return res.send({ msg: '获取文章详情失败！', status: 500 })
            if (result.length !== 1) return res.send({ msg: '获取文章详情失败！', status: 501 })

            const html = marked(result[0].content)
            result[0].content = html

            res.render('./article/info.ejs',
                {
                    user: req.session.user,
                    isLogin: req.session.isLogin,
                    article: result[0]
                })
        })

    },

    articlaDetail: (req, res) => {
        body = req.body
        let userId = req.params.id
        body.ctime = moment().format("YYYY-MM-DD HH:mm:ss")

        const sql = 'insert into t_article set ?'
        conn.query(sql, body, (err, result) => {
            if (err) return res.send({ status: 500, msg: "发表失败，数据库错误", err: err.message })
            if (result.affectedRows != 1) return res.send({ status: 501, msg: "发表失败" })
            console.log(result);
            res.send({ status: 200, msg: "发表成功", insertId: result.insertId })
        })
    },

    //编辑页渲染
    showEditePage: (req, res) => {
        const sql = 'select * from t_article where id=?'
        conn.query(sql, req.params.id, (err, result) => {
            if (err) return res.redirect('/')
            if (result.length !== 1) return res.redirect('/')
            // 渲染详情页
            res.render('./article/edite.ejs', { user: req.session.user, isLogin: req.session.isLogin, article: result[0] })
        })
    },

    //编辑逻辑
    editArticle: (req, res) => {
        const body = req.body

        const sql = 'update t_article set ? where id=?'
        conn.query(sql, [body, body.id], (err, result) => {
            if (err) return res.send({ msg: '修改文章失败！', status: 501 })
            if (result.affectedRows !== 1) return res.send({ msg: '修改文章失败！', status: 502 })

            res.send({ msg: 'ok', status: 200 })
        })
    }


}