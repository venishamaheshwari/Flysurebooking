import mongoose from 'mongoose';

const passengerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  seatNumber: {
    type: String,
    required: true
  },
  seatClass: {
    type: String,
    enum: ['economy', 'business', 'first'],
    required: true
  }
}, { _id: true });

const bookingSchema = new mongoose.Schema({
  bookingNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true
  },
  passengers: [passengerSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  contactEmail: {
    type: String,
    required: true,
    trim: true
  },
  contactPhone: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create a compound index to efficiently query user bookings
bookingSchema.index({ user: 1, createdAt: -1 });

// Generate a unique booking number
bookingSchema.pre('save', async function(next) {
  if (this.isNew) {
    // Generate a booking number: FLY + current year + random 6 digits
    const year = new Date().getFullYear().toString().slice(2);
    const random = Math.floor(100000 + Math.random() * 900000);
    this.bookingNumber = `FLY${year}${random}`;
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;