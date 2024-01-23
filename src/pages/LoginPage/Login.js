import React from "react";
import * as loginAnimation from "./../../assets/animation/loginAnimation.json";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { message } from "antd";
import { useFormik } from "formik";
import { quanLiNguoiDungServ } from "../../services/quanLiNguoiDungServ";
import { saveLocal } from "../../utils/local";
import { useDispatch } from "react-redux";
import { saveInforUser } from "../../redux/slice/userSlice";


const Login = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  // animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
      },
      onSubmit: (values) => {
        console.log(values);
        quanLiNguoiDungServ
          .login(values)
          .then((result) => {
            console.log(result);
            messageApi.open({
              type: "success",
              content: "Đăng nhập thành công",
            });
                saveLocal(result.data, "user_infor");
                dispatch(saveInforUser(result.data));
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
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
        matKhau: Yup.string().required("Vui lòng không bỏ trống"),
      }),
    });
  return (
    <>
      {contextHolder}
    <div className="login">
      <h1 className="login_title">Đăng nhập</h1>
      <div className="container">
        <div className="row login_container">
          <div className="col-6 col-12 col-md-12 col-lg-6">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
          <div className="col-6 col-12 col-md-12 col-lg-6">
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
              <div class="mb-3">
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
              <button type="submit" className=" login_btn">
                Đăng nhập
              </button>
            </form>
            <p>
              Nếu chưa có tài khoản vui lòng{" "}
              <a
                onClick={() => {
                  navigate(`/register`);
                }}
              >
                đăng ký.
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
