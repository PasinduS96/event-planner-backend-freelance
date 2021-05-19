const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express();

const events = require('./src/routes/events');
const gallery = require('./src/routes/gallery');
const jobs = require('./src/routes/jobs');

app.get('/', (req, res) =>{
    res.send('hello world')
})

//Configure dotenv
require("dotenv").config();

//Configure bodyparser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//use cors
app.use(cors())
app.use('/uploads', express.static('uploads'));

//Add initial route for testing
app.use('/events', events);
app.use('/gallery', gallery);
app.use('/jobs', jobs);

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