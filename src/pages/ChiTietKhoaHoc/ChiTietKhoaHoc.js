import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { quanLiKhoaHocServ } from '../../services/quanLiKhoaHocServ';

const ChiTietKhoaHoc = () => {
    const [chiTietKhoaHoc, setChiTietKhoaHoc] = useState({});
    const params = useParams();
    console.log(params.maKhoaHoc);
    useEffect(() => {
        quanLiKhoaHocServ.layThongTinKhoaHoc(params.maKhoaHoc)
            .then((result) => {
                console.log(result);
                setChiTietKhoaHoc(result.data)
            }).catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div>
            <div className='bg-info py-5'>
                <div className="container">
                    <h3 className='text-white'>THÔNG TIN KHÓA HỌC</h3>
                    <p className='text-white'>THAM GIA VÀ CÙNG PHÁT TRIỂN</p>
                    <img src="https://csc.edu.vn/data/images/quang-cao/do-hoa/GIF-2D2.gif" alt="" />
                </div>
            </div>
            <div className='container'>
                <h3>{chiTietKhoaHoc.tenKhoaHoc}</h3>
                <div>
                    <div className='container'>
                        {/* <img src="./image/teacher/teacher7.jpg" alt="" className='img-fluid d-block'/> */}
                    </div>
                    <div>
                        <p>Giảng viên</p>
                        <p>Elon Musk</p>
                    </div>
                </div>
                <img src={chiTietKhoaHoc.hinhAnh} alt="" />
                <p>{chiTietKhoaHoc.moTa}</p>
                <button>Đăng ký</button>
            </div>
        </div>
    )
}

export default ChiTietKhoaHoc