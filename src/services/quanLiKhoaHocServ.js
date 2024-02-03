import {https} from './configServ'
export const quanLiKhoaHocServ ={
    layDanhSachKhoaHoc : ()=>{
        return https.get("/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01", )
    },
    layThongTinKhoaHoc : (maKhoaHoc)=>{
        return https.get(`/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`)
    },
    layDanhMucKhoaHoc: ()=>{
        return https.get("/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc")
        },
    layKhoaHocTheoDanhMuc: (maDanhMuc)=>{
        return https.get(`/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`)
    },
    layDanhSachKhoaHocPhanTrang: (page)=>{
        return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${page}&pageSize=6&MaNhom=GP01`)
    },
    layThongTinHocVienKhoaHoc: (maKhoaHoc)=>{
        return https.get(`/api/QuanLyKhoaHoc/LayThongTinHocVienKhoaHoc?maKhoaHoc=${maKhoaHoc}`)
    },
    ghiDanhKhoaHoc: (data)=>{
        return https.post(`/api/QuanLyKhoaHoc/GhiDanhKhoaHoc`, data)
    },
    dangKyKhoaHoc:(data)=>{
        return https.post(`/api/QuanLyKhoaHoc/DangKyKhoaHoc`, data)
    },
    xoaKhoaHoc: (maKhoaHoc)=>{
        return https.delete(`/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`)
    },
    huyGhiDanh: (data)=>{
        return https.post("/api/QuanLyKhoaHoc/HuyGhiDanh", data)
    },
    danhSachKhoaHocDaDuyet:(data) =>{
        return https.post(`/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`, data)
    },
    danhSachKhoaHocChoXetDuyet: (data)=>{
        return https.post(`/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`, data)
    }
}