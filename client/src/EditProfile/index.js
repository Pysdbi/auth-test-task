import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserByToken } from "../services/user-by-token";

function EditProfile({onChangeUser}) {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        profilePicture: null
    });
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const usr = await getUserByToken();
                if (usr) {
                    setUser(usr);
                    setFormData({
                        name: usr.name,
                        password: '',
                        profilePicture: usr.profilePicture
                    });
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (field) => (e) => {
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== '' && formData[key] !== user[key]) {
                data.append(key, formData[key]);
            }
        });

        if (data.has('name') || data.has('password') || data.has('profilePicture')) {
            try {
                await axios.post('http://localhost:5000/api/profile/update', data, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setFormData({
                    name: formData.name,
                    password: '',
                    profilePicture: null
                });
                onChangeUser();
            } catch (error) {
                console.error('Error updating profile:', error.response?.data);
            }
        } else {
            console.log('No changes detected, nothing to update.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="max-w-md w-full bg-white rounded p-6 space-y-4 shadow-lg">
                <h2 className="text-center text-2xl font-bold">Edit Profile</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="block font-medium">{user?.email}</div>
                </div>
                <form className="mt-8 space-y-4" autoComplete="off" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange('name')} placeholder="Update name"
                               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange('password')} placeholder="New password"
                               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                        <input type="file" name="profilePicture" onChange={handleChange('profilePicture')}
                               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <button type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
