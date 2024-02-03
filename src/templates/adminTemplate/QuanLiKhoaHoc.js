import React, { useEffect, useState } from "react";
import { quanLiKhoaHocServ } from "../../services/quanLiKhoaHocServ";
import Pagination from "react-bootstrap/Pagination";
import { DatePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourseApi } from "../../redux/slice/courseSlice";
import { renderPageNumbers } from "../../utils/pagination";
import { useFormik } from "formik";

const QuanLiKhoaHoc = () => {
  const [image, setImage] = useState("");
  const [danhMucKhoaHoc, setDanhMucKhoaHoc] = useState([]);
  let [page, setPage] = useState(1);
  let [isDelete, setIsDelete] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  let { listCourse } = useSelector((state) => state.courseSlice);
  console.log(listCourse);
  const dispatch = useDispatch();
  useEffect(() => {
    const actionThunk = getAllCourseApi(page);
    dispatch(actionThunk);
  }, [page, isDelete]);
  useEffect(() => {
    quanLiKhoaHocServ
      .layDanhMucKhoaHoc()
      .then((result) => {
        setDanhMucKhoaHoc(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const xoaKhoaHoc = (maKhoaHoc) => {
    quanLiKhoaHocServ
      .xoaKhoaHoc(maKhoaHoc)
      .then((result) => {
        messageApi.open({
          type: "success",
          content: result.data,
        });
        setIsDelete(!isDelete);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err.response.data,
        });
      });
  };
  const totalPages = listCourse.totalPages;
  let phanTrang = renderPageNumbers(page, totalPages, setPage);

  const formik = useFormik({
    initialValues: {
      maKhoaHoc: "",
      biDanh: "1",
      tenKhoaHoc: "",
      maDanhMucKhoaHoc: "",
      ngayTao: "",
      danhGia: "",
      luotXem: "",
      maNhom: "",
      hinhAnh: "",
      moTa: "",
      taiKhoanNguoiTao: "",
    },
    onSubmit: (values) => {
      console.log(values);
      quanLiKhoaHocServ
      .capNhatKhoaHoc(values)
      .then((result) => {
        messageApi.open({
          type: "success",
          content: "Cập nhật thành công",
        });
        setIsDelete(!isDelete);
      }).catch((err) => {
        messageApi.open({
          type: "error",
          content: "Thất bại vui lòng thử lại",
        });
      });
    },
    // validationSchema: validationRegister,
  });
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setValues,
    resetForm,
    setFieldValue,
  } = formik;
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
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {listCourse.items?.map((item, index) => {
              return (
                <tr className="">
                  <td>{index + 1}</td>
                  <td>{item.maKhoaHoc}</td>
                  <td>{item.tenKhoaHoc}</td>
                  <td>
                    <img src={item.hinhAnh} alt="" />
                  </td>
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
                        onClick={() => {
                          setValues(item);
                        }}
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
                                Cập nhật khóa học
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
                                {/* Ma khoa hoc */}
                                <div className="input-group mb-3">
                                  <span
                                    className="input-group-text"
                                    id="helpId"
                                  >
                                    <i class="fa-solid fa-code"></i>
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Mã khóa học"
                                    aria-label="Mã khóa học"
                                    aria-describedby="helpId"
                                    name="maKhoaHoc"
                                    id="maKhoaHoc"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.maKhoaHoc}
                                  />
                                </div>
                                {errors.maKhoaHoc && touched.maKhoaHoc ? (
                                  <p className="text-danger mt-1">
                                    {errors.maKhoaHoc}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {/* tên khoa hoc */}
                                <div className="input-group mb-3">
                                  <span
                                    className="input-group-text"
                                    id="helpId"
                                  >
                                    <i class="fa-brands fa-discourse"></i>
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tên khóa học"
                                    aria-label="Tên khóa học"
                                    aria-describedby="helpId"
                                    name="tenKhoaHoc"
                                    id="tenKhoaHoc"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.tenKhoaHoc}
                                  />
                                </div>
                                {errors.tenKhoaHoc && touched.tenKhoaHoc ? (
                                  <p className="text-danger mt-1">
                                    {errors.tenKhoaHoc}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {/* danh muc khoa hoc */}
                                <div className="input-group mb-3">
                                  <span
                                    className="input-group-text"
                                    id="helpId"
                                  >
                                    <i class="fa-solid fa-briefcase"></i>
                                  </span>
                                  <select
                                    class="form-select"
                                    name="maDanhMucKhoaHoc"
                                    id="maDanhMucKhoaHoc"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.maDanhMucKhoaHoc}
                                  >
                                    <option value="">Danh mục khóa học</option>
                                    {danhMucKhoaHoc.map((item, index) => {
                                      return (
                                        <option value={item.maDanhMuc}>
                                          {item.tenDanhMuc}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                                {errors.maDanhMucKhoaHoc &&
                                touched.maDanhMucKhoaHoc ? (
                                  <p className="text-danger mt-1">
                                    {errors.maDanhMucKhoaHoc}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {/* Ngay TẠos*/}
                                {/* <div className="input-group mb-3">
                                  <span
                                    className="input-group-text"
                                    id="helpId"
                                  >
                                    <i class="fa-solid fa-calendar-days"></i>
                                  </span>
                                  <DatePicker
                                  // showToday
                                    id="ngayTao"
                                    name="ngayTao"
                                    format={"DD/MM/YYYY"}
                                    onChange={(date, dateString) => {
                                      console.log(date);
                                      // console.log(dateString);
                                      // setFieldValue("tên thuộc tính", giá trị)
                                      setFieldValue("ngayTao", dateString);
                                      // setFieldValue("ngayTao", date)
                                    }}
                                    changeOnBlur={handleBlur}
                                  />
                                </div>
                                {errors.ngayTao && touched.ngayTao ? (
                                  <p className="text-danger mt-1">
                                    {errors.ngayTao}
                                  </p>
                                ) : (
                                  ""
                                )} */}
                                {/* Đánh giá */}
                                <div className="input-group mb-3">
                                  <span
                                    className="input-group-text"
                                    id="helpId"
                                  >
                                    <i class="fa-solid fa-star"></i>
                                  </span>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Đánh giá"
                                    aria-label="Đánh giá"
                                    aria-describedby="helpId"
                                    name="danhGia"
                                    id="danhGia"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.danhGia}
                                  />
                                </div>
                                {errors.danhGia && touched.danhGia ? (
                                  <p className="text-danger mt-1">
                                    {errors.danhGia}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {/* Lượt xem */}
                                <div className="input-group mb-3">
                                  <span
                                    className="input-group-text"
                                    id="helpId"
                                  >
                                    <i class="fa-solid fa-eye"></i>
                                  </span>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Lượt xem"
                                    aria-label="Lượt xem"
                                    aria-describedby="helpId"
                                    name="luotXem"
                                    id="luotXem"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.luotXem}
                                  />
                                </div>
                                {errors.luotXem && touched.luotXem ? (
                                  <p className="text-danger mt-1">
                                    {errors.luotXem}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {/* Mã nhóm */}
                                <div className="input-group mb-3">
                                  <span
                                    className="input-group-text"
                                    id="helpId"
                                  >
                                    <i class="fa-solid fa-people-group"></i>
                                  </span>
                                  <select
                                    class="form-select"
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
                                </div>
                                {errors.maNhom && touched.maNhom ? (
                                  <p className="text-danger mt-1">
                                    {errors.maNhom}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {/* Hình ảnh */}
                                <div className="input-group mb-3">
                                  <span
                                    className="input-group-text"
                                    id="helpId"
                                  >
                                    <i class="fa-solid fa-image"></i>
                                  </span>
                                  <input
                                    type="file"
                                    className="form-control"
                                    placeholder="Hình ảnh"
                                    aria-label="Hình ảnh"
                                    accept="image/*"
                                    aria-describedby="helpId"
                                    name="hinhAnh"
                                    id="hinhAnh"
                                    onChange={(event) => {
                                      let img = event.target.files[0];
                                      if (img) {
                                        const urlImg = URL.createObjectURL(img);
                                        // console.log(urlImg);
                                        setImage(urlImg);
                                      }
                                      setFieldValue(
                                        "hinhAnh",
                                        event.target.files[0].name
                                      );
                                    }}
                                  />
                                </div>
                                {errors.hinhAnh && touched.hinhAnh ? (
                                  <p className="text-danger mt-1">
                                    {errors.hinhAnh}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {/* <img src={image} alt="" width={100} /> */}
                                {/*Mô tả*/}
                                <div className="input-group my-3">
                                  <span
                                    className="input-group-text"
                                    id="helpId"
                                  >
                                    <i class="fa-solid fa-pen"></i>
                                  </span>
                                  <textarea
                                    class="form-control"
                                    placeholder="Mô tả"
                                    name="moTa"
                                    id="moTa"
                                    rows="3"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.moTa}
                                  ></textarea>
                                </div>
                                {errors.moTa && touched.moTa ? (
                                  <p className="text-danger mt-1">
                                    {errors.moTa}
                                  </p>
                                ) : (
                                  ""
                                )}
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Cập nhật
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
