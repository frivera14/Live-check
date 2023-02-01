const router = require('express').Router();

const {
    getRanchos,
    getSingleRancho,
    createRancho,
    deleteRancho,
    createGanado

} = require('../../controllers/rancho-controller');

router.route('/').get(getRanchos);

router.route('/:id')
    .get(getSingleRancho)
    .post(createGanado)
    .delete(deleteRancho);

module.exports = router;