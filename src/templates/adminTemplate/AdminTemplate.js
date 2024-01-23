import React, { useEffect } from "react";
import Tabs from "./Tabs";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BackTop from '@uiw/react-back-top';
import { useSelector } from "react-redux";
import { message } from "antd";

const AdminTemplate = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.userSlice);
  const location = useLocation();
   useEffect(()=>{
    if (user) {
      if (user.maLoaiNguoiDung !="GV") {
        messageApi.open({
          type: "error",
          content: "Vui lòng đăng nhập tài khoản quản trị viên",
        });
        setTimeout(() => {
          // đưa về đường dẫn web bạn muốn
          window.location.href= "/login";
        }, 2000);
      }
    }
    // chưa đăng nhập
    else{
      navigate('/login');
    }

  },[location.pathname])
  return (
    <>
    {contextHolder}
    <div className="mt-5">
      <div className="row">
        <div className="col-md-3"><Tabs /></div>
        <div className="col-md-9"><Outlet /></div>
      </div>
      <BackTop
        style={{ backgroundColor: '#0082C8', color: '#FFFFFF', borderRadius:'10px', padding: '7px 10px', border:"0.5px solid #FFFFFF" }}
        step={100}
        speed={10}
        content={<div><i class="fa-solid fa-chevron-up"></i></div>}
      />
    </div>
    </>
  );
};

export default AdminTemplate;
