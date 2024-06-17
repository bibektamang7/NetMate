import React from 'react';
import { PostCard } from '../../components';
import { Post } from '../../state/authSlice';
import { useGetPostsQuery } from '../../config/Api';

function PostsList({
  isProfile,
}: {
  isProfile: boolean;
}) {
  const { posts, isLoading } = useGetPostsQuery(null, {
    skip: isProfile,
    selectFromResult: ({ data, isLoading }) => {
      if (data) return { posts: data.data, isLoading };
      return { posts: null, isLoading };
    }
  });
  if (isLoading) return <h1>Loading...</h1>
  
  return (
    <div>
      {
        posts?.map((post: Post) =>
          <PostCard
            id={post._id}
            postImage={post.postImage}
            username={post.author?.fullName}
            userProfileImage={post.author?.profileImage}
            content={post.content || ""}
          />
        )
      }
    </div>
  )
}

export default PostsList