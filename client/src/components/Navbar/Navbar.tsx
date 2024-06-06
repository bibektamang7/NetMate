import React from 'react'
import logo from "../../assets/logo.png"
import { Icons } from '../../assets/Icons/Icon'
import Input from '../Input/Input'
import ThemeBtn from '../Theme/ThemeBtn'
import { NavLink } from 'react-router-dom'
function Navbar() {
    return (
        <div className='pt-3 px-2 flex items-center'>
            <div className='w-[20%] flex items-center gap-2'>
                <div className='rounded-full w-fit overflow-hidden'>
                    <img src={logo} className=' object-contain h-[45px] w-[45px]' alt="" />
                </div>
                <Input placeholder='# Explore' className='py-0'/>
            </div>
            <div className='w-[60%] flex items-center justify-center'>
                <ul className='flex items-center justify-between gap-10'>
                    <li>
                        <NavLink to="/home">
                            <Icons.GoHomeFill size="1.4rem"/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/messages">
                            <Icons.AiFillMessage size="1.4rem"/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/notifications" className={({isActive}) => `${isActive ? "text-yellow-200": ""}`}>
                            <Icons.IoMdNotificationsOutline size="1.4rem"/>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='w-[20%] flex items-center justify-center'>
                <div className='w-fit rounded-full overflow-hidden border-2 border-slate-200'>
                    <img src={logo} className='h-[25px] w-[25px] object-contain ' alt="" />
                </div>
                <span className='text-sm'>Bibek Tamang</span>
            </div>
            <ThemeBtn />
        </div>
    )
}

export default Navbar