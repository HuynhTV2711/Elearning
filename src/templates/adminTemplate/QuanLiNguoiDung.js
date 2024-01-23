import React, { useEffect, useState } from "react";
import { quanLiNguoiDungServ } from "../../services/quanLiNguoiDungServ";
import Pagination from "react-bootstrap/Pagination";
import { message } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";

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
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      taiKhoan: "",
      maLoaiNguoiDung: "",
      maNhom: "",
      hoTen: "",
      matKhau: "",
      email: "",
      soDT: "",
    },
    onSubmit: (values) => {
      console.log(values);
      quanLiNguoiDungServ
        .capNhatThongTinNguoiDung(values)
        .then((result) => {
          messageApi.open({
            type: "success",
            content: "Cập nhật thành công",
          });
        })
        .catch((err) => {
          console.log(err);
          messageApi.open({
            type: "error",
            content: err.response.data,
          });
        });
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Vui lòng không bỏ trống"),
      maLoaiNguoiDung: Yup.string().required("Vui lòng không bỏ trống"),
      maNhom: Yup.string().required("Vui lòng không bỏ trống"),
      hoTen: Yup.string().required("Vui lòng không bỏ trống"),
      matKhau: Yup.string().required("Vui lòng không bỏ trống"),
      email: Yup.string().required("Vui lòng không bỏ trống"),
      soDT: Yup.string().required("Vui lòng không bỏ trống"),
    }),
  });
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
              <th scope="col">
                <i class="fa-solid fa-gear"></i>
              </th>
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
                      <i class="fa-solid fa-user-pen"></i>
                    </button>
                    <button
                      className="btn"
                      onClick={() => {
                        xoaNguoiDung(item.taiKhoan);
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
                        onClick={() => {
                          // resetForm()
                          setValues(item);
                        }}
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
                                Cập nhật thông tin
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              />
                            </div>
                            <div className="modal-body">
                              <form onSubmit={handleSubmit}>
                                <div class="mb-3">
                                  <label for="" class="form-label">
                                    Tài khoản
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="taiKhoan"
                                    id="taiKhoan"
                                    aria-describedby="helpId"
                                    disabled
                                    placeholder=""
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.taiKhoan}
                                  />
                                  {errors.taiKhoan && touched.taiKhoan ? (
                                    <p className="text-danger mt-1">
                                      {errors.taiKhoan}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div class="mb-3">
                                  <label for="" class="form-label">
                                    Họ tên
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="hoTen"
                                    id="hoTen"
                                    aria-describedby="helpId"
                                    placeholder=""
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.hoTen}
                                  />
                                  {errors.hoTen && touched.hoTen ? (
                                    <p className="text-danger mt-1">
                                      {errors.hoTen}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div class="mb-3">
                                  <label for="" class="form-label">
                                    Mật khẩu
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="matKhau"
                                    id="matKhau"
                                    aria-describedby="helpId"
                                    placeholder=""
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.matKhau}
                                  />
                                  {errors.matKhau && touched.matKhau ? (
                                    <p className="text-danger mt-1">
                                      {errors.matKhau}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div class="mb-3">
                                  <label for="" class="form-label">
                                    Email
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="email"
                                    id="email"
                                    aria-describedby="helpId"
                                    placeholder=""
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                  />
                                  {errors.email && touched.email ? (
                                    <p className="text-danger mt-1">
                                      {errors.email}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div class="mb-3">
                                  <label for="" class="form-label">
                                    Số điện thoại
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="soDT"
                                    id="soDT"
                                    aria-describedby="helpId"
                                    placeholder=""
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.soDT}
                                  />
                                  {errors.soDT && touched.soDT ? (
                                    <p className="text-danger mt-1">
                                      {errors.soDT}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div class="mb-3">
                                  <label for="" class="form-label">
                                    Mã nhóm
                                  </label>
                                  <select
                                    class="form-select form-select-lg"
                                    name="maNhom"
                                    id="maNhom"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.maNhom}
                                  >
                                    <option value="">Mã nhóm</option>
                                    <option value="GP01">GP01</option>
                                    <option value="GP02">GP02</option>
                                    <option value="GP03">GP03</option>
                                    <option value="GP04">GP04</option>
                                    <option value="GP05">GP05</option>
                                    <option value="GP06">GP06</option>
                                    <option value="GP07">GP07</option>
                                    <option value="GP08">GP08</option>
                                    <option value="GP09">GP09</option>
                                  </select>
                                  {errors.maNhom && touched.maNhom ? (
                                    <p className="text-danger mt-1">
                                      {errors.maNhom}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div class="mb-3">
                                  <label for="" class="form-label">
                                    Mã loại người dùng
                                  </label>
                                  <select
                                    class="form-select form-select-lg"
                                    name="maLoaiNguoiDung"
                                    id="maLoaiNguoiDung"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.maLoaiNguoiDung}
                                  >
                                    <option value="">Mã loại người dùng</option>
                                    <option value="HV">HV</option>
                                    <option value="GV">GV</option>
                                  </select>
                                  {errors.maLoaiNguoiDung &&
                                  touched.maLoaiNguoiDung ? (
                                    <p className="text-danger mt-1">
                                      {errors.maLoaiNguoiDung}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <hr />
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Lưu thay đổi
                                </button>
                              </form>
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
