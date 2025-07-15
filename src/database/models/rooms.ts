import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  roomName: { type: String, required: true },
  bedType: { type: String, required: true },
  roomFloor: { type: String, required: true },
  facilities: [{ type: String }], 
  rate: { type: Number, required: true },
  roomImage: { type: String, required: true },
  roomStatus: { type: String, required: true },
  description: { type: String, required: true }
});

const Room = mongoose.model('Room', roomSchema);
export default Room;