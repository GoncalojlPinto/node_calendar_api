const mongoose = require('mongoose');

const Appointment = mongoose.model('appointment', {
    hour: {
        type: String,
        required: [true, 'Hour is required'],
        trim: true
    },
    
    day: {
        type: Number,
        required: [true, 'Day is required'],
        trim: true
    },

    month: {
        type: String,
        required: [true, 'Month is required'],

    },

    year: {
        type: Number,
        required: [true, 'Year is required'],
        trim: true
    },

    user_data: {
        agent_id: {
            type: Number
        }
        
    },

    isAccepted : {
        type: Boolean,
        default: null
    }
}, "appointments");


module.exports = Appointment;