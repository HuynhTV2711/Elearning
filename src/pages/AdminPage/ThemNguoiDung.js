import React from "react";
import * as registerAnimation from "../../assets/animation/addperson.json";
import Lottie from "react-lottie";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { validationRegister } from "../../utils/validation";
import { quanLiNguoiDungServ } from "../../services/quanLiNguoiDungServ";
const ThemNguoiDung = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDT: "",
        maNhom: "",
        hoTen: "",
      },
      onSubmit: (values) => {
        console.log(values);
        quanLiNguoiDungServ
          .register(values)
          .then((result) => {
            console.log(result);
            messageApi.open({
              type: "success",
              content: "Thêm người dùng thành công",
            });
          })
          .catch((err) => {
            messageApi.open({
              type: "error",
              content: err.response.data,
            });
          });
      },
      validationSchema: validationRegister,
    });
  // animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: registerAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      {contextHolder}
      <div className="register">
        <div className="container">
          <div className="row register_container">
            <h3 className="title_them_nguoi_dung">Thêm người dùng</h3>
            <div className="col-12 col-md-12 col-lg-6">
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
                  <select
                    class="form-select"
                    name="maLoaiNguoiDung"
                    id="maLoaiNguoiDung"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.maLoaiNguoiDung}
                  >
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
                  <p className="text-danger mt-1">{errors.maNhom}</p>
                ) : (
                  ""
                )}
                <button type="submit" className="btn btn-primary">
                  Thêm người dùng
                </button>
              </form>
            </div>
            <div className="col-12 col-md-12 col-lg-6 d-md-none d-none d-lg-block">
              <Lottie options={defaultOptions} height={400} width={400} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemNguoiDung;
