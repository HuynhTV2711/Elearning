import React, { useEffect, useState } from 'react'
import { quanLiKhoaHocServ } from '../../services/quanLiKhoaHocServ'
import { useParams } from 'react-router-dom'

const KhoaHocTheoDanhMuc = () => {
    let param = useParams();
    const [khoaHocTheoDanhMuc, setKhoaHocTheoDanhMuc] = useState([]);
    console.log(param);
    useEffect(()=>{
        quanLiKhoaHocServ.layKhoaHocTheoDanhMuc(param.maDanhMuc)
        .then((result) => {
            console.log(result);
            setKhoaHocTheoDanhMuc(result.data)
        }).catch((err) => {
            console.log(err);
        });
    },[])
  return (
    <div>
        {
            khoaHocTheoDanhMuc?.map((item, index)=>{
                return <div className="card" style={{width: '18rem'}}>
  <img src={item.hinhAnh} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{item.tenKhoaHoc}</h5>
    <p className="card-text">{item.moTa}</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

            })
        }
    </div>
  )
}

export default KhoaHocTheoDanhMuc