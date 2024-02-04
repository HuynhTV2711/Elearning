import { createSlice } from '@reduxjs/toolkit'
import { quanLiKhoaHocServ } from '../../services/quanLiKhoaHocServ';

const initialState = {
    listCourse:{},
    danhMucKhoaHoc: []
}

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    layDsKhoaHocPhanTrang:(state, action)=>{
        // console.log(action);
        state.listCourse = action.payload
    },
    layDanhMucKhoaHoc:(state, action)=>{
        state.danhMucKhoaHoc = action.payload
    }
  }
});

export const {layDsKhoaHocPhanTrang, layDanhMucKhoaHoc} = courseSlice.actions

export default courseSlice.reducer

export const getAllCourseApi = (page)=>{
    return async (dispatch, getSate)=>{
        try {
            quanLiKhoaHocServ
            .layDanhSachKhoaHocPhanTrang(page)
            .then((result) => {
                const action = layDsKhoaHocPhanTrang(result.data);
                dispatch(action)
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);
        }
    }
  }

  export const layDanhMucKhoaHocAPI = ()=>{
    return async (dispatch, getSate)=>{
        try {
            quanLiKhoaHocServ
            .layDanhMucKhoaHoc()
            .then((result) => {
                const action = layDanhMucKhoaHoc(result.data);
                dispatch(action)
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);
        }
    }
  }