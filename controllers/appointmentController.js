const mongoose  = require("mongoose");
const Appointment = require("../models/appointment");

const index = async (req, res) => {
    res.json(await Appointment.find({}));
}

const shoW  = async (req, res) => {
    try {
        appointment = await Appointment.findById(req.params.id);
        return appointment === null ? res.status(404).json({error: 'Agent ID not found'}) : res.status(200).json(appointment);
    }catch(e) {
        res.status(400).json({error: 'Invalid Agent ID'})
    }

}

const create = async (req, res) => {
    const appointment = new Appointment(req.body)
    try {
        const save = await appointment.save();
        res.status(201).json(saved);
    }catch(e){
        const {errors, statusCode } = handleErrors(e)
        res.status(statusCode).json({errors});
    }
}

    const update = async (req, res) => {
        try{
            const appointment = await Appointment.findById(req.params.id);
            if(Appointment = null) {
                res.status(404).json({error: 'Appointment not found'})
            
        }else{
            appointment.hour = req.body.hour;
            appointment.dayOfWeek = req.body.dayOfWeek;
            appointment.day = req.body.day;
            appointment.mouth = req.body.mouth;
            appointment.year = req.body.year;
            appointment.user_data.agent_id = req.body.user_data.agent_id;
            const save = await appointment.save();
            return res.status(200).json(saved);
        }
        }catch(error){
            const { errors, statusCodes } = handleErrors(e);
            res.status(statusCodes).json({errors});
        }
    }

    const destroy = (req, res) => {
        try {
            const appointment = await Appointment.findById(req.params.id);
            if (appointment === null) {
                res.status(404).json({error: 'Appointment not found'})
            
            }else{
                return appointment.delete();
            }
    }catch(error){
        const { errors,statusCodes } = handleErrors(e);
        res.status(statusCodes),json({errors});
    }
}

const handleErrors = (e) => {
    if(e instanceof mongoose.Error.ValidationError){
        console.log(e.errors);
        errors = {};
        Object.keys(e.errors).forEach((key) => { errors[key] = e.errors[key].message});
        return {errors, statusCode: 400};
    }
    return {errors : ["Internal Server Error"], statusCode: 500};
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}
