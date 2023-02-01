const { Schema, model, Types } = require('mongoose');

const GanadoSchema = new Schema({
    ganadoId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    tipo: {
        type: String, 
        required: true
    },
    arete: {
        type: String, 
        required: true
    },
    sexo: {
        type: String, 
        required: true
    },
    propietario: {
        type: String,
        required: true
    },
    comprado: {
        type: Boolean,
        default: true
    }
});

const RanchoSchema = new Schema({
    ranchName: {
        type: String,
        trim: true,
        required: true
    },
    ganado: [GanadoSchema],
    alimento: {
        type: Number,
        required: true
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
    id: false
});

const Rancho = model('Rancho', RanchoSchema);

module.exports = Rancho, GanadoSchema;



