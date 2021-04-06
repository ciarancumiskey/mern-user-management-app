const userRouter = require('./routers/user');
const cors = require('cors');
const express = require('express');
require('./db');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.get('/', (request, result) => {
    result.send('<h2>This is from index.js</h2>');
});

app.listen(PORT, () => {
    console.log(`Registration server started on port ${PORT}`);
});