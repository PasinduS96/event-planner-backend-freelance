const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const router = express.Router();

require('../models/Event');
const Events = mongoose.model('events');

const TicketsSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    card: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    
})

router.get('/', (req,res) =>{
    Events.find().then(result =>{
        res.json(result);
    }).catch(err =>{
        console.log(err);
    });
});

router.post('/', (req,res) =>{

    const new_event = new Events({
        title: req.body.title,
        description: req.body.description,
        attendance: req.body.attendance,
        image: req.body.image,
        date: req.body.date,
        paid: req.body.paid
    });

    new_event.save()
    .then(result => res.send('New Event Added'))
    .catch(err => console.log(err));
    
});

router.post('/register/:id', async (req,res) =>{
        let ticket = mongoose.model(`${req.params.id}_payments`, TicketsSchema);
        const salt = await bcrypt.genSalt(10)
        let hashedCard = await bcrypt.hash(req.body.card, salt)
        const payment = new ticket({
            uid: req.body.uid,
            phone: req.body.phone,
            email: req.body.email,
            card: hashedCard,
            qty: req.body.qty,
            nic: req.body.nic,
            price: req.body.price
        });

        payment.save().then(result => {
            res.send(result);
        }).catch(err => console.log(err));
    
})

router.post('/deletepd/:id', (req,res)=>{
    mongoose.connection.db.dropCollection(`${req.params.id}_payments`).then(out =>{
        res.send('payement details deleted');
    })
})

module.exports = router;