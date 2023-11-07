const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const phonebookSchema = new Schema({
    name:  {
        type: String,
        required: true
    },
    address:  {
        type: String,
        required: true
    },
    phone:  {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now // Establece la fecha actual como valor predeterminado
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'  // Referencia al modelo User
    }, 
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema);
module.exports = Phonebook;