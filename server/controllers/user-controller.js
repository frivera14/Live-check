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

    userLogin(req, res) {
        User.findOne({ username: req.body.username})
        .then(async (userData) => {
        
        const user = await User.findOne(userData)
        if (!user) {
            return res.status(400).json({ message: 'no user'})
        }

        const correctPw = await user.isCorrectPassword(req.body.password)

        if (!correctPw) {
            return res.status(401).json({ message: 'Incorrect password'})
        }
        return res.status(200).json({ message: 'Logged in!'})

        })
        .catch(err => res.json(err))
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