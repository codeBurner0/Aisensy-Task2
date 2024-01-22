const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/contacts",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("connection is successful");
    }).catch((err) => {
        console.log("mongoose connection is not successful");
})