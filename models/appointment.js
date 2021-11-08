const mongoose = require('mongoose');

const Appointment = mongoose.model('appointment', {
    hour: {
        type: String,
        required: [true, 'Hour is required'],
        trim: true
    },
    
    day: {
        type: String,
        required: [true, 'Hour is required'],
        trim: true
    },

    month: {
        type: String,
        required: [true, 'Month is required'],

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
        
    },

    isAccepted : {
        type: Boolean,
        default: null
    }
})


module.exports = Appointment;