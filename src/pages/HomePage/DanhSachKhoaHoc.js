import React, { useEffect, useState } from "react";
import { quanLiKhoaHocServ } from "../../services/quanLiKhoaHocServ";
import { useNavigate } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';

const DanhSachKhoaHoc = () => {
    const navigate = useNavigate();
    const [danhSachKhoaHoc, setDanhSachKhoaHoc] = useState([]);
    const [page, setPage] = useState(1);
    const layDanhSachKhoaHoc = (page) => {
        quanLiKhoaHocServ
            .layDanhSachKhoaHocPhanTrang(page)
            .then((result) => {
                console.log(result);
                setDanhSachKhoaHoc(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        layDanhSachKhoaHoc(page)
    }, []);
    let active = page;
    let items = [];
    for (let number = 1; number <= danhSachKhoaHoc.totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => { layDanhSachKhoaHoc(number); setPage(number) }}>
                {number}
            </Pagination.Item>,
        );
    }
    return (
        <div className="danh_sach_khoa_hoc">
            <div className="container">
                <h2 className="text-center title">Danh sách khóa học</h2>
                <div className="row course_container">
                    {danhSachKhoaHoc.items?.map((item, index) => {
                        return (
                            <div className="col-lg-4 col-sm-6 col-12">
                                <div className=" course_item">
                                    <img
                                        src={item.hinhAnh}
                                        className="img_item"
                                        alt={item.tenKhoaHoc}
                                    />
                                    <div className="course_item_content">

                                    <div className="course-body">
                                        <h5 className="course_title">{item.tenKhoaHoc}</h5>
                                        <div className="rate">
                                        <i class="fa-solid fa-star"></i>
                                            <p>4.5</p>
                                        </div>
                                    </div>
                                    <div className="course_footer">
                                        <span class="price">12.000.000</span>
                                        <a
                                            className="course_btn"
                                            onClick={() => {
                                                navigate(`/chiTietKhoaHoc/${item.maKhoaHoc}`);
                                            }}
                                        >
                                            Chi tiết
                                        </a>
                                    </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="d-flex justify-content-end mt-4">
                    <Pagination>{items}</Pagination>
                </div>
            </div>
        </div>
    );
};

export default DanhSachKhoaHoc;
