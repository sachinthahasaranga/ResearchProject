const express = require('express');
const router = express.Router();
const{getAllItems} = require('../controllers/listeningController');

router.get('/', getAllItems);

module.exports = router;

