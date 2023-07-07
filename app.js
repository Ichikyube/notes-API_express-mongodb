const express = require('express');
const assert = require('assert');

const app = express();
const Port = 3000;
const port = process.env.PORT || Port;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

require('./app/routes')(app);
app.listen(port, () => {
    console.log('We are live on ' + port);
});
