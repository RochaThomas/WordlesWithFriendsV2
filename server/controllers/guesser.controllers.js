const mongoose = require('mongoose');
const GuesserSchema = require(`../models/guesser.models`);

const Guesser = mongoose.model('Guesser', GuesserSchema);

module.exports = {
    //read all guessers
    // this will just be used for validating if the backend is working
    findAllGuessers : (req, res) => {
        Guesser.find()
            .then(allGuessers => {
                console.log('Finding all guessers in the db');
                return res.json({guessers: allGuessers});
            })
            .catch(err => res.status(400).json(err));
    },

    // read one guesser
    findOneGuesser : (req, res) => {
        Guesser.findById(req.params._id)
        // variable name '_id' must match route param
            .then(oneGuesser => {
                console.log('Finding one guesser');
                return res.json({guesser: oneGuesser});
            })
            .catch(err => res.status(400).json(err));
    },

    // create a guesser
    createGuesser : (req, res) => {
        Guesser.create(req.body)
            .then(newGuesser => {
                console.log('Created a new guesser in the db');
                return res.json({guesser: newGuesser});
            })
            .catch(err => res.status(400).json(err));
    },

    // delete guesser
    // mostly going to be used for testing the backend
    // won't actually be a function of the app itself
    deleteGuesser : (req, res) => {
        Guesser.deleteOne({_id: req.params._id})
        // remember '_id' is a param that must match the route param
            .then(result => {
                console.log('Deleted a guesser from the db')
                return res.json({result: result});
            })
            .catch(err => res.status(400).json(err));
    }
}