import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  Home,
  LoginPage
} from "./pages/index.ts"

import { AuthLayout,Authenticated } from "./components/index.ts";
const router = createBrowserRouter([
  {
    path: "/",
    
    children: [
      {
        path: "/home",
        element: (
          // <AuthLayout authentication>
            <Home/>
          // {/* </AuthLayout> */}
        )
      }
    ]
  }
])


function App() {
  
  return <RouterProvider router={router}/>
}

export default App
