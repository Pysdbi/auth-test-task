import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import EditProfile from './EditProfile';
import UserList from './UserList';
import {getUserByToken} from "./services/user-by-token";
import UserProfile from "./UserProfile";

function App() {
    const [user, setUser] = useState();

    const fetchUserProfile = async () => {
        try {
            const r = await getUserByToken()
            if (r) setUser(r)
            else {setUser(null)}
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <Router>
            <div>
                <div className="flex justify-between items-center px-4 py-2 shadow">
                    <h1 className="text-lg font-medium">Auth Test Task</h1>
                    {user && localStorage.getItem('token') ?
                        <div className="flex items-center gap-3">
                            <UserProfile user={user}/>

                            <Link to="/people" className="text-blue-600 hover:text-blue-700 rounded bg-blue-50 px-4 py-2 hover:shadow transition-shadow">Пользователи</Link>
                            <Link to="/account" className="text-blue-600 hover:text-blue-700 rounded bg-blue-50 px-4 py-2 hover:shadow transition-shadow">Профиль</Link>
                            <a href="/" className="text-red-600 hover:text-red-700 rounded bg-red-100 px-4 py-2 hover:shadow transition-shadow">Выйти</a>
                        </div>
                        : ''
                    }
                </div>
                <Routes>
                    <Route path="/" element={<Login onChangeUser={fetchUserProfile}/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/account" element={<EditProfile onChangeUser={fetchUserProfile}/>}/>
                    <Route path="/people" element={<UserList/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
