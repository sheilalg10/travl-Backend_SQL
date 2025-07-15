import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest',
        required: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    createDate: { type: Date, required: true },
    updateDate: { type: Date, required: true },
    deleteDate: { type: Date, default: null },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    status: { type: String, required: true }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;