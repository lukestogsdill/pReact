import './App.css'
import Nav from './components/Nav'
import Wheel from './views/Wheel'
import PostFight from './views/PostFight'
import LukeFight from './views/LukeFight'
import Login from './components/Login'
import TeamBuilder from './views/TeamBuilder'
import useToken from './components/useToken'
import Register from './views/Register'
import Roll from './views/Roll'
import React, { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function App(){

  
  const { token, removeToken, setToken } = useToken()
  const [invData, setInvData] = useState([])
  const [team, setTeam] = useState([])
  const [user, setUser] = useState({})
  const [money, setMoney] = useState()
  const [tickets, setTickets] = useState()
  
  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    const response = await fetch("http://localhost:5000/getUserData",{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    const data = await response.json()
    setUser(data)
    setMoney(data.money)
    setTickets(data.tickets)
  }
  
    return (
      <BrowserRouter>
      <Nav removeToken={removeToken} token={token} user={user} money={money} tickets={tickets} />
      <ToastContainer/>
      <div className="App">
      {!token && token!=='' &&token!== undefined?(
      <Routes>
        <Route path = '/register' element ={<Register/>}/>
        <Route path = '/login' element={<Login setToken={setToken} />} />
        <Route path = '/' element={<PostFight token={token}/>}/>
      </Routes> 
        ):(
          <Routes>
            <Route path = '/' element={<PostFight token={token}/>}/>
            <Route path="/TeamBuilder" element={<TeamBuilder token={token} team={team} invData={invData} setTeam={setTeam} setInvData={setInvData}/>}/>
            <Route path = '/wheel' element ={<Wheel token={token} money={money} setMoney={setMoney} tickets={tickets} setTickets={setTickets}/>}/>
            <Route path = '/roll' element = {<Roll token={token} />}/>
            <Route path = '/lukefight/:id' element={<LukeFight token={token} team={team} setUser={setUser}/>}/>
          </Routes>
        )}
      </div>
      </BrowserRouter>
    )}

