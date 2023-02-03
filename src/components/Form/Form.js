import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
// import fetchData from '../../services/FetchData';
import './Form.css';

const Form = () => {

  const [login, setLogin] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = e => {
    setLogin((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    })
    )
  }

  const submitHandler = e => {
    e.preventDefault()

    fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST' ,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login)})

      .then((res) => {
        if(res.status !== 200) {
          return(res)
        }
        else {
          res.json().then(data => {
            dispatch({ type: "auth/addUserToken", payload: data.body.token})
          })
          navigate('/profile');
      }
    })

    // const fetchedData = fetchData("user/login", 'POST', JSON.stringify(login))
    // console.log(fetchedData)
  }

  const { email, password } = login

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form id="form" onSubmit={submitHandler}>
        <div className="input-wrapper">
          <label for="username">Username</label><input type="text" value={email} name="email" id="username" onChange={changeHandler}></input>
        </div>
        <div className="input-wrapper">
          <label for="password">Password</label><input type="password" value={password} name="password" id="password" onChange={changeHandler}></input>
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me"></input><label for="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">Sign In</button>
      </form>
    </section>
  );
};

export default Form;