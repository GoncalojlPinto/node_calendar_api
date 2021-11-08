const mongoose = require('mongoose');

const User = mongoose.model('user', {

    username: {
        type: String,
        required: [true, 'username is required'],
        min: 3,
        max: 255,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        min: 8,
        max: 512
        
    }
});

module.exports = User;

