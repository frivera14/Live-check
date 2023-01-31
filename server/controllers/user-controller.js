const { User } = require('../models')

const userController = {
    createUser( { body }, res) {
        User.create(body)
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err))
    },

    getAllUsers( req, res) {
        User.find({})
        .populate({ path: 'ranchos', select: '-__v'})
        .select('-__v')
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err))
    },

    getSingleUser({ params }, res) {
        User.findOne({ _id: params.id })
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err))
    },


    updateUser( { params, body}, res) {
        User.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
        .then(data => {
            if(!data) {
                res.status(400).json({ message: 'No hay usuario'})
            }
            res.json(data)
        })
        .catch(err => res.status(400).json(err))
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },
}

module.exports = userController;