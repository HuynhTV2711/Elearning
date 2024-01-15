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
    }
}