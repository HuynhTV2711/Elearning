import React, { useEffect, useState } from "react";
import { quanLiKhoaHocServ } from "../../services/quanLiKhoaHocServ";
import { useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux'


const Header = () => {
  const {user} = useSelector((state)=>{
    return state.userSlice
   })
   console.log(user);
  const navigate = useNavigate();
  const [danhMucKhoaHoc, setDanhMucKhoaHoc] = useState([]);
  useEffect(()=>{
    quanLiKhoaHocServ.layDanhMucKhoaHoc()
    .then((result) => {
      setDanhMucKhoaHoc(result.data)
    }).catch((err) => {
      console.log(err);
    });
  },[])
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand logo" onClick={() => { navigate(`/`) }} >
            Cyber
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fa-solid fa-caret-down"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Lịch khai giảng
                </a>
              </li>
              
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Khóa học
                </a>
                <ul className="dropdown-menu">
                  {danhMucKhoaHoc?.map((item, index)=>{
                    return <li>
                    <button className="dropdown-item" onClick={() => { navigate(`/khoaHocTheoDanhMuc/${item.maDanhMuc}`) }}>
                      {item.tenDanhMuc}
                    </button>
                  </li>
                  })}
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Liện hệ
                </a>
              </li>
              <li className="nav-item">
              <form className="d-flex form_search" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button>
              <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
              </li>
            </ul>
            <div >
            {user ? (<div className="header_action"><p className="text-blue-400 text-sm mr-3" onClick={() => { navigate(`thongtincanhan`) }}>{user.hoTen}</p> 
            <a onClick={() => { navigate(`login`) }}>
                Logout
              </a></div> ) : (<a onClick={() => { navigate(`login`) }}>
                Login
              </a>)}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
