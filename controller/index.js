module.exports = {
    index: (req, res) => {
        res.render('index', {
            //将用户的昵称和用户的登录状态显示在index.ejs页面
            nickname: req.session.name,
            isLogin: req.session.isLogin
        })
    }

}