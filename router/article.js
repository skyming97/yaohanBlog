const experss = require("express")
const router = experss.Router()
const ctrl = require("../controller/article.js")

router.get("/article/add", ctrl.articlePageAdd)

router.get("/article/info/:id", ctrl.articlaDetail)

router.get("/article/info/:id", ctrl.articlaDetail)
module.exports = router