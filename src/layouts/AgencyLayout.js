import React, { useState } from 'react';
import { Layout, Menu, Button, Typography, Avatar, Dropdown, Space } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  ToolOutlined,
  MobileOutlined,
  SafetyOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SwapOutlined
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

const AgencyLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // 获取当前选中的菜单项
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes('/monitoring')) return '1';
    if (path.includes('/workorder')) return '2';
    if (path.includes('/device')) return '3';
    if (path.includes('/emergency')) return '4';
    return '1'; // 默认选中监控大屏
  };

  // 机构菜单项
  const items = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: <Link to="/agency/monitoring">集中监控大屏</Link>,
    },
    {
      key: '2',
      icon: <ToolOutlined />,
      label: <Link to="/agency/workorder">工单管理系统</Link>,
    },
    {
      key: '3',
      icon: <MobileOutlined />,
      label: <Link to="/agency/device">设备管理</Link>,
    },
    {
      key: '4',
      icon: <SafetyOutlined />,
      label: <Link to="/agency/emergency">应急联动模块</Link>,
    },
  ];

  // 用户下拉菜单
  const userMenu = {
    items: [
      {
        key: '1',
        label: '个人中心',
      },
      {
        key: '2',
        label: '账号设置',
      },
      {
        key: '3',
        label: '退出登录',
      },
    ],
  };

  return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#1890ff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="logo">智护银龄</div>
            <Title level={4} style={{ color: 'white', margin: 0 }}>智慧养老平台 - 机构管理</Title>
          </div>
          <Space>
            <Button
                type="primary"
                ghost
                icon={<SwapOutlined />}
                onClick={() => navigate('/user')}
            >
              切换到用户端
            </Button>
            <Dropdown menu={userMenu} placement="bottomRight">
              <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
            </Dropdown>
          </Space>
        </Header>
        <Layout>
          <Sider
              width={200}
              collapsible
              collapsed={collapsed}
              onCollapse={toggleCollapsed}
              breakpoint="lg"
              collapsedWidth={0}
              zeroWidthTriggerStyle={{ top: '64px' }}
              trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          >
            <Menu
                mode="inline"
                selectedKeys={[getSelectedKey()]}
                style={{ height: '100%', borderRight: 0 }}
                items={items}
            />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
                className="site-layout-content"
                style={{
                  padding: 24,
                  margin: '16px 0',
                  minHeight: 280,
                }}
            >
              <Outlet />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              智护银龄智慧养老平台 ©{new Date().getFullYear()} 上海大学lnfusion版权所有
            </Footer>
          </Layout>
        </Layout>
      </Layout>
  );
};

export default AgencyLayout;