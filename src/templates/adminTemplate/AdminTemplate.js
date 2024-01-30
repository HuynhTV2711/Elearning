import React, { useEffect } from "react";
// import Tabs from "./Tabs";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import BackTop from "@uiw/react-back-top";
import { useSelector } from "react-redux";
import { message } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserAddOutlined,
  UserOutlined,
  FormOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useState } from "react";
const { Header, Sider, Content } = Layout;

const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const location = useLocation();
  useEffect(() => {
    if (user) {
      if (user.maLoaiNguoiDung != "GV") {
        messageApi.open({
          type: "error",
          content: "Vui lòng đăng nhập tài khoản quản trị viên",
        });
        setTimeout(() => {
          // đưa về đường dẫn web bạn muốn
          window.location.href = "/login";
        }, 2000);
      }
    }
    // chưa đăng nhập
    else {
      navigate("/login");
    }
  }, [location.pathname]);
  return (
    <>
      {contextHolder}
      <div className="container-fluid quan_li">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-12">
            <Layout className="min-h-screen">
              <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={["2"]}
                  items={[
                    {
                      key: "1",
                      icon: <HomeOutlined />,
                      label: <Link to={"/"}>Trang chủ</Link>,
                    },
                    {
                      key: "2",
                      icon: <UserOutlined />,
                      label: <Link to={"/admin"}>Quản lí người dùng</Link>,
                    },
                    {
                      key: "3",
                      icon: <UserAddOutlined />,
                      label: (
                        <Link to={"/admin/themnguoidung"}>Thêm người dùng</Link>
                      ),
                    },
                    {
                      key: "4",
                      icon: <FormOutlined />,
                      label: (
                        <Link to={"/admin/quanlikhoahoc"}>
                          Quản lí khóa học
                        </Link>
                      ),
                    },
                    {
                      key: "5",
                      icon: <FormOutlined />,
                      label: (
                        <Link to={"/admin/themkhoahoc"}>Thêm khóa học</Link>
                      ),
                    },
                  ]}
                />
              </Sider>
              <Layout>
                <Header
                  style={{
                    padding: 0,
                    background: colorBgContainer,
                  }}
                >
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />
                </Header>
                <Content
                  style={{
                    margin: "24px 16px",
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <Outlet />
                </Content>
              </Layout>
            </Layout>
          </div>
        </div>
        <BackTop
          style={{
            backgroundColor: "#0082C8",
            color: "#FFFFFF",
            borderRadius: "10px",
            padding: "7px 10px",
            border: "0.5px solid #FFFFFF",
          }}
          step={100}
          speed={10}
          content={
            <div>
              <i class="fa-solid fa-chevron-up"></i>
            </div>
          }
        />
      </div>
    </>
  );
};

export default AdminTemplate;
