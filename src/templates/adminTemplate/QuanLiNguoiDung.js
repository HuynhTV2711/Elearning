import React, { useEffect, useState } from "react";
import { quanLiNguoiDungServ } from "../../services/quanLiNguoiDungServ";
import Pagination from "react-bootstrap/Pagination";
import { message } from "antd";

const QuanLiNguoiDung = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [danhSachNguoiDung, setDanhSachNguoiDung] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const layDanhSachNguoiDung = (currentPage) => {
    quanLiNguoiDungServ
      .layDanhSachNguoiDungPhanTrang(currentPage)
      .then((result) => {
        console.log(result);
        setDanhSachNguoiDung(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const xoaNguoiDung = (taiKhoan) => {
    quanLiNguoiDungServ
      .xoaNguoiDung(taiKhoan)
      .then((result) => {
        messageApi.open({
          type: "success",
          content: result.data,
        });
        layDanhSachNguoiDung(currentPage);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err.response.data,
        });
      });
  };
  useEffect(() => {
    layDanhSachNguoiDung(currentPage);
  }, []);
  const itemsPerPage = 7; 
  const totalItems = danhSachNguoiDung.totalCount;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handleClick = (currentPage) => {
    setCurrentPage(currentPage);
    layDanhSachNguoiDung(currentPage);
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 7; 
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    for (let i = 1; i <= totalPages; i++) {
      const isCurrentPage = i === currentPage;

      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - halfVisiblePages &&
          i <= currentPage + halfVisiblePages)
      ) {
        pageNumbers.push(
          <Pagination.Item
            key={i}
            active={isCurrentPage}
            onClick={() => handleClick(i)}
          >
            {i}
          </Pagination.Item>
        );
      } else if (
        i === currentPage - halfVisiblePages - 1 ||
        i === currentPage + halfVisiblePages + 1
      ) {
        pageNumbers.push(<Pagination.Ellipsis key={i} />);
      }
    }

    return pageNumbers;
  };
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
                    <button
                      className="btn"
                      onClick={() => {
                        xoaNguoiDung(item.taiKhoan);
                      }}
                    >
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
          <Pagination>
            <Pagination.First
              onClick={() => handleClick(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handleClick(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {renderPageNumbers()}
            <Pagination.Next
              onClick={() => handleClick(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handleClick(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default QuanLiNguoiDung;
