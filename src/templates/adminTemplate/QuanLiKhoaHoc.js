import React, { useEffect, useState } from 'react'
import { quanLiKhoaHocServ } from '../../services/quanLiKhoaHocServ';

const QuanLiKhoaHoc = () => {
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
    <div className="table-responsive">
    <table className="table table-primary">
      <thead>
        <tr>
          <th scope="col">Mã khóa học</th>
          <th scope="col">Tên Khóa học</th>
          <th scope="col">Số lượng học viên</th>
          <th scope="col">Mô tả</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {danhSachKhoaHoc?.map((item, index) => {
          return (
            <tr className="">
              <td scope="row">{item.maKhoaHoc}</td>
              <td>{item.tenKhoaHoc}</td>
              <td>{item.soLuongHocVien}</td>
              <td>{item.moTa}</td>
              <td>{item.maLoaiNguoiDung}</td>
              <td>
                <button className="btn">
                  <i className="fa-regular fa-trash-can"></i>
                </button>
                <button className="btn">
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  )
}

export default QuanLiKhoaHoc