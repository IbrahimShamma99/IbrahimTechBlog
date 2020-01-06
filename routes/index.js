var router = require('express').Router();

router.use('/api', require('./api/users'));
router.use('/api', require('./api/articles'));

module.exports = router;