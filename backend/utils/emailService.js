const nodemailer = require('nodemailer');

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS  // Your Gmail app password
    }
});

// Function to send booking confirmation email
const sendBookingConfirmation = async (booking) => {
    const { customerName, email, date, time, numberOfGuests, tableNumber } = booking;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Booking Confirmation - Vintage Coffee',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4a4a4a;">Booking Confirmation</h2>
                <p>Dear ${customerName},</p>
                <p>Thank you for choosing Vintage Coffee. Your table reservation has been confirmed.</p>
                
                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="color: #4a4a4a; margin-top: 0;">Booking Details:</h3>
                    <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> ${time}</p>
                    <p><strong>Number of Guests:</strong> ${numberOfGuests}</p>
                    <p><strong>Table Number:</strong> ${tableNumber}</p>
                </div>

                <p>We look forward to serving you!</p>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 14px;">
                        If you need to modify or cancel your reservation, please contact us at least 2 hours before your booking time.
                    </p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Booking confirmation email sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
        return false;
    }
};

module.exports = {
    sendBookingConfirmation
}; 