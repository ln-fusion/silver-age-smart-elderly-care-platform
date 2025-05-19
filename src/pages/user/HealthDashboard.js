import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Statistic as AntStatistic, Progress, Tabs } from 'antd';
import { 
  HeartOutlined, 
  DashboardOutlined, 
  StepForwardOutlined, 
  RestOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// 导入模拟数据
import healthData from '../../mock/healthData.json';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const HealthDashboard = () => {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    // 在实际应用中，这里会从API获取数据
    setData(healthData);
  }, []);

  // 心率数据
  const heartRateData = data.heartRate?.data || [];
  const currentHeartRate = heartRateData.length > 0 ? heartRateData[heartRateData.length - 1].value : 0;
  const heartRateStatus = currentHeartRate < 60 ? 'low' : currentHeartRate > 100 ? 'high' : 'normal';
  
  // 血氧数据
  const bloodOxygenData = data.bloodOxygen?.data || [];
  const currentBloodOxygen = bloodOxygenData.length > 0 ? bloodOxygenData[bloodOxygenData.length - 1].value : 0;
  const bloodOxygenStatus = currentBloodOxygen < 95 ? 'low' : 'normal';
  
  // 血压数据
  const bloodPressureData = data.bloodPressure?.data || [];
  const currentSystolic = bloodPressureData.length > 0 ? bloodPressureData[bloodPressureData.length - 1].systolic : 0;
  const currentDiastolic = bloodPressureData.length > 0 ? bloodPressureData[bloodPressureData.length - 1].diastolic : 0;
  const bloodPressureStatus = 
    currentSystolic > 140 || currentDiastolic > 90 ? 'high' : 
    currentSystolic < 90 || currentDiastolic < 60 ? 'low' : 'normal';
  
  // 步数数据
  const stepsData = data.steps?.data || [];
  const currentSteps = stepsData.length > 0 ? stepsData[stepsData.length - 1].value : 0;
  const stepsGoal = data.steps?.goal || 8000;
  const stepsPercentage = Math.min(Math.round((currentSteps / stepsGoal) * 100), 100);
  
  // 睡眠数据
  const sleepData = data.sleep?.data || [];
  const currentSleep = sleepData.length > 0 ? sleepData[sleepData.length - 1].value : 0;
  const sleepGoal = data.sleep?.goal || 8;
  const sleepPercentage = Math.min(Math.round((currentSleep / sleepGoal) * 100), 100);

  // 血压图表数据转换
  const bloodPressureChartData = bloodPressureData.map(item => ({
    time: item.time,
    收缩压: item.systolic,
    舒张压: item.diastolic
  }));

  return (
    <div className="health-dashboard">
      <Title level={2}>健康数据仪表盘</Title>
      <Paragraph>
        实时监测和展示您的健康指标，帮助您和家人了解身体状况。
      </Paragraph>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="心率"
              value={currentHeartRate}
              suffix="次/分钟"
              valueStyle={{ 
                color: heartRateStatus === 'normal' ? '#3f8600' : 
                       heartRateStatus === 'high' ? '#cf1322' : '#1890ff' 
              }}
              prefix={<HeartOutlined />}
            />
            <div style={{ marginTop: 10 }}>
              {heartRateStatus === 'normal' ? (
                <Text type="success">心率正常</Text>
              ) : heartRateStatus === 'high' ? (
                <Text type="danger">心率偏高 <ArrowUpOutlined /></Text>
              ) : (
                <Text type="warning">心率偏低 <ArrowDownOutlined /></Text>
              )}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="血氧饱和度"
              value={currentBloodOxygen}
              suffix="%"
              valueStyle={{ 
                color: bloodOxygenStatus === 'normal' ? '#3f8600' : '#cf1322'
              }}
              prefix={<DashboardOutlined />}
            />
            <div style={{ marginTop: 10 }}>
              {bloodOxygenStatus === 'normal' ? (
                <Text type="success">血氧正常</Text>
              ) : (
                <Text type="danger">血氧偏低 <ArrowDownOutlined /></Text>
              )}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="血压"
              value={`${currentSystolic}/${currentDiastolic}`}
              suffix="mmHg"
              valueStyle={{ 
                color: bloodPressureStatus === 'normal' ? '#3f8600' : 
                       bloodPressureStatus === 'high' ? '#cf1322' : '#1890ff'
              }}
            />
            <div style={{ marginTop: 10 }}>
              {bloodPressureStatus === 'normal' ? (
                <Text type="success">血压正常</Text>
              ) : bloodPressureStatus === 'high' ? (
                <Text type="danger">血压偏高 <ArrowUpOutlined /></Text>
              ) : (
                <Text type="warning">血压偏低 <ArrowDownOutlined /></Text>
              )}
            </div>
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12}>
          <Card bordered={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={4} style={{ marginBottom: 0 }}>今日步数</Title>
                <Text>{currentSteps} 步</Text>
              </div>
              <StepForwardOutlined style={{ fontSize: 24, color: '#1890ff' }} />
            </div>
            <Progress percent={stepsPercentage} status="active" />
            <Text type="secondary">目标: {stepsGoal} 步</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card bordered={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={4} style={{ marginBottom: 0 }}>昨晚睡眠</Title>
                <Text>{currentSleep} 小时</Text>
              </div>
              <RestOutlined style={{ fontSize: 24, color: '#722ed1' }} />
            </div>
            <Progress percent={sleepPercentage} status="active" strokeColor="#722ed1" />
            <Text type="secondary">目标: {sleepGoal} 小时</Text>
          </Card>
        </Col>
      </Row>
      
      <Card style={{ marginTop: 16 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="心率趋势" key="1">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={heartRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" name="心率" stroke="#ff7300" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </TabPane>
          <TabPane tab="血氧趋势" key="2">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={bloodOxygenData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[90, 100]} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="value" name="血氧" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </TabPane>
          <TabPane tab="血压趋势" key="3">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bloodPressureChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="收缩压" stroke="#ff7300" />
                <Line type="monotone" dataKey="舒张压" stroke="#387908" />
              </LineChart>
            </ResponsiveContainer>
          </TabPane>
          <TabPane tab="步数统计" key="4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stepsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="步数" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </TabPane>
          <TabPane tab="睡眠统计" key="5">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="睡眠时长" fill="#722ed1" />
              </BarChart>
            </ResponsiveContainer>
          </TabPane>
        </Tabs>
      </Card>
      
      <Card style={{ marginTop: 16 }}>
        <Title level={4}>健康建议</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card title="饮食建议" bordered={false}>
              <ul>
                <li>多摄入新鲜蔬果</li>
                <li>控制盐分摄入</li>
                <li>保持充分水分</li>
                <li>避免过度加工食品</li>
              </ul>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="运动建议" bordered={false}>
              <ul>
                <li>每日散步30分钟</li>
                <li>适当进行太极练习</li>
                <li>避免剧烈运动</li>
                <li>保持规律活动</li>
              </ul>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="用药提醒" bordered={false}>
              <ul>
                <li>早餐后服用降压药</li>
                <li>晚餐后服用降脂药</li>
                <li>按时测量血压</li>
                <li>记录药物反应</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

// 自定义统计组件
const Statistic = ({ title, value, suffix, valueStyle, prefix }) => {
  return (
    <div>
      <div style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '14px', marginBottom: '4px' }}>{title}</div>
      <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: '24px', ...valueStyle }}>
        {prefix && <span style={{ marginRight: '8px' }}>{prefix}</span>}
        {value}
        {suffix && <span style={{ marginLeft: '8px', fontSize: '16px' }}>{suffix}</span>}
      </div>
    </div>
  );
};

export default HealthDashboard;
