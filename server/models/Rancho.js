const { Schema, model, Types } = require('mongoose');

const GanadoSchema = new Schema({
    ganadoId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    siniiiga: {
        type: Number,
        required: true,
    },
    etapa: {
        type: String, 
        required: true
    },
    guia: {
        type: String, 
        required: true
    },
    remo: {
        type: Number, 
        required: true
    },
    origen: {
        type: String,
        required: true,
    },
    propietario: {
        type: String,
        required: true
    },
    consignado: {
        type: String,
        required: true
    },
    observacion: {
        type: String,
        required: true
    },
    comprado: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const SalidaSchema = new Schema({
    salidaId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    vencimiento: {
        type: String,
        required: true
    },
    siniiiga: {
        type: Number,
        required: true
    },
    etapa: {
        type: String,
        required: true
    },
    guia: {
        type: String, 
        required: true
    },
    reemo: {
        type: Number,
        required: true
    },
    psgdestino: {
        type: String,
        required: true
    },
    consignatario: {
        type: String,
        requierd: true
    },
    propietario: {
        type: String,
        required: true
    }
});

const RanchoSchema = new Schema({
    ranchName: {
        type: String,
        trim: true,
        required: true
    },
    ganado: [GanadoSchema],
    salidas: [SalidaSchema],
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

module.exports = Rancho;



