const { Rancho, Ganado }  = require('../models/Rancho');
const User = require('../models/User');


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
        console.log(body)
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
        Ganado.findOneAndDelete({ _id: params.ganadoId}, {new: true})
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
    },

    getSingleRancho({params}, res) {
        Rancho.findOne({ _id: params.id})
        .populate({ path: 'ganado'})
        .populate({ path: 'gastos'})
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