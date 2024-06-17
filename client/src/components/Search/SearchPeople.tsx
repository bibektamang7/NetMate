import React, { useEffect, useState } from 'react'
import Input from '../Input/Input'
import useDebounce from '../../hooks/useDebounce';
import { useSearchUserQuery } from '../../config/Api';
import { User } from '../../state/authSlice';


function SearchPeople() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search);
  const { searchedUser, isLoading, isError } = useSearchUserQuery(debouncedSearch, {
    skip: !debouncedSearch,
    selectFromResult: ({data,isLoading,isError }) => {
      
      if (data) {
        return {searchedUser: data.data,isLoading,isError}
      }
      return {searchedUser: undefined,isLoading,isError}
    }
  });
  
  return (
    <div>
      <Input
        placeholder='# Explore'
        className='py-0'
        value={search}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred</p>}
      {searchedUser && searchedUser.length !== 0 ? (
        <ul>
          {searchedUser?.map((user:User) => (
            <li key={user.username}>{user.username}</li>
          ))}
        </ul>
      ): null}
    </div>
  )
}

export default SearchPeople