import React from "react";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="text-center text-lg-start">
        {/* Section: Social media */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom container">
          {/* Left */}
          <div className="me-5 d-none d-lg-block">
            <span>Kết nối với chúng tôi thông qua mạng xã hội:</span>
          </div>
          {/* Left */}
          {/* Right */}
          <div>
            <a href className="me-4 text-reset">
              <i className="fab fa-facebook-f" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-twitter" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-google" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-instagram" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-linkedin" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-github" />
            </a>
          </div>
          {/* Right */}
        </section>
        {/* Section: Social media */}
        {/* Section: Links  */}
        <section className>
          <div className="container text-center text-md-start mt-5">
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3" />
                  Cyber Academy
                </h6>
                <p>
                Khi bạn có quyết tâm, có đam mê, mong muốn xây dựng sự nghiệp cho chính cuộc đời của mình, thay vì hỏi người này nhóm nọ CÓ NÊN HỌC LẬP TRÌNH HAY KHÔNG thì hãy bắt tay ngay luôn
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Khóa học</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Angular
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    React
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Vue
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Laravel
                  </a>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Tin tức</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Tin mới
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Tuyển dụng
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Về chúng tôi
                  </a>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
                <p>
                  <i className="fas fa-home me-3" /> HCM, D1 , VN
                </p>
                <p>
                  <i className="fas fa-envelope me-3" />
                  cbacademy@example.com
                </p>
                <p>
                  <i className="fas fa-phone me-3" /> + 01 234 567 88
                </p>
                <p>
                  <i className="fas fa-print me-3" /> + 01 234 567 89
                </p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}
        {/* Copyright */}
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2024 Copyright: 
          <a className="text-reset fw-bold ms-2" href="https://mdbootstrap.com/">
            Tran Van Huynh
          </a>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </div>
  );
};

export default Footer;
