import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

export default function HomePage() {
  const [user, setUser] = useState('USER')
  return (
    <div className='m-6 text-xl font-bold text-white'>
      {/* <div className="text-center">
        <h1 className='text-4xl font-bold'>User Registry</h1>
      </div> */}
      <div className='flex justify-end items-center text-white'>


        <div className="flex font-bold gap-5">
          <p>Hello, {user}!</p>
          <Link to={'/login'} className='text-red-500'>
            Login
          </Link>
          <Link to={'/register'} className='text-red-300'>
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
