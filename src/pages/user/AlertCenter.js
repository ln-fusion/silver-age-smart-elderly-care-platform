import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Statistic as AntStatistic, Table, Tag, Badge, Space, Button, Tabs, Timeline, Empty, List, Avatar } from 'antd';
import { 
  AlertOutlined, 
  WarningOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  FireOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  BellOutlined
} from '@ant-design/icons';

// 导入模拟数据
import alertData from '../../mock/alertData.json';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const AlertCenter = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    // 在实际应用中，这里会从API获取数据
    setData(alertData);
  }, []);

  const columns = [
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
          icon = <FireOutlined />;
        } else if (text === '心率异常') {
          color = 'purple';
          icon = <HeartOutlined />;
        } else if (text === '电子围栏越界') {
          color = 'green';
          icon = <EnvironmentOutlined />;
        } else if (text === '紧急呼叫') {
          color = 'cyan';
          icon = <BellOutlined />;
        }
        
        return (
          <Tag color={color} icon={icon}>
            {text}
          </Tag>
        );
      },
      filters: [
        { text: '跌倒告警', value: '跌倒告警' },
        { text: '烟雾告警', value: '烟雾告警' },
        { text: '心率异常', value: '心率异常' },
        { text: '电子围栏越界', value: '电子围栏越界' },
        { text: '紧急呼叫', value: '紧急呼叫' },
      ],
      onFilter: (value, record) => record.type === String(value),
    },
    {
      title: '发生时间',
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
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
      },
      filters: [
        { text: '已处理', value: '已处理' },
        { text: '处理中', value: '处理中' },
        { text: '未处理', value: '未处理' },
      ],
      onFilter: (value, record) => record.status === String(value),
    },
    {
      title: '处理人员',
      dataIndex: 'handler',
      key: 'handler',
      render: (text) => text || '-',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link">查看详情</Button>
          {record.status !== '已处理' && (
            <Button type="link">联系家人</Button>
          )}
        </Space>
      ),
    },
  ];

  // 按状态分组告警数据
  const activeAlerts = data.filter(alert => alert.status !== '已处理');
  const historyAlerts = data.filter(alert => alert.status === '已处理');

  return (
    <div className="alert-center">
      <Title level={2}>告警中心</Title>
      <Paragraph>
        实时监控和管理各类告警信息，确保及时响应和处理。
      </Paragraph>
      
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="活跃告警"
              value={activeAlerts.length}
              valueStyle={{ color: activeAlerts.length > 0 ? '#faad14' : '#52c41a' }}
              prefix={<AlertOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="今日告警"
              value={data.filter(alert => {
                const today = new Date().toISOString().split('T')[0];
                return alert.time.startsWith(today);
              }).length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="已处理告警"
              value={historyAlerts.length}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="活跃告警" key="1">
          {activeAlerts.length > 0 ? (
            <Table 
              columns={columns} 
              dataSource={activeAlerts} 
              rowKey="id"
              pagination={false}
            />
          ) : (
            <Empty 
              image={Empty.PRESENTED_IMAGE_SIMPLE} 
              description="当前没有活跃告警"
            />
          )}
        </TabPane>
        <TabPane tab="历史告警" key="2">
          <Table 
            columns={columns} 
            dataSource={historyAlerts} 
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
        <TabPane tab="告警处理流程" key="3">
          <Card bordered={false}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Title level={4}>告警处理标准流程</Title>
                <Timeline>
                  <Timeline.Item color="red">
                    <Text strong>告警触发</Text>
                    <p>智能设备检测到异常情况并触发告警</p>
                  </Timeline.Item>
                  <Timeline.Item color="orange">
                    <Text strong>初步评估</Text>
                    <p>系统自动评估告警级别和紧急程度</p>
                  </Timeline.Item>
                  <Timeline.Item color="blue">
                    <Text strong>通知相关人员</Text>
                    <p>根据告警级别，通知护工、家属或医护人员</p>
                  </Timeline.Item>
                  <Timeline.Item color="purple">
                    <Text strong>现场处理</Text>
                    <p>相关人员到达现场进行处理</p>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                    <Text strong>记录与反馈</Text>
                    <p>记录处理结果，并向相关人员反馈</p>
                  </Timeline.Item>
                </Timeline>
              </Col>
              <Col xs={24} md={12}>
                <Title level={4}>紧急联系人</Title>
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    {
                      title: '唐医生（机构医生）',
                      phone: '13812345678',
                      avatar: ' https://tse2-mm.cn.bing.net/th?id=OIF-C.aA%2b2rvKU%2f5Jegx1aYH9e4w&w=194&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                    },
                    {
                      title: '李护士（责任护士）',
                      phone: '13987654321',
                      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                    },
                    {
                      title: 'bombardino crocodilo（子女）',
                      phone: '13500001111',
                      avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.S7KZEIZmLlQI88uyIMmHzgHaEK?w=291&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                    },
                    {
                      title: 'tung tung tung sahur（子女）',
                      phone: '13600002222',
                      avatar: 'https://uploads.dailydot.com/2025/04/tung-tung-sahur-meme-2.png?q=65&auto=format&w=1200'
                    },
                  ]}
                  renderItem={(item) => (
                    <List.Item actions={[<Button type="link">拨打电话</Button>]}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={item.title}
                        description={item.phone}
                      />
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

// 自定义统计组件
const Statistic = ({ title, value, valueStyle, prefix }) => {
  return (
    <div>
      <div style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '14px', marginBottom: '4px' }}>{title}</div>
      <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: '24px', ...valueStyle }}>
        {prefix && <span style={{ marginRight: '8px' }}>{prefix}</span>}
        {value}
      </div>
    </div>
  );
};

export default AlertCenter;
