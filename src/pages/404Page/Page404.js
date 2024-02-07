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
        
        <a onClick={() => { navigate(`/`) }}><Lottie options={defaultOptions} height={800} width={800} /></a>
    </div>
  )
}

export default Page404