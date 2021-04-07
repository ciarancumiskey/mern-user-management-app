const userRouter = require('./routers/user');
const path = require('path');
const express = require('express');
require('./db');

const app = express();
const PORT = process.env.PORT || 3030;

//Configure ExpressJS so the /build folder is used as the starting point of the app
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.json());
app.use(userRouter);

app.get('/', (request, result) => {
    result.send('<h2>This is from index.js</h2>');
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Registration server started on port ${PORT}`);
});