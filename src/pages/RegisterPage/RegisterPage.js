import React from 'react'
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
    <div>
        <Lottie options={defaultOptions} height={400} width={400} />
        <form>
                <div class="mb-3">
                    <label for="" class="form-label">Tài khoản</label>
                    <input
                        type="text"
                        class="form-control"
                        name=""
                        id=""
                        aria-describedby="helpId"
                        placeholder=""
                    />
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Mật khẩu</label>
                    <input
                        type="password"
                        class="form-control"
                        name=""
                        id=""
                        aria-describedby="helpId"
                        placeholder=""
                    />
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Họ tên</label>
                    <input
                        type="text"
                        class="form-control"
                        name=""
                        id=""
                        aria-describedby="helpId"
                        placeholder=""
                    />
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Số điện thoại</label>
                    <input
                        type="text"
                        class="form-control"
                        name=""
                        id=""
                        aria-describedby="helpId"
                        placeholder=""
                    />
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Mã nhóm</label>
                    <select
                        class="form-select form-select-lg"
                        name=""
                        id=""
                    >
                        <option selected>Select one</option>
                        <option value="">New Delhi</option>
                        <option value="">Istanbul</option>
                        <option value="">Jakarta</option>
                    </select>
                </div>
                
                <div class="mb-3">
                    <label for="" class="form-label">Email</label>
                    <input
                        type="text"
                        class="form-control"
                        name=""
                        id=""
                        aria-describedby="helpId"
                        placeholder=""
                    />
                </div>
                <button className=' btn btn-primary'>Đăng ký</button>
            </form>
    </div>
  )
}

export default RegisterPage