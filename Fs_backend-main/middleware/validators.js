import { body } from 'express-validator';

// User registration validation
export const registerValidator = [
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage('Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'),
  
  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\+?[0-9]{10,15}$/)
    .withMessage('Please enter a valid phone number')
];

// Login validation
export const loginValidator = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Flight creation validation
export const flightValidator = [
  body('flightNumber')
    .notEmpty()
    .withMessage('Flight number is required')
    .isString()
    .withMessage('Flight number must be a string'),
  
  body('airline')
    .notEmpty()
    .withMessage('Airline name is required')
    .isString()
    .withMessage('Airline name must be a string'),
  
  body('departureCity')
    .notEmpty()
    .withMessage('Departure city is required')
    .isString()
    .withMessage('Departure city must be a string'),
  
  body('arrivalCity')
    .notEmpty()
    .withMessage('Arrival city is required')
    .isString()
    .withMessage('Arrival city must be a string'),
  
  body('departureTime')
    .notEmpty()
    .withMessage('Departure time is required')
    .isISO8601()
    .withMessage('Departure time must be a valid date'),
  
  body('arrivalTime')
    .notEmpty()
    .withMessage('Arrival time is required')
    .isISO8601()
    .withMessage('Arrival time must be a valid date'),
  
  body('basePrice')
    .notEmpty()
    .withMessage('Base price is required')
    .isNumeric()
    .withMessage('Base price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Base price must be a positive number'),
  
  body('seats')
    .isArray()
    .withMessage('Seats must be an array')
];

// Booking validation
export const bookingValidator = [
  body('flightId')
    .notEmpty()
    .withMessage('Flight ID is required')
    .isMongoId()
    .withMessage('Invalid flight ID'),
  
  body('passengers')
    .isArray({ min: 1 })
    .withMessage('At least one passenger is required'),
  
  body('passengers.*.firstName')
    .notEmpty()
    .withMessage('Passenger first name is required')
    .isString()
    .withMessage('Passenger first name must be a string'),
  
  body('passengers.*.lastName')
    .notEmpty()
    .withMessage('Passenger last name is required')
    .isString()
    .withMessage('Passenger last name must be a string'),
  
  body('passengers.*.gender')
    .notEmpty()
    .withMessage('Passenger gender is required')
    .isIn(['male', 'female', 'other'])
    .withMessage('Invalid gender value'),
  
  body('passengers.*.dateOfBirth')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Date of birth must be a valid date'),
  
  body('passengers.*.seatNumber')
    .notEmpty()
    .withMessage('Seat number is required')
    .isString()
    .withMessage('Seat number must be a string'),
  
  body('passengers.*.seatClass')
    .notEmpty()
    .withMessage('Seat class is required')
    .isIn(['economy', 'business', 'first'])
    .withMessage('Invalid seat class'),
  
  body('contactEmail')
    .notEmpty()
    .withMessage('Contact email is required')
    .isEmail()
    .withMessage('Please enter a valid email'),
  
  body('contactPhone')
    .notEmpty()
    .withMessage('Contact phone is required')
    .matches(/^\+?[0-9]{10,15}$/)
    .withMessage('Please enter a valid phone number')
];

// Payment intent validation
export const paymentIntentValidator = [
  body('bookingId')
    .notEmpty()
    .withMessage('Booking ID is required')
    .isMongoId()
    .withMessage('Invalid booking ID')
];