import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  Home,
  LoginPage,
  HeroPage,
  Profile,

  ProfilePosts,
  About,
  FriendList,
  Photos,

} from "./pages/index.ts"

import { AuthLayout } from "./components/index.ts";
const router = createBrowserRouter([
  {
    path: "/",
    // element: <LoginPage />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: (
          <AuthLayout authentication>
            <Home />
          </AuthLayout>
        ),
        children: [
          {
            path: "home",
            element: <AuthLayout authentication>
              <HeroPage />
            </AuthLayout>
          },
          {
            path: "profile/",
            element: <Profile />,
            children: [
              {
                path: "posts",
                element: <ProfilePosts/>
              },
              {
                path: "about",
                element:<About/>
              },
              {
                path: "friends",
                element:<FriendList/>
              },
              {
                path: "photos",
                element:<Photos/>
              },
            ]
          },
          {
            path: "message",
          },
        ]
      }
    ]
  }
])


function App() {

  return <RouterProvider router={router} />
}

export default App
