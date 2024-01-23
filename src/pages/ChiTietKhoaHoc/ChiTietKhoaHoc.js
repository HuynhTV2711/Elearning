import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { quanLiKhoaHocServ } from "../../services/quanLiKhoaHocServ";
import { getLocal } from "../../utils/local";
import { message } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const ChiTietKhoaHoc = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [chiTietKhoaHoc, setChiTietKhoaHoc] = useState({});
  const params = useParams();
  console.log(params.maKhoaHoc);
  let data = {
    maKhoaHoc: params.maKhoaHoc,
    taiKhoan: getLocal("user_infor").taiKhoan,
  };
  const ghiDanhKhoaHoc = (a) => {
    quanLiKhoaHocServ
      .ghiDanhKhoaHoc(a)
      .then((result) => {
        console.log(result);
        messageApi.open({
          type: "success",
          content: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
        messageApi.open({
          type: "error",
          content: "Thất bại vui lòng thử lại",
        });
      });
  };
  useEffect(() => {
    quanLiKhoaHocServ
      .layThongTinKhoaHoc(params.maKhoaHoc)
      .then((result) => {
        console.log(result);
        setChiTietKhoaHoc(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (

    <>
      {contextHolder}
      <div className="chi_tiet_khoa_hoc">
        <div className="">
          <Carousel showThumbs={false}>
            <div>
              <img src="https://csc.edu.vn/data/images/slider/do-hoa/292-2024-digital-painting.png" />
            </div>
          </Carousel>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-sm-12 col-12 col_left">
              <h3 className="ten_khoa_hoc">{chiTietKhoaHoc.tenKhoaHoc}</h3>
              <div className="thong_tin_khoa_hoc">
                <div className="giang_vien">
                  <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                  <div>
                    <p>Giảng viên</p>
                    <p>Tên giảng viên</p>
                  </div>
                </div>
                <div className="linh_vuc">
                  <i class="fa-solid fa-graduation-cap"></i>
                  <div>
                    <p>Lĩnh vực</p>
                    <p>Lập trình Front-end</p>
                  </div>
                </div>
                <div className="danh_gia">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star-half-stroke"></i>
                  <p>100 đánh giá</p>
                </div>
              </div>
              <p className="mo_ta">React.js là thư viện JavaScript phổ biến nhất mà bạn có thể sử dụng và tìm hiểu ngày nay để xây dựng giao diện người dùng hiện đại, phản ứng cho web.Khóa học này dạy bạn về React chuyên sâu, từ cơ bản, từng bước đi sâu vào tất cả các kiến ​​thức cơ bản cốt lõi, khám phá rất nhiều ví dụ và cũng giới thiệu cho bạn các khái niệm nâng cao.Bạn sẽ nhận được tất cả lý thuyết, hàng tấn ví dụ và bản trình diễn, bài tập và bài tập cũng như vô số kiến ​​thức quan trọng bị hầu hết các nguồn khác bỏ qua - sau cùng, có một lý do tại sao khóa học này lại rất lớn! Và trong trường hợp bạn thậm chí không biết tại sao bạn lại muốn học React và bạn chỉ ở đây vì một số quảng cáo hoặc "thuật toán" - đừng lo lắng: ReactJS là một công nghệ quan trọng với tư cách là một nhà phát triển web và trong khóa học này, tôi sẽ cũng giải thích TẠI SAO điều đó lại quan trọng!</p>
              <hr />
              <div className="chuong_trinh_hoc">
                <h3 className="sub_title">Lộ trình học</h3>
                <img src="https://csc.edu.vn/data/images/mon-hoc/do-hoa/Mo-ta-chuong-trinh-hoc/lo-trinh-hoc-chuyen-vien-do-hoa-thiet-ke-web.png" alt="" />
              </div>
              <hr />
              <div className="quyen_loi">
                <h3 className="sub_title">Quyền lợi khi tham gia khóa học</h3>
                <img src="https://csc.edu.vn/data/images/mon-hoc/do-hoa/Mo-ta-chuong-trinh-hoc/Dac%20quyen%20ktv-do-hoa-1.png" alt="" />
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 col-12 col_right">
              <div className="dang_ky">
                <img src={chiTietKhoaHoc.hinhAnh} alt="" />
                <p className="price">12.000.000</p>
                <div>
                  <button
                    type="button"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Đăng ký
                  </button>
                  {/* Modal */}
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Đăng ký khóa học
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className="modal-body">
                          <p>
                            Tài khoản: <span>{data.taiKhoan}</span>
                          </p>
                          <p>
                            Khóa học đăng ký: <span>{chiTietKhoaHoc.tenKhoaHoc}</span>
                          </p>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                              ghiDanhKhoaHoc(data);
                            }}
                          >
                            Xác nhận đăng ký
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="thong_tin_lop_hoc">
                    <div className="ghi_danh">
                      <p>Ghi danh: <span>15 học viên</span></p>
                      <i class="fa-solid fa-user"></i>
                    </div>
                    <hr />
                    <div className="thoi_gian">
                      <p>Thời gian: <span>45 giờ</span></p>
                      <i class="fa-solid fa-clock"></i>
                    </div>
                    <hr />
                    <div className="bai_hoc">
                            <p>Bài học: <span>20</span></p>
                            <i class="fa-solid fa-pen"></i>
                    </div>
                    <hr />
                    <div className="video">
                            <p>Video: <span>30</span></p>
                            <i class="fa-solid fa-play"></i>
                    </div>
                    <hr />
                    <div className="trinh_do">
                            <p>Trình độ: <span>Người mới bắt đầu</span></p>
                            <i class="fa-solid fa-database"></i>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              <div className="gif">

              <img src="https://csc.edu.vn/data/images/quang-cao/do-hoa/GIF-web-ui-ux.gif" alt="" />
              <img src="https://csc.edu.vn/data/images/quang-cao/do-hoa/digital-painting.gif" alt="" />
              <img src="https://csc.edu.vn/data/images/quang-cao/do-hoa/DESIGNER-12-thang.gif" alt="" />
              <img src="https://csc.edu.vn/data/images/quang-cao/do-hoa/GIF-2D2.gif" alt="" />
            </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChiTietKhoaHoc;
