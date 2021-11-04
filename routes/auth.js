const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");


router.post('/register', [
    check("email").isEmail(),
    check('password').isLength({min: 8})

],  (req, res) => {
    const { email , password }= req.body;
    
    
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    res.send('VALIDATED');
});


module.exports = router;