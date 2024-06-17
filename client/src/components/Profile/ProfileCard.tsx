import React from 'react'
import { useNavigate } from 'react-router-dom';

function ProfileCard(
    {
        username,
        fullName,
        followers,
        following,
        intro,
        profile,
        coverImage
    }:
        {
            username: string | undefined;
            fullName: string | undefined;
            followers: number | undefined;
            following: number | undefined;
            intro: string | undefined;
            profile: string | undefined;
            coverImage: string | undefined;
        }
) {
    const navigate = useNavigate();
    return (
        <div className='dark:bg-darkCardBgColor w-full py-4 rounded-md shadow-xl'>
            <div className='w-full h-[33%] min-h-[100px] border-2 '>
                <img src={coverImage} alt="coverImage" />
            </div>
            <div className='px-3'>
                <div className='flex justify-center gap-4'>
                    <div>
                        <div className='flex flex-col -gap-3 items-center justify-start'>
                            <p className='text-sm tracking-tighter'>{followers}</p>
                            <p className='text-sm tracking-tighter'>Followers</p>
                        </div>
                    </div>
                    <div className='rounded-lg relative -top-5 z-10 overflow-hidden'>
                        <img
                            src={profile}
                            className='w-[60px] h-[50px] object-cover border-2 border-slate-100/20 rounded-lg' alt="" />
                    </div>
                    <div className='flex flex-col items-center justify-start'>
                        <p className='text-sm tracking-tighter'>{following}</p>
                        <p className='text-sm tracking-tighter'>Following</p>
                    </div>
                </div>
                <div className='-mt-2'>
                    <p className='text-center text-sm'>@{ username}</p>
                    <h3 className='text-center'>{fullName}</h3>
                </div>
                <p className='mt-4 line-clamp-2 font-extralight text-sm text-center leading-4'>{intro}</p>
                <button
                    onClick={() => (navigate("/profile/posts", {
                        state: {
                            fullName,
                            username,
                            followers,
                            following,
                            intro,
                            profile,
                            coverImage,
                        }
                    }))}
                    className='mt-6 rounded-md text-center w-full border-2 border-slate-200'
                >My profile</button>
            </div>
        </div>
    )
}

export default ProfileCard