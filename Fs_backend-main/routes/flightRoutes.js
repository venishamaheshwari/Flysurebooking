import express from 'express';
import {
  getFlights,
  getFlight,
  createFlight,
  updateFlight,
  deleteFlight,
  getFlightSeats
} from '../controllers/flightController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { flightValidator } from '../middleware/validators.js';

const router = express.Router();

// Public routes
router.get('/', getFlights);
router.get('/:id', getFlight);
router.get('/:id/seats', getFlightSeats);

// Admin routes
router.post('/', protect, authorize('admin'), flightValidator, createFlight);
router.put('/:id', protect, authorize('admin'), flightValidator, updateFlight);
router.delete('/:id', protect, authorize('admin'), deleteFlight);

export default router;