const router = require('express').Router();
const { checkToken } = require('../controllers/token');

router.get('/check', checkToken);

module.exports = router;
