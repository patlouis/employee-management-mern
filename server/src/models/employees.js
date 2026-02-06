import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'user'], 
    default: 'user' 
  },
  department: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

const EmployeeModel = mongoose.model('Employee', employeeSchema);
export default EmployeeModel;
