import React from 'react'

const DanhSachGiangVien = () => {
    return (
        <div className='ds_giang_vien'>
            <div className="container">
                <h2 className='title'>Đội ngũ giảng viên</h2>
                <p className='sub_title'>Những chuyên gia thực tế và chuyên nghiệp</p>
                <div className='row'>
                    <div className='col-6 col-sm-6 col-md-4 col-lg-3'>
                        <img src="./image/teacher/teacher1.jpg" alt="" />
                        <p className='name'>Sophia Williams</p>
                        <p className='course'>Đồ hoạ Đa truyền thông</p>
                    </div>
                    <div className='col-6 col-sm-6 col-md-4 col-lg-3'>
                        <img src="./image/teacher/teacher2.jpg" alt="" />
                        <p className='name'>Benjamin Harrison</p>
                        <p className='course'>Lập trình Web</p>
                    </div>
                    <div className='col-6 col-sm-6 col-md-4 col-lg-3'>
                        <img src="./image/teacher/teacher3.jpg" alt="" />
                        <p className='name'>William Davis</p>
                        <p className='course'>Tin học văn phòng</p>
                    </div>
                    <div className='col-6 col-sm-6 col-md-4 col-lg-3'>
                        <img src="./image/teacher/teacher4.jpg" alt="" />
                        <p className='name'>Ava Wilson</p>
                        <p className='course'>Data Science & Machine Learning</p>
                    </div>
                    <div className='col-6 col-sm-6 col-md-4 col-lg-3'>
                        <img src="./image/teacher/teacher5.jpg" alt="" />
                        <p className='name'>Olivia Johnson</p>
                        <p className='course'>Lập trình Web</p>
                    </div>
                    <div className='col-6 col-sm-6 col-md-4 col-lg-3'>
                        <img src="./image/teacher/teacher6_1.jpg" alt="" />
                        <p className='name'>James Anderson</p>
                        <p className='course'>Mạng máy tính</p>
                    </div>
                    <div className='col-6 col-sm-6 col-md-4 col-lg-3'>
                        <img src="./image/teacher/teacher7.jpg" alt="" />
                        <p className='name'>Mia Taylor</p>
                        <p className='course'>Lập trình & CSDL</p>
                    </div>
                    <div className='col-6 col-sm-6 col-md-4 col-lg-3'>
                        <img src="./image/teacher/teacher8.jpg" alt="" />
                        <p className='name'>Samuel Carter</p>
                        <p className='course'>Thiết kế web</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DanhSachGiangVien