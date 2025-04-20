import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true,
    trim: true
  },
  seatClass: {
    type: String,
    enum: ['economy', 'business', 'first'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { _id: true });

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: [true, 'Flight number is required'],
    unique: true,
    trim: true
  },
  airline: {
    type: String,
    required: [true, 'Airline name is required'],
    trim: true
  },
  departureCity: {
    type: String,
    required: [true, 'Departure city is required'],
    trim: true
  },
  arrivalCity: {
    type: String,
    required: [true, 'Arrival city is required'],
    trim: true
  },
  departureTime: {
    type: Date,
    required: [true, 'Departure time is required']
  },
  arrivalTime: {
    type: Date,
    required: [true, 'Arrival time is required']
  },
  duration: {
    type: Number, // Duration in minutes
    required: [true, 'Flight duration is required']
  },
  basePrice: {
    type: Number,
    required: [true, 'Base price is required']
  },
  seats: [seatSchema],
  availableSeats: {
    economy: { type: Number, default: 0 },
    business: { type: Number, default: 0 },
    first: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: ['scheduled', 'delayed', 'cancelled', 'completed'],
    default: 'scheduled'
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
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for calculating flight duration in hours and minutes
flightSchema.virtual('durationFormatted').get(function() {
  const hours = Math.floor(this.duration / 60);
  const minutes = this.duration % 60;
  return `${hours}h ${minutes}m`;
});

// Index for searching flights
flightSchema.index({ departureCity: 1, arrivalCity: 1, departureTime: 1 });

// Middleware to update available seats count
flightSchema.pre('save', function(next) {
  // Count available seats by class
  this.availableSeats = this.seats.reduce((acc, seat) => {
    if (seat.isAvailable) {
      acc[seat.seatClass]++;
    }
    return acc;
  }, { economy: 0, business: 0, first: 0 });
  
  next();
});

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;