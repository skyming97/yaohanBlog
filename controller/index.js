const conn = require("../db/user.js")

module.exports = {

    index: (req, res) => {
        const sql = `select a.id, a.title, a.ctime, b.nickname 
        from t_article as a
        LEFT JOIN t_blog as b
        ON a.authorId=b.id`
        conn.query(sql, (err, result) => {
            if (err) {
                return {
                    //将用户的昵称和用户的登录状态显示在index.ejs页面
                    user: req.session.user,
                    isLogin: req.session.isLogin
                }
            }
            console.log(result);
            
            res.render('index', {
                //将用户的昵称和用户的登录状态显示在index.ejs页面
                user: req.session.user,
                isLogin: req.session.isLogin,
                articles: result
            })


        })
    }

}