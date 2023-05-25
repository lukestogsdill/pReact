import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

export default function Nav(props){
  
  const [user, setUser] = useState({})
  
  useEffect(() => {
   getUserData()
  },[])

    function logMeOut() {
    axios({
      method: "POST",
      url:"http://127.0.0.1:5000/logout",
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    .then((response) => {
       props.removeToken()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}


  const getUserData = async () => {
      const response = await fetch("http://127.0.0.1:5000/getUserData",{
        headers: {
          Authorization: `Bearer ${props.token}`,
        }
      })
        const data = await response.json()
        setUser(data)
  }

  return(
  <nav>
    <div className="home_btn">
      <Link className="pokeball" to="/" />
      <div className="btn_title">
        <h1 className="home_title solid">LUKEMON</h1>
        <h1 className="home_title hollow">LUKEMON</h1>
      </div>
    </div>
    <div className="link_container">
    {!props.token && props.token!=='' &&props.token!== undefined?(
          <ul className='nav_links'>
        <Link to="/register" className="nav_link">
          <li>register</li>
        </Link>
        <Link to="/login" className="nav_link">
          <li>Log In</li>
        </Link>
          </ul>
      ):(
        <div className='linkDiv'>
        <ul className="nav_links">
        <Link to="/wheel" className="nav_link">
          <li>Wheel</li>
        </Link>
        <Link to="/TeamBuilder" className="nav_link">
          <li>Team</li>
        </Link>
        <Link to="/roll" className="nav_link">
          <li>Roll</li>
        </Link>
      </ul> 
        <div className='profileBar'>
          <section>
          <img src={user.img_url} className='profilePic'/>
          <h3>{user.username}</h3>
          </section>
          <section className='moneyBar'>
          <h3>Money:{user.money}</h3>
          <h3>Tickets:{user.tickets}</h3>
          <Link to='/login' onClick={logMeOut}> Logout </Link>
          </section>
        </div>  
      </div>
      )}
  </div>
  </nav>
  )
}
  