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
        return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${page}&pageSize=9&MaNhom=GP01`)
    },
    layThongTinHocVienKhoaHoc: (maKhoaHoc)=>{
        return https.get(`/api/QuanLyKhoaHoc/LayThongTinHocVienKhoaHoc?maKhoaHoc=${maKhoaHoc}`)
    },
    ghiDanhKhoaHoc: (data)=>{
        return https.post(`/api/QuanLyKhoaHoc/GhiDanhKhoaHoc`, data)
    },
    xoaKhoaHoc: (maKhoaHoc)=>{
        return https.delete(`/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`)
    }
}