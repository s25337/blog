import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY || window.pageYOffset || 0;
            setCollapsed(y > 40);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true } as any);
        return () => window.removeEventListener('scroll', onScroll as any);
    }, []);

    return (
        <header className={`header${collapsed ? ' collapsed' : ''}`}>
            <div className="header-banner">
                <div className="header-content-banners">
                    <div className="header-banner-rect left">
                        <Link to="/" className="header-logo-title-link">
                            <span className="header-logo-link">
                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    className="logo-animate logo-shadow header-logo-img"
                                />
                            </span>
                            <span className="header-title-animate">
                                <h1 className="site-title">Jawna Gdynia</h1>
                            </span>
                        </Link>
                    </div>
                    <div className="header-banner-rect right">
                        <nav className="main-nav">
                            <Link to="/raporty" className="nav-link">Raporty</Link>
                            <div className="dropdown">
                                <button className="nav-link dropdown-toggle">Tabele</button>
                                <div className="dropdown-menu">
                                    <Link to="/post/inwestycje-9-miesiecy-2025" className="dropdown-item">
                                        Inwestycje po 9 miesiącach 2025
                                    </Link>
                                    <Link to="/post/raport-budzetu-2025" className="dropdown-item">
                                        Sprawozdanie z wykonania planu wydatków za III kwartał 2025 r.
                                    </Link>
                                </div>
                            </div>
                            <Link to="/edukacja" className="nav-link">Edukacja</Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;