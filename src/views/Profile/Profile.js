import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate  } from "react-router-dom";
import FetchData from "../../services/FetchData"
import { loadData } from "../../services/LocalStorage"
import './Profile.css';

const Profile = () => {

    const dispatch = useDispatch();
    let token = useSelector(state => state.auth.userToken)
    if(!token) { 
        token = loadData('token')
        dispatch({ type: "auth/addUserToken", payload: token})
    }
    const profileData = useSelector(state => state.auth.userInfo)
    const navigate = useNavigate();

    useEffect(() => {
        if( token ) {
            const bearer = "Bearer "+token
            getData(bearer);
        }
        else {
            console.log("pas de token")
            navigate("/login")
        }
    }, [])

    const getData = async (bearer) => {

        const fetchedData = await FetchData('user/profile', 'POST', {bearer: bearer})
        const { email, firstName, lastName } = await fetchedData.body
        await dispatch({ type: "auth/addUserInfo", payload: { email: email, firstName: firstName, lastName: lastName}})        
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back {profileData.firstName} Jarvis!</h1>
                <Link to="/profile/edit" className="edit-button">Edit Name</Link>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                <p className="account-amount">$2,082.79</p>
                <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
    );
}

export default Profile;