/*
 * @Author: Jesslynwong jesslynwjx@gmail.com
 * @Date: 2024-09-13 14:17:57
 * @LastEditors: Jesslynwong jesslynwjx@gmail.com
 * @LastEditTime: 2024-10-10 14:39:48
 * @FilePath: /dataVis/src/page/Layout/index.tsx
 */
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

export default function MainLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const items: MenuItem[] = [
    {
      label: "Upload 📝",
      key: "Upload",
      onClick: () => {
        navigate("/");
      },
    },
    {
      label: "Statistics 📈",
      key: "Statistics",
      onClick: () => {
        navigate("/statistics");
      },
    },
    {
      label: "Ideas 🌟",
      key: "Ideas",
      onClick: () => {
        navigate("/ideas");
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content
        style={{
          margin: "0 48px",
          background: colorBgContainer,
          minHeight: 601,
          borderRadius: borderRadiusLG,
        }}
      >
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        NeuroViz ©{new Date().getFullYear()} Created by C2E
      </Footer>
    </Layout>
  );
}
