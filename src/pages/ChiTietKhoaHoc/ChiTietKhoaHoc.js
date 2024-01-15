import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { quanLiKhoaHocServ } from "../../services/quanLiKhoaHocServ";
import { getLocal } from "../../utils/local";
import { message } from "antd";

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
    <div>
      <div className="bg-info py-5">
        <div className="container">
          <h3 className="text-white">THÔNG TIN KHÓA HỌC</h3>
          <p className="text-white">THAM GIA VÀ CÙNG PHÁT TRIỂN</p>
          <img
            src="https://csc.edu.vn/data/images/quang-cao/do-hoa/GIF-2D2.gif"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <h3>{chiTietKhoaHoc.tenKhoaHoc}</h3>
        <div>
          <div className="container">
            {/* <img src="./image/teacher/teacher7.jpg" alt="" className='img-fluid d-block'/> */}
          </div>
          <div>
            <p>Giảng viên</p>
            <p>Elon Musk</p>
          </div>
        </div>
        <img src={chiTietKhoaHoc.hinhAnh} alt="" />
        <p>{chiTietKhoaHoc.moTa}</p>
        <div>
          <button
            type="button"
            className="btn btn-primary"
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
                    Modal title
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
                    {`Tài khoản: ${data.taiKhoan}`}
                    </p>
                    <p>
                        {`Khóa học đăng ký: ${data.maKhoaHoc}`}
                    </p>
                    </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Đóng
                  </button>
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
        </div>
      </div>
    </div>
    </>
  );
};

export default ChiTietKhoaHoc;
