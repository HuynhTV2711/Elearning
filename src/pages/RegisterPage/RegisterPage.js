import React from "react";
import * as registerAnimation from "./../../assets/animation/register.json";
import Lottie from "react-lottie";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { validationRegister } from "../../utils/validation";
import { quanLiNguoiDungServ } from "../../services/quanLiNguoiDungServ";

const RegisterPage = () => {
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
              content: "Đăng ký thành công",
            });
            setTimeout(() => {
              navigate("/login");
            }, 2000);
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
          <h1 className="register_title">Đăng ký</h1>
          <div className="row register_container">
            <div className="col-12 col-md-12 col-lg-6">
              <form onSubmit={handleSubmit}>
                <div class="mb-2">
                  <label for="" class="form-label">
                    Tài khoản
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="taiKhoan"
                    id="taiKhoan"
                    aria-describedby="helpId"
                    placeholder=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.taiKhoan}
                  />
                  {errors.taiKhoan && touched.taiKhoan ? (
                    <p className="text-danger mt-1">{errors.taiKhoan}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div class="mb-2">
                  <label for="" class="form-label">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
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
                    <p className="text-danger mt-1">{errors.matKhau}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div class="mb-2">
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
                    <p className="text-danger mt-1">{errors.hoTen}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div class="mb-2">
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
                    <p className="text-danger mt-1">{errors.soDT}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div class="mb-2">
                  <label for="" class="form-label">
                    Mã nhóm
                  </label>
                  <select
                    class="form-select form-select-lg py-1"
                    name="maNhom"
                    id="maNhom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.maNhom}
                  >
                    <option value="">Chọn nhóm</option>
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
                    <p className="text-danger mt-1">{errors.maNhom}</p>
                  ) : (
                    ""
                  )}
                </div>

                <div class="mb-2">
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
                    <p className="text-danger mt-1">{errors.email}</p>
                  ) : (
                    ""
                  )}
                </div>
                <button type="submit" className="register_btn">
                  Đăng ký
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

export default RegisterPage;
