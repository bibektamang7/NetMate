import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { OutletContext } from './PostsList'
function About() {
  const {user} = useOutletContext<OutletContext>();
  return (
    <div>
      <h2>Bio</h2>
      <p className='text-slate-500/95 mt-2'>{user?.bio || "nothing to show..."}</p>
    </div>
  )
}

export default About