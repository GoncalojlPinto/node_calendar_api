const express = require("express");
const appointmentController = require("../controllers/appointmentController");
const router = express.Router();


router.get("/appointments", appointmentController.index)
router.get("/appointments/:id", appointmentController.show)
router.post("/appointments", appointmentController.create)
router.put("/appointments/:id", appointmentController.update)
router.delete("/appointments/:id", appointmentController.destroy)

module.exports = router;