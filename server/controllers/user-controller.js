const  User    = require('../models/User')
const { signToken } = require('../utils/auth')

const userController = {
    createUser({body}, res) {
        console.log(body)
        User.create({body})        
            .then(async (newData) => {
                const user = await User.findOne(newData)
                if (!user) {
                    alert('Error: No user found/Existing User')
                }
                const token = signToken(user)
                res.json({token, user})

            })
            .catch(err => res.status(400).json(err))
    },

    getAllUsers(req, res) {
        User.find({})
            .populate({ path: 'ranchos' })
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err))
    },

    getSingleUser({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ path: 'ranchos' })
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err))
    },

    userLogin({body}, res) {
        User.findOne({ body })
            .then(async (userData) => {
                
                const user = await User.findOne(userData)
                console.log(user)
                if (!user) {
                    return res.status(400).json({ message: 'no user' })
                }
                const correctPw = await user.isCorrectPassword(req.body.password)
                


                if (!correctPw) {
                    return res.status(401).json({ message: 'Incorrect password' })
                }
                const token = signToken(user)

             return res.status(200).json(token)

            })
            .catch(err => res.json(err))
    },


    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(data => {
                if (!data) {
                    res.status(400).json({ message: 'No hay usuario' })
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

    deleteManyUsers(req, res) {
        User.deleteMany({})
        .then(data => res.json(data))
        .catch(err => res.json(err))
    }
}

module.exports = userController;