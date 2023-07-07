const noteRoutes = require('./note.routes');

module.exports = function(app) {
    noteRoutes(app);
}