const {Rancho, Ganado} = require('../models/Rancho')
const User = require('../models/User')
const mulaGanado = require('./mulaGanado.json')
const cincoGanado = require('./cincoGanado.json')
const amolesGanado = require('./amolesGanado.json')
const torosGanado = require('./torosGanado.json')
const cumaralGanado = require('./cumaralGanado.json')
const chonteGanado = require('./chonteGanado.json')
const db = require('../config/connection');

db.once('open', async () => {
    await User.deleteMany({});
    await Rancho.deleteMany({});
    await Ganado.deleteMany({});
    const elusuario = await User.create({username: 'ranchos.ricardo1', password: 'elcarricito2023'})
    const lasMulas = await Rancho.create({ranchName: 'La Mula', ubicacion: '', owner: elusuario._id})
    const elCinco = await Rancho.create({ranchName: 'El 5', ubicacion: '', owner: elusuario._id})
    const elChonte = await Rancho.create({ranchName: 'El Chonte', ubicacion: '', owner: elusuario._id})
    const losToros = await Rancho.create({ranchName: 'Los Toros', ubicacion: '', owner: elusuario._id})
    const losAmoles = await Rancho.create({ranchName: 'Los Amoles', ubicacion: '', owner: elusuario._id})
    const elCumaral = await Rancho.create({ranchName: 'El Cumaral', ubicacion: '', owner: elusuario._id})
    const mulaData = await Ganado.create(mulaGanado)
    const cincodata = await Ganado.create(cincoGanado)
    const amolesData = await Ganado.create(amolesGanado)
    const torosData = await Ganado.create(torosGanado)
    const cumaralData = await Ganado.create(cumaralGanado)
    const chonteData = await Ganado.create(chonteGanado)

   await Rancho.findOneAndUpdate({_id: lasMulas._id}, {$push: {ganado: mulaData}}, {new: true, runValidators: true}) 
   await Rancho.findOneAndUpdate({_id: elCinco._id}, {$push: {ganado: cincodata}}, {new: true, runValidators: true}) 
   await Rancho.findOneAndUpdate({_id: losAmoles._id}, {$push: {ganado: amolesData}}, {new: true, runValidators: true}) 
   await Rancho.findOneAndUpdate({_id: losToros._id}, {$push: {ganado: torosData}}, {new: true, runValidators: true}) 
   await Rancho.findOneAndUpdate({_id: elChonte._id}, {$push: {ganado: chonteData}}, {new: true, runValidators: true}) 
   await Rancho.findOneAndUpdate({_id: elCumaral._id}, {$push: {ganado: cumaralData}}, {new: true, runValidators: true}) 
   await User.findOneAndUpdate({_id: elusuario._id}, {$push: {ranchos: [lasMulas, elCinco, elChonte, losAmoles, losToros, elCumaral]}}, {new: true, runValidotrs: true})
   console.log('ALL DONE!')
   console.log(elusuario._id)
    process.exit(0)
});