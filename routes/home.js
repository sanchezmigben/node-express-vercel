const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log("Ha entrado en la ruta homeee");
  return res.status(200).json({
    title: "Express Testinggggggggg",
    message: "The app is working properly!",
  });
});

module.exports = router;
