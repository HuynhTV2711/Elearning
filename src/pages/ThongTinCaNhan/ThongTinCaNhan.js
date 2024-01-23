import React, { useEffect, useState } from 'react'
import { quanLiNguoiDungServ } from '../../services/quanLiNguoiDungServ';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { message } from "antd";
import { quanLiKhoaHocServ } from '../../services/quanLiKhoaHocServ';
import { getLocal, saveLocal } from '../../utils/local';
import { saveInforUser } from '../../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const ThongTinCaNhan = () => {
    useEffect(() => {
        quanLiNguoiDungServ
            .thongTinNguoiDung()
            .then((result) => {
                console.log(result);
                setThongTinCaNhan(result.data)
            }).catch((err) => {
                console.log(err);
            });
    }, []);
    let dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
    let [thongTinCaNhan, setThongTinCaNhan] = useState([]);
    let valueHuy =(mkh)=> {
        return {
            taiKhoan: getLocal("user_infor").taiKhoan,
            maKhoaHoc: mkh
        }
    }
    let huyGhiDanh = (data)=>{
        quanLiKhoaHocServ
        .huyGhiDanh(data)
        .then((result) => {
            console.log(result);
            messageApi.open({
                type: "success",
                content: result.data,
              });
              quanLiNguoiDungServ.thongTinNguoiDung()
              .then((res) => {
                setThongTinCaNhan(res.data)
              }).catch((err) => {
                
              });
        }).catch((err) => {
            console.log(err);
            messageApi.open({
                type: "error",
                content: err.response.data,
              });
        });
    }
    
    const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
        useFormik({
            initialValues: {
                hoTen: "",
                matKhau: "",
                email: "",
                soDT: ""
            },
            onSubmit: (values) => {
                console.log(values);
                values.taiKhoan = thongTinCaNhan.taiKhoan;
                values.maLoaiNguoiDung = thongTinCaNhan.maLoaiNguoiDung;
                values.maNhom = thongTinCaNhan.maNhom;
                quanLiNguoiDungServ
                .capNhatThongTinNguoiDung(values)
                .then((result) => {
                    messageApi.open({
                        type: "success",
                        content: "Cập nhật thành công, vui lòng đăng nhập lại",
                      });
                      setTimeout(() => {
                        navigate("/login");
                      }, 2000);
                }).catch((err) => {
                    console.log(err);
                    messageApi.open({
                        type: "error",
                        content: err.response.data,
                      });
                });

            },
            validationSchema: Yup.object({
                hoTen: Yup.string().required("Vui lòng không bỏ trống"),
                matKhau: Yup.string().required("Vui lòng không bỏ trống"),
                email: Yup.string().required("Vui lòng không bỏ trống"),
                soDT: Yup.string().required("Vui lòng không bỏ trống"),
            }),
        });
    return (
        <>
      {contextHolder}
        <div className="thong_tin_ca_nhan">
            <div className="container ">
                <div className="row">
                    <div className="col-lg-4 col-sm-12 col-12 mb-4">
                        <h3>Thông tin cá nhân</h3>
                        <div className="thong_tin">
                            <div>
                                <p>Tài khoản: <span>{thongTinCaNhan.taiKhoan}</span></p>
                            </div>
                            <hr />
                            <div>
                                <p>Email: <span>{thongTinCaNhan.email}</span></p>
                            </div>
                            <hr />
                            <div>
                                <p>Họ và tên: <span>{thongTinCaNhan.hoTen}</span></p>
                            </div>
                            <hr />
                            <div>
                                <p>Số điện thoại: <span>{thongTinCaNhan.soDT}</span></p>
                            </div>
                            <hr />
                            <div>
                                <p>Mã lọai người dùng: <span>{thongTinCaNhan.maLoaiNguoiDung}</span></p>
                            </div>
                            <hr />
                            <div>
                                <p>Mã nhóm: <span>{thongTinCaNhan.maNhom}</span></p>
                            </div>
                        </div>
                        <div>
                            <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Cập nhật thông tin
                            </button>
                            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Chỉnh sửa thông tin cá nhân</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={handleSubmit}>
                                            <div class="mb-3">
                                                <label for="" class="form-label">Họ tên</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    name="hoTen"
                                                    id="hoTen"
                                                    aria-describedby="helpId"
                                                    placeholder=""
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.hoTen}
                                                />
                                                {errors.hoTen && touched.hoTen ? (
                                                    <p className="text-danger mt-1">{errors.hoTen}</p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div class="mb-3">
                                                <label for="" class="form-label">Mật khẩu</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    name="matKhau"
                                                    id="matKhau"
                                                    aria-describedby="helpId"
                                                    placeholder=""
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.matKhau}
                                                />
                                                {errors.matKhau && touched.matKhau ? (
                                                    <p className="text-danger mt-1">{errors.matKhau}</p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div class="mb-3">
                                                <label for="" class="form-label">Email</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    name="email"
                                                    id="email"
                                                    aria-describedby="helpId"
                                                    placeholder=""
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                />
                                                {errors.email && touched.email ? (
                                                    <p className="text-danger mt-1">{errors.email}</p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div class="mb-3">
                                                <label for="" class="form-label">Số điện thoại</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    name="soDT"
                                                    id="soDT"
                                                    aria-describedby="helpId"
                                                    placeholder=""
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.soDT}
                                                />
                                                {errors.soDT && touched.soDT ? (
                                                    <p className="text-danger mt-1">{errors.soDT}</p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <hr />
                                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Lưu thay đổi</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-8 col-sm-12 col-12">
                        <h3>Khóa học của tôi</h3>
                        {thongTinCaNhan.chiTietKhoaHocGhiDanh?.map((item, index) => {
                            return (
                                <div className="khoa_hoc_cua_toi">
                                    <img src={item.hinhAnh} alt="" className='img_khoa_hoc' />
                                    <div className="thong_tin_khoa_hoc">
                                        <p className='ten_khoa_hoc'>{item.tenKhoaHoc}</p>
                                        {/* <p className='mo_ta'>{item.moTa}</p> */}

                                        <div className="time">
                                            <div className="clock"><i class="fa-regular fa-clock"></i><span> 20 giờ</span></div>
                                            <div className="calendar"><i class="fa-regular fa-calendar"></i><span> 2 tháng</span></div>
                                            <div className="level"><i class="fa-solid fa-stairs"></i><span>All</span></div>
                                        </div>
                                        <div className="rate">
                                            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i>
                                        </div>
                                        <div className="kh_footer">
                                            <div className="giang_vien">
                                                <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                                <p>Tên giảng viên</p>
                                            </div>
                                            <div>
                                                <button onClick={()=>{huyGhiDanh(valueHuy(item.maKhoaHoc))}}>Hủy khóa học</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ThongTinCaNhan