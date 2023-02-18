const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const TransactionSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }

}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});


const Transaction = model('Transaction', TransactionSchema);

module.exports = {Transaction};

