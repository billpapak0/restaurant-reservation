const express = require('express');
const router = express.Router();
const { createReservation } = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createReservation);

module.exports = router;
