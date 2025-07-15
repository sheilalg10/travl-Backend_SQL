import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  personName: { type: String, required: true },
  personImage: { type: String, required: true },             
  joined: { type: Date, required: true },                    
  jobDesk: [{ type: String, required: true }],              
  schedule: [{ type: String, required: true }],           
  contact: { type: String, required: true },               
  status: { type: String, enum: ['Active', 'Inactive'], required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;