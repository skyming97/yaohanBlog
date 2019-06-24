const express = require('express')
const router = express.Router()
const moment = require("moment")
const ctrl = require("../controller/user.js")

//=====注册
router.get("/register", ctrl.registerPage)

//注册业务逻辑
router.post("/register", ctrl.register)
//=====登录
router.get("/login", ctrl.loginPage)

//登录业务逻辑
router.post("/login", ctrl.login)

//=====注销登录
router.get("/logout", ctrl.logout)

module.exports = router