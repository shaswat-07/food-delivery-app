# Food Delivery App

A full-stack food ordering application built with **React, Express.js, MongoDB, and Tailwind CSS**.

This project was built for learning and portfolio purposes and demonstrates authentication, cart management, order placement, and a responsive user interface.

---

## Features

### Authentication

* User Signup & Login
* Google OAuth Login
* JWT Authentication
* Refresh Token mechanism
* Protected Routes

### Security

* Password Hashing with bcrypt
* CSRF Protection
* CORS Configuration
* HTTP-only Refresh Token Cookies

### Food Ordering

* Browse Restaurants
* View Restaurant Menus
* Search Food Items
* Veg / Non-Veg Filtering
* Single Restaurant Cart Restriction
* Add and Update Cart Items
* Order Placement
* Order History

### User Profile

* Profile Page
* Address Management
* Logout Functionality

### UI

* Responsive Design for Mobile, Tablet and Desktop
* Built using Tailwind CSS
* Minimal Dark Theme

---

## 🛠 Tech Stack

### Frontend

* React
* React Router DOM
* Tailwind CSS
* Axios
* Google OAuth

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcrypt

---

## Project Structure

```text
food/
│
├── frontend/
│
├── backend/
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/shaswat-07/food-delivery-app.git
cd food-delivery-app
```

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the backend folder and add:

```env
MONGO_URI=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Frontend environment variables can be added later if required.

---

## Seed Data

This repository contains a `seed.js` file used for inserting sample restaurants and food items.

**The seed data included in this repository has already been uploaded to the database used during development.**

If you want to:

* add more restaurants,
* modify menu items,
* replace existing sample data,

you can update the data inside `seed.js` and run the seed script again.

---

## Future Improvements

* Payment Gateway Integration
* Live Order Tracking
* Restaurant Categories
* Ratings & Reviews
* Notifications
* Admin Dashboard

---

## Live Demo

https://food-delivery-app-sandy-tau-21.vercel.app

## Author

**Shaswat Pathak**
