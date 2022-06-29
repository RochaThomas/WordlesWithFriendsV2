
const Guesser = require('../controllers/guesser.controllers');

module.exports = (app) => {
    app.get('/api/guessers', Guesser.findAllGuessers)
    app.get('/api/guessers/:_id', Guesser.findOneGuesser)
    app.post('/api/guessers/new', Guesser.createGuesser)
    app.delete('/api/guessers/delete/:_id', Guesser.deleteGuesser)
}