import React from "react";
import * as registerAnimation from "./../../assets/animation/register.json";
import Lottie from "react-lottie";

const RegisterPage = () => {
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
    <div className="register">

    <div className="container">
            <h1 className='register_title'>Đăng ký</h1>
      <div className="row register_container">
        <div className="col-12 col-md-12 col-lg-6">
          <form>
            <div class="mb-2">
              <label for="" class="form-label">
                Tài khoản
              </label>
              <input
                type="text"
                class="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="mb-2">
              <label for="" class="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                class="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="mb-2">
              <label for="" class="form-label">
                Họ tên
              </label>
              <input
                type="text"
                class="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="mb-2">
              <label for="" class="form-label">
                Số điện thoại
              </label>
              <input
                type="text"
                class="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="mb-2">
              <label for="" class="form-label">
                Mã nhóm
              </label>
              <select class="form-select form-select-lg py-1" name="" id="">
                <option selected>Chọn nhóm</option>
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

            <div class="mb-2">
              <label for="" class="form-label">
                Email
              </label>
              <input
                type="text"
                class="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <a className="register_btn">Đăng ký</a>
          </form>
        </div>
        <div className="col-12 col-md-12 col-lg-6 d-md-none d-none d-lg-block">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      </div>
    </div>
    </div>

  );
};

export default RegisterPage;
