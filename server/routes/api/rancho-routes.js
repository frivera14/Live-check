const router = require('express').Router();

const {
    getRanchos,
    getSingleRancho,
    deleteRancho,
    createGanado,
    deleteGanado

} = require('../../controllers/rancho-controller');

router.route('/').get(getRanchos);


router.route('/:id')
    .get(getSingleRancho)
    .post(createGanado)
    .delete(deleteRancho);

router.route('/:ranchoId/ganado/:ganadoId').delete(deleteGanado)

module.exports = router;