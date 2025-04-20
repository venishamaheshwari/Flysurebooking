<<<<<<< HEAD
# Flysurebooking - Flight Booking System

A comprehensive flight booking system built with Node.js, Express, and MongoDB.

## Features

- User registration and authentication
- Flight search and filtering
- Interactive seat selection
- Secure booking system
- Payment processing with Stripe
- Email notifications
- Admin panel for flight management

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment**: Stripe
- **Email**: Nodemailer

## Project Structure

```
├── config/             # Database and app configuration
├── controllers/        # Request handlers
├── middleware/         # Authentication and validation middleware
├── models/             # MongoDB schemas
├── routes/             # API routes
├── utils/              # Utility functions
├── .env.example        # Environment variables example
├── server.js           # Entry point
└── README.md           # Project documentation
```

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `GET /api/auth/me`: Get current user
- `GET /api/auth/logout`: Logout user

### Flights

- `GET /api/flights`: Get all flights with filtering
- `GET /api/flights/:id`: Get a single flight
- `GET /api/flights/:id/seats`: Get available seats for a flight
- `POST /api/flights`: Create a new flight (Admin)
- `PUT /api/flights/:id`: Update a flight (Admin)
- `DELETE /api/flights/:id`: Delete a flight (Admin)

### Bookings

- `POST /api/bookings`: Create a new booking
- `GET /api/bookings`: Get all bookings for the logged-in user
- `GET /api/bookings/:id`: Get a single booking
- `PATCH /api/bookings/:id/cancel`: Cancel a booking
- `GET /api/bookings/admin/all`: Get all bookings (Admin)

### Payments

- `POST /api/payments/create-payment-intent`: Create payment intent
- `POST /api/payments/webhook`: Handle Stripe webhook
- `GET /api/payments/:id`: Get payment status

### Users

- `GET /api/users/profile`: Get user profile
- `PUT /api/users/profile`: Update user profile
- `DELETE /api/users/:id`: Delete user (Admin)

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/RiyaGupta122/Flysurebooking.git
   cd Flysurebooking
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration.

4. Start the server:
   ```
   npm run dev
   ```

## Database Schema

### User
- `_id`: MongoDB ObjectId
- `firstName`: User's first name
- `lastName`: User's last name
- `email`: User's email (unique)
- `password`: Hashed password
- `phoneNumber`: User's phone number
- `role`: User role (user/admin)

### Flight
- `_id`: MongoDB ObjectId
- `flightNumber`: Unique flight identifier
- `airline`: Airline name
- `departureCity`: City of departure
- `arrivalCity`: City of arrival
- `departureTime`: Departure timestamp
- `arrivalTime`: Arrival timestamp
- `duration`: Flight duration in minutes
- `basePrice`: Base ticket price
- `seats`: Array of seat objects
- `status`: Flight status

### Booking
- `_id`: MongoDB ObjectId
- `bookingNumber`: Unique booking identifier
- `user`: Reference to User
- `flight`: Reference to Flight
- `passengers`: Array of passenger objects
- `totalAmount`: Total booking amount
- `paymentStatus`: Status of payment
- `status`: Booking status

### Payment
- `_id`: MongoDB ObjectId
- `booking`: Reference to Booking
- `user`: Reference to User
- `amount`: Payment amount
- `stripePaymentIntentId`: Stripe payment intent ID
- `status`: Payment status

## Security

- Passwords are hashed using bcrypt
- JWT authentication for protected routes
- Input validation using express-validator
- Environment variables for sensitive data
=======
# Fs_backend
Flight booking system
>>>>>>> 7d0a3483fd1b2d697906ca560cd62ee00f67396f
