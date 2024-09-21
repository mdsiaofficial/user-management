
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import RegisterPage from './page/RegisterPage'
import LoginPage from './page/LoginPage'
import HomePage from './page/HomePage'
import AdminPage from './page/AdminPage'

function App() {


  return (
    <>

      <BrowserRouter>
        <HomePage />
        <Routes>


          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
