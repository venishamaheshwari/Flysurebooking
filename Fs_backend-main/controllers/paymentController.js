import Stripe from 'stripe';
import { validationResult } from 'express-validator';
import Booking from '../models/bookingModel.js';
import Payment from '../models/paymentModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
export const createPaymentIntent = catchAsync(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation error', 400, errors.array()));
  }

  const { bookingId } = req.body;

  // Find booking
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  // Check if booking belongs to the logged-in user
  if (booking.user.toString() !== req.user.id) {
    return next(new AppError('Not authorized to make payment for this booking', 403));
  }

  // Check if payment is already completed
  if (booking.paymentStatus === 'completed') {
    return next(new AppError('Payment is already completed for this booking', 400));
  }

  // Create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(booking.totalAmount * 100), // Convert to cents
    currency: 'usd',
    metadata: {
      bookingId: booking._id.toString(),
      userId: req.user.id
    }
  });

  // Save payment details
  const payment = await Payment.create({
    booking: booking._id,
    user: req.user.id,
    amount: booking.totalAmount,
    stripePaymentIntentId: paymentIntent.id,
    stripeClientSecret: paymentIntent.client_secret
  });

  res.status(200).json({
    status: 'success',
    clientSecret: paymentIntent.client_secret,
    data: {
      payment: {
        id: payment._id,
        amount: payment.amount,
        status: payment.status
      }
    }
  });
});

// @desc    Handle Stripe webhook
// @route   POST /api/payments/webhook
// @access  Public
export const stripeWebhook = catchAsync(async (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    await handlePaymentSuccess(event.data.object);
  } else if (event.type === 'payment_intent.payment_failed') {
    await handlePaymentFailure(event.data.object);
  }

  res.status(200).json({ received: true });
});

// Handle payment success
const handlePaymentSuccess = async (paymentIntent) => {
  const { bookingId } = paymentIntent.metadata;

  // Update payment status
  await Payment.findOneAndUpdate(
    { stripePaymentIntentId: paymentIntent.id },
    {
      status: 'succeeded',
      receiptUrl: paymentIntent.charges.data[0]?.receipt_url
    }
  );

  // Update booking payment status
  await Booking.findByIdAndUpdate(bookingId, {
    paymentStatus: 'completed',
    paymentId: paymentIntent.id
  });
};

// Handle payment failure
const handlePaymentFailure = async (paymentIntent) => {
  const { bookingId } = paymentIntent.metadata;

  // Update payment status
  await Payment.findOneAndUpdate(
    { stripePaymentIntentId: paymentIntent.id },
    { status: 'failed' }
  );

  // Update booking payment status
  await Booking.findByIdAndUpdate(bookingId, {
    paymentStatus: 'failed'
  });
};

// @desc    Get payment status
// @route   GET /api/payments/:id
// @access  Private
export const getPaymentStatus = catchAsync(async (req, res, next) => {
  const payment = await Payment.findById(req.params.id);

  if (!payment) {
    return next(new AppError('Payment not found', 404));
  }

  // Check if payment belongs to the logged-in user
  if (payment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to access this payment', 403));
  }

  res.status(200).json({
    status: 'success',
    data: {
      payment: {
        id: payment._id,
        amount: payment.amount,
        status: payment.status,
        receiptUrl: payment.receiptUrl,
        createdAt: payment.createdAt
      }
    }
  });
});