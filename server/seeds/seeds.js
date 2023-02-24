const {Rancho, Ganado} = require('../models/Rancho')
const User = require('../models/User')
const ganadoData = require('./ganadoData.json')
const db = require('../config/connection');

db.once('open', async () => {
    const elusuario = await User.create({username: 'ranchos.ricardo1', password: 'elcarricito2023'})
    const elrancho = await Rancho.create({ranchName: 'El Rancho', ubicacion: 'Alla'})
    const otroRancho = await Rancho.create({ranchName: 'Otro', ubicacion: 'Esta'})
    const lasvacas = await Ganado.create(ganadoData)
   await Rancho.findOneAndUpdate({_id: elrancho._id}, {$push: {ganado: lasvacas}}, {new: true, runValidators: true})
    await User.findOneAndUpdate({_id: elusuario._id}, {$push: {ranchos: [elrancho, otroRancho]}}, {new: true, runValidotrs: true})
   console.log('ALL DONE!')
   console.log(elusuario._id)
    process.exit(0)
});