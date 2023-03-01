const router = require('express').Router();

const {
    getSingleRancho,
    deleteRancho,
    createGanado,
    updateGanado,
    deleteGanado,

} = require('../../controllers/rancho-controller');

const {
    createTransaction, updateTransaction, deleteTransaction
} = require('../../controllers/gasto-controller')




router.route('/:id')
    .get(getSingleRancho)
    .post(createGanado)
    .put(updateGanado)
    .delete(deleteRancho);

router.route('/:id/gastos')
    .post(createTransaction)
    .put(updateTransaction);

router.route('/:ranchoId/gastos/:id').delete(deleteTransaction)

router.route('/:ranchoId/ganado/:ganadoId').delete(deleteGanado);



module.exports = router;