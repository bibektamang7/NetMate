import React from 'react'
import UserAvatar from '../../components/Avatar/User'
import { User } from '../../state/authSlice';
import { useGetSuggestedUsersQuery } from '../../config/Api'
function SuggestedUser() {
    const { suggestedUsers, isLoading } = useGetSuggestedUsersQuery(null,
        {
            selectFromResult: ({ data, isLoading }) => {
                
                if (data) return { suggestedUsers: data.data, isLoading };
                return { suggestedUsers: null, isLoading };
            }
        }
    );
    
    if(isLoading) return <h1>Loading...</h1>
    return (
      <div className='flex flex-col gap-5'>
            {
                suggestedUsers?.map((user: User) => <div>
                    <UserAvatar
                        fullName={user.fullName}
                        username={user.username}
                        image={user.profilePicture}
                        isFollowed = {false}
                    />
                </div>)
          }
    </div>
  )
}

export default SuggestedUser