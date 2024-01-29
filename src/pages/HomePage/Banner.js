import React from "react";
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
  return (
   <section className="banner">
    <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src="https://csc.edu.vn/data/images/slider/do-hoa/292-2024-chuyenvien-thiet-ke.png" />
                </div>
                <div>
                    <img src="https://csc.edu.vn/data/images/slider/do-hoa/292-2024-ktv-nhan-dien.png" />
                </div>
                <div>
                    <img src="https://csc.edu.vn/data/images/slider/do-hoa/292-2024-digital-painting.png" />
                </div>
                <div>
                    <img src="https://csc.edu.vn/data/images/slider/mang-may-tinh/banner-Dev-Ops-1900x480.png" />
                </div>
                <div>
                    <img src="https://csc.edu.vn/data/images/slider/do-hoa/292-2024-thiet-ke-2d.png" />
                </div>
            </Carousel>
</section>

  );
};

export default Banner;
