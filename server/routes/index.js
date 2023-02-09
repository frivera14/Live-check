const router = require('express').Router();
const { userLogin, } = require('../controllers/user-controller');
const apiRoutes = require('./api')

router.use('/api', apiRoutes);

router.route('/login').post(userLogin)


router.use((req, res) => {
    res.status(404).send('Error detected')
});

module.exports = router;
