import React from 'react';

function UserProfile({user}) {
    return (
        <div className="flex items-center gap-2">
            <span className="font-medium">{user?.name}</span>
            <span className="text-gray-400">{user?.email}</span>
            <div>
                <img className="h-10 w-10 rounded-full object-cover" src={`http://localhost:5000/${user?.profilePicture}`}
                     alt="Profile"
                     onError={(e) => {
                         e.target.onerror = null;
                         e.target.src = 'https://via.placeholder.com/150';
                     }}/>
            </div>
        </div>
    );
}

export default UserProfile;
