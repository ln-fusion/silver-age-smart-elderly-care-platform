import React, { useState } from 'react';
import { Layout, Menu, Button, Typography, Avatar, Dropdown, Space } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  HeartOutlined,
  AlertOutlined,
  TeamOutlined,
  BankOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SwapOutlined
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // 获取当前选中的菜单项
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes('/health')) return '1';
    if (path.includes('/alert')) return '2';
    if (path.includes('/family')) return '3';
    if (path.includes('/community')) return '4';
    if (path.includes('/consultation')) return '5';
    return '1'; // 默认选中健康数据仪表盘
  };

  // 用户菜单项
  const items = [
    {
      key: '1',
      icon: <HeartOutlined />,
      label: <Link to="/user/health">健康数据仪表盘</Link>,
    },
    {
      key: '2',
      icon: <AlertOutlined />,
      label: <Link to="/user/alert">告警中心</Link>,
    },
    {
      key: '3',
      icon: <TeamOutlined />,
      label: <Link to="/user/family">亲情互动</Link>,
    },
    {
      key: '4',
      icon: <BankOutlined />,
      label: <Link to="/user/community">银龄社群</Link>,
    },
    {
      key: '5',
      icon: <MedicineBoxOutlined />,
      label: <Link to="/user/consultation">在线问诊</Link>,
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
            <Title level={4} style={{ color: 'white', margin: 0 }}>智慧养老平台</Title>
          </div>
          <Space>
            <Button
                type="primary"
                ghost
                icon={<SwapOutlined />}
                onClick={() => navigate('/agency')}
            >
              切换到机构端
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

export default UserLayout;