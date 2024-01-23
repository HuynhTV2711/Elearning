import React, { useEffect, useState } from "react";
import { quanLiKhoaHocServ } from "../../services/quanLiKhoaHocServ";
import Pagination from "react-bootstrap/Pagination";
import { message } from "antd";

const QuanLiKhoaHoc = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [danhSachKhoaHoc, setDanhSachKhoaHoc] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const layDanhSachKhoaHoc = (currentPage) => {
    quanLiKhoaHocServ
      .layDanhSachKhoaHocPhanTrang(currentPage)
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
        layDanhSachKhoaHoc(currentPage);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err.response.data,
        });
      });
  };
  useEffect(() => {
    layDanhSachKhoaHoc(currentPage);
  }, []);
  const itemsPerPage = 7;
  const totalItems = danhSachKhoaHoc.totalCount;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handleClick = (currentPage) => {
    setCurrentPage(currentPage);
    layDanhSachKhoaHoc(currentPage);
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
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">Mã khóa học</th>
              <th scope="col">Tên Khóa học</th>
              <th scope="col">Số lượng hv</th>
              <th scope="col">Mô tả</th>
              <th scope="col">
                <i class="fa-solid fa-gear"></i>
              </th>
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
                      <i class="fa-solid fa-user-pen"></i>
                    </button>
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
                        <i class="fa-solid fa-wrench"></i>
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
          {/* <Pagination>{items}</Pagination> */}
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

export default QuanLiKhoaHoc;
