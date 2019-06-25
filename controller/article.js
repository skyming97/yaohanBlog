module.exports = {

    articlePageAdd: (req, res) => {
        //如果用户未登录访问了文章添加页，则跳转到首页
        if (!req.session.isLogin) return res.redirect("/") //页面重定向

        res.render("./article/add.ejs", {
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    },

    articlaDetail: (req, res) => {
        //如果用户未登录访问了文章详情页，则跳转到首页
        if (!req.session.isLogin) return res.redirect("/") //页面重定向

        let userId = req.params.id
        const sql = 'select * from blog_articles where id=?'
        
        res.render("article/info.ejs", {
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    }

}