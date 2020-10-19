const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();

const events = require('./src/routes/events');

app.get('/', (req, res) =>{
    res.send('hello world')
})

//Configure dotenv
require("dotenv").config();

//Configure bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Add initial route for testing
app.use('/events', events);

//Start server
app.listen(process.env.PORT, () =>{

    console.log(`server started at ${process.env.PORT}`);

    //Connect to the database
    mongoose.Promise = global.Promise;
    mongoose
    .connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, db) =>{
        console.log("MongoDB Connected Successfully!!")
        
    })
})