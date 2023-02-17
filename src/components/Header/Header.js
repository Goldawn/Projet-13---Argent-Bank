import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import logo from '../../assets/logo/argentBankLogo.png'
import { loadData, deleteData } from "../../services/LocalStorage"
import FetchData from "../../services/FetchData"
import './Header.css'

const Header = () => {
    
    const dispatch = useDispatch();
    let token = useSelector(state => state.auth.userToken);
    let tokenStore = loadData('token');

    useEffect(() => {
        if( token ) {
            const bearer = "Bearer "+token
            getData(bearer);
        }
        else if (tokenStore) {
            const bearer = "Bearer "+tokenStore
            getData(bearer);
            dispatch({ type: "auth/addUserToken", payload: tokenStore})
        }
    }, [])

    const getData = async (bearer) => {

        const fetchedData = await FetchData('user/profile', 'POST', {bearer: bearer})
        const { email, firstName, lastName } = await fetchedData.body
        await dispatch({ type: "auth/addUserInfo", payload: { email: email, firstName: firstName, lastName: lastName}})        
    }
  
    const handleClick = (e) => {
        dispatch({ type: "auth/resetUser"})
        deleteData('token')
    }

    const profileData = useSelector(state => state.auth.userInfo)
    
    return (
        <header>
            <Link to="/"><img src={logo} className="logo" alt="logo" /></Link>
            { profileData?.firstName? (
                <div>
                    <Link to="/profile" className="main-nav-item"><i className="fa fa-user-circle"></i>{profileData.firstName}</Link>
                    <Link to="/" className="main-nav-item" onClick={handleClick}><i className="fa fa-sign-out"></i>Sign Out</Link>
                </div>
            ) : (
                <Link to="/login"><i className="fa fa-user-circle"></i>Sign In</Link>
            )}
        </header>
    );
};

export default Header;