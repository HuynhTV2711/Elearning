import { Route, Routes } from "react-router-dom";
import UserTemplate from "./templates/userTemplate/UserTemplate";
import HomePage from "./pages/HomePage/HomePage";
import ChiTietKhoaHoc from "./pages/ChiTietKhoaHoc/ChiTietKhoaHoc";
import KhoaHocTheoDanhMuc from "./pages/KhoaHocTheoDanhMuc/KhoaHocTheoDanhMuc";
import Login from "./pages/LoginPage/Login";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Page404 from "./pages/404Page/Page404";

function App() {
  return (
    <>
      <Routes>
        <Route element={<UserTemplate />} path="/">
          <Route element={<HomePage/>} index/>
          <Route element={<ChiTietKhoaHoc/>} path="chitietkhoahoc/:maKhoaHoc"/>
          <Route element={<KhoaHocTheoDanhMuc/>} path="khoaHocTheoDanhMuc/:maDanhMuc"/>
        </Route>
        <Route element={<Login/>} path="login"/>
        <Route element={<RegisterPage/>} path="register"/>
        <Route element={<Page404/>} path="404page"/>
      </Routes>
    </>
  );
}

export default App;
