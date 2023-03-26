const router = require('express').Router()

const { searchResultController } = require('../controllers/searchController');
const { passportAuthentication } = require('../middleware/authentication');

router.get('/term/:searchterm', passportAuthentication, searchResultController);

module.exports= router;