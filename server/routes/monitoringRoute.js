const express = require("express")
const router = express.Router()
const monitoringController = require("../controllers/monitoringController")

router.get("/metrics", monitoringController.sendMonitoringMetrics)

module.exports = router