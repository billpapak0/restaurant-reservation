# restaurant-reservation-app

A full-stack application that allows users to register, log in, view restaurants, and make or cancel reservations.

## Technologies Used

- **Frontend**: React Native with Expo (supports web and mobile)
- **Backend**: Node.js with Express and MySQL
- **Auth**: JWT token-based authentication

---

### 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MySQL](https://www.mysql.com/) or [XAMPP](https://www.apachefriends.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`) for frontend


####  Backend Setup

1. **Install dependencies**:
cd backend
npm install

2. **Configure Environment**:
Configure environment:

Create a .env file in /backend and add:
DB_USER=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_secret_key
PORT=5000

3. Setup the database
Open XAMPP and start Apache & MySQL.

Import the schema.sql file found in the backend/ folder into phpMyAdmin.

This will create: users, restaurants, and reservations tables


4. Run the server:
node server.js

##### Frontend Setup
1. **Install dependencies**:
cd frontend-app
npm install

2. **Start the app**:
npx expo start

###### Project Structure:
<pre> ``` restaurant-reservation/ ├── backend/ # Express + MySQL backend │ ├── controllers/ # Route handlers and business logic │ ├── routes/ # Express route definitions │ ├── config/ # DB and environment configuration │ ├── server.js # Entry point for the backend server │ └── schema.sql # SQL file to create DB tables │ ├── frontend-app/ # React Native + Expo frontend │ ├── app/ # App screens and navigation │ ├── components/ # Reusable UI components │ ├── lib/ # Utility functions, API calls, etc. │ └── assets/ # Images, fonts, and other static resources │ └── README.md # Project overview and setup instructions ``` </pre>

###### Notes:
Make sure MySQL is running (e.g., via XAMPP).

Tested on latest Node.js LTS and MySQL 8+.

You can reset the DB by rerunning schema.sql.