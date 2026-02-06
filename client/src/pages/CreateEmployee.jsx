import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // 1. Initialize as empty strings so the placeholder is selected
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 2. Simple validation to ensure they didn't leave it on "Select..."
        if (!role || !department) {
            alert("Please select both a Department and a Role.");
            return;
        }
        
        axios.post('http://localhost:3000/api/employees', { 
            name, 
            email, 
            role, 
            department 
        })
        .then(result => {
            console.log("Employee Created:", result.data);
            navigate('/employees');
        })
        .catch(err => {
            console.error(err);
            alert("Error creating employee. Check if the email is unique or if the backend is running.");
        });
    };

    return (
        <div className="p-8 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Employee</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Register a new employee into the system.</p>
                    </div>
                    <button 
                        onClick={() => navigate('/employees')}
                        className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm font-medium transition cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Jane Doe" 
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="jane@email.com" 
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Department</label>
                                <select 
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                    value={department} 
                                    onChange={(e) => setDepartment(e.target.value)}
                                    required
                                >
                                    {/* 3. Add a disabled placeholder option */}
                                    <option value="" disabled>Select Department</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Sales">Sales</option>
                                    <option value="HR">HR</option>
                                    <option value="Finance">Finance</option>
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Role</label>
                                <select 
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                    value={role} 
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    {/* 4. Add a disabled placeholder option */}
                                    <option value="" disabled>Select Role</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-100 dark:shadow-none cursor-pointer"
                            >
                                Create Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployee;
