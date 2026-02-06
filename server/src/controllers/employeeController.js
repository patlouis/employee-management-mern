import EmployeeModel from '../models/employees.js';

// Get all employees
export const getEmployees = (req, res) => {
    EmployeeModel.find({})
        .then(employees => res.json(employees))
        .catch(err => res.status(500).json(err));
};

// Create new employee
export const createEmployee = (req, res) => {
    EmployeeModel.create(req.body)
        .then(employee => res.status(201).json(employee))
        .catch(err => res.status(400).json(err));
};

// Get single employee
export const getEmployeeById = (req, res) => {
    EmployeeModel.findById(req.params.id)
        .then(emp => res.json(emp))
        .catch(err => res.status(404).json(err));
};

// Update employee
export const updateEmployee = (req, res) => {
    EmployeeModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(emp => res.json(emp))
        .catch(err => res.status(400).json(err));
};

// Delete employee
export const deleteEmployee = (req, res) => {
    EmployeeModel.findByIdAndDelete(req.params.id)
        .then(result => res.json({ message: "Deleted successfully", result }))
        .catch(err => res.status(500).json(err));
};
