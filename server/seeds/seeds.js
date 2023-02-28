const {Rancho, Ganado} = require('../models/Rancho')
const User = require('../models/User')
const mulaGanado = require('./mulaGanado.json')
const cincoGanado = require('./cincoGanado.json')
const amolesGanado = require('./amolesGanado.json')
const db = require('../config/connection');

db.once('open', async () => {
    const elusuario = await User.create({username: 'ranchos.ricardo2', password: 'elcarricito2023'})
    const lasMulas = await Rancho.create({ranchName: 'La Mula', ubicacion: ''})
    const elCinco = await Rancho.create({ranchName: 'El 5', ubicacion: ''})
    const losAmoles = await Rancho.create({ranchName: 'Los Amoles', ubicacion: ''})
    const mulaData = await Ganado.create(mulaGanado)
    const cincodata = await Ganado.create(cincoGanado)
    const amolesData = await Ganado.create(amolesGanado)

   await Rancho.findOneAndUpdate({_id: lasMulas._id}, {$push: {ganado: mulaData}}, {new: true, runValidators: true}) 
   await Rancho.findOneAndUpdate({_id: elCinco._id}, {$push: {ganado: cincodata}}, {new: true, runValidators: true}) 
   await Rancho.findOneAndUpdate({_id: losAmoles._id}, {$push: {ganado: amolesData}}, {new: true, runValidators: true}) 
   await User.findOneAndUpdate({_id: elusuario._id}, {$push: {ranchos: [lasMulas, elCinco, losAmoles]}}, {new: true, runValidotrs: true})
   console.log('ALL DONE!')
   console.log(elusuario._id)
    process.exit(0)
});