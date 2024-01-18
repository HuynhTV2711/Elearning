import React, { useEffect, useState } from "react";
import { quanLiNguoiDungServ } from "../../services/quanLiNguoiDungServ";
import Pagination from 'react-bootstrap/Pagination';

const QuanLiNguoiDung = () => {
  const [danhSachNguoiDung, setDanhSachNguoiDung] = useState([]);
  const [page, setPage] = useState(1);
  const layDanhSachNguoiDung = (page)=>{
    quanLiNguoiDungServ
    .layDanhSachNguoiDungPhanTrang(page)
    .then((result) => {
      console.log(result);
      setDanhSachNguoiDung(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  useEffect(() => {
   layDanhSachNguoiDung(page)
  }, []);
   let active = page;
    let items = [];
    for (let number = 1; number <= danhSachNguoiDung.totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => { layDanhSachNguoiDung(number); setPage(number) }}>
                {number}
            </Pagination.Item>,
        );
    }
  return (
    <div className="table-responsive">
      <table className="table table-primary table-responsive">
        <thead>
          <tr>
            <th scope="col">Tài Khoản</th>
            <th scope="col">Họ tên</th>
            <th scope="col">Email</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Mã loại Người dùng</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {danhSachNguoiDung.items?.map((item, index) => {
            return (
              <tr className="">
                <td scope="row">{item.taiKhoan}</td>
                <td>{item.hoTen}</td>
                <td>{item.email}</td>
                <td>{item.soDt}</td>
                <td>{item.maLoaiNguoiDung}</td>
                <td className="d-flex">
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
      <div className="d-flex justify-content-end mt-4">
                    <Pagination>{items}</Pagination>
                </div>
    </div>
  );
};

export default QuanLiNguoiDung;
