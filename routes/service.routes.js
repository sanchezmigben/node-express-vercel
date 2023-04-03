const requireLogin = require("../middlewares/jwt.mw")
const serviceController = require("../controllers/service.controller")
const express = require("express")
const router = express.Router()

router.get("/",requireLogin, serviceController.findAll);
router.post("/",requireLogin, serviceController.create);
router.post("/send", serviceController.sendEmail)
  
module.exports = router;
