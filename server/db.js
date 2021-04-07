const mongoose = require('mongoose');

//Connects to the "mern-user-db" database in my Mongo instance
mongoose.connect('mongodb://127.0.0.1:27017/mern-user-db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});