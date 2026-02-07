import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'user',
        department: 'Engineering'
    });

    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/api/employees/${id}`)
            .then(res => {
                const data = {
                    name: res.data.name || '',
                    email: res.data.email || '',
                    role: res.data.role || 'user',
                    department: res.data.department || 'Engineering'
                };
                setFormData(data);
                setDisplayName(res.data.name);
            })
            .catch(err => console.error("Error fetching employee:", err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${API_URL}/api/employees/${id}`, formData)
            .then(() => {
                navigate('/employees');
            })
            .catch(err => {
                console.error(err);
                alert("Error updating employee.");
            });
    };

    return (
        <div className="p-8 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Employee</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Update employee details for <span className="font-semibold text-indigo-600 dark:text-indigo-400">{displayName}</span></p>
                    </div>
                    <button 
                        onClick={() => navigate('/employees')} 
                        className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition cursor-pointer"
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
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                value={formData.email} 
                                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                required
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Department</label>
                                <select 
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition cursor-pointer"
                                    value={formData.department} 
                                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                                >
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
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition cursor-pointer"
                                    value={formData.role} 
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-100 dark:shadow-none cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditEmployee;
