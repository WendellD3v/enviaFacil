const express = require('express');
const router = express.Router();
const verify = require('../middlewares/verifications');

const {addDoc, getDocs, updateStatus} = require('../models/envio.js')

router.post('/', verify, addDoc)
router.get('/', verify, getDocs)
router.patch('/', verify, updateStatus)

module.exports = router;