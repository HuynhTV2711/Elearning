import React, { useEffect, useState } from "react";
import { quanLiKhoaHocServ } from "../../services/quanLiKhoaHocServ";
import Pagination from "react-bootstrap/Pagination";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourseApi } from "../../redux/slice/courseSlice";
import { renderPageNumbers } from "../../utils/pagination";

const QuanLiKhoaHoc = () => {
  let [page, setPage] = useState(1);
  let [isDelete, setIsDelete] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  let { listCourse } = useSelector((state) => state.courseSlice);
  console.log(listCourse);
  const dispatch = useDispatch();
  useEffect(() => {
      const actionThunk = getAllCourseApi(page);
      dispatch(actionThunk);
  }, [page, isDelete])
  const xoaKhoaHoc = (maKhoaHoc) => {
    quanLiKhoaHocServ
      .xoaKhoaHoc(maKhoaHoc)
      .then((result) => {
        messageApi.open({
          type: "success",
          content: result.data,
        });
        setIsDelete(!isDelete)
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err.response.data,
        });
      });
  };
  const totalPages = listCourse.totalPages;
  let phanTrang = renderPageNumbers(page, totalPages, setPage)
  return (
    <>
      {contextHolder}
      <div className="table-responsive container-fluid">
        <table className="table table-bordered ">
          <thead>
            <tr>
            <th scope="col">STT</th>
              <th scope="col">Mã khóa học</th>
              <th scope="col">Tên Khóa học</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Lượt xem</th>
              <th scope="col">Người tạo</th>
              <th scope="col">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {listCourse.items?.map((item, index) => {
              return (
                <tr className="">
                  <td>{index+1}</td>
                  <td>{item.maKhoaHoc}</td>
                  <td>{item.tenKhoaHoc}</td>
                  <td><img src={item.hinhAnh} alt="" /></td>
                  <td>{item.luotXem}</td>
                  <td>{item.nguoiTao.hoTen}</td>
                  <td className="btn_container">
                    <button className="btn">
                    <i class="fa-solid fa-book"></i>
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
                        <i class="fa-solid fa-pen-to-square"></i>
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
        <Pagination>
            <Pagination.First
              onClick={() => setPage(1)}
              disabled={page === 1}
            />
            <Pagination.Prev
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            />
            {phanTrang}
            <Pagination.Next
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            />
            <Pagination.Last
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            />
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default QuanLiKhoaHoc;
