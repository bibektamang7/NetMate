import React from 'react'
import { Icons } from '../../assets/Icons/Icon'
import logo from "../../assets/logo.png"
import Avatar from '../Avatar/Avatar'
import Input from '../Input/Input'
function PostCard() {
    return (
        <div>
            <div className='flex'>
                <div className='flex items-center gap-2'>
                    <div className='rounded-full'>
                        <img src="" className='w-[40px] h-[40px] object-contain' alt="" />
                    </div>
                    <div className='flex flex-col'>
                        <h4 className='text-sm'>Bibek Tamang</h4>
                        <span className='text-sm'>1 hr ago</span>
                    </div>
                </div>
                <div></div>
            </div>
            <div></div>
            <div className='mt-4'>
                <img src="" className='w-full h-[400px]' alt="" />
            </div>
            <div className='mt-3'>
                <ul className='flex items-center gap-4'>
                    <li>
                        <Icons.CiHeart size="1.6rem"/>
                    </li>
                    <li>
                        <Icons.FaRegCommentDots size="1.4rem"/>
                    </li>
                    <li>
                        <Icons.CiLocationArrow1 size="1.4rem"/>
                    </li>
                </ul>
            </div>
            <div className='flex items-center gap-4'>
                <Avatar image={logo} width='40px' height='40px'/>
                <Input placeholder='write your comments'/>
            </div>
            <div>
                {/* display comments of the post */}
            </div>
        </div>
    )
}

export default PostCard