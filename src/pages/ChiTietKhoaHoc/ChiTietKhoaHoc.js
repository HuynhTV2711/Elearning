import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { quanLiKhoaHocServ } from '../../services/quanLiKhoaHocServ';

const ChiTietKhoaHoc = () => {
    const [chiTietKhoaHoc, setChiTietKhoaHoc] = useState({});
    const params = useParams();
    console.log(params.maKhoaHoc);
    useEffect(()=>{
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
        <div>
            <img src={chiTietKhoaHoc.hinhAnh} alt="" />
        </div>
        <div>
            <h3>{chiTietKhoaHoc.tenKhoaHoc}</h3>
            <p>{chiTietKhoaHoc.moTa}</p>
            <button>Đăng ký</button>
        </div>
    </div>
  )
}

export default ChiTietKhoaHoc