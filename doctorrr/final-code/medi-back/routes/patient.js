const express = require('express');
const router = express.Router();

const { submitPatient } = require('../controllers/patient');

router.post('/patient', submitPatient);

module.exports = router;