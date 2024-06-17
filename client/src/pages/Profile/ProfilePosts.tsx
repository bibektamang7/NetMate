import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { User } from '../../state/authSlice'

export interface OutletContext {
  user: User | null;
}

function ProfilePosts() {
    const { user } = useOutletContext<OutletContext>();
    return (
      <div className='w-full flex pr-5 gap-10'>
        <div className='w-[40%]'>
          <div className='w-full shadow-md mt-4 p-4'>
            <h3>Intro</h3>
            <p className='text-slate-500/95'>{user?.bio || "write about yourself"}</p>
          </div>
          <div className='mt-4 shadow-md p-4'>
            <h3>Photos</h3>
            {/* //TODO:list of photos */}
          </div>
          <div className='mt-4 shadow-md p-4'>
            <div className='flex items-start justify-between'>
              <div>
                <h3>Followers</h3>
                <p>{user?.followers.length}</p>
              </div>
              <button>See all followers</button>
            </div>
            {/* //TODO: list of friends */}
          </div>
        </div>
        {/* <PostCard /> */}
        </div>
    )
}

export default ProfilePosts