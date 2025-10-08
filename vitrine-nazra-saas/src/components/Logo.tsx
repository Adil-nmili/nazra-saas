import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to="/" className="text-xl font-bold text-nyanza">
      <img src="/icon.png" alt="" className='w-16 h-16'/>
      </Link>
  )
}

export default Logo