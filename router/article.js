const experss = require("express")
const router = experss.Router()
const ctrl = require("../controller/article.js")

router.get("/article/add", ctrl.articlePageAdd)

router.get("/article/info/:id", ctrl.articleDetailPage)

router.post("/article/info", ctrl.articlaDetail)

router.get("/article/edit/:id", ctrl.showEditePage)

router.post("/article/edit/:id", ctrl.showEditePage)

router.post("/article/edit", ctrl.editArticle)
module.exports = router