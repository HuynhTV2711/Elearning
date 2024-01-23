import React from "react";
import Tabs from "./Tabs";
import { Outlet } from "react-router-dom";
import BackTop from '@uiw/react-back-top';

const AdminTemplate = () => {
  return (
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
  );
};

export default AdminTemplate;
