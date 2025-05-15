const express = require('express');
const router = express.Router();
const { createReservation, getUserReservations } = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createReservation);
router.get('/user', authMiddleware, getUserReservations);
module.exports = router;
