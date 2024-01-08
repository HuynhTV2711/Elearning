import React, { useEffect, useState } from "react";
import { quanLiKhoaHocServ } from "../../services/quanLiKhoaHocServ";
import { useNavigate } from 'react-router-dom';
const DanhSachKhoaHoc = () => {
    const navigate = useNavigate();
    const [danhSachKhoaHoc, setDanhSachKhoaHoc] = useState([]);
    useEffect(() => {
        quanLiKhoaHocServ
            .layDanhSachKhoaHoc()
            .then((result) => {
                console.log(result);
                setDanhSachKhoaHoc(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="container">
            <h2 className="text-center">Danh sách khóa học</h2>
            <div className="row g-5 ">
                {danhSachKhoaHoc?.map((item, index) => {
                    return (
                        <div className="col-lg-3 col-sm-4 col-12">
                            <div className="card" style={{ width: "18rem", height: "20rem" }}>
                                <img src={item.hinhAnh} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.tenKhoaHoc}</h5>
                                    <p className="card-text">{item.moTa}</p>
                                    <a className="btn btn-primary" onClick={() => { navigate(`/chiTietKhoaHoc/${item.maKhoaHoc}`) }}>
                                        Chi tiết
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DanhSachKhoaHoc;
