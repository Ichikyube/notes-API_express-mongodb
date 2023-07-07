const s = require("../services/note.service");
module.exports = function (app) {
    app.post('/api/notes', s.postNoteService);
    app.get('/api/notes/', s.getAllNotesService);
    app.get('/api/notes/?', s.getNoteByIdService);
    app.put('/api/notes/:id', s.editNoteByIdService);
    app.delete('/api/notes/:id', s.deleteNoteByIdService);
}