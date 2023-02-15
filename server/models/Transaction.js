const {Schema, model} = require('mongoose');


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

}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

const Transaction = model('Transaction', TransactionSchema);

module.exports = Transaction

