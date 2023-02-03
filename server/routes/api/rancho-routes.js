const router = require('express').Router();

const {
    getRanchos,
    getSingleRancho,
    deleteRancho,
    createGanado,
    createSalida,
    deleteSalida,
    deleteGanado

} = require('../../controllers/rancho-controller');

router.route('/').get(getRanchos);


router.route('/:id')
    .get(getSingleRancho)
    .post(createGanado)
    .put(createSalida)
    .delete(deleteRancho);

router.route('/:ranchoId/ganado/:ganadoId').delete(deleteGanado);

router.route('/:ranchoId/salida/:salidaId').delete(deleteSalida);


module.exports = router;