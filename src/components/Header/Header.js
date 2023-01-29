import React from 'react';
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import logo from '../../assets/logo/argentBankLogo.png'
import './Header.css'

const Header = () => {

    const profileData = useSelector(state => state.auth.userInfo)
    console.log(profileData)
    
    return (
        <header>
            <Link to="/"><img src={logo} className="logo" alt="logo" /></Link>
            { profileData?.firstName? (
                <div>
                    <Link to="/profile" className="main-nav-item"><i className="fa fa-user-circle"></i>{profileData.firstName}</Link>
                    <Link to="/" className="main-nav-item"><i className="fa fa-sign-out"></i>Sign Out</Link>
                </div>
            ) : (
                <Link to="/login"><i className="fa fa-user-circle"></i>Sign In</Link>
            )}
        </header>
    );
};

export default Header;