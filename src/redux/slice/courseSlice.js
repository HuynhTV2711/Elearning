import { createSlice } from '@reduxjs/toolkit'
import { quanLiKhoaHocServ } from '../../services/quanLiKhoaHocServ';

const initialState = {
    listCourse:{},
}

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    layDsKhoaHocPhanTrang:(state, action)=>{
        console.log(action);
        state.listCourse = action.payload
    }
  }
});

export const {layDsKhoaHocPhanTrang} = courseSlice.actions

export default courseSlice.reducer

export const getAllCourseApi = (page)=>{
    return async (dispatch, getSate)=>{
        try {
            quanLiKhoaHocServ
            .layDanhSachKhoaHocPhanTrang(page)
            .then((result) => {
                const action = layDsKhoaHocPhanTrang(result.data);
                dispatch(action)
                console.log(result.data);
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);
        }
    }
  }