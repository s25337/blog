import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="brand">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h1 className="site-title">Jawna Gdynia</h1>
                        <p className="site-subtitle">Portal Otwartych Danych</p>
                    </Link>
                </div>
                <nav className="main-nav">
                    <Link to="/" className="nav-link">Raporty</Link>
                    <div className="dropdown">
                        <button className="nav-link dropdown-toggle">Tabele</button>
                        <div className="dropdown-menu">
                            <Link to="/post/raport-budzetu-2025" className="dropdown-item">
                                Raport budżetu 2025
                            </Link>
                        </div>
                    </div>
                    <Link to="/edukacja" className="nav-link">Edukacja</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;