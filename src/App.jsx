import React, { useEffect, useRef } from 'react'
import TypeTestResults from './components/TypeTestResults'
import {Link,useNavigate,BrowserRouter,Routes,Route,Router,Navigate} from 'react-router-dom'
import CompeteScreen from './components/CompeteScreen'
import { useAuthContext } from './context/AuthContext'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'

function App() {
  const {authUser}=useAuthContext();
 
 return(
 <>
    <Routes>
      <Route path="/" element={authUser?<HomePage/>:<Navigate to='/login' />}/>
      <Route path="/signup" element={authUser ? <Navigate to='/' /> : <SignUp/>}/>
      <Route path="/login" element={authUser ? <Navigate to='/' /> : <Login/>}/>
      
      </Routes>

    </>
  )
}

export default App