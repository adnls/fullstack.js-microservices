import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header.js';

const Home = ({ user }) => {
    return (
        <div>
            <Header/>
            <h1>Home view</h1>
            <Link to='/private'>
                <button>Private page</button>
            </Link>
        </div>
    );
}

export default Home;