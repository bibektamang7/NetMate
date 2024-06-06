import React from 'react'
import logo from "../../assets/logo.png"

function ProfileCard() {
    return (
        <div className='dark:bg-darkCardBgColor w-full h-[285px] rounded-md shadow-xl'>
            <div className='w-full h-[33%] bg-red-100'>
                <img src="" alt="" />
            </div>
            <div className='px-3'>
                <div className='flex justify-center gap-4'>
                    <div>
                        <div className='flex flex-col -gap-3 items-center justify-start'>
                            <p className='text-sm tracking-tighter'>100</p>
                            <p className='text-sm tracking-tighter'>Followers</p>
                        </div>
                    </div>
                    <div className='rounded-lg relative -top-5 z-50 overflow-hidden border-2 border-slate-200'>
                        <img src={logo} className='w-[60px] h-[50px] object-contain' alt="" />
                    </div>
                    <div className='flex flex-col items-center justify-start'>
                        <p className='text-sm tracking-tighter'>200</p>
                        <p className='text-sm tracking-tighter'>Following</p>
                    </div>
                </div>
                <h3 className='text-center'>Bibek Tamang</h3>
                <p className='mt-4 line-clamp-2 font-extralight text-sm text-center leading-4'>My name is Bibek Tamang, I'm a proficent developer who believe in hard work.</p>
                <button className='mt-6 rounded-md text-center w-full border-2 border-slate-200'>My profile</button>
            </div>
        </div>
    )
}

export default ProfileCard