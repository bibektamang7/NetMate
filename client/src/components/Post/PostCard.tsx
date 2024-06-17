import React, { useState } from 'react'
import { Icons } from '../../assets/Icons/Icon'
import Avatar from '../Avatar/Avatar'
import Input from '../Input/Input'


function PostCard(
    {
        id,
        userProfileImage,
        username,
        postImage,
        content
    }: {
            id: string;
            userProfileImage: string;
            username: string;
            postImage: string;
            content: string;
    }
) {
    const [isLoved, setIsLoved] = useState(false);
    return (
        <div id={id} className='flex-1 dark:bg-darkCardBgColor py-4 rounded-md shadow-lg my-10'>
            <div className='flex'>
                <div className='flex items-center gap-2 px-2'>
                    <Avatar isRounded width='35px' height='32px' image={userProfileImage} />
                    <div className='flex flex-col'>
                        <h4 className='text-sm'>{ username}</h4>
                        <span className='text-sm'>1 hr ago</span>
                    </div>
                </div>
                <div></div>
            </div>
            <div className='px-2'>{ content}</div>
            <div className='mt-4'>
                <img src={postImage} className='w-full h-[400px]' alt="" />
            </div>
            <div className='mt-3 px-2'>
                <ul className='flex items-center gap-4'>
                    <li
                        className='hover:cursor-pointer'
                        onClick={() => (setIsLoved(prev => !prev))}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={isLoved ? 'red' : 'white'}
                            stroke={isLoved ? "red" : "black"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </li>
                    <li>
                        <Icons.FaRegCommentDots size="1.4rem" />
                    </li>
                    <li>
                        <Icons.CiLocationArrow1 size="1.4rem" />
                    </li>
                </ul>
            </div>
            <div className='flex items-center gap-4 mt-4 px-2'>
                <Avatar image={userProfileImage} isRounded width='35px' height='32px' />
                <Input placeholder='write your comments' />
            </div>
            <div>
                {/* display comments of the post */}
            </div>
        </div>
    )
}

export default PostCard