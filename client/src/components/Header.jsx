import React from 'react'

import reactIcon from '../assets/react.svg'
import CustomNavbar from './CustomNavbar'

const Header = () => {
  return (
    <div>
        <img src={reactIcon} />
        <CustomNavbar />
    </div>
  )
}

export default Header