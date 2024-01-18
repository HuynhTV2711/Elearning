import React, { useEffect, useState } from 'react'
import { quanLiKhoaHocServ } from '../../services/quanLiKhoaHocServ';
import Pagination from 'react-bootstrap/Pagination';

const QuanLiKhoaHoc = () => {
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
    <div className="table-responsive">
    <table className="table table-primary">
      <thead>
        <tr>
          <th scope="col">Mã khóa học</th>
          <th scope="col">Tên Khóa học</th>
          <th scope="col">Số lượng học viên</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {danhSachKhoaHoc.items?.map((item, index) => {
          return (
            <tr className="">
              <td scope="row">{item.maKhoaHoc}</td>
              <td>{item.tenKhoaHoc}</td>
              <td>{item.soLuongHocVien}</td>
              <td>{item.moTa}</td>
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
    <div className="d-flex justify-content-end mt-4">
                    <Pagination>{items}</Pagination>
                </div>
  </div>
  )
}

export default QuanLiKhoaHoc