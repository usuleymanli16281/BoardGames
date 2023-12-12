import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'

function App() {
  return (
    <>
      <Routes>
        <Route path='Login' element={<Login />}/> 
        <Route path='Register' element={<Register />}/> 
      </Routes>
    </>
  )
}

export default App
