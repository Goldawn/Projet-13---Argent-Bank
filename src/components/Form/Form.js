import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import FetchData from "../../services/FetchData"
import { saveData, loadData } from "../../services/LocalStorage"
import './Form.css';

const Form = () => {

  const [login, setLogin] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = loadData('token')

  useEffect(() => {
    if( token ) {
      navigate("/profile")
    }
}, [])


  const changeHandler = e => {
    setLogin((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    })
    )
  }

  const  submitHandler = async  e => {
    e.preventDefault()

    const fetchedData = await FetchData('user/login', 'POST', {body: login})
    await  dispatch({ type: "auth/addUserToken", payload: fetchedData.body.token})
    saveData('token', fetchedData.body.token)
    navigate('/profile');
  }

  const { email, password } = login

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form id="form" onSubmit={submitHandler}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label><input type="text" value={email} name="email" id="username" onChange={changeHandler}></input>
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label><input type="password" value={password} name="password" id="password" onChange={changeHandler}></input>
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me"></input><label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">Sign In</button>
      </form>
    </section>
  );
};

export default Form;