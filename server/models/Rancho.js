const { Schema, model } = require('mongoose');

const GanadoSchema = new Schema({
    siniiiga: {
        type: Number,
        unique: true,
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
    status: {
        type: String,
        default: 'Comprado'
    },
    createdAt: {
        type: Date
    },
    otros: {
        type: String
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
    ubicacion: {
        type: String,
    },
    ganado: [{
        type: Schema.Types.ObjectId,
        ref: 'Ganado',  
    }],
    gastos: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
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
        if (item.status === 'Comprado') {
            count++
        }
    })
    return count
})

RanchoSchema.virtual('ganadoMuerto').get(function () {
    let count = 0
    this.ganado.map((item) => {
        if (item.status === 'Muerto') {
             count++
        }
    })
    return count
})

const Rancho = model('Rancho', RanchoSchema);


module.exports = {Rancho, Ganado};



