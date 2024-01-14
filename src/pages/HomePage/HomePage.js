import React from 'react'
import Banner from './Banner'
import DanhSachKhoaHoc from './DanhSachKhoaHoc'
import DanhSachGiangVien from './DanhSachGiangVien'
import ThongKe from './ThongKe'

const HomePage = () => {
  return (
    <div>
        <Banner/>
        <DanhSachKhoaHoc/>
        <DanhSachGiangVien/>
        <ThongKe/>
    </div>
  )
}

export default HomePage