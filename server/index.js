const express = require('express');
require('./db');

const app = express();
const PORT = process.env.PORT || 3030;

app.get('/', (request, result) => {
    result.send('<h2>This is from index.js</h2>');
});

app.listen(PORT, () => {
    console.log(`Registration server started on port ${PORT}`);
});