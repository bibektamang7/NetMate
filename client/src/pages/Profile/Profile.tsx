import React, { useState } from 'react'
import { Avatar} from '../../components'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { User} from '../../state/authSlice';
import CoverImage from '../Widgets/UpdateImage';
import ProfileDetails from '../Widgets/ProfileDetails';
import {Follow} from '../../components';

function Profile() {
    const { searchUsername } = useParams(); 
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const user: User | null = useSelector((state: RootState) => state.auth.user);

    return (
        <div className='relative'>
            {isEdit && <ProfileDetails setIsEdit = {setIsEdit} user={ user} />}
            <div className='w-full px-14'>
                <CoverImage user={user} isProfile={ false} />
                <div className='my-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <Avatar image={user?.profilePicture} isRounded width='60px' height='60px' />
                        <div>
                            <h1>{ user?.fullName}</h1>
                            <p className='text-sm'>@{ user?.username}</p>
                            <p>{user?.followers.length} followers . {user?.following.length} following</p>
                        </div>
                    </div>
                    {searchUsername === user?.username
                        ? <button onClick={() => setIsEdit(true)} className='hover:bg-blue-600/80 bg-blue-600 rounded-md px-6 py-1'>Edit</button>
                        : <Follow user={ user} searchUser={searchUsername} />
                    }
                </div>
                <div className='my-6'>
                    <ul className='flex items-center justify-between'>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    (`${isActive ? "text-blue-600" : "text-white"}`)
                                }
                                to="posts"
                            >
                                Posts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    (`${isActive ? "text-blue-600" : "text-white"}`)
                                }
                                to="about"
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    (`${isActive ? "text-blue-600" : "text-white"}`)
                                }
                                to="friends"
                            >
                                Friends
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    (`${isActive ? "text-blue-600" : "text-white"}`)
                                }
                                to="photos"
                            >
                                Photos
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className='w-full flex gap-10'>
                    <Outlet context={{user}} />
                </div>
            </div>
        </div>
    )
}

export default Profile