import express from 'express';
import {
  createPaymentIntent,
  stripeWebhook,
  getPaymentStatus
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { paymentIntentValidator } from '../middleware/validators.js';

const router = express.Router();

// Stripe webhook route - should be raw body
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

// Protected routes
router.post('/create-payment-intent', protect, paymentIntentValidator, createPaymentIntent);
router.get('/:id', protect, getPaymentStatus);

export default router;