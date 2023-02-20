const express = require("express")
const router = express.Router()

router.get("/", async (req, res, next) => {
    console.log("Ha entrado en la ruta services");
    return res.status(200).json({
      title: "Express Servicesssss Routes",
      message: "The app is working properly!",
    });
  });
  
  module.exports = router;
