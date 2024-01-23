import React from "react";

const Banner = () => {
  return (
   <section className="banner">
  <div id="carouselExample" className="carousel slide">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src="./image/banner/291-thiet-ke-web.png" className="d-block " alt="..." />
      </div>
      <div className="carousel-item">
        <img src="./image/banner/291-thiet-ke-noi-that.png" className="d-block " alt="..." />
      </div>
      <div className="carousel-item">
        <img src="./image/banner/chuyen-vien-thiet-ke-291.png" className="d-block " alt="..." />
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</section>

  );
};

export default Banner;
