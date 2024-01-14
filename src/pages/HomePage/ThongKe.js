import React from 'react'

const ThongKe = () => {
    return (
        <div className="thong_ke">

            <div className='container'>
                <h4>Cám ơn các bạn đã tin tưởng và đồng hành cùng chúng tôi</h4>
                <div className='row'>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                        <img src="./image/thongke/logo.png" alt="" />
                        <p className='number'>30+</p>
                        <p className='text'>Năm phát triển</p>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                        <img src="./image/thongke/chuongtrinh.png" alt="" />
                        <p className='number'>100+</p>
                        <p className='text'>Chương trình online và offline</p>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                        <img src="./image/thongke/hocvien.png" alt="" />
                        <p className='number'>1.000.000+</p>
                        <p className='text'>Học viên khắp mọi miền</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ThongKe