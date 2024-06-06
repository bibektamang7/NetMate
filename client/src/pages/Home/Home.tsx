import React from 'react'
import { useSelector } from 'react-redux'
import {
  ProfileCard,
  Navbar,
  Container,
  PostCard,
} from '../../components'
import { RootState } from '../../store/store';
import FriendList from '../Widgets/FriendList';

function Home() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  
  document.querySelector("html")?.classList.remove("light", "dark");
  document.querySelector("html")?.classList.add(mode);
  return (
    <Container>
      <Navbar/>
      <div className='flex mt-4'>
        <aside className='w-[25%] h-fit px-3'>
          <div>
            <ProfileCard />
          </div>
        </aside>
        <main className='h-full w-[50%] px-7'>
          <PostCard/>
        </main>
        <aside className='h-full w-[25%]'>
          <FriendList/>
        </aside>
      </div>
    </Container>
  )
}

export default Home