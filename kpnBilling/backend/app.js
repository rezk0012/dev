const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const stationRoutes = require("./routes/station.js");
const app = express();

mongoose
    .connect(
        "mongodb+srv://alfred:alfred00@cluster0-bmyec.mongodb.net/test?retryWrites=true&w=majority", {useUnifiedTopology: true ,  useNewUrlParser: true }
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(express.json());
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


app.use("/api/station", stationRoutes);
// app.use("/api/user", userRoutes);

module.exports = app;
