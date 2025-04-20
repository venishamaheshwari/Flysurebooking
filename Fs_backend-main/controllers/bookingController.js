import { validationResult } from 'express-validator';
import Booking from '../models/bookingModel.js';
import Flight from '../models/flightModel.js';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { sendBookingConfirmationEmail } from '../utils/email.js';

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = catchAsync(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation error', 400, errors.array()));
  }

  const { flightId, passengers, contactEmail, contactPhone } = req.body;

  // Check if flight exists
  const flight = await Flight.findById(flightId);
  if (!flight) {
    return next(new AppError('Flight not found', 404));
  }

  // Check seat availability for all passengers
  const seatNumbers = passengers.map(passenger => passenger.seatNumber);
  
  // Find seats in the flight
  const unavailableSeats = flight.seats.filter(
    seat => seatNumbers.includes(seat.seatNumber) && !seat.isAvailable
  );
  
  if (unavailableSeats.length > 0) {
    return next(
      new AppError(
        `Seats ${unavailableSeats.map(s => s.seatNumber).join(', ')} are not available`,
        400
      )
    );
  }

  // Calculate total amount
  let totalAmount = 0;
  for (const passenger of passengers) {
    const seat = flight.seats.find(s => s.seatNumber === passenger.seatNumber);
    if (seat) {
      totalAmount += seat.price;
    }
  }

  // Create booking
  const booking = await Booking.create({
    user: req.user.id,
    flight: flightId,
    passengers,
    totalAmount,
    contactEmail,
    contactPhone
  });

  // Update seat availability
  for (const seatNumber of seatNumbers) {
    await Flight.updateOne(
      { _id: flightId, 'seats.seatNumber': seatNumber },
      { $set: { 'seats.$.isAvailable': false } }
    );
  }

  // Fetch the complete booking with populated data
  const completeBooking = await Booking.findById(booking._id)
    .populate('flight')
    .populate('user');

  // Send booking confirmation email
  try {
    await sendBookingConfirmationEmail(completeBooking);
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
  }

  res.status(201).json({
    status: 'success',
    data: {
      booking: completeBooking
    }
  });
});

// @desc    Get all bookings for the logged-in user
// @route   GET /api/bookings
// @access  Private
export const getMyBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate('flight')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings
    }
  });
});

// @desc    Get a single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate('flight')
    .populate('user');

  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  // Check if the booking belongs to the logged-in user or user is admin
  if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to access this booking', 403));
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking
    }
  });
});

// @desc    Cancel a booking
// @route   PATCH /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  // Check if the booking belongs to the logged-in user or user is admin
  if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to cancel this booking', 403));
  }

  // Check if booking is already cancelled
  if (booking.status === 'cancelled') {
    return next(new AppError('Booking is already cancelled', 400));
  }

  // Update booking status
  booking.status = 'cancelled';
  await booking.save();

  // Release seats
  const flight = await Flight.findById(booking.flight);
  if (flight) {
    for (const passenger of booking.passengers) {
      await Flight.updateOne(
        { _id: booking.flight, 'seats.seatNumber': passenger.seatNumber },
        { $set: { 'seats.$.isAvailable': true } }
      );
    }
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking
    }
  });
});

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings/admin
// @access  Private/Admin
export const getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find()
    .populate('flight')
    .populate('user')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings
    }
  });
});