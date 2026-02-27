import React from 'react'
import UserLayout from './layout/UserLayout'
import { Login } from './component/Login'
import { AuthContext } from './context/authcontext'
import { useContext } from 'react'
import{Routes , Route} from "react-router-dom"
import Home from './component/Home'
import HandleItemPrice from './component/HandleItemPrice'
import ViewAllPost from './component/ViewAllPost'
import EditPost from './component/EditPost'
const App = () => {

    const { userData } = useContext(AuthContext);

  return (
  <UserLayout>

<Routes>
  <Route path="/login" element={<Login />} />
  
  <Route path="/home" element={<Home />} />
  <Route path="/additem" element={<HandleItemPrice/>} />
  <Route path="/view/:postId" element={<ViewAllPost/>} />
  <Route path="/edit/:postId" element={<EditPost/>} />
</Routes>

    
  </UserLayout>
  )
}

export default App 