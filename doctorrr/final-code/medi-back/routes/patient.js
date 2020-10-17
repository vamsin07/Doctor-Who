const express = require('express');
const router = express.Router();

const { submitPatient } = require('../controllers/patient');
const { requireSignin, isAuth } = require('../controllers/auth');

router.post('/patient', submitPatient, requireSignin, isAuth);

module.exports = router;