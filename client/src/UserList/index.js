import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/people', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error.response.data);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="px-3 mt-6 flex justify-center">
            <table className="min-w-full table-auto shadow-lg bg-white">
                <thead className="bg-gray-200">
                <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Email
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Age
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Profile Picture
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {users.length ? users.map(user => (
                        <tr key={user._id}>
                            <td className="px-6 py-4 border-b border-gray-300 text-sm">
                                {user.name}
                            </td>
                            <td className="px-6 py-4 border-b border-gray-300 text-sm">
                                {user.email}
                            </td>
                            <td className="px-6 py-4 border-b border-gray-300 text-sm">
                                {calculateAge(user.birthdate)} years old
                            </td>
                            <td className="px-6 py-4 border-b border-gray-300 text-sm">
                                <img className="h-20 w-20 rounded-full object-cover" src={`http://localhost:5000/${user.profilePicture}`}
                                     alt="Profile"
                                     onError={(e) => {
                                         e.target.onerror = null;
                                         e.target.src = 'https://via.placeholder.com/150';
                                     }}/>
                            </td>
                        </tr>
                    )) :
                    <tr>
                        <td colSpan="4" className="text-center py-4">No users found</td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    );
}

function calculateAge(birthdate) {
    const birthday = new Date(birthdate);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default UserList;
