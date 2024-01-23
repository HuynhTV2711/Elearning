import React, { useEffect, useState } from "react";
import { quanLiKhoaHocServ } from "../../services/quanLiKhoaHocServ";
import Pagination from "react-bootstrap/Pagination";
import { message } from "antd";

const QuanLiKhoaHoc = () => {
  const [messageApi, contextHolder] = message.useMessage();
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
  };

  const xoaKhoaHoc = (maKhoaHoc) => {
    quanLiKhoaHocServ
      .xoaKhoaHoc(maKhoaHoc)
      .then((result) => {
        messageApi.open({
          type: "success",
          content: result.data,
        });
        layDanhSachKhoaHoc(page);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err.response.data,
        });
      });
  };
  useEffect(() => {
    layDanhSachKhoaHoc(page);
  }, []);
  let active = page;
  let items = [];
  for (let number = 1; number <= danhSachKhoaHoc.totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          layDanhSachKhoaHoc(number);
          setPage(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <>
      {contextHolder}
      <div className="table-responsive">
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">Mã khóa học</th>
              <th scope="col">Tên Khóa học</th>
              <th scope="col">Số lượng hv</th>
              <th scope="col">Mô tả</th>
              <th scope="col"><i class="fa-solid fa-gear"></i></th>
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
                    <button
                      className="btn"
                      onClick={() => {
                        xoaKhoaHoc(item.maKhoaHoc);
                      }}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                    <div>
                      <button
                        type="button"
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Modal title
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              />
                            </div>
                            <div className="modal-body">...</div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button type="button" className="btn btn-primary">
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default QuanLiKhoaHoc;
