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
        <div className="danh_sach_khoa_hoc">
        <div className="container">
            <h2 className="text-center title">Danh sách khóa học</h2>
            <div className="row course_container">
                {danhSachKhoaHoc?.map((item, index) => {
                    return (
                        <div className="col-lg-4 col-sm-6 col-12">
                            <div className=" course_item">
                                <img src={item.hinhAnh} className="img_item" alt={item.tenKhoaHoc} />
                                <div className="course-body">
                                    <h5 className="course_title">{item.tenKhoaHoc}</h5>
                                    {/* <p className="card-text">{item.moTa}</p> */}
                                    <hr/>
                                </div>
                                <div className="course_footer">
                                    <div className="teacher">
                                        <img src="./image/teacher/teacher8.jpg" alt="" />
                                        <p>Samuel Carter</p>
                                    </div>
                                <a className="course_btn" onClick={() => { navigate(`/chiTietKhoaHoc/${item.maKhoaHoc}`) }}>
                                        Chi tiết
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        </div>
    );
};

export default DanhSachKhoaHoc;
