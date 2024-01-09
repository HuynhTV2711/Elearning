import {https} from './configServ'
export const quanLiNguoiDungServ ={
    layDanhSachNguoiDung : ()=>{
        return https.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01" )
    },
}