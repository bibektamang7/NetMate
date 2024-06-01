import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  Home,
  LoginPage
} from "./pages/index.ts"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>,
    children: [
      {
        path: "/home",
        element: <Home/>
      }
    ]
  }
])


function App() {

  return <RouterProvider router={router}/>
}

export default App
