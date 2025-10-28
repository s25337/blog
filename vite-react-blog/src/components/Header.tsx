import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    // Swap logic extracted to a child component to keep hooks valid
    return (
        <header className="header">
            <div className="header-banner">
                <div className="header-content-banners">
                    <div className="header-banner-rect left">
                        <HeaderSwapLink />
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
                                        Raport budżetu 2025
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

// Child component handling the hover swap animation between logo and title
const HeaderSwapLink: React.FC = () => {
    const gapPx = 4; // keep in sync with CSS gap
    const linkRef = useRef<HTMLAnchorElement | null>(null);
    const logoRef = useRef<HTMLSpanElement | null>(null);
    const titleRef = useRef<HTMLSpanElement | null>(null);
    const [swap, setSwap] = useState(false);

    const updateSwapMetrics = () => {
        const logoEl = logoRef.current;
        const titleEl = titleRef.current;
        const linkEl = linkRef.current;
        if (!logoEl || !titleEl || !linkEl) return;
        let logoW = logoEl.getBoundingClientRect().width || (logoEl as HTMLElement).offsetWidth || 0;
        let titleW = titleEl.getBoundingClientRect().width || (titleEl as HTMLElement).offsetWidth || 0;
        linkEl.style.setProperty('--swap-logo', `${titleW + gapPx}px`);
        linkEl.style.setProperty('--swap-title', `${logoW + gapPx}px`);
    linkEl.style.setProperty('--swap-buffer', `2px`);
    };

    useEffect(() => {
        updateSwapMetrics();
        // Observe size changes to keep metrics in sync
        const ro = ('ResizeObserver' in window)
            ? new ResizeObserver(() => updateSwapMetrics())
            : null;
        if (ro) {
            if (logoRef.current) ro.observe(logoRef.current);
            if (titleRef.current) ro.observe(titleRef.current);
        }
        const onResize = () => updateSwapMetrics();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Link
            to="/"
            ref={linkRef}
            className={`header-logo-title-link${swap ? ' swap' : ''}`}
            onMouseEnter={() => {
                updateSwapMetrics();
                setSwap(true);
            }}
            onMouseLeave={() => setSwap(false)}
        >
            <span className="header-logo-link" ref={logoRef}>
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="logo-animate logo-shadow"
                    style={{ height: '72px', width: 'auto' }}
                    onLoad={updateSwapMetrics}
                />
            </span>
            <span className="header-title-animate" ref={titleRef}>
                <h1 className="site-title">Jawna Gdynia</h1>
            </span>
        </Link>
    );
};