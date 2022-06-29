const mongoose = require('mongoose');
const GuesserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please enter a name.'],
        minlength: [3, 'Enter at least 3 characters.'],
        maxlength: [32, 'Shorter than 32 characters']
    },
    attempts : {
        type: Number,
        required: [true, '${PATH} must be present']
    },
    creator_id : {
        // this could be an issue...
        // might have to be passed as an ObjectId
        // but test it first
        type: String,
        required: [true, '${PATH} must be present'],
    }   
}, {timestamp: true});

module.exports = GuesserSchema;