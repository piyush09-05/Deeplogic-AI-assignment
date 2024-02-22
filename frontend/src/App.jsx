import { useState } from 'react'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'

import {BrowserRouter, Routes, Route} from "react-router-dom"


import Dashboard from './components/Dashboard/Dashboard'
import CreatePost from './components/CreatePost/CreatePost'
import SchedulePost from './components/SchedulePost/SchedulePost'

function App() {


  return (
     <div>
      <BrowserRouter >
        <Routes>
          <Route path='/create' element = {<CreatePost /> } />
          <Route path='/schedule' element = {<SchedulePost/>} />
          <Route path='/' element = {<Dashboard />} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/signup' element = {<Signup />} />
        </Routes>
      </BrowserRouter>
     </div>
  )
}

export default App
