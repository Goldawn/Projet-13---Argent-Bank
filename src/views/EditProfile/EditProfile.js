import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
  const submitHandler = e => {
    e.preventDefault()
    if(profileData.firstName === "" || profileData.lastName === "") {
      return;
    }
    else {
      const bearer = "Bearer "+token
  
      fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'PUT',
          headers: { 
              "Content-Type": "application/json",
              "authorization": bearer
            },
          body: JSON.stringify(profileData)
        })
        .then((res) => {
          if(res.status !== 200) {
            return(res)
          }
          else {
            res.json().then(data => {
              dispatch({ type: "auth/editUserInfo", payload: { "firstName": data.body.firstName, "lastName": data.body.lastName }})
              console.log(data)
              return(data)
            })
            navigate('/profile')
          }
        })
    }


    }

    const { firstName, lastName } = profileData;

      return (

        <form id="form" onSubmit={submitHandler}>
                
          <div className="input-wrapper">
            <label for="username">firstname</label><input type="text" value={firstName} name="firstName" id="firstName" onChange={changeHandler}></input>
          </div>
          <div className="input-wrapper">
            <label for="password">lastname</label><input type="text" value={lastName} name="lastName" id="lastName" onChange={changeHandler}></input>
          </div>
          <button type="submit" className="sign-in-button">Submit</button>

        </form>
    )

}

export default EditProfile;

