const mongoose = require('mongoose');

const Appointment = mongoose.model('appointment', {
    hour: {
        type: String,
        required: [true, 'Hour is required'],
        trim: true
    },
    dayOfWeek: {
        type: String,
    },

    day: {
        type: String,
        required: [true, 'Hour is required'],
        trim: true
    },

    mouth: {
        type: String,
        required: [true, 'Mouth is required'],

    },

    year: {
        type: String,
        required: [true, 'Year is required'],
        trim: true
    },

    user_data: {
        agent_id: {
            type: String,
            required: [true, 'Calendar should have agent_id for identification']
        }
        
    } 
})


module.exports = Appointment;