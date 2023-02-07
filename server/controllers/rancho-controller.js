const { Rancho, Ganado }  = require('../models/Rancho');
const { User } = require('../models');


const ranchoController = {

    createRancho({ params, body }, res) {
        Rancho.create(body)
        .then((data) => {
            return User.findOneAndUpdate({ _id: params.id}, { $push: { ranchos: data }}, {new: true, runValidators: true})

        })
        .then(newData => res.status(200).json(newData))
        .catch(err => res.json(err))
    },

    createGanado({params, body}, res) {
        Ganado.create(body)
        .then((data) => {
            return Rancho.findOneAndUpdate({ _id: params.id}, { $push: {ganado: data }}, { new: true, runValidators: true})
        })
        .then(newData => res.status(200).json(newData))
        .catch(err => res.status(500).json(err))
    },

    updateGanado({body}, res) {
        Ganado.findOneAndUpdate({_id: body._id }, body, { new: true, runValidators: true })
        .then((data) => res.status(200).json(data))
        .catch(err => res.json(err))
    },
    
    deleteGanado({params}, res) {
        Rancho.findByIdAndUpdate({ _id: params.ranchoId}, {$pull: { ganado: { ganadoId: params.ganadoId}}}, {new: true, runValidators: true})
        .then(data => res.json(data))
        .then((update) => {
            return Rancho.findByIdAndUpdate({ _id: params.ranchoId}, {$push: {salidas: update}}, {new: true, runValidators: true})
        })
        .then(newData => res.json(data))
        .catch(err => res.status(500).json(err))
    },
    

    getRanchos(req, res) {
        Rancho.find({})
        .populate({ path: 'ranchName'})
        .populate({ path: 'ganado'})
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
        Rancho.findOneAndDelete({ id: params.id}, {new: true})
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
    }

}

module.exports = ranchoController;