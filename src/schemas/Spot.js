const mongoose = require('mongoose');

const spotSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    period: { from: Date, till: Date },
    worker: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    department: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Department'
    },
    name: String,
    ktu: Number,
    hours: Number,
    accrual: Number,
    bonus: Number,
    bonus: Number,
});