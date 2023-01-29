import React, { useState, useEffect } from 'react';
import loadData from './functions/loadData'
import {Routes, Route} from 'react-router-dom'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Profile from './views/Profile/Profile'
import EditProfile from './views/EditProfile/EditProfile'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css';

const App = () => {

  const [tokenExistsInLocalStorage, setTokenExistsInLocalStorage] = useState();

   // On vérifie si l'utilisateur possède un token dans son localStorage
   useEffect(() => {
    const auth = loadData("authToken")
    
    if(!auth) {
      setTokenExistsInLocalStorage(false)
    }
    else {
      setTokenExistsInLocalStorage(true)
    }
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home tokenExists={tokenExistsInLocalStorage} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;