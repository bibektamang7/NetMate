import React from 'react'
import { Avatar } from '../../components' 
import logo from "../../assets/logo.png"
function FriendList() {
  return (
      <div className='flex gap-2 items-center'>
          <Avatar image={logo} height='30px' width='30px' />
          <p className='flex'>Bibek Tamang</p>
    </div>
  )
}

export default FriendList