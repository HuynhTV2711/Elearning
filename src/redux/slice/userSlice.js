import { createSlice } from '@reduxjs/toolkit'
import { getLocal } from '../../utils/local';
import { quanLiNguoiDungServ } from '../../services/quanLiNguoiDungServ';
const initialState = {
    user: getLocal("user_infor"),
    listAllUser: [],
    userPhanTrang: [],
    page: 1
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveInforUser: (state, action)=>{
    state.user = action.payload
  },
    // getAllUser: (state, action)=>{
    //   console.log(action);
    //   state.listAllUser = action.payload;
    // }
}
});

export const {saveInforUser, getAllUser, getAllUserPhanTrang} = userSlice.actions
export default userSlice.reducer

// export const getAllUserAPI = (page)=>{
//   return async(dispatch, getState)=>{
//     try {
//       quanLiNguoiDungServ
//       .layDanhSachNguoiDungPhanTrang(page)
//       .then((result) => {
//         const action = getAllUser(result.data);
//         dispatch(action)
//         console.log(result);
//       }).catch((err) => {
//         console.log(err);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
