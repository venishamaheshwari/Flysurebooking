import { validationResult } from 'express-validator';
import Flight from '../models/flightModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// @desc    Get all flights with filtering
// @route   GET /api/flights
// @access  Public
export const getFlights = catchAsync(async (req, res, next) => {
  const {
    departureCity,
    arrivalCity,
    departureDate,
    returnDate,
    passengers = 1,
    seatClass = 'economy'
  } = req.query;

  // Build query
  const query = {};

  // Add filters if provided
  if (departureCity) query.departureCity = departureCity;
  if (arrivalCity) query.arrivalCity = arrivalCity;
  
  // Filter by departure date if provided
  if (departureDate) {
    const startDate = new Date(departureDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(departureDate);
    endDate.setHours(23, 59, 59, 999);
    
    query.departureTime = {
      $gte: startDate,
      $lte: endDate
    };
  }

  // Filter for available seats
  const seatClassKey = `availableSeats.${seatClass}`;
  query[seatClassKey] = { $gte: parseInt(passengers, 10) };

  // Execute query
  const flights = await Flight.find(query).sort('departureTime');

  // Return flights
  res.status(200).json({
    status: 'success',
    results: flights.length,
    data: {
      flights
    }
  });
});

// @desc    Get a single flight
// @route   GET /api/flights/:id
// @access  Public
export const getFlight = catchAsync(async (req, res, next) => {
  const flight = await Flight.findById(req.params.id);

  if (!flight) {
    return next(new AppError('Flight not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      flight
    }
  });
});

// @desc    Create a new flight (Admin only)
// @route   POST /api/flights
// @access  Private/Admin
export const createFlight = catchAsync(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation error', 400, errors.array()));
  }

  // Create flight
  const flight = await Flight.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      flight
    }
  });
});

// @desc    Update a flight (Admin only)
// @route   PUT /api/flights/:id
// @access  Private/Admin
export const updateFlight = catchAsync(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation error', 400, errors.array()));
  }

  // Find and update flight
  const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!flight) {
    return next(new AppError('Flight not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      flight
    }
  });
});

// @desc    Delete a flight (Admin only)
// @route   DELETE /api/flights/:id
// @access  Private/Admin
export const deleteFlight = catchAsync(async (req, res, next) => {
  const flight = await Flight.findByIdAndDelete(req.params.id);

  if (!flight) {
    return next(new AppError('Flight not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// @desc    Get available seats for a flight
// @route   GET /api/flights/:id/seats
// @access  Public
export const getFlightSeats = catchAsync(async (req, res, next) => {
  const flight = await Flight.findById(req.params.id);

  if (!flight) {
    return next(new AppError('Flight not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      seats: flight.seats
    }
  });
});