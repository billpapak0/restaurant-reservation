const express = require('express');
const router = express.Router();
const { createReservation, getUserReservations, deleteReservation } = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createReservation);
router.get('/user', authMiddleware, getUserReservations);
router.delete('/:id', authMiddleware, deleteReservation);
module.exports = router;
