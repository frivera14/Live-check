const { Schema, model, Types } = require('mongoose');
const Rancho = require('./Rancho')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true    
    },
    password: {
        type: String, 
        required: true 
    },
    ranchos: [ {
        type: Schema.Types.ObjectId,
        ref: 'Rancho'
    }]
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
});

const User = model('User', UserSchema)



module.exports = User;
