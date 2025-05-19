import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Tabs, List, Avatar, Button, Tag, Space, Divider, Image } from 'antd';
import { 
  TeamOutlined, 
  VideoCameraOutlined, 
  EnvironmentOutlined, 
  HeartOutlined,
  CalendarOutlined,
  MessageOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const FamilyInteraction = () => {
  const [activeTab, setActiveTab] = useState("1");
  
  // 模拟家人列表数据
  const familyMembers = [
    {
      id: '1',
      name: 'tung tung tung sahur',
      relation: '儿子',
      avatar: 'https://uploads.dailydot.com/2025/04/tung-tung-sahur-meme-2.png?q=65&auto=format&w=1200',
      lastContact: '今天 10:30',
      phone: '13812345678'
    },
    {
      id: '2',
      name: 'trallalero tralala',
      relation: '女儿',
      avatar: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.3EZGm9tMqWZP7S-geHzVrQHaHa?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      lastContact: '昨天 18:45',
      phone: '13987654321'
    },
    {
      id: '3',
      name: 'bombardino crocodilo',
      relation: '孙子',
      avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.S7KZEIZmLlQI88uyIMmHzgHaEK?w=291&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      lastContact: '3天前',
      phone: '13500001111'
    }
  ];
  
  // 模拟健康计划数据
  const healthPlans = [
    {
      id: '1',
      title: '每日散步计划',
      creator: 'tung tung tung sahur',
      status: '进行中',
      progress: 60,
      description: '每天早晚各散步30分钟，保持身体活力。',
      startDate: '2023-05-01',
      endDate: '2023-05-31'
    },
    {
      id: '2',
      title: '血压监测计划',
      creator: 'trallalero tralala',
      status: '进行中',
      progress: 80,
      description: '每天早晚各测量一次血压，记录在健康日志中。',
      startDate: '2023-05-01',
      endDate: '2023-05-31'
    },
    {
      id: '3',
      title: '营养均衡饮食',
      creator: 'bombardino crocodilo',
      status: '已完成',
      progress: 100,
      description: '按照营养师建议的食谱准备一日三餐，确保营养均衡。',
      startDate: '2023-04-01',
      endDate: '2023-04-30'
    }
  ];
  
  // 模拟位置信息
  const locationInfo = {
    address: '月之森',
    lastUpdate: '今天 14:30',
    safeZones: [
      { name: '家', radius: '100米', status: '在区域内' },
      { name: '社区公园', radius: '200米', status: '不在区域内' },
      { name: '社区活动中心', radius: '300米', status: '不在区域内' }
    ]
  };

  return (
    <div className="family-interaction">
      <Title level={2}>亲情互动</Title>
      <Paragraph>
        与家人保持紧密联系，共同关注健康状况和日常生活。
      </Paragraph>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane 
          tab={
            <span>
              <TeamOutlined />
              家人联系
            </span>
          } 
          key="1"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={16}>
              <Card title="家人列表" extra={<Button type="primary">添加家人</Button>}>
                <List
                  itemLayout="horizontal"
                  dataSource={familyMembers}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Button type="primary" icon={<VideoCameraOutlined />}>视频通话</Button>,
                        <Button icon={<MessageOutlined />}>发送消息</Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} size={64} />}
                        title={<Text strong>{item.name}</Text>}
                        description={
                          <Space direction="vertical">
                            <Text>关系：{item.relation}</Text>
                            <Text>电话：{item.phone}</Text>
                            <Text type="secondary">上次联系：{item.lastContact}</Text>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card title="最近通话记录">
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    { name: 'trallalero tralala', time: '今天 10:30', duration: '15分钟', type: '视频' },
                    { name: 'tung tung tung sahur', time: '昨天 18:45', duration: '10分钟', type: '语音' },
                    { name: 'trallalero tralala', time: '3天前', duration: '20分钟', type: '视频' }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={item.type === '视频' ? <VideoCameraOutlined /> : <MessageOutlined />} />}
                        title={`${item.name} - ${item.type}通话`}
                        description={`${item.time} · ${item.duration}`}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <EnvironmentOutlined />
              实时位置
            </span>
          } 
          key="2"
        >
          <Card title="当前位置信息">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={16}>
                <div style={{ background: '#f0f2f5', padding: '20px', borderRadius: '4px', marginBottom: '16px' }}>
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <Image 
                      src="data:image/jpeg;base64,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"
                      alt="位置地图"
                      style={{ maxWidth: '100%', height: 'auto' }}
                      fallback="data:image/png;base64,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"
                    />
                  </div>
                </div>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Text strong>当前位置：</Text>
                  <Text>{locationInfo.address}</Text>
                  <Text type="secondary">最后更新时间：{locationInfo.lastUpdate}</Text>
                </Space>
              </Col>
              <Col xs={24} md={8}>
                <Card title="安全区域" size="small">
                  <List
                    dataSource={locationInfo.safeZones}
                    renderItem={item => (
                      <List.Item
                        extra={
                          <Tag color={item.status === '在区域内' ? 'green' : 'orange'}>
                            {item.status}
                          </Tag>
                        }
                      >
                        <List.Item.Meta
                          title={item.name}
                          description={`范围：${item.radius}`}
                        />
                      </List.Item>
                    )}
                  />
                  <Button type="primary" block style={{ marginTop: '16px' }}>添加安全区域</Button>
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <HeartOutlined />
              健康计划
            </span>
          } 
          key="3"
        >
          <Card title="协同健康计划" extra={<Button type="primary">创建新计划</Button>}>
            <List
              itemLayout="vertical"
              dataSource={healthPlans}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button>查看详情</Button>,
                    <Button type="primary">更新进度</Button>
                  ]}
                  extra={
                    <Tag color={
                      item.status === '进行中' ? 'processing' : 
                      item.status === '已完成' ? 'success' : 'default'
                    }>
                      {item.status}
                    </Tag>
                  }
                >
                  <List.Item.Meta
                    title={item.title}
                    description={
                      <Space direction="vertical">
                        <Text>创建人：{item.creator}</Text>
                        <Text>时间段：{item.startDate} 至 {item.endDate}</Text>
                        <Text>完成进度：{item.progress}%</Text>
                      </Space>
                    }
                  />
                  <Paragraph>{item.description}</Paragraph>
                  <div style={{ width: '100%', background: '#f0f0f0', height: '8px', borderRadius: '4px' }}>
                    <div 
                      style={{ 
                        width: `${item.progress}%`, 
                        background: item.progress === 100 ? '#52c41a' : '#1890ff', 
                        height: '8px',
                        borderRadius: '4px'
                      }} 
                    />
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <CalendarOutlined />
              日程提醒
            </span>
          } 
          key="4"
        >
          <Card title="重要日程" extra={<Button type="primary">添加提醒</Button>}>
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: '体检预约', time: '2023-05-20 09:30', location: '社区医院', creator: 'tung tung tung sahur', type: '医疗' },
                { title: '家庭聚餐', time: '2023-05-25 18:00', location: '家中', creator: 'trallalero tralala', type: '家庭' },
                { title: '社区活动', time: '2023-05-30 15:00', location: '社区活动中心', creator: '社区工作人员', type: '活动' }
              ]}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button>编辑</Button>,
                    <Button>设置提醒</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: 
                        item.type === '医疗' ? '#1890ff' : 
                        item.type === '家庭' ? '#52c41a' : '#722ed1' 
                      }}>
                        {item.type.charAt(0)}
                      </Avatar>
                    }
                    title={item.title}
                    description={
                      <Space direction="vertical">
                        <Text>时间：{item.time}</Text>
                        <Text>地点：{item.location}</Text>
                        <Text type="secondary">创建人：{item.creator}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FamilyInteraction;
