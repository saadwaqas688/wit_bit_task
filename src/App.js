
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NavBar from './navBar';
import GridParentViewAll from './gridParentViewAll';
import GridParentAdd from './gridParentadd';
import Login from './login';
import GridParentViewOne from './gridParentViewOne';
import GridParentEdit from './gridParentEdit';
function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="view_all" element={<GridParentViewAll/>} />
      <Route path="add" element={<GridParentAdd/>} />
      <Route path="/:id" element={<GridParentViewOne/>} />
      <Route path="/edit/:id" element={<GridParentEdit/>} />
    </Routes>
  </BrowserRouter>
  </>

  )
}

export default App





























































