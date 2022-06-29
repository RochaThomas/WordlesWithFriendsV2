
const Creator = require(`../models/creator.models`);

module.exports = {
    //read all creators
    // this will just be used for validating if the backend is working
    findAllCreators : (req, res) => {
        Creator.find()
            .then(allCreators => {
                console.log('Finding all creators in the db');
                return res.json({creators: allCreators});
            })
            .catch(err => res.status(400).json(err));
    },
    
    // read one creator
    findOneCreator : (req, res) => {
        Creator.findById(req.params._id)
        // variable name '_id' must match route param
            .then(oneCreator => {
                console.log('Finding one creator');
                return res.json({creator: oneCreator});
            })
            .catch(err => res.status(400).json(err));
    },

    // create a creator
    createCreator : (req, res) => {
        Creator.create(req.body)
            .then(newCreator => {
                console.log('Created a new creator in the db');
                return res.json({creator: newCreator});
            })
            .catch(err => res.status(400).json(err));
    },

    // update one creator
    // we will use this to added a guesser to creator.guessers
    updateCreator : (req, res) => {
        // remember '_id' is a param that must match the route param
        Creator.findByIdAndUpdate(req.params._id, req.body, {
            new: true,
            runValidators: true
        })
            .then(updatedCreator => {
                console.log('Updated a creator in the db');
                return res.json({creator: updatedCreator});
            })
            .catch(err => res.status(400).json(err));
    },

    // delete creator
    // mostly going to be used for testing the backend
    // won't actually be a function of the app itself
    deleteCreator : (req, res) => {
        Creator.deleteOne({_id: req.params._id})
        // remember '_id' is a param that must match the route param
            .then(result => {
                console.log('Deleted a creator from the db')
                return res.json({result: result});
            })
            .catch(err => res.status(400).json(err));
    }
}