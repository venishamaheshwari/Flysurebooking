import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send booking confirmation email
export const sendBookingConfirmationEmail = async (booking) => {
  try {
    const transporter = createTransporter();

    // Format passengers info
    const passengersInfo = booking.passengers
      .map((p, index) => {
        return `
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">${index + 1}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${p.firstName} ${p.lastName}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${p.seatNumber}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${p.seatClass.charAt(0).toUpperCase() + p.seatClass.slice(1)}</td>
          </tr>
        `;
      })
      .join('');

    // Format departure and arrival times
    const departureTime = new Date(booking.flight.departureTime).toLocaleString();
    const arrivalTime = new Date(booking.flight.arrivalTime).toLocaleString();

    // Create email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #3b82f6; text-align: center;">Booking Confirmation</h2>
        <p>Dear ${booking.user.firstName},</p>
        <p>Thank you for booking with FlySureBooking. Your booking has been confirmed.</p>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3 style="color: #0f172a; margin-top: 0;">Booking Details</h3>
          <p><strong>Booking Number:</strong> ${booking.bookingNumber}</p>
          <p><strong>Flight Number:</strong> ${booking.flight.flightNumber}</p>
          <p><strong>Airline:</strong> ${booking.flight.airline}</p>
          <p><strong>From:</strong> ${booking.flight.departureCity}</p>
          <p><strong>To:</strong> ${booking.flight.arrivalCity}</p>
          <p><strong>Departure:</strong> ${departureTime}</p>
          <p><strong>Arrival:</strong> ${arrivalTime}</p>
          <p><strong>Total Amount:</strong> $${booking.totalAmount.toFixed(2)}</p>
          <p><strong>Payment Status:</strong> ${booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}</p>
        </div>
        
        <h3 style="color: #0f172a;">Passenger Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">#</th>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Name</th>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Seat</th>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Class</th>
            </tr>
          </thead>
          <tbody>
            ${passengersInfo}
          </tbody>
        </table>
        
        <p>For any queries or assistance, please contact our support team.</p>
        <p>We wish you a pleasant journey!</p>
        <p style="margin-top: 30px; text-align: center; color: #64748b; font-size: 14px;">
          &copy; ${new Date().getFullYear()} FlySureBooking. All rights reserved.
        </p>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: booking.contactEmail,
      subject: `Booking Confirmation - ${booking.bookingNumber}`,
      html: emailContent
    });

    console.log('Booking confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    // Don't throw error to prevent API failure if email fails
  }
};