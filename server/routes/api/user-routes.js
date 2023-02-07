const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

const {
    createRancho
} = require('../../controllers/rancho-controller')

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getSingleUser)
    .post(createRancho)
    .put(updateUser)
    .delete(deleteUser);





module.exports = router