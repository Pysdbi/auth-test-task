import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        birthdate: '',
        gender: '',
        profilePicture: null
    });

    const handleChange = (e) => {
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
        setFormData({...formData, [e.target.name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            await axios.post('http://localhost:5000/api/auth/register', data);
            navigate('/');
        } catch (error) {
            alert('Error registering user:' + error.response.data.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="max-w-md w-full bg-white rounded p-6 space-y-4 shadow-lg">
                <h2 className="text-center text-2xl font-bold">Register</h2>
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name"
                               className="w-full px-3 py-2 border border-gray-300 rounded"/>
                    </div>

                    <div>
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                               placeholder="Email"
                               className="w-full px-3 py-2 border border-gray-300 rounded"/>
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange}
                               placeholder="Password" className="w-full px-3 py-2 border border-gray-300 rounded"/>
                    </div>

                    <div>
                        <label>Birthdate</label>
                        <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange}
                               className="w-full px-3 py-2 border border-gray-300 rounded"/>
                    </div>

                    <div>
                        <label>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label>Profile Picture</label>
                        <input type="file" name="profilePicture" onChange={handleChange}
                               className="w-full px-3 py-2 border border-gray-300 rounded"/>
                    </div>

                    <button type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Register
                    </button>
                </form>
                <p className="text-center">Already have an account? <Link to="/"
                                                                          className="text-blue-600 hover:text-blue-700">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
