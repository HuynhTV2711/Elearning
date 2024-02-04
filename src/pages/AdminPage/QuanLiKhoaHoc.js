import React, { useEffect, useState } from "react";
import { quanLiKhoaHocServ } from "../../services/quanLiKhoaHocServ";
import Pagination from "react-bootstrap/Pagination";
import { DatePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourseApi, layDanhMucKhoaHocAPI } from "../../redux/slice/courseSlice";
import { renderPageNumbers } from "../../utils/pagination";
import { useFormik } from "formik";
import { quanLiNguoiDungServ } from "../../services/quanLiNguoiDungServ";
import { layDanhSachHocVien } from "../../redux/slice/userSlice";
import { validationAddCourse } from "../../utils/validation";

const QuanLiKhoaHoc = () => {
  let [page, setPage] = useState(1);
  let [isDelete, setIsDelete] = useState(true);
  let [khoaHoc, setKhoaHoc] = useState("");
  let [dshvChoDuyet, setDSHVChoDuyet]= useState([]);
  let [dshvThamGia, setDSHVThamGia]= useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const {user} = useSelector((state)=>{
    return state.userSlice
   })
  // lay danh sach hoc vien
  const dispatch = useDispatch();
  let {dsHocVien} = useSelector((state)=> state.userSlice)
  useEffect(() => {
    const actionThunk = layDanhSachHocVien();
    dispatch(actionThunk);
  }, []);
  
  // Lấy danh sách kh phân trang
  let { listCourse } = useSelector((state) => state.courseSlice);
  useEffect(() => {
    const actionThunk = getAllCourseApi(page);
    dispatch(actionThunk);
  }, [page, isDelete]);
  // Lấy danh mục khóa học
  let { danhMucKhoaHoc } = useSelector((state) => state.courseSlice);
  useEffect(() => {
    const actionThunk = layDanhMucKhoaHocAPI();
    dispatch(actionThunk);
  }, []);
  // Xóa khóa học
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
// layDanhSachHocVienChoXetDuyet
let valueKhoaHoc = (maKhoaHoc) => {
  return {
    maKhoaHoc: maKhoaHoc,
  };
};
let layDSHocVienChoXetDuyet = (data)=>{
  quanLiNguoiDungServ
  .layDanhSachHocVienChoXetDuyet(data)
  .then((result) => {
    console.log(result);
    setDSHVChoDuyet(result.data)
  }).catch((err) => {
    console.log(err);
  });
}
// layDanhSachHocVienKhoaHoc
let layDSHocVienKhoaHoc = (data)=>{
  quanLiNguoiDungServ
  .layDanhSachHocVienKhoaHoc(data)
  .then((result) => {
    setDSHVThamGia(result.data)
  }).catch((err) => {
    console.log(err);
  });
}
  // ghi danh
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };
  let dataGhiDanh = {
    maKhoaHoc: khoaHoc,
    taiKhoan: selectedValue
  };
  // huyGhiDanh
  let valueHuy = (taiKhoan) => {
    return {
      taiKhoan: taiKhoan,
      maKhoaHoc: khoaHoc,
    };
  };
  let huyGhiDanh = (data) => {
    quanLiKhoaHocServ
      .huyGhiDanh(data)
      .then((result) => {
        messageApi.open({
          type: "success",
          content: result.data,
        });
        layDSHocVienKhoaHoc(
          valueKhoaHoc(khoaHoc)
        );
        layDSHocVienChoXetDuyet(valueKhoaHoc(khoaHoc));
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err.response.data,
        });
      });
  };
 
  // Phân trang
  const totalPages = listCourse.totalPages;
  let phanTrang = renderPageNumbers(page, totalPages, setPage);
  let ngayHienTai = new Date();
  // formik
  const formik = useFormik({
    initialValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      maDanhMucKhoaHoc: "",
      ngayTao: ngayHienTai.toLocaleDateString(),
      danhGia: "",
      luotXem: "",
      maNhom: "",
      hinhAnh: "",
      moTa: "",
      taiKhoanNguoiTao: user,
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
        })
        .catch((err) => {
          messageApi.open({
            type: "error",
            content: "Thất bại vui lòng thử lại",
          });
        });
    },
    validationSchema: validationAddCourse,
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
                    <button
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={()=>{
                        console.log(item.maKhoaHoc);
                        layDSHocVienChoXetDuyet(valueKhoaHoc(item.maKhoaHoc))
                        layDSHocVienKhoaHoc(valueKhoaHoc(item.maKhoaHoc))
                        setKhoaHoc(item.maKhoaHoc)
                      }}
                    >
                      <i class="fa-solid fa-book"></i>
                    </button>
                    <div
                      className="modal fade modal-md"
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
                              Ghi danh
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div class="modal-body">
                            <div className="modal_ghi_danh">
                              <h6>Chọn người dùng</h6>
                              <div class="mb-3">
                                <form>
                                  <select
                                    class="form-select"
                                    name=""
                                    id=""
                                    value={selectedValue}
                                    onChange={handleSelectChange}
                                  >
                                    <option selected>Chọn người dùng</option>
                                    {dsHocVien?.map(
                                      (hv, index) => {
                                        return (
                                          <option value={hv.taiKhoan}>
                                            {hv.hoTen}
                                          </option>
                                        );
                                      }
                                    )}
                                  </select>
                                </form>
                              </div>

                              <button className="btn_green"
                               onClick={() => {
                                quanLiKhoaHocServ
                                  .ghiDanhKhoaHoc(dataGhiDanh)
                                  .then((result) => {
                                    messageApi.open({
                                      type: "success",
                                      content: result.data,
                                    });
                                    layDSHocVienKhoaHoc(
                                      valueKhoaHoc(khoaHoc)
                                    );
                                  })
                                  .catch((err) => {
                                    messageApi.open({
                                      type: "error",
                                      content: "Thất bại vui lòng thử lại",
                                    });
                                  });
                              }}>Ghi danh</button>
                            </div>
                            <hr />
                            <div className="modal_xac_thuc">
                              <h6>Học viên chờ xác thực</h6>
                              <table className="table table-sm">
                                <thead>
                                  <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên học viên</th>
                                    <th scope="col">Chờ xác nhận</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {dshvChoDuyet?.map((hv, index) => {
                                    return (
                                      <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{hv.hoTen}</td>
                                        <td>
                                          <button className="btn_green" onClick={()=>{
                                        let dataXacNhan = {
                                          maKhoaHoc: khoaHoc,
                                          taiKhoan: hv.taiKhoan
                                        };
                                         quanLiKhoaHocServ
                                         .ghiDanhKhoaHoc(dataXacNhan)
                                         .then((result) => {
                                           messageApi.open({
                                             type: "success",
                                             content: result.data,
                                           });
                                           layDSHocVienKhoaHoc(
                                            valueKhoaHoc(khoaHoc)
                                          );
                                          layDSHocVienChoXetDuyet(valueKhoaHoc(khoaHoc));
                                         })
                                         .catch((err) => {
                                           messageApi.open({
                                             type: "error",
                                             content: "Thất bại vui lòng thử lại",
                                           });
                                         });
                                     }
                                    }>
                                            Xác nhận
                                          </button>
                                          <button className="btn_xoa"
                                           onClick={() => {
                                            huyGhiDanh(
                                              valueHuy(
                                                hv.taiKhoan,
                                                khoaHoc
                                              )
                                            );
                                            layDSHocVienChoXetDuyet(valueKhoaHoc(khoaHoc));
                                          }}>
                                            Xóa
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                            <hr />
                            <div className="modal_da_ghi_danh">
                              <h6>Học viên đã tham gia khóa học</h6>
                              <table className="table table-sm">
                                <thead>
                                  <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên học viên</th>
                                    <th scope="col">Hủy ghi danh</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {dshvThamGia?.map((hvtg, index) => {
                                    return (
                                      <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{hvtg.hoTen}</td>
                                        <td>
                                          <button
                                            className="btn_xoa"
                                            onClick={() => {
                                              huyGhiDanh(
                                                valueHuy(
                                                  hvtg.taiKhoan,
                                                  item.maKhoaHoc
                                                )
                                              );
                                            }}
                                          >
                                            Xóa
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                        data-bs-target="#modalEdit"
                        onClick={() => {
                          setValues(item);
                        }}
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                      <div
                        className="modal fade"
                        id="modalEdit"
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
                                 {/* Bí danh */}
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
                                    placeholder="Bí danh"
                                    aria-label="Bí danh"
                                    aria-describedby="helpId"
                                    name="biDanh"
                                    id="biDanh"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.biDanh}
                                  />
                                </div>
                                {errors.biDanh && touched.biDanh ? (
                                  <p className="text-danger mt-1">
                                    {errors.biDanh}
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
