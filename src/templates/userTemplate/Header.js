import React, { useEffect, useState } from "react";
import { quanLiKhoaHocServ } from "../../services/quanLiKhoaHocServ";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [danhMucKhoaHoc, setDanhMucKhoaHoc] = useState([]);
  useEffect(()=>{
    quanLiKhoaHocServ.layDanhMucKhoaHoc()
    .then((result) => {
      console.log(result);
      setDanhMucKhoaHoc(result.data)
    }).catch((err) => {
      console.log(err);
    });
  },[])
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => { navigate(`/`) }} >
            Navbar
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
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
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
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li>
              <li>
              <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
              </li>
            </ul>
            <form className="d-flex" role="search">
            <button className="btn btn-outline-success" onClick={() => { navigate(`login`) }}>
                Login
              </button>
              <button className="btn btn-outline-success" onClick={() => { navigate(`register`) }}>
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
