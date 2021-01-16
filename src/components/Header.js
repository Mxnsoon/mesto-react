import React from 'react';
import logoPath from '../images/logo.png';

function Header () {
    return (
        <header className="header">
        <img src={logoPath} className="header__logo" alt="лого"/>
        </header>
    );
}

export default Header;