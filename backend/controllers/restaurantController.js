const db = require('../config/db');

exports.getRestaurants = async (req, res) => {
  try {
    const [restaurants] = await db.query('SELECT * FROM restaurants');
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
