import React from 'react'
import { User } from '../../state/authSlice'

function Follow({ user, searchUser }: { user: User | null; searchUser: string | undefined; }) {
  return (
      <div>{ user?.bio}</div>
  )
}

export default Follow