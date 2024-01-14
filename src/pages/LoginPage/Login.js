import React from 'react'
import * as loginAnimation from "./../../assets/animation/loginAnimation.json";
import Lottie from "react-lottie";
import { useNavigate } from 'react-router-dom';
const Login = () => {
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
    return (
        <div className="login">
            <h1 className='login_title'>Đăng nhập</h1>

        <div className="container">
            <div className='row login_container'>
                <div className='col-6 col-12 col-md-12 col-lg-6'>
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
                <div className="col-6 col-12 col-md-12 col-lg-6">
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
                        <a className=' login_btn'>Đăng nhập</a>
                    </form>
                    <p>Nếu chưa có tài khoản vui lòng <a onClick={() => { navigate(`/register`) }}>đăng ký.</a> </p>
                    {/* <a className='login_btn' onClick={() => { navigate(`/register`) }}>Đăng ký</a> */}
                </div>
            </div>
        </div>
        </div>

    )
}

export default Login    