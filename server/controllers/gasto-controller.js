const { Transaction } = require('../models/Transaction');
const { Rancho } = require('../models/Rancho')

const gastoController = {
    createTransaction({params, body}, res) {
        Transaction.create(body)
        .then((data) => {
            return Rancho.findOneAndUpdate({ _id: params.id}, {$push: {gastos: data}}, {new: true, runValidators: true})
        })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err))
    },

    updateTransaction({body}, res) {
        Transaction.findOneAndUpdate({ _id: body._id}, body, {new: true, runValidators: true})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err))
    },

    deleteTransaction({params}, res) {
        Transaction.findOneAndDelete({_id: params.id}, {new: true})
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
    }
};

module.exports = gastoController