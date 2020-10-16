const express = require('express');
const router = express.Router();

const { submitVisitor } = require('../controllers/visitor');

router.post('/visitor', submitVisitor);

module.exports = router;