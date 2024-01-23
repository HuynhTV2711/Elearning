import React, { useEffect, useState } from 'react'
import { quanLiKhoaHocServ } from '../../services/quanLiKhoaHocServ'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const KhoaHocTheoDanhMuc = () => {
  const navigate = useNavigate();
    let param = useParams();
    const [khoaHocTheoDanhMuc, setKhoaHocTheoDanhMuc] = useState([]);
    useEffect(()=>{
        console.log(1);
        quanLiKhoaHocServ.layKhoaHocTheoDanhMuc(param.maDanhMuc)
        .then((result) => {
            console.log(result);
            setKhoaHocTheoDanhMuc(result.data)
        }).catch((err) => {
            console.log(err);
        });
    }, [param.maDanhMuc])
  return (
    <div className="danh_sach_khoa_hoc">
    <div className="container">
        <h2 className="text-center title">Danh sách khóa học</h2>
        <div className="row course_container">
            {khoaHocTheoDanhMuc?.map((item, index) => {
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
    </div>
    </div>
  )
}

export default KhoaHocTheoDanhMuc