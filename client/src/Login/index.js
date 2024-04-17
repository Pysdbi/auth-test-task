import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login({onChangeUser}) {
    localStorage.removeItem('token');
    onChangeUser();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            navigate('/people');
            onChangeUser()
        } catch (error) {
            alert('Login error:' + error.response.data.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="max-w-md w-full bg-white rounded p-6 space-y-4 shadow-lg">
                <h2 className="text-center text-2xl font-bold">Login</h2>
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                               placeholder="Email"
                               className="w-full px-3 py-2 border border-gray-300 rounded" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange}
                               placeholder="Password"
                               className="w-full px-3 py-2 border border-gray-300 rounded" />
                    </div>
                    <button type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
                </form>
                <p className="text-center">Don't have an account? <Link to="/register"
                                                                        className="text-blue-600 hover:text-blue-700">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
