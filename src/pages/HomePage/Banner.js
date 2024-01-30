import React from "react";
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
  return (
   <section className="banner">
    <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} showStatus={false}>
                <div>
                    <img src="https://csc.edu.vn/data/images/slider/do-hoa/292-2024-chuyenvien-thiet-ke.png" alt="course" />
                </div>
                <div>
                    <img src="https://csc.edu.vn/data/images/slider/do-hoa/292-2024-ktv-nhan-dien.png" alt="course" />
                </div>
                <div>
                    <img src="https://csc.edu.vn/data/images/slider/do-hoa/292-2024-digital-painting.png" alt="course" />
                </div>
                <div>
                    <img src="https://csc.edu.vn/data/images/slider/mang-may-tinh/banner-Dev-Ops-1900x480.png" alt="course" />
                </div>
                <div>
                    <img src="https://csc.edu.vn/data/images/slider/do-hoa/292-2024-thiet-ke-2d.png" alt="course" />
                </div>
            </Carousel>
</section>

  );
};

export default Banner;
