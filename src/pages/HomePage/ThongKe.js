import React from 'react'
import CountUp, { useCountUp } from 'react-countup';
const ThongKe = () => {
    useCountUp({
        ref: 'counter',
        end: 1234567,
        enableScrollSpy: true,
        scrollSpyDelay: 1000,
      });
    return (
        <div className="thong_ke">

            <div className='container'>
                <h4>Cám ơn các bạn đã tin tưởng và đồng hành cùng chúng tôi</h4>
                <div className='row'>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                        <img src="./image/thongke/logo.png" alt="" />
                        <p className='number'><CountUp start={-1000000} end={50} enableScrollSpy />+</p>
                        <p className='text'>Năm phát triển</p>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                        <img src="./image/thongke/chuongtrinh.png" alt="" />
                        <p className='number'><CountUp start={-1000000} end={100} enableScrollSpy />+</p>
                        <p className='text'>Chương trình online và offline</p>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                        <img src="./image/thongke/hocvien.png" alt="" />
                        <p className='number'><CountUp start={-1000000} end={1000000} enableScrollSpy />+</p>
                        <p className='text'>Học viên khắp mọi miền</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ThongKe