import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema({
    personNumber: { type: String },
    personName: { type: String, required: true },
    personImage: { type: String },
    specialRequest:
    {
        text: { type: String },
        status: { type: Boolean }
    }
});

const Guest = mongoose.model('Guest', guestSchema);
export default Guest;