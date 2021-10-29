const express = require("express");
const appointmentController = require("../controllers/appointmentController");
const router = express.Router();


router.get("/appointments", appointmentsController.index)
router.get("/appointments/:id", appointmentsController.show)
router.post("/appointments", appointmentsController.create)
router.put("/appointments/:id", appointmentsController.update)
router.delete("/appointments/:id", appointmentsController.destroy)

module.exports = router;