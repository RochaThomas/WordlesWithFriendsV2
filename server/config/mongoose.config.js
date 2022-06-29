const mongoose = require('mongoose');

module.exports = (DB) => {
    mongoose.connect(`mongodb://localhost/${DB}`)
        .then(() => console.log(`Connected to ${DB}`))
        .catch(err => console.log(`Cannot connect to ${DB}`, err));
}

