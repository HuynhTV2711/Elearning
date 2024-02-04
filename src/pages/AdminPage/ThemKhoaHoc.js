import React, { useEffect, useState } from "react";
import * as registerAnimation from "../../assets/animation/addcourse.json";
import Lottie from "react-lottie";
import { DatePicker, message } from "antd";
import { useFormik } from "formik";
import { validationAddCourse } from "../../utils/validation";
import { quanLiKhoaHocServ } from "../../services/quanLiKhoaHocServ";
import { useSelector } from "react-redux";
const ThemKhoaHoc = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [image, setImage] = useState("");
  const [danhMucKhoaHoc, setDanhMucKhoaHoc] = useState([]);
  const {user} = useSelector((state)=>{
    return state.userSlice
   })
  useEffect(()=>{
    quanLiKhoaHocServ.layDanhMucKhoaHoc()
    .then((result) => {
      setDanhMucKhoaHoc(result.data)
    }).catch((err) => {
      console.log(err);
    });
  },[])
   
    const formik = useFormik({
      initialValues: {
        maKhoaHoc: "",
        biDanh: "",
        tenKhoaHoc: "",
        maDanhMucKhoaHoc: "",
        ngayTao: "",
        danhGia: "",
        luotXem: "",
        maNhom: "",
        hinhAnh: "",
        moTa: "",
        taiKhoanNguoiTao: user.taiKhoan
      },
      onSubmit: (values) => {
        console.log(values);
        const formData = new FormData();
      for (const key in values) { 
        console.log(values[key]);
          formData.append(key, values[key])
      }
      quanLiKhoaHocServ
      .themKhoaHocUploadHinh(formData)
      .then((result) => {
        messageApi.open({
          type: "success",
          content: "Thêm khóa học thành công",
        });
      }).catch((err) => {
        messageApi.open({
          type: "error",
          content: err.response.data,
        });
      });
      },
      validationSchema: validationAddCourse,
    });
    const {
      handleChange,
      handleBlur,
      handleSubmit,
      values,
      errors,
      touched,
      setValues,
      resetForm,
      setFieldValue,
    } = formik;
  // animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: registerAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      {contextHolder}
      <div className="register">
        <div className="container">
          <div className="row register_container">
            <h3 className="title_them_nguoi_dung">Thêm khóa học</h3>
            <div className="col-12 col-md-12 col-lg-6">
              <form onSubmit={handleSubmit}>
                {/* Ma khoa hoc */}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="helpId">
                  <i class="fa-solid fa-code"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mã khóa học"
                    aria-label="Mã khóa học"
                    aria-describedby="helpId"
                    name="maKhoaHoc"
                    id="maKhoaHoc"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.maKhoaHoc}
                  />
                </div>
                {errors.maKhoaHoc && touched.maKhoaHoc ? (
                  <p className="text-danger mt-1">{errors.maKhoaHoc}</p>
                ) : (
                  ""
                )}
                {/* tên khoa hoc */}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="helpId">
                  <i class="fa-brands fa-discourse"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên khóa học"
                    aria-label="Tên khóa học"
                    aria-describedby="helpId"
                    name="tenKhoaHoc"
                    id="tenKhoaHoc"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tenKhoaHoc}
                  />
                </div>
                {errors.tenKhoaHoc && touched.tenKhoaHoc ? (
                  <p className="text-danger mt-1">{errors.tenKhoaHoc}</p>
                ) : (
                  ""
                )}
                {/* danh muc khoa hoc */}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="helpId">
                    <i class="fa-solid fa-briefcase"></i>
                  </span>
                  <select
                    class="form-select"
                    name="maDanhMucKhoaHoc"
                    id="maDanhMucKhoaHoc"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.maDanhMucKhoaHoc}
                  >
                    <option value="">Danh mục khóa học</option>
                    {danhMucKhoaHoc.map((item, index)=>{
                      return <option value={item.maDanhMuc}>{item.tenDanhMuc}</option>
                    })}
                  </select>
                </div>
                {errors.maDanhMucKhoaHoc && touched.maDanhMucKhoaHoc ? (
                  <p className="text-danger mt-1">{errors.maDanhMucKhoaHoc}</p>
                ) : (
                  ""
                )}
                {/* Ngay TẠos*/}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="helpId">
                  <i class="fa-solid fa-calendar-days"></i>
                  </span>
                  <DatePicker
                    id="ngayTao"
                    name="ngayTao"
                    format={"DD/MM/YYYY"}
                    onChange={(date, dateString) => {
                      setFieldValue("ngayTao", dateString)
                    }}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.ngayTao && touched.ngayTao ? (
                  <p className="text-danger mt-1">{errors.ngayTao}</p>
                ) : (
                  ""
                )}
                {/* Đánh giá */}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="helpId">
                  <i class="fa-solid fa-star"></i>
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Đánh giá"
                    aria-label="Đánh giá"
                    aria-describedby="helpId"
                    name="danhGia"
                    id="danhGia"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.danhGia}
                  />
                </div>
                {errors.danhGia && touched.danhGia ? (
                  <p className="text-danger mt-1">{errors.danhGia}</p>
                ) : (
                  ""
                )}
                {/* Lượt xem */}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="helpId">
                  <i class="fa-solid fa-eye"></i>
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Lượt xem"
                    aria-label="Lượt xem"
                    aria-describedby="helpId"
                    name="luotXem"
                    id="luotXem"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.luotXem}
                  />
                </div>
                {errors.luotXem && touched.luotXem ? (
                  <p className="text-danger mt-1">{errors.luotXem}</p>
                ) : (
                  ""
                )}
                {/* Mã nhóm */}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="helpId">
                    <i class="fa-solid fa-people-group"></i>
                  </span>
                  <select
                    class="form-select"
                    name="maNhom"
                    id="maNhom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.maNhom}
                  >
                    <option value="">Mã nhóm</option>
                    <option value="GP01">GP01</option>
                    <option value="GP02">GP02</option>
                    <option value="GP03">GP03</option>
                    <option value="GP04">GP04</option>
                    <option value="GP05">GP05</option>
                    <option value="GP06">GP06</option>
                    <option value="GP07">GP07</option>
                    <option value="GP08">GP08</option>
                    <option value="GP09">GP09</option>
                  </select>
                </div>
                {errors.maNhom && touched.maNhom ? (
                  <p className="text-danger mt-1">{errors.maNhom}</p>
                ) : (
                  ""
                )}
                {/* Hình ảnh */}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="helpId">
                  <i class="fa-solid fa-image"></i>
                  </span>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Hình ảnh"
                    aria-label="Hình ảnh"
                    accept="image/*"
                    aria-describedby="helpId"
                    name="hinhAnh"
                    id="hinhAnh"
                    onChange={(event)=>{
                      let img = event.target.files[0];
                      if (img) {
                        const urlImg = URL.createObjectURL(img);
                        // console.log(urlImg);
                        setImage(urlImg);
                      }
                      setFieldValue("hinhAnh", event.target.files[0]);
                    }}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.hinhAnh && touched.hinhAnh ? (
                  <p className="text-danger mt-1">{errors.hinhAnh}</p>
                ) : (
                  ""
                )}
                <img src={image} alt="" width={100} />
                {/*Mô tả*/}
                <div className="input-group my-3">
                  <span className="input-group-text" id="helpId">
                  <i class="fa-solid fa-pen"></i>
                  </span>
                  <textarea class="form-control" placeholder="Mô tả" name="moTa" id="moTa" rows="3" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.moTa}></textarea>
                </div>
                {errors.moTa && touched.moTa ? (
                  <p className="text-danger mt-1">{errors.moTa}</p>
                ) : (
                  ""
                )}
                <button type="submit" className="btn btn-primary">
                  Thêm khóa học
                </button>
              </form>
            </div>
            <div className="col-12 col-md-12 col-lg-6 d-md-none d-none d-lg-block">
              <Lottie options={defaultOptions} height={400} width={400} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemKhoaHoc;
