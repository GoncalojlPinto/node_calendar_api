const mongoose = require('moongose');

const appointment = mongoose.model('appointment', {
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
        type: String,
        
    } 
})


module.exports = Calendar