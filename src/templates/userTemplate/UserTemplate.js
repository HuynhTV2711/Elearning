import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from "react-router-dom";
import BackTop from '@uiw/react-back-top';
const UserTemplate = () => {
  return (
    <div>
        <Header/>
        <Outlet />
        <Footer/>
        <BackTop
        style={{ backgroundColor: '#0082C8', color: '#FFFFFF', borderRadius:'10px', padding: '7px 10px', border:"0.5px solid #FFFFFF" }}
        step={100}
        speed={10}
        content={<div><i class="fa-solid fa-chevron-up"></i></div>}
      />
    </div>
  )
}

export default UserTemplate