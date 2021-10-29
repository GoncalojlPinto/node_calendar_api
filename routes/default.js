const express = require("express")
const router = express.Router()

router.get("/", (req, rep) => {
    rep.send("Welcome to the API")
})

module.exports = router