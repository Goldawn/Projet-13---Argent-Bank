import React from 'react';
import logo from '../../assets/logo/argentBankLogo.png'
import './Header.css'

const Header = () => {
    return (
        <header>
            <img src={logo} alt="logo du site"></img>
            <a class="main-nav-item" href="./sign-in.html">
                <i class="fa fa-user-circle"></i>
                    Sign In
            </a>
        </header>
    );
};

export default Header;