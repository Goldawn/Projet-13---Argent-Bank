import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FetchData from "../../services/FetchData"
import './EditProfile.css';

const EditProfile = () => { 

  const UserInfo = useSelector(state => state.auth.userInfo)
  const token = useSelector(state => state.auth.userToken)

  const [profileData, setProfileData] = useState({
    firstName: UserInfo.firstName,
    lastName: UserInfo.lastName,
  })
  const navigate = useNavigate()
  const dispatch = useDispatch();

  // on définit des nouveaux états de profileData au changement
  const changeHandler = e => {
    setProfileData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    })
    )
    console.log(typeof profileData.firstName)
  }

  // on créé un formData auquel on attache toutes les informations du profil utilisateur
  // cet objet est ensuite envoyé dans le corps de la requête d'édition des données du profil. 
  // Si la réponse est favorable, l'utilisateur est redirigé vers sa nouvelle page de profil
  const submitHandler = async e => {
    e.preventDefault()
    if(profileData.firstName === "" || profileData.lastName === "") {
      return;
    }
    else {
      const bearer = "Bearer "+token

      const fetchedData = await FetchData('user/profile', 'PUT', {bearer: bearer, body: profileData})
      await dispatch({ type: "auth/editUserInfo", payload: { "firstName": fetchedData.body.firstName, "lastName": fetchedData.body.lastName }})
      navigate('/profile')
    }


    }

    const { firstName, lastName } = profileData;

      return (
        <main className="main bg-dark">
          <section className="edit-profile-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Edit Profile</h1>
              <form id="form" onSubmit={submitHandler}>
                <div className="input-wrapper">
                  <label htmlFor="username">firstname</label><input type="text" value={firstName} name="firstName" id="firstName" onChange={changeHandler}></input>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="password">lastname</label><input type="text" value={lastName} name="lastName" id="lastName" onChange={changeHandler}></input>
                </div>
                <button type="submit" className="sign-in-button">Submit</button>
              </form>
          </section>
        </main>
    )

}

export default EditProfile;

