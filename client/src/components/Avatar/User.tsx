import React from 'react'
import Avatar from './Avatar'
import {
    useFollowUserMutation,
    useUnFollowUserMutation
} from '../../config/Api';
function User({
    fullName,
    image,
    username,
    isFollowed = true,
}: {
    fullName: string;
    image: string;
    username: string;
    isFollowed: boolean | undefined;
}) {
    const [followUser] = useFollowUserMutation();
    const [unFollowUser] = useUnFollowUserMutation();

    const handleFollow = async () => {
        await followUser(username)
            .unwrap()
            .then(() => { })
            .catch((error) => {
                console.log(error);

            })
    }
    const handleUnFollow = async () => {
        await unFollowUser(username)
            .unwrap()
            .then(() => { })
            .catch((error) => {
                console.log(error);
                
            })
    }
    return (
        <div className='flex items-center justify-between pr-7'>
            <div className='flex gap-2 items-center'>
                <Avatar image={image} height='30px' width='30px' />
                <div>
                    <p className='flex'>{fullName}</p>
                    {/* {createdAt && <span>{ createdAt}</span>} */}
                </div>
            </div>
            {!isFollowed ? <button
                className='text-sm bg-blue-700 rounded-md px-2 py-1 text-slate-200 dark:text-slate-300/90'
                type='button'
                onClick={handleFollow}
            >Follow</button>
                : <button
                    className='text-sm bg-blue-700 rounded-md px-2 py-1 text-slate-200 dark:text-slate-300/90'
                    type='button'
                    onClick={handleUnFollow}
                >unfollow
                </button>
            }
        </div>
    )
}

export default User