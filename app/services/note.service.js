const { ObjectId } = require("mongodb");

const postNoteService =  async (req, res) => {
    const note = {
        text: req.body.body,
        title: req.body.title
    };
    const result = await performOperation(async (collection) => {
        return await collection.insertOne(note, function (err, result) {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                console.log( `A document was inserted with the _id: ${result.insertedId} is ${JSON.stringify(result[0])}`);
                res.send(result[0]);
            }
        });
    });
}
const getAllNotesService = async (req, res) => {
    const result = await performOperation(async (collection) => {
        return await collection.find({}).toArray(function (err, result) {
            if (err) throw err;
            db.close();
        });
    });
    return res.json(result);
}

const getNoteByIdService = async (req, res) => {
    const id = req.query.id;
    const details = {
        '_id': new ObjectId(id)
    };
    const result = await performOperation(async (collection) => {
        return await collection.findOne(details);
    });
    return res.send(result);
}

const editNoteByIdService = async (req, res) => {
    const id = req.params.id;
    const details = {
        '_id': new ObjectId(id)
    };
    const note = {
        text: req.body.body,
        title: req.body.title
    };
    const result = await performOperation(async (collection) => {
        return await collection.update(details, note, {
            safe: true
        },
        function (err, result) {
            if (err) {
                console.log('Error updating documents: ' + err);
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(documents);
            }
        });
    });
    return res.send(result);
}

const deleteNoteByIdService = async (req, res) => {
    const id = req.params.id;
    if (id == "") {
        alert("Must provide an ID to delete!");
        return;
    }
    const details = {
        '_id': new ObjectId(id)
    };
    const result = await performOperation(async (collection) => {
        return await collection.deleteOne(details, {
            safe: true
        },
        function (err, result) {
            if (err) {
                res.send({
                    'error': 'An error has occurred - ' + err
                });
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send({
                    result: 'ok'
                });
            }
        });
    });
    return res.send(result);
}

module.exports = {
    postNoteService,
    getAllNotesService,
    getNoteByIdService,
    editNoteByIdService,
    deleteNoteByIdService,
  };