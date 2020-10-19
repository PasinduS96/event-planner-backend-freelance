const mongoose = require('mongoose');

const TicketsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attendance: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    }
    
})

mongoose.model('tickets', TicketsSchema)