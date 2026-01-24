const express = require("express");
const router = express.Router();
const schemeController = require("../controllers/schemeController");


router.get("/", schemeController.getSchemes);


router.post("/sync", schemeController.syncSchemes);

module.exports = router;
