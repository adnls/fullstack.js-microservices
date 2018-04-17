import React from 'react';
import AuthService from '../../services/auth.js'; 
import Header from '../Header.js';

const Profil = () => {
    return (
        <div>
            <Header/>
            <h1>Profil view</h1>
            {AuthService.user.data && JSON.stringify(AuthService.user.data)}
        </div>
    );
}

export default Profil;

