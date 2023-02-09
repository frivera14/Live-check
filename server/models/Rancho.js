const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const GanadoSchema = new Schema({
    siniiiga: {
        type: String,
        unique: true
    },
    etapa: {
        type: String, 
    },
    guia: {
        type: String, 
    },
    remo: {
        type: String, 
    },
    origen: {
        type: String,
    },
    propietario: {
        type: String,
    },
    consignado: {
        type: String,
    },
    observacion: {
        type: String,
    },
    comprado: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdVal) => dateFormat(createdVal)
    }
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

const Ganado = model('Ganado', GanadoSchema)

const RanchoSchema = new Schema({
    ranchName: {
        type: String,
        trim: true,
        required: true
    },
    ganado: [{
        type: Schema.Types.ObjectId,
        ref: 'Ganado',
        
    }],
    alimento: {
        type: Number,
        required: true
    },
    diesel: {
        type: Number,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
        getters: true
        },
    toObject: {
        virtuals: true
    },
    id: false
});

RanchoSchema.virtual('currentCount').get(function () {
    let count = 0
    this.ganado.map((item) => {
        if (item.comprado) {
           return count++
        }
    })
    return count
}).set(function (v) {
    this.set({v})
})

const Rancho = model('Rancho', RanchoSchema);


module.exports = {Rancho, Ganado};



