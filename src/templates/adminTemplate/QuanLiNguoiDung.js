import React, { useEffect, useState } from "react";
import { quanLiNguoiDungServ } from "../../services/quanLiNguoiDungServ";
import Pagination from "react-bootstrap/Pagination";
import { message } from "antd";
import { useFormik } from "formik";
import { validationUser } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import { quanLiKhoaHocServ } from "../../services/quanLiKhoaHocServ";
import { date } from "yup";

const QuanLiNguoiDung = () => {
  let valueTaiKhoan = (taiKhoan) => {
    return {
      taiKhoan: taiKhoan
    }
  }
  let [khDaGhiDanh, setKhDaGhiDanh] = useState([]);
  let [dskhChoDuyet, setDSKHChoDuyet] = useState([]);
  const danhSachKhoaHocChoXetDuyet = (data)=>{
    quanLiKhoaHocServ
    .danhSachKhoaHocChoXetDuyet(data)
    .then((result) => {
      console.log(result);
      setDSKHChoDuyet(result.data)
    }).catch((err) => {
      console.log(err);
    });
  }
  const danhSachKhoaHocDaDuyet = (data) => {
    quanLiKhoaHocServ
      .danhSachKhoaHocDaDuyet(data)
      .then((result) => {
        console.log(result);
        setKhDaGhiDanh(result.data)
      }).catch((err) => {
        console.log(err);
      });
  }
  let valueHuy =(mkh, taiKhoan)=> {
    return {
        taiKhoan: taiKhoan,
        maKhoaHoc: mkh
    }
}
let huyGhiDanh = (data)=>{
    quanLiKhoaHocServ
    .huyGhiDanh(data)
    .then((result) => {
        console.log(result);
        messageApi.open({
            type: "success",
            content: result.data,
          });
    }).catch((err) => {
        console.log(err);
        messageApi.open({
            type: "error",
            content: err.response.data,
          });
    });
}
  const [selectedValue, setSelectedValue] = useState('');
  let dataGhiDanh = {
    maKhoaHoc: selectedValue
  };
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };
  const navigate = useNavigate();
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
  const [danhSachKhoaHoc, setDanhSachKhoaHoc] = useState([]);
  useEffect(() => {
    quanLiKhoaHocServ
      .layDanhSachKhoaHoc()
      .then((result) => {
        console.log(result);
        setDanhSachKhoaHoc(result.data)
      }).catch((err) => {
        console.log(err);
      });
  }, [])
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
  const capNhatThongTinNguoiDung = (values) => {
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
  }
  const themNguoiDung = (values) => {
    quanLiNguoiDungServ
      .register(values)
      .then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
  }
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
      let checkUser = danhSachNguoiDung.items.find((item) => item.taiKhoan === values.taiKhoan);
      if (checkUser) {
        capNhatThongTinNguoiDung(values);
      } else {
        themNguoiDung(values);
      }
    },
    validationSchema: validationUser
  });
  return (
    <>
      {contextHolder}
      <div className="mb-3">
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tài Khoản</th>
              <th scope="col">Họ tên</th>
              <th scope="col">Email</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Người dùng</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {danhSachNguoiDung.items?.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td scope="row">{item.taiKhoan}</td>
                  <td>{item.hoTen}</td>
                  <td>{item.email}</td>
                  <td>{item.soDT}</td>
                  <td>{item.maLoaiNguoiDung}</td>
                  <td className="btn_container">
                    <button className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { danhSachKhoaHocDaDuyet(valueTaiKhoan(item.taiKhoan)); danhSachKhoaHocChoXetDuyet(valueTaiKhoan(item.taiKhoan)) }}>
                      <i class="fa-solid fa-book"></i>
                    </button>
                    <div className="modal fade modal-md" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Ghi danh</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                          </div>
                          <div class="modal-body">
                            <div className="modal_ghi_danh">
                              <h6>Chọn khóa học</h6>
                              <div class="mb-3">
                                <form>
                                  <select
                                    class="form-select"
                                    name=""
                                    id=""
                                    value={selectedValue} onChange={handleSelectChange}
                                  >
                                    <option selected>Chọn khóa học</option>
                                    {
                                      danhSachKhoaHoc?.map((itemKhoaHoc, index) => {
                                        return (<option value={itemKhoaHoc.maKhoaHoc}>{itemKhoaHoc.tenKhoaHoc}</option>)
                                      })
                                    }
                                  </select>
                                </form>
                              </div>

                              <button className="btn_green" onClick={() => {
                                dataGhiDanh.taiKhoan = item.taiKhoan
                                console.log(dataGhiDanh);
                                quanLiKhoaHocServ
                                  .ghiDanhKhoaHoc(dataGhiDanh)
                                  .then((result) => {
                                    console.log(result);
                                    messageApi.open({
                                      type: "success",
                                      content: result.data,
                                    });
                                  }).catch((err) => {
                                    messageApi.open({
                                      type: "error",
                                      content: "Thất bại vui lòng thử lại",
                                    });
                                  });
                              }}>Ghi danh</button>
                            </div>
                            <hr />
                            <div className="modal_xac_thuc">
                              <h6>Khóa học chờ xác thực</h6>
                              <table className="table table-sm">
                                <thead>
                                  <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên khóa học</th>
                                    <th scope="col">Chờ xác nhận</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td><button className="btn_green">Xác nhận</button>
                                      <button className="btn_xoa">Xóa</button></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <hr />
                            <div className="modal_da_ghi_danh">

                              <h6>Khóa học đã ghi danh</h6>
                              <table className="table table-sm">
                                <thead>
                                  <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên khóa học</th>
                                    <th scope="col">Hủy ghi danh</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    khDaGhiDanh?.map((khgh, index) => {
                                      return (
                                        <tr>
                                          <th scope="row">{index + 1}</th>
                                          <td>{khgh.tenKhoaHoc}</td>
                                          <td><button className="btn_xoa" onClick={()=>{
                                            huyGhiDanh(valueHuy(khgh.maKhoaHoc, item.taiKhoan ))
                                          }}>Xóa</button></td>
                                        </tr>

                                      )
                                    })
                                  }

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
                        data-bs-target="#chinhSuaNguoiDung"
                        onClick={() => {
                          // resetForm()
                          setValues(item);
                        }}
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                      <div
                        className="modal fade"
                        id="chinhSuaNguoiDung"
                        tabIndex={-1}
                        aria-labelledby="chinhSuaNguoiDung"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="chinhSuaNguoiDung">
                                Cập nhật
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
                                <div className="input-group mb-3">
                                  <span className="input-group-text" id="helpId">
                                    <i class="fa-solid fa-user"></i>
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tài khoản"
                                    aria-label="Tài khoản"
                                    aria-describedby="helpId"
                                    disabled
                                    name="taiKhoan"
                                    id="taiKhoan"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.taiKhoan}
                                  />
                                </div>
                                {errors.taiKhoan && touched.taiKhoan ? (
                                  <p className="text-danger mt-1">{errors.taiKhoan}</p>
                                ) : (
                                  ""
                                )}
                                <div className="input-group mb-3">
                                  <span className="input-group-text" id="helpId">
                                    <i class="fa-solid fa-address-book"></i>
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Họ và tên"
                                    aria-label="Họ và tên"
                                    aria-describedby="helpId"
                                    name="hoTen"
                                    id="hoTen"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.hoTen}
                                  />
                                </div>
                                {errors.hoTen && touched.hoTen ? (
                                  <p className="text-danger mt-1">{errors.hoTen}</p>
                                ) : (
                                  ""
                                )}
                                <div className="input-group mb-3">
                                  <span className="input-group-text" id="helpId">
                                    <i class="fa-solid fa-envelope"></i>
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                    aria-label="Email"
                                    aria-describedby="helpId"
                                    name="email"
                                    id="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                  />
                                </div>
                                {errors.email && touched.email ? (
                                  <p className="text-danger mt-1">{errors.email}</p>
                                ) : (
                                  ""
                                )}
                                <div className="input-group mb-3">
                                  <span className="input-group-text" id="helpId">
                                    <i class="fa-solid fa-key"></i>
                                  </span>
                                  <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Mật khẩu"
                                    aria-label="Mật khẩu"
                                    aria-describedby="helpId"
                                    name="matKhau"
                                    id="matKhau"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.matKhau}
                                  />
                                </div>
                                {errors.matKhau && touched.matKhau ? (
                                  <p className="text-danger mt-1">{errors.matKhau}</p>
                                ) : (
                                  ""
                                )}
                                <div className="input-group mb-3">
                                  <span className="input-group-text" id="helpId">
                                    <i class="fa-solid fa-phone"></i>
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Số điện thoại"
                                    aria-label="Số điện thoại"
                                    aria-describedby="helpId"
                                    name="soDT"
                                    id="soDT"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.soDT}
                                  />
                                </div>
                                {errors.soDT && touched.soDT ? (
                                  <p className="text-danger mt-1">{errors.soDT}</p>
                                ) : (
                                  ""
                                )}
                                <div className="input-group mb-3">
                                  <span className="input-group-text" id="helpId">
                                    <i class="fa-solid fa-briefcase"></i>
                                  </span>
                                  <select class="form-select" name="maLoaiNguoiDung"
                                    id="maLoaiNguoiDung"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.maLoaiNguoiDung}>
                                    <option value="">Loại người dùng</option>
                                    <option value="GV">Giáo vụ</option>
                                    <option value="HV">Học viên</option>
                                  </select>
                                </div>
                                {errors.maLoaiNguoiDung && touched.maLoaiNguoiDung ? (
                                  <p className="text-danger mt-1">{errors.maLoaiNguoiDung}</p>
                                ) : (
                                  ""
                                )}
                                <div className="input-group mb-3">
                                  <span className="input-group-text" id="helpId">
                                    <i class="fa-solid fa-people-group"></i>
                                  </span>
                                  <select class="form-select" name="maNhom"
                                    id="maNhom"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.maNhom}>
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
                                  <p className="text-danger mt-1">{errors.maNhom}</p>
                                ) : (
                                  ""
                                )}
                                <div className="btn_container_modal">

                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Đóng
                                  </button>
                                  <button type="submit" className="btn btn-primary">
                                    Cập nhật
                                  </button>
                                </div>
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
