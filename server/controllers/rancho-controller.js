const { Rancho } = require('../models');
const { User } = require('../models')

const ranchoController = {

    createRancho({ params, body }, res) {
        Rancho.create(body)
        .then((data) => {
            return User.findOneAndUpdate({ _id: params.id}, { $push: { ranchos: data }}, {new: true, runValidators: true})

        })
        .then(newData => res.json(newData))
        .catch(err => res.json(err))
    },

    createGanado({params, body}, res) {
        Rancho.findOneAndUpdate({ _id: params.id}, { $push: {ganado: body }}, { new: true})
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
    },

    getRanchos(req, res) {
        Rancho.find({})
        .populate({ path: 'ranchName'})
        .populate({ path: 'ganado', select: '-__v'})
        .populate({ path: 'owner'})
        .select('-__v')
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No user found'})
            }
            res.status(200).json(data)
        })
        .catch(err => res.json(err))
        
    },

    getSingleRancho({params}, res) {
        Rancho.findOne({ _id: params.id})
        .populate({ path: 'ganado'})
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
    }, 

    deleteRancho({params}, res) {
        Rancho.findOneAndDelete({ id: params.id})
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
    },







}

module.exports = ranchoController;