const express = require('express')
const router = express.Router()
const moment = require("moment")
const ctrl = require("../controller/index.js")

//======首页
router.get('/', ctrl.index)

// 注意：当在调用模板引擎的res.render函数的时候，
// ./相对路径，是相对于app.set（'views'）指定的目录，来进行查找的

module.exports = router