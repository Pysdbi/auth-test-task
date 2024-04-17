import axios from 'axios';

export async function getUserByToken() {
    try {
        const response = await axios.get('http://localhost:5000/api/profile/me', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response?.data?.user
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    }
};