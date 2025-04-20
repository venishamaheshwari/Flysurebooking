import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBooking,
  cancelBooking,
  getAllBookings
} from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { bookingValidator } from '../middleware/validators.js';

const router = express.Router();

// Protected routes
router.post('/', protect, bookingValidator, createBooking);
router.get('/', protect, getMyBookings);
router.get('/:id', protect, getBooking);
router.patch('/:id/cancel', protect, cancelBooking);

// Admin routes
router.get('/admin/all', protect, authorize('admin'), getAllBookings);

export default router;