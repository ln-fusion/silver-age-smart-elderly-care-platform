import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Tabs, List, Avatar, Button, Tag, Space, Calendar, Badge } from 'antd';
import {
  TeamOutlined,
  CalendarOutlined,
  TrophyOutlined,
  ReadOutlined,
  UserOutlined
} from '@ant-design/icons';

// 导入模拟数据
import communityData from '../../mock/communityData.json';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const ElderCommunity = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [activities, setActivities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [socialGroups, setSocialGroups] = useState([]);

  useEffect(() => {
    // 在实际应用中，这里会从API获取数据
    if (communityData) {
      setActivities(communityData.filter(item => item.type === '活动'));
      setCourses(communityData.filter(item => item.type === '课程'));
      setSocialGroups(communityData.filter(item => item.type === '兴趣小组'));
    }
  }, []);

  // 日历数据处理
  const getListData = (value) => {
    const date = value.format('YYYY-MM-DD');
    const matchingActivities = activities.filter(item =>
      item.date === date || (item.recurringDays && item.recurringDays.includes(value.day()))
    );

    return matchingActivities.map(item => ({
      type: item.status === '已结束' ? 'default' :
            item.status === '进行中' ? 'processing' :
            item.status === '即将开始' ? 'warning' : 'success',
      content: item.title
    }));
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="elder-community">
      <Title level={2}>银龄社群</Title>
      <Paragraph>
        参与社区活动，结交志同道合的朋友，丰富晚年生活。
      </Paragraph>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane
          tab={
            <span>
              <CalendarOutlined />
              活动日历
            </span>
          }
          key="1"
        >
          <Card>
            <Calendar dateCellRender={dateCellRender} />
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <TeamOutlined />
              社区活动
            </span>
          }
          key="2"
        >
          <Row gutter={[16, 16]}>
            {activities.map(activity => (
              <Col xs={24} sm={12} md={8} key={activity.id}>
                <Card
                  hoverable
                  cover={
                    <div style={{ height: 160, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' }}>
                      <img
                        alt={activity.title}
                        src={activity.image || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                        style={{ width: '100%' }}
                      />
                    </div>
                  }
                  actions={[
                    <Button type="primary">报名参加</Button>,
                    <Button>查看详情</Button>
                  ]}
                >
                  <Card.Meta
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{activity.title}</span>
                        <Tag color={
                          activity.status === '已结束' ? 'default' :
                          activity.status === '进行中' ? 'processing' :
                          activity.status === '即将开始' ? 'warning' : 'success'
                        }>
                          {activity.status}
                        </Tag>
                      </div>
                    }
                    description={
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Text>时间：{activity.date} {activity.time}</Text>
                        <Text>地点：{activity.location}</Text>
                        <Text>组织者：{activity.organizer}</Text>
                        <Text>已报名：{activity.participants} 人</Text>
                        <Paragraph ellipsis={{ rows: 2 }}>{activity.description}</Paragraph>
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane
          tab={
            <span>
              <ReadOutlined />
              兴趣课程
            </span>
          }
          key="3"
        >
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
            dataSource={courses}
            renderItem={course => (
              <List.Item>
                <Card
                  hoverable
                  cover={
                    <div style={{ height: 160, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' }}>
                      <img
                        alt={course.title}
                        src={course.image || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                        style={{ width: '100%' }}
                      />
                    </div>
                  }
                  actions={[
                    <Button type="primary">报名课程</Button>,
                    <Button>查看详情</Button>
                  ]}
                >
                  <Card.Meta
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{course.title}</span>
                        <Tag color={
                          course.status === '已结束' ? 'default' :
                          course.status === '进行中' ? 'processing' :
                          course.status === '即将开始' ? 'warning' : 'success'
                        }>
                          {course.status}
                        </Tag>
                      </div>
                    }
                    description={
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Text>时间：{course.date} {course.time}</Text>
                        <Text>地点：{course.location}</Text>
                        <Text>讲师：{course.organizer}</Text>
                        <Text>课程周期：{course.duration}</Text>
                        <Paragraph ellipsis={{ rows: 2 }}>{course.description}</Paragraph>
                      </Space>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        </TabPane>

        <TabPane
          tab={
            <span>
              <TrophyOutlined />
              兴趣小组
            </span>
          }
          key="4"
        >
          <Row gutter={[16, 16]}>
            {socialGroups.map(group => (
              <Col xs={24} sm={12} key={group.id}>
                <Card>
                  <Row gutter={16}>
                    <Col xs={24} sm={8}>
                      <div style={{ height: 120, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5', borderRadius: '4px' }}>
                        <img
                          alt={group.title}
                          src={group.image || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </Col>
                    <Col xs={24} sm={16}>
                      <Title level={4}>{group.title}</Title>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Text>成员数：{group.participants} 人</Text>
                        <Text>组织者：{group.organizer}</Text>
                        <Text>活动频率：{group.frequency}</Text>
                        <Paragraph ellipsis={{ rows: 2 }}>{group.description}</Paragraph>
                      </Space>
                      <Button type="primary" style={{ marginTop: '8px' }}>加入小组</Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane
          tab={
            <span>
              <UserOutlined />
              我的活动
            </span>
          }
          key="5"
        >
          <Card title="我参与的活动">
            <Tabs defaultActiveKey="1">
              <TabPane tab="已报名" key="1">
                <List
                  dataSource={activities.filter(a => a.status !== '已结束').slice(0, 3)}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Button>查看详情</Button>,
                        <Button type="primary" danger>取消报名</Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.image || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"} />}
                        title={item.title}
                        description={
                          <Space direction="vertical">
                            <Text>时间：{item.date} {item.time}</Text>
                            <Text>地点：{item.location}</Text>
                            <Tag color={
                              item.status === '进行中' ? 'processing' :
                              item.status === '即将开始' ? 'warning' : 'success'
                            }>
                              {item.status}
                            </Tag>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="已参加" key="2">
                <List
                  dataSource={activities.filter(a => a.status === '已结束').slice(0, 3)}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Button>查看详情</Button>,
                        <Button type="primary">评价活动</Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.image || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"} />}
                        title={item.title}
                        description={
                          <Space direction="vertical">
                            <Text>时间：{item.date} {item.time}</Text>
                            <Text>地点：{item.location}</Text>
                            <Tag color="default">已结束</Tag>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </Card>

          <Card title="我的兴趣小组" style={{ marginTop: '16px' }}>
            <List
              dataSource={socialGroups.slice(0, 2)}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button>查看动态</Button>,
                    <Button type="primary">发布消息</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.image || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"} />}
                    title={item.title}
                    description={
                      <Space direction="vertical">
                        <Text>成员数：{item.participants} 人</Text>
                        <Text>下次活动：{item.date} {item.time}</Text>
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

export default ElderCommunity;
