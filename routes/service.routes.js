const serviceController = require("../controllers/service.controller")
const express = require("express")
const router = express.Router()

router.get("/", serviceController.findAll);
  
module.exports = router;
