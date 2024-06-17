import React from 'react'
import {
  useGetFollowersQuery,
  useGetSuggestedUsersQuery,
  useGetFollowingQuery
} from '../../config/Api'
import UserAvater from "../../components/Avatar/User"
import { User } from '../../state/authSlice';
function FriendList({ isSuggested, isFollower, isFollowing }: { isSuggested?: boolean; isFollower?: boolean; isFollowing?: boolean }) {
  
  const { followers, isLoading } = useGetFollowersQuery(null, {
    skip: !isFollower,
    selectFromResult: ({ data, isLoading }) => {
      if (data) return { followers: data.data, isLoading };
      return { followers: null, isLoading };
    }
  });
  const { suggestedUsers } = useGetSuggestedUsersQuery(null,
    {
      skip: !isSuggested,
      selectFromResult: ({ data, isLoading }) => {

        if (data) return { suggestedUsers: data.data, isLoading };
        return { suggestedUsers: null, isLoading };
      }
    }
  );
  const { followingUsers } = useGetFollowingQuery(null,
    {
      skip: !isFollowing,
      selectFromResult: ({ data, isLoading }) => {

        if (data) return { followingUsers: data.data, isLoading };
        return { followingUsers: null, isLoading };
      }
    }
  );
  if (isLoading) return <h1>Loading...</h1>
  const listType = isSuggested? suggestedUsers: isFollower ? followers : followingUsers
  return (
    <div className='flex gap-2 flex-col'>
      {
        listType?.map((user: User) => <div>
          <UserAvater
            image={user.profilePicture}
            isFollowed={isSuggested ? false : isFollowing ? true: user.isFollowed}
            fullName={user.fullName}
            username={user.username}
          />
        </div>)
      }
    </div>
  )
}

export default FriendList