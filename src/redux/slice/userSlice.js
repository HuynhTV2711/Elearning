import { createSlice } from '@reduxjs/toolkit'
import { getLocal } from '../../utils/local';
import { quanLiNguoiDungServ } from '../../services/quanLiNguoiDungServ';
const initialState = {
    user: getLocal("user_infor"),
    listUser: {},
    dsHocVien: [],
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveInforUser: (state, action)=>{
    state.user = action.payload
  },
    getAllUser: (state, action)=>{
      // console.log(action);
      state.listUser  = action.payload;
    },
    layDSHocVien: (state, action)=>{
      state.dsHocVien = action.payload;
    }
}
});

export const {saveInforUser, getAllUser, layDSHocVien, layDSHocVienCHoDuyet} = userSlice.actions
export default userSlice.reducer

export const getAllUserApi = (page)=>{
  return async (dispatch, getSate)=>{
      try {
          quanLiNguoiDungServ
          .layDanhSachNguoiDungPhanTrang(page)
          .then((result) => {
            const action = getAllUser(result.data);
          dispatch(action)
          }).catch((err) => {
            console.log(err);
          });
          
      } catch (error) {
          console.log(error);
      }
  }
}

export const layDanhSachHocVien = ()=>{
  return async (dispatch, getSate)=>{
      try {
          quanLiNguoiDungServ
          .layDanhSachNguoiDung()
          .then((result) => {
            const action = layDSHocVien(result.data);
          dispatch(action)
          }).catch((err) => {
            console.log(err);
          });
          
      } catch (error) {
          console.log(error);
      }
  }
}

