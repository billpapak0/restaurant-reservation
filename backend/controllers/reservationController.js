const db = require('../config/db');

exports.createReservation = async (req, res) => {
  const { restaurant_id, date, time, people_count } = req.body;
  const user_id = req.user.userId; // from JWT middleware

  if (!restaurant_id || !date || !time || !people_count) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await db.query(
      'INSERT INTO reservations (user_id, restaurant_id, date, time, people_count) VALUES (?, ?, ?, ?, ?)',
      [user_id, restaurant_id, date, time, people_count]
    );
    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//gets reservations
exports.getUserReservations = async (req, res) => {
  const user_id = req.user.userId;

  try {
    const [reservations] = await db.query(
      `SELECT r.reservation_id, r.date, r.time, r.people_count,
              rest.name AS restaurant_name, rest.location
       FROM reservations r
       JOIN restaurants rest ON r.restaurant_id = rest.restaurant_id
       WHERE r.user_id = ?
       ORDER BY r.date, r.time`,
      [user_id]
    );

    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteReservation = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.userId;

  console.log('Attempting to delete reservation:', id, 'for user:', user_id);

  try {
    const [result] = await db.query(
      'DELETE FROM reservations WHERE reservation_id = ? AND user_id = ?',
      [parseInt(id), user_id]
    );

    if (result.affectedRows === 0) {
      console.log('Nothing deleted. Query matched 0 rows.');
      return res.status(404).json({ message: 'Reservation not found or not authorized' });
    }

    res.json({ message: 'Reservation cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

