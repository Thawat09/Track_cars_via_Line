require('dotenv').config();
const express = require('express');

const app = express();

app.use('/', require('./src/routes'));

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});