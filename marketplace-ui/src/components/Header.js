import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
    <header className="header">
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/listings">Listings</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </nav>
    </header>
);

export default Header;
