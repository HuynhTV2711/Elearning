import React from "react";
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
  return (
   <section className="banner">
    <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src="./image/banner/291-thiet-ke-web.png" />
                </div>
                <div>
                    <img src="./image/banner/291-thiet-ke-noi-that.png" />
                </div>
                <div>
                    <img src="https://csc.edu.vn/data/images/slider/do-hoa/292-2024-digital-painting.png" />
                </div>
                <div>
                    <img src="./image/banner/chuyen-vien-thiet-ke-291.png" />
                </div>
                <div>
                    <img src="https://csc.edu.vn/data/images/slider/do-hoa/292-2024-thiet-ke-2d.png" />
                </div>
            </Carousel>
</section>

  );
};

export default Banner;
