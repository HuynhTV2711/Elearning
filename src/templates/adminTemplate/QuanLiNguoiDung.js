import React, { useEffect, useState } from "react";
import { quanLiNguoiDungServ } from "../../services/quanLiNguoiDungServ";
import Pagination from 'react-bootstrap/Pagination';
import { message } from "antd";


const QuanLiNguoiDung = () => {
  const [messageApi, contextHolder] = message.useMessage();
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
  const xoaNguoiDung = (taiKhoan)=>{
    quanLiNguoiDungServ
    .xoaNguoiDung(taiKhoan)
    .then((result) => {
      messageApi.open({
        type: "success",
        content: result.data,
      });
      layDanhSachNguoiDung(page);
    }).catch((err) => {
      messageApi.open({
        type: "error",
        content: err.response.data,
      });
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
    <>
    {contextHolder}
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
                  <button className="btn"  onClick={()=>{xoaNguoiDung(item.taiKhoan)}}>
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
    </>
  );
};

export default QuanLiNguoiDung;
