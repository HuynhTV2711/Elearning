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
                <button className=' btn btn-primary'>Đăng nhập</button>
            </form>
            <p>Nếu chưa có tài khoản vui lòng đăng ký</p>
            <a className='btn btn-primary' onClick={() => { navigate(`/register`) }}>Đăng ký</a>
        </div>
    )
}

export default Login    