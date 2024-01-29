import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourseApi } from "../../redux/slice/courseSlice";
import { renderPageNumbers } from "../../utils/pagination";

const DanhSachKhoaHoc = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  let { listCourse } = useSelector((state) => state.courseSlice);
  console.log(listCourse);
  const dispatch = useDispatch();
  useEffect(() => {
    const actionThunk = getAllCourseApi(page);
    dispatch(actionThunk);
  }, [page]);
  const totalPages = listCourse.totalPages;
  let phanTrang = renderPageNumbers(page, totalPages, setPage)
  return (
    <div className="danh_sach_khoa_hoc" id="dskh">
      <div className="container">
        <h2 className="text-center title">
          <i class="fa-solid fa-list me-3"></i>Danh sách khóa học
        </h2>
        <div className="row course_container">
          {listCourse.items?.map((item, index) => {
            return (
              <div className="col-lg-4 col-sm-6 col-12">
                <div className=" course_item">
                  <img
                    src={item.hinhAnh}
                    className="img_item"
                    alt={item.tenKhoaHoc}
                  />
                  <div className="course_item_content">
                    <div className="course-body">
                      <h5 className="course_title">{item.tenKhoaHoc}</h5>
                      <div className="rate">
                        <i class="fa-solid fa-star"></i>
                        <p>4.5</p>
                      </div>
                    </div>
                    <div className="course_footer">
                      <span class="price">12.000.000</span>
                      <a
                        className="course_btn"
                        onClick={() => {
                          navigate(`/chiTietKhoaHoc/${item.maKhoaHoc}`);
                        }}
                      >
                        Chi tiết
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-end mt-4">
        <Pagination>
            <Pagination.First
              onClick={() => setPage(1)}
              disabled={page === 1}
            />
            <Pagination.Prev
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            />
            {phanTrang}
            <Pagination.Next
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            />
            <Pagination.Last
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default DanhSachKhoaHoc;
