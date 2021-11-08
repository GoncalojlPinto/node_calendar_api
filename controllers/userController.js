const express = require("express");
const mongoose  = require("mongoose");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require("../verifyToken");


const index = async (req, res) => {
    res.json(await User.find({}));
}

const show  = async (req, res) => {
    try {
        user = await User.findById(req.params.id);
        return user === null ? res.status(404).json({error: "User ID not found"}) : res.status(200).json(user);
    }catch(e) {
        res.status(400).json({error: "Invalid User ID"})
    }

}

const create = async (req, res) => {
    const emailChecker = await User.findOne({email: req.body.email});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword});
try {
    if(emailChecker)
        return res.status(400).json({error: 'This Email already exists'})
        const saved = await user.save();
        res.status(201).json(saved);
    }catch(e){
        const {errors, statusCode } = handleErrors(e)
        res.status(statusCode).json({errors});
    }
}

const update = async (req, res) => {
    
    const user = await User.findById(req.params.id);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    try{
        if(user === null) {
            res.status(404).json({error: "user not found"})
        
    }else{
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = hashedPassword;
        const saved = await user.save();
        return res.status(200).json(saved);
        
    }
    }catch(e){
        const { errors, statusCode } = handleErrors(e);
        res.status(statusCode).json({errors});
    }
}


    const destroy = async (req, res) => {
        const user = await User.findById(req.params.id);
        try {
            if (user === null) {
                res.status(404).json({error: "user not found"})
            
            }else{
                const deleted = await user.delete();
                return res.status(200).json({Sucess : `User ${user.username} with ID ${user.id} deleted from Database.`})

            }
    }catch(e){
        const { errors, statusCode } = handleErrors(e);
        res.status(statusCode),json({errors});
    }
}

    

    const login = async (req, res) => {

        
        try {
            const user = await User.findOne({ email: req.body.email});
            if(!user)
            return res.status(400).json({error: 'Email or password is wrong'});
            
            
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if(!validPass)
            return res.status(400).json({error: 'Invalid Password'});
            
            
            const token = jwt.sign({userId: user._id}, process.env.TOKEN_PASSWORD )
                res.status(200).json({userId: user._id, Token: token});
    
            
            }catch(e){
                const {errors, statusCode } = handleErrors(e)
                res.status(statusCode).json({errors});
            }
        }

        const handleErrors = (e) => {
            if(e instanceof mongoose.Error.ValidationError){
                console.log(e.errors);
                errors = {};
                Object.keys(e.errors).forEach((key) => { errors[key] = e.errors[key].message});
                return {errors, statusCode: 400};
            }
            console.log({errors : ["Internal Server Error"], statusCode: 500});
            
        }


module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    login

}
