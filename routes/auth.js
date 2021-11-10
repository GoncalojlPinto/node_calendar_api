const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const verifyToken = require('../verifyToken');

router.get("/all", verifyToken, userController.index);
router.post("/login", userController.login);
router.post("/register", userController.create);
router.get("/:id", verifyToken, userController.show);
router.put("/:id", verifyToken, userController.update);
router.delete("/:id", verifyToken, userController.destroy);



module.exports = router;