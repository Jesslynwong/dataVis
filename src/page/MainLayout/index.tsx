/*
 * @Author: Jesslynwong jesslynwjx@gmail.com
 * @Date: 2024-09-13 14:17:57
 * @LastEditors: Jesslynwong jesslynwjx@gmail.com
 * @LastEditTime: 2024-09-13 14:37:46
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
      const navigate = useNavigate()
      const items: MenuItem[] = [
        {
          label: "Upload",
          key: "Upload",
          onClick: () => {navigate("/")},
        },
        {
          label: "Statistics",
          key: "Statistics",
          onClick: () => {navigate("/statistics")},
        },
        {
          label: "Ideas",
          key: "Ideas",
          onClick: () => {navigate("/ideas")},
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
          <Content style={{ padding: "0 48px" }}>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 601,
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      );
}
