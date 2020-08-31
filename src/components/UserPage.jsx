import React from 'react';
import Header from './Header';
import User from './User';


function UserPage({user}) {

    return (
        <div>
            <Header />
            <User
                user={user}
             />
        </div>
    )

}

export default UserPage