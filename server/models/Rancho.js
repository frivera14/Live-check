const { Schema, model, Types } = require('mongoose');

const GanadoSchema = new Schema({
    ganadoId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
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
    }
});

const RanchoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ganado: [GanadoSchema],
    alimento: {
        type: Number
    }
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

const Rancho = model('Rancho', RanchoSchema);

module.exports = Rancho;



