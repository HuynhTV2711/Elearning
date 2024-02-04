import * as Yup from "yup";
export const validationUser = Yup.object({
  taiKhoan: Yup.string().required("Vui lòng không bỏ trống"),
  matKhau: Yup.string().required("Vui lòng nhập mật khẩu"),
  email: Yup.string()
    .required("Vui lòng không bỏ trống")
    .email("Định dạng email chưa đúng"),
  soDt: Yup.string()
    .required("Vui lòng không bỏ trống")
    .matches(
      /^(0|84)(\d{9,10})$/,
      "Số điện thoại 9-10 số bắt đầu bằng 0 hoặc 84"
    ),
  maNhom: Yup.string().required("Vui lòng chọn mã nhóm"),
  maLoaiNguoiDung: Yup.string().required("Vui lòng chọn loại người dùng"),
  hoTen: Yup.string().required("Vui lòng không bỏ trống"),
});
export const validationRegister = Yup.object({
  taiKhoan: Yup.string().required("Vui lòng không bỏ trống"),
  matKhau: Yup.string().required("Vui lòng không bỏ trống"),
  email: Yup.string()
    .required("Vui lòng không bỏ trống")
    .email("Định dạng email chưa đúng"),
  soDT: Yup.string()
    .required("Vui lòng không bỏ trống")
    .matches(
      /^(0|84)(\d{9,10})$/,
      "Số điện thoại 9-10 số bắt đầu bằng 0 hoặc 84"
    ),
  maNhom: Yup.string().required("Vui lòng chọn mã nhóm"),
  hoTen: Yup.string().required("Vui lòng không bỏ trống"),
});

export const validationUpdate = Yup.object({
  taiKhoan: Yup.string().required("Vui lòng không bỏ trống"),
  matKhau: Yup.string().required("Vui lòng nhập mật khẩu"),
  email: Yup.string().required("Vui lòng không bỏ trống"),
  soDt: Yup.string().required("Vui lòng không bỏ trống"),
  maNhom: Yup.string().required("Vui lòng chọn mã nhóm"),
  maLoaiNguoiDung: Yup.string().required("Vui lòng chọn loại người dùng"),
  hoTen: Yup.string().required("Vui lòng không bỏ trống"),
});
export const validationAddCourse = Yup.object({
  maKhoaHoc: Yup.string().required("Vui lòng không bỏ trống"),
  biDanh: Yup.string().required("Vui lòng không bỏ trống"),
  tenKhoaHoc: Yup.string().required("Vui lòng không bỏ trống"),
  maDanhMucKhoaHoc: Yup.string().required("Vui lòng không bỏ trống"),
  maNhom: Yup.string().required("Vui lòng chọn mã nhóm"),
  ngayTao: Yup.string().required("Vui lòng không bỏ trống"),
  danhGia:Yup.string().required("Vui lòng không bỏ trống").matches(/^[0-5](\.\d+)?$/, "Đánh giá nằm trong khoảng 0-5 sao"),
  luotXem:Yup.string().required("Vui lòng không bỏ trống"),
  hinhAnh:Yup.string().required("Vui lòng không bỏ trống"),
  moTa:Yup.string().required("Vui lòng không bỏ trống"),

});
