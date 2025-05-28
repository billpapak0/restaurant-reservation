-- Create the database
CREATE DATABASE IF NOT EXISTS restaurant_app;
USE restaurant_app;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Create restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  description TEXT
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  reservation_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  people_count INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);

-- Optional: Insert sample restaurant data
INSERT INTO restaurants (name, location, description) VALUES
('Taverna Giannis', 'Athens', 'Authentic Greek cuisine'),
('El Greco', 'Thessaloniki', 'Seafood and traditional dishes'),
('Mediterraneo', 'Crete', 'Modern Mediterranean fusion');
