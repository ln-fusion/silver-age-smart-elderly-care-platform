import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Statistic, Table, Tag, Badge, Space, Button, Tabs, Empty } from 'antd';
import { 
  DashboardOutlined, 
  UserOutlined, 
  AlertOutlined, 
  HomeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// 导入模拟数据
import monitoringData from '../../mock/monitoringData.json';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const MonitoringDashboard = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [data, setData] = useState({});
  
  useEffect(() => {
    // 在实际应用中，这里会从API获取数据
    setData(monitoringData);
  }, []);

  // 饼图颜色
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // 告警统计数据
  const alertData = [
    { name: '跌倒告警', value: data.alertStats?.fallAlerts || 0 },
    { name: '烟雾告警', value: data.alertStats?.smokeAlerts || 0 },
    { name: '心率异常', value: data.alertStats?.heartRateAlerts || 0 },
    { name: '电子围栏越界', value: data.alertStats?.geofenceAlerts || 0 },
    { name: '紧急呼叫', value: data.alertStats?.emergencyCalls || 0 }
  ];
  
  // 设备状态数据
  const deviceData = [
    { name: '在线', value: data.deviceStats?.online || 0 },
    { name: '离线', value: data.deviceStats?.offline || 0 },
    { name: '故障', value: data.deviceStats?.malfunction || 0 }
  ];
  
  // 老人分布数据
  const elderDistribution = [
    { name: '独居', value: data.elderStats?.livingAlone || 0 },
    { name: '与子女同住', value: data.elderStats?.livingWithChildren || 0 },
    { name: '与配偶同住', value: data.elderStats?.livingWithSpouse || 0 },
    { name: '养老院', value: data.elderStats?.nursingHome || 0 }
  ];
  
  // 最近告警数据
  const recentAlerts = data.recentAlerts || [];
  
  // 告警趋势数据
  const alertTrends = data.alertTrends || [];

  const alertColumns = [
    {
      title: '告警ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '告警类型',
      dataIndex: 'type',
      key: 'type',
      render: (text) => {
        let color = 'blue';
        let icon = <AlertOutlined />;
        
        if (text === '跌倒告警') {
          color = 'red';
          icon = <WarningOutlined />;
        } else if (text === '烟雾告警') {
          color = 'orange';
        } else if (text === '心率异常') {
          color = 'purple';
        } else if (text === '电子围栏越界') {
          color = 'green';
        }
        
        return (
          <Tag color={color} icon={icon}>
            {text}
          </Tag>
        );
      }
    },
    {
      title: '发生时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '老人姓名',
      dataIndex: 'elderName',
      key: 'elderName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let status = 'default';
        if (text === '已处理') status = 'success';
        if (text === '处理中') status = 'processing';
        if (text === '未处理') status = 'warning';
        return <Badge status={status} text={text} />;
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link">查看详情</Button>
          {record.status !== '已处理' && (
            <Button type="link">处理</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="monitoring-dashboard">
      <Title level={2}>集中监控大屏</Title>
      <Paragraph>
        实时监控养老机构内老人状态、设备运行和告警信息。
      </Paragraph>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="在管老人"
              value={data.elderStats?.total || 0}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="今日告警"
              value={data.alertStats?.today || 0}
              prefix={<AlertOutlined />}
              valueStyle={{ color: data.alertStats?.today > 0 ? '#cf1322' : '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="设备总数"
              value={data.deviceStats?.total || 0}
              prefix={<DashboardOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Card style={{ marginTop: 16 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane 
            tab={
              <span>
                <AlertOutlined />
                告警监控
              </span>
            } 
            key="1"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card title="告警类型分布" bordered={false}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={alertData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {alertData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card title="告警趋势" bordered={false}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={alertTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="count" name="告警数量" stroke="#ff7300" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>
            
            <Card title="最近告警" style={{ marginTop: 16 }}>
              <Table 
                columns={alertColumns} 
                dataSource={recentAlerts} 
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <UserOutlined />
                老人监控
              </span>
            } 
            key="2"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card title="老人分布情况" bordered={false}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={elderDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {elderDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card title="老人年龄分布" bordered={false}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.ageDistribution || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="人数" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>
            
            <Card title="老人健康状况" style={{ marginTop: 16 }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Card bordered={false}>
                    <Statistic
                      title="健康状况良好"
                      value={data.healthStats?.good || 0}
                      valueStyle={{ color: '#3f8600' }}
                      prefix={<CheckCircleOutlined />}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card bordered={false}>
                    <Statistic
                      title="需要关注"
                      value={data.healthStats?.attention || 0}
                      valueStyle={{ color: '#faad14' }}
                      prefix={<ClockCircleOutlined />}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card bordered={false}>
                    <Statistic
                      title="需要干预"
                      value={data.healthStats?.intervention || 0}
                      valueStyle={{ color: '#cf1322' }}
                      prefix={<WarningOutlined />}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <DashboardOutlined />
                设备监控
              </span>
            } 
            key="3"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card title="设备状态分布" bordered={false}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#52c41a" /> {/* 在线 */}
                        <Cell fill="#faad14" /> {/* 离线 */}
                        <Cell fill="#f5222d" /> {/* 故障 */}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card title="设备类型分布" bordered={false}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.deviceTypeDistribution || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="数量" fill="#1890ff" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>
            
            <Card title="设备电量状态" style={{ marginTop: 16 }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Card bordered={false}>
                    <Statistic
                      title="电量充足"
                      value={data.batteryStats?.good || 0}
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card bordered={false}>
                    <Statistic
                      title="电量不足"
                      value={data.batteryStats?.low || 0}
                      valueStyle={{ color: '#faad14' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card bordered={false}>
                    <Statistic
                      title="需要充电"
                      value={data.batteryStats?.critical || 0}
                      valueStyle={{ color: '#cf1322' }}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <HomeOutlined />
                区域监控
              </span>
            } 
            key="4"
          >
            <Card>
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 160 }}
                description="区域监控地图正在建设中"
              >
                <Button type="primary">敬请期待</Button>
              </Empty>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default MonitoringDashboard;
