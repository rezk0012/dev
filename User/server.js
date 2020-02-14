const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./server/api/user');


mongoose.connect('mongodb+srv://alfred:password00@cluster0-bfk3t.mongodb.net/users?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Connection failed!");
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "./images")));



app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/api/user', userRoutes);

app.listen(3000, () => {
    console.log('listen on port 3000');
})
