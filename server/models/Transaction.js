const {Schema, Model, Types, model} = require('mongoose');


const TransactionSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    fecha: {
        type: String
    }

});

const Transaction = model('Transaction', TransactionSchema);

module.exports = Transaction

