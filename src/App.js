import './styles/style.scss'
import { Route, Routes } from "react-router-dom";
import UserTemplate from "./templates/userTemplate/UserTemplate";
import HomePage from "./pages/HomePage/HomePage";
import ChiTietKhoaHoc from "./pages/ChiTietKhoaHoc/ChiTietKhoaHoc";
import KhoaHocTheoDanhMuc from "./pages/KhoaHocTheoDanhMuc/KhoaHocTheoDanhMuc";
import Login from "./pages/LoginPage/Login";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Page404 from "./pages/404Page/Page404";
import AdminTemplate from "./templates/adminTemplate/AdminTemplate";
import Tabs from "./templates/adminTemplate/Tabs";
import QuanLiNguoiDung from "./templates/adminTemplate/QuanLiNguoiDung";
import QuanLiKhoaHoc from "./templates/adminTemplate/QuanLiKhoaHoc";
import ThongTinCaNhan from './pages/ThongTinCaNhan/ThongTinCaNhan';
import ThemNguoiDung from './templates/adminTemplate/ThemNguoiDung';

function App() {
  return (
    <>
      <Routes>
        <Route element={<UserTemplate />} path="/">
          <Route element={<HomePage/>} index/>
          <Route element={<ChiTietKhoaHoc/>} path="chitietkhoahoc/:maKhoaHoc"/>
          <Route element={<KhoaHocTheoDanhMuc/>} path="khoaHocTheoDanhMuc/:maDanhMuc"/>
          <Route element={<ThongTinCaNhan/>} path='thongtincanhan'/>
        </Route>
        <Route element={<AdminTemplate/>} path="/admin">
          <Route element={<QuanLiNguoiDung/>} index/>
          <Route element={<QuanLiKhoaHoc/>} path="quanlikhoahoc"/>
          <Route element={<ThemNguoiDung/>} path='themnguoidung'/>
        </Route>
        <Route element={<Login/>} path="login"/>
        <Route element={<RegisterPage/>} path="register"/>
        <Route element={<Page404/>} path="404page"/>
      </Routes>
    </>
  );
}

export default App;
