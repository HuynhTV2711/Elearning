import React from 'react'
import * as page404Animation from "./../../assets/animation/404page.json";
import Lottie from "react-lottie";
import { useNavigate } from 'react-router-dom';
const Page404 = () => {
    const navigate = useNavigate();
    // animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: page404Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
        <Lottie options={defaultOptions} height={400} width={400} />
        <a onClick={() => { navigate(`/`) }}>Về trang chủ</a>
    </div>
  )
}

export default Page404