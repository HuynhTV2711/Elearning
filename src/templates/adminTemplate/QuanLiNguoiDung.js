import React, { useEffect, useState } from "react";
import { quanLiNguoiDungServ } from "../../services/quanLiNguoiDungServ";

const QuanLiNguoiDung = () => {
  const [danhSachNguoiDung, setDanhSachNguoiDung] = useState([]);
  useEffect(() => {
    quanLiNguoiDungServ
      .layDanhSachNguoiDung()
      .then((result) => {
        console.log(result);
        setDanhSachNguoiDung(result.data);
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
            <th scope="col">Tài Khoản</th>
            <th scope="col">Họ tên</th>
            <th scope="col">Email</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Mã loại Người dùng</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {danhSachNguoiDung?.map((item, index) => {
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
    </div>
  );
};

export default QuanLiNguoiDung;
