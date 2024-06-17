import { useSelector } from 'react-redux'
import {
  Navbar,
  Container,
} from '../../components'
import { RootState } from '../../store/store';
import { Outlet } from 'react-router-dom';
import { User } from '../../state/authSlice';

function Home() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const user: User | null = useSelector((state: RootState) => state.auth.user);
  document.querySelector("html")?.classList.remove("light", "dark");
  document.querySelector("html")?.classList.add(mode);
  return (
    <Container>
      <Navbar username={user?.fullName} profileImage={user?.profileImage} />
      <Outlet/>
    </Container>
  )
}

export default Home