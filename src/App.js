import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

// 导入布局组件
import UserLayout from './layouts/UserLayout';
import AgencyLayout from './layouts/AgencyLayout';

// 导入用户端页面
import HealthDashboard from './pages/user/HealthDashboard';
import AlertCenter from './pages/user/AlertCenter';
import FamilyInteraction from './pages/user/FamilyInteraction';
import ElderCommunity from './pages/user/ElderCommunity';
import OnlineConsultation from './pages/user/OnlineConsultation';

// 导入机构端页面
import MonitoringDashboard from './pages/agency/MonitoringDashboard';
import WorkOrderManagement from './pages/agency/WorkOrderManagement';
import DeviceManagement from './pages/agency/DeviceManagement';
import EmergencyLinkage from './pages/agency/EmergencyLinkage';

function App() {
  return (
      <ConfigProvider locale={zhCN}>
        <Router>
          <Routes>
            {/* 用户端路由 */}
            <Route path="/user/*" element={<UserLayout />}>
              <Route index element={<HealthDashboard />} />
              <Route path="health" element={<HealthDashboard />} />
              <Route path="alert" element={<AlertCenter />} />
              <Route path="family" element={<FamilyInteraction />} />
              <Route path="community" element={<ElderCommunity />} />
              <Route path="consultation" element={<OnlineConsultation />} />
            </Route>

            {/* 机构端路由 */}
            <Route path="/agency/*" element={<AgencyLayout />}>
              <Route index element={<MonitoringDashboard />} />
              <Route path="monitoring" element={<MonitoringDashboard />} />
              <Route path="workorder" element={<WorkOrderManagement />} />
              <Route path="device" element={<DeviceManagement />} />
              <Route path="emergency" element={<EmergencyLinkage />} />
            </Route>

            {/* 默认重定向 */}
            <Route path="/" element={<Navigate to="/user" replace />} />
          </Routes>
        </Router>
      </ConfigProvider>
  );
}

export default App;