const express = require("express");
const appointmentController = require("../controllers/appointmentController");
const router = express.Router();
const verifyToken = require('../verifyToken');


router.get("/appointments", verifyToken, appointmentController.index)
router.get("/appointments/:id", verifyToken, appointmentController.show)
router.post("/appointments", appointmentController.create)
router.put("/appointments/:id", verifyToken,  appointmentController.update)
router.delete("/appointments/:id", verifyToken, appointmentController.destroy)

module.exports = router;