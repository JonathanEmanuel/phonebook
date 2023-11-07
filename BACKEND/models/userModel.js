const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email:  {
        type: String,
        required: true
    },
    password:  {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now // Establece la fecha actual como valor predeterminado
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;