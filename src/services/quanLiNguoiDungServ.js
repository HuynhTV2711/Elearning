import {https} from './configServ'
export const quanLiNguoiDungServ ={
    layDanhSachNguoiDung : ()=>{
        return https.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01" )
    },
    login :(data)=>{
        return https.post("/api/QuanLyNguoiDung/DangNhap", data)
    },
    register :(data)=>{
        return https.post("/api/QuanLyNguoiDung/DangKy", data)
    },
    layDanhSachNguoiDungPhanTrang: (page)=>{
        return https.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=GP01&page=${page}&pageSize=35`)
    },
    xoaNguoiDung: (taiKhoan)=>{
        return https.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    },
    thongTinNguoiDung: ()=>{
        return https.post(`/api/QuanLyNguoiDung/ThongTinNguoiDung`)
    },
    capNhatThongTinNguoiDung:(data)=>{
        return https.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, data)
    }
}