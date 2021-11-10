const express = require("express");
const mongoose  = require("mongoose");
const Appointment = require("../models/appointment");


const index = async (req, res) => {
    res.json(await Appointment.find({}));
}

const show  = async (req, res) => {
    try {
        appointment = await Appointment.findById(req.params.id);
        return appointment === null ? res.status(404).json({error: "Invalid Appointment ID"}) : res.status(200).json(appointment);
    }catch(e) {
        res.status(400).json({error: "Invalid Appointment ID"})
    }

}

const create = async (req, res) => {
    const appointment = new Appointment(req.body);
    const date = new Date();
    const year = date.getFullYear();
    try {
        if (req.body.year < year){
            res.status(400).json({Error: `Year must be equal or higher then ${year}`})
        }else{
        const saved = await appointment.save();
        res.status(201).json(saved);}
    }catch(e){
        const {errors, statusCode } = handleErrors(e)
        res.status(statusCode).json({errors});
    }
}

    const update = async (req, res) => {
        const appointment = await Appointment.findById(req.params.id);
        try{
            if(appointment === null) {
                res.status(404).json({error: "Appointment not found"})
            
        }else{
            appointment.hour = req.body.hour;
            appointment.dayOfWeek = req.body.dayOfWeek;
            appointment.day = req.body.day;
            appointment.month = req.body.month;
            appointment.year = req.body.year;
            appointment.user_data.agent_id = req.body.user_data.agent_id;
            const saved = await appointment.save();
            return res.status(200).json(saved);
            
        }
        }catch(e){
            const { errors, statusCode } = handleErrors(e);
            res.status(statusCode).json({errors});
        }
    }

    const destroy = async (req, res) => {
        const appointment = await Appointment.findById(req.params.id);
        try {
            if (appointment === null) {
                res.status(404).json({error: "Appointment not found"})
            
            }else{
                const deleted = await appointment.delete();
                return res.status(200).json({Sucess : `appointment with ID ${appointment.id} deleted from Database.`})

            }
    }catch(e){
        const { errors, statusCode } = handleErrors(e);
        res.status(statusCode),json({errors});
    }
}

const searchAgent = async (req, res) => {
    try {
        if(res === []){
            res.status(404).json({error: "Agent ID not found"})
        }
        appointment = await Appointment.find({ 'user_data': {'agent_id' : req.params.id }});
        return appointment.length === 0 ? res.status(404).json({error: "Agent ID not found"}) : res.status(200).json(appointment);
        
    }catch(e) {
        res.status(400).json({error: "Invalid agent ID"})
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
    searchAgent
}
