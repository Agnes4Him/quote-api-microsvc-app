const express = require("express")
const router = express.Router()
const {sendMetrics} = require("../controllers/monitoringController")

router.get("/metrics", sendMetrics)

module.exports = router