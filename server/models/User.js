const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    birthday: Date
});


const User = mongoose.model('User', userSchema);

module.exports = User;
