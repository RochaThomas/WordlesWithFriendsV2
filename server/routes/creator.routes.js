
const Creator = require('../controllers/creator.controllers');

module.exports = (app) => {
    app.get('/api/creators', Creator.findAllCreators)
    app.get('/api/creators/:_id', Creator.findOneCreator)
    app.post('/api/creators/new', Creator.createCreator)
    app.put('/api/creators/update/:_id', Creator.updateCreator)
    app.delete('/api/creators/delete/:_id', Creator.deleteCreator)
}