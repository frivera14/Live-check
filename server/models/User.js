const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')


const UserSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String, 
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

UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next();
})

UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const User = model('User', UserSchema)



module.exports =  User ;
