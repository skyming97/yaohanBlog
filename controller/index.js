const conn = require("../db/user.js")

module.exports = {

    index: (req, res) => {
        const sql = 'SELECT b.id, b.nickname, b.ctime, a.title, a.authorId FROM t_blog AS b LEFT JOIN t_article AS a ON b.id = a.authorId WHERE b.id = a.authorId'
        conn.query(sql, (err, result) => {
            if (err) {
                return {
                    //将用户的昵称和用户的登录状态显示在index.ejs页面
                    user: req.session.user,
                    isLogin: req.session.isLogin
                }
            }
            // res.send

        })
        res.render('index', {
            //将用户的昵称和用户的登录状态显示在index.ejs页面
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    }

}