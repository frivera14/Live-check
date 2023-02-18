const router = require('express').Router();

const {
    getRanchos,
    getSingleRancho,
    deleteRancho,
    createGanado,
    updateGanado,
    deleteGanado,

} = require('../../controllers/rancho-controller');

const {
    createTransaction, updateTransaction, deleteTransaction
} = require('../../controllers/gasto-controller')

router.route('/').get(getRanchos);


router.route('/:id')
    .get(getSingleRancho)
    .post(createGanado)
    .put(updateGanado)
    .delete(deleteRancho);

router.route('/:id/gastos')
    .post(createTransaction)
    .put(updateTransaction)
    .delete(deleteTransaction)

router.route('/:ranchoId/ganado/:ganadoId').put(deleteGanado);



module.exports = router;