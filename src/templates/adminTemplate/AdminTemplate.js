import React from "react";
import Tabs from "./Tabs";
import { Outlet } from "react-router-dom";

const AdminTemplate = () => {
  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-md-3"><Tabs /></div>
        <div className="col-md-9"><Outlet /></div>
      </div>
    </div>
  );
};

export default AdminTemplate;
