import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import './Profile.css';

const Profile = () => {

    const token = useSelector(state => state.auth.userToken)
    const profileData = useSelector(state => state.auth.userInfo)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if( token ) {
            const bearer = "Bearer "+token
            getData(bearer);
        }
    }, [token])

    const getData = (bearer) => {

        fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: { 
              "Content-Type": "application/json",
              "authorization": bearer
          }
        })
    
        .then((res) => res.json().then((json) => {
            if(!json) {
                navigate('/login')
            }
            else {
                const { email, firstName, lastName } = json.body
                dispatch({ type: "auth/addUserInfo", payload: { email: email, firstName: firstName, lastName: lastName}})
            }
        }))
        
    }

    console.log(profileData)

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back {profileData.firstName} Jarvis!</h1>
                {/* <button className="edit-button">Edit Name</button> */}
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