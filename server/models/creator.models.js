const mongoose = require('mongoose');
const Guesser = require('./guesser.models');
const CreatorSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please enter your name.'],
        minlength: [2, 'Name must be at least 2 characters.'],
        maxlength: [32, 'Name must be less than 32 characters.']
    },
    word : {
        type: String,
        required: [true, 'Enter a valid 5 letter word.'],
        minlength: [5, 'Word must be 5 characters.'],
        maxlength: [5, 'Word must be 5 characters.'],
    },
    guessers : [{type: Guesser}],  
}, {timestamp: true});

const Creator = mongoose.model('Creator', CreatorSchema);
module.exports = Creator;