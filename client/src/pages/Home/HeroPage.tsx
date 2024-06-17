import React, { useState } from 'react'
import {
    ProfileCard,
    PostCard,
} from '../../components'
import CreatePostWidget from '../Widgets/CreatePostWidget';
import { useSelector } from 'react-redux';
import UsersList from '../Widgets/UsersList';
import { RootState } from '../../store/store';
import { User } from '../../state/authSlice';
import { CreatePost } from '../../components';
import SuggestedUser from '../Widgets/SuggestedUser';
import PostsList from '../Widgets/PostsList';
function HeroPage() {

    const [isNewPostWidget, setIsNewPostWidget] = useState(false);
    const user: User | null = useSelector((state: RootState) => state.auth.user);
    return (
        <>
            {isNewPostWidget && <CreatePost user={user} setIsNewPostWidget={setIsNewPostWidget} />}
            <div className='flex mt-4'>
                <aside className='hidden lg:w-[25%] lg:block h-fit px-3'>
                    <div>
                        <ProfileCard
                            username={user?.username}
                            followers={user?.followers.length}
                            following={user?.following.length}
                            fullName={user?.fullName}
                            intro={user?.bio}
                            coverImage={user?.coverImage}
                            profile={user?.profileImage}
                        />

                    </div>
                </aside>
                <main className='h-full w-full lg:w-[50%] px-7'>
                    <CreatePostWidget profileImage={user?.profileImage} setIsNewPostWidget={setIsNewPostWidget

                    } />
                    <PostsList isProfile={ false} />
                </main>
                <aside className='h-full hidden lg:w-[25%] lg:block'>
                    <div>
                        <h2 className='font-bold  text-lg mb-3'>Followers</h2>
                        <UsersList isFollower={ true} />
                    </div>
                    <div className='mt-5'>
                        <h2 className='font-bold text-lg tracking-tighter mb-4 text-slate-500'>people you may know</h2>
                        <UsersList isSuggested={ true} />
                    </div>
                    <div className='mt-5'>
                        <h2 className='font-bold text-lg tracking-tighter mb-4 text-slate-500'>Following</h2>
                        <UsersList isFollowing={ true} />
                    </div>

                </aside>
            </div>
        </>
    )
}

export default HeroPage