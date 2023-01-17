const mongoose = require('mongoose');

const spotSchema = mongoose.Schema({
    period: { from: Date, till: Date },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
    department: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'department'
    },
    name: String,
    ktu: Number,
    hours: Number,
    accrual: Number,
    bonus: Number,

},    { versionKey: false },);

module.exports = mongoose.model('spot', spotSchema);