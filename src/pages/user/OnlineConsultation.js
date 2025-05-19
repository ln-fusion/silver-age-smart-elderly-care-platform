import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Tabs, List, Avatar, Button, Tag, Space, Rate, Empty, Form, Input, Select } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  MessageOutlined
} from '@ant-design/icons';

// 导入模拟数据
import doctorData from '../../mock/doctorData.json';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const OnlineConsultation = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    // 在实际应用中，这里会从API获取数据
    setDoctors(doctorData);
  }, []);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setActiveTab("2");
  };

  // 模拟历史问诊记录
  const consultationHistory = [
    {
      id: 'C001',
      doctorName: '木医生',
      doctorAvatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.vJpM6mLtMZ3uzQjXFw1LFgHaHa?w=165&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      date: '2023-05-10',
      time: '15:30-16:00',
      type: '视频问诊',
      status: '已完成',
      symptoms: '头痛、轻微发热',
      diagnosis: '普通感冒',
      prescription: '布洛芬、感冒通',
      notes: '多休息，多喝水，三天后复查'
    },
    {
      id: 'C002',
      doctorName: '唐医生',
      doctorAvatar: 'https://tse2-mm.cn.bing.net/th?id=OIF-C.aA%2b2rvKU%2f5Jegx1aYH9e4w&w=194&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      date: '2023-04-25',
      time: '10:00-10:30',
      type: '电话问诊',
      status: '已完成',
      symptoms: '关节疼痛',
      diagnosis: '关节炎',
      prescription: '布洛芬、氨基葡萄糖',
      notes: '避免剧烈运动，保持关节温暖'
    },
    {
      id: 'C003',
      doctorName: '马医生',
      doctorAvatar: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.taofKNGhdzP2S39QzeoAjgAAAA?w=122&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      date: '2023-05-20',
      time: '14:00-14:30',
      type: '视频问诊',
      status: '已预约',
      symptoms: '定期复查',
      diagnosis: '',
      prescription: '',
      notes: ''
    }
  ];

  return (
      <div className="online-consultation">
        <Title level={2}>在线问诊</Title>
        <Paragraph>
          足不出户，与专业医生进行在线咨询，获取健康建议。
        </Paragraph>

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
              tab={
                <span>
              <UserOutlined />
              医生列表
            </span>
              }
              key="1"
          >
            <Row gutter={[16, 16]}>
              {doctors.map(doctor => (
                  <Col xs={24} sm={12} md={8} key={doctor.id}>
                    <Card hoverable onClick={() => handleDoctorSelect(doctor)}>
                      <Card.Meta
                          avatar={<Avatar size={64} src={doctor.avatar || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />}
                          title={
                            <div>
                              <Text strong>{doctor.name}</Text>
                              <Tag color="blue" style={{ marginLeft: 8 }}>{doctor.title}</Tag>
                            </div>
                          }
                          description={
                            <Space direction="vertical" style={{ width: '100%' }}>
                              <Text>科室：{doctor.department}</Text>
                              {/* 使用可选链和空数组默认值 */}
                              <Text>专长：{doctor.specialties?.join('、') || '暂无专长'}</Text>
                              <Rate disabled defaultValue={doctor.rating} style={{ fontSize: 12 }} />
                              <Text type="secondary">已服务 {doctor.patientCount} 位患者</Text>
                            </Space>
                          }
                      />
                      <Row style={{ marginTop: 16 }}>
                        <Col span={12}>
                          <Button type="primary" icon={<VideoCameraOutlined />} block>
                            视频问诊
                          </Button>
                        </Col>
                        <Col span={12}>
                          <Button icon={<PhoneOutlined />} block style={{ marginLeft: 8 }}>
                            电话问诊
                          </Button>
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
              <CalendarOutlined />
              预约问诊
            </span>
              }
              key="2"
          >
            {selectedDoctor ? (
                <Card>
                  <Row gutter={16}>
                    <Col xs={24} sm={8} md={6}>
                      <div style={{ textAlign: 'center' }}>
                        <Avatar size={100} src={selectedDoctor.avatar || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />
                        <Title level={4} style={{ marginTop: 16, marginBottom: 4 }}>{selectedDoctor.name}</Title>
                        <Tag color="blue">{selectedDoctor.title}</Tag>
                        <Paragraph style={{ marginTop: 8 }}>
                          {selectedDoctor.department}
                        </Paragraph>
                        <Rate disabled defaultValue={selectedDoctor.rating} style={{ fontSize: 12 }} />
                      </div>
                    </Col>
                    <Col xs={24} sm={16} md={18}>
                      <Title level={4}>医生简介</Title>
                      <Paragraph>
                        {selectedDoctor.bio}
                      </Paragraph>
                      <Title level={4}>专业特长</Title>
                      <Paragraph>
                        {selectedDoctor.specialties?.map(specialty => (
                            <Tag key={specialty} style={{ marginBottom: 8 }}>{specialty}</Tag>
                        )) || <Tag>暂无专长</Tag>}
                      </Paragraph>

                      <Title level={4}>可预约时间</Title>
                      <Row gutter={[16, 16]}>
                        {selectedDoctor.availableSlots?.map((slot, index) => (
                            <Col span={8} key={index}>
                              <Card size="small" hoverable>
                                <div style={{ textAlign: 'center' }}>
                                  <div>{slot.date}</div>
                                  <div style={{ margin: '8px 0', color: '#1890ff' }}>{slot.time}</div>
                                  <Button type="primary" size="small">预约</Button>
                                </div>
                              </Card>
                            </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>

                  <Divider />

                  <Form layout="vertical">
                    <Title level={4}>预约信息</Title>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="问诊类型">
                          <Select defaultValue="video">
                            <Option value="video">视频问诊</Option>
                            <Option value="phone">电话问诊</Option>
                            <Option value="text">图文问诊</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="预约时间">
                          <Select defaultValue="">
                            <Option value="">请选择时间段</Option>
                            {/* 确保availableSlots是数组 */}
                            {selectedDoctor.availableSlots?.map((slot, index) => (
                                <Option key={index} value={`${slot.date} ${slot.time}`}>
                                  {slot.date} {slot.time}
                                </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item label="症状描述">
                      <TextArea rows={4} placeholder="请详细描述您的症状、持续时间和严重程度..." />
                    </Form.Item>
                    <Form.Item label="既往病史">
                      <TextArea rows={2} placeholder="请描述您的既往病史、过敏史等..." />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" size="large">
                        确认预约
                      </Button>
                      <Button style={{ marginLeft: 8 }} size="large" onClick={() => setSelectedDoctor(null)}>
                        返回医生列表
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
            ) : (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="请先从医生列表中选择一位医生"
                >
                  <Button type="primary" onClick={() => setActiveTab("1")}>
                    查看医生列表
                  </Button>
                </Empty>
            )}
          </TabPane>

          <TabPane
              tab={
                <span>
              <ClockCircleOutlined />
              问诊记录
            </span>
              }
              key="3"
          >
            <List
                itemLayout="vertical"
                dataSource={consultationHistory}
                renderItem={item => (
                    <Card style={{ marginBottom: 16 }}>
                      <List.Item
                          extra={
                            <Space>
                              {item.status === '已预约' ? (
                                  <>
                                    <Button type="primary" icon={<VideoCameraOutlined />}>
                                      进入问诊
                                    </Button>
                                    <Button danger>取消预约</Button>
                                  </>
                              ) : (
                                  <>
                                    <Button icon={<MessageOutlined />}>
                                      咨询医生
                                    </Button>
                                    <Button type="primary">
                                      再次预约
                                    </Button>
                                  </>
                              )}
                            </Space>
                          }
                      >
                        <List.Item.Meta
                            avatar={<Avatar src={item.doctorAvatar} size={64} />}
                            title={
                              <Space>
                                <Text strong style={{ fontSize: 16 }}>{item.doctorName}</Text>
                                <Tag color={item.status === '已预约' ? 'processing' : 'success'}>
                                  {item.status}
                                </Tag>
                              </Space>
                            }
                            description={
                              <Space direction="vertical">
                                <Text>问诊编号：{item.id}</Text>
                                <Text>问诊时间：{item.date} {item.time}</Text>
                                <Text>问诊方式：{item.type}</Text>
                              </Space>
                            }
                        />

                        {item.status === '已完成' && (
                            <div style={{ marginTop: 16 }}>
                              <Row gutter={16}>
                                <Col span={24} md={12}>
                                  <Card size="small" title="问诊内容" style={{ marginBottom: 16 }}>
                                    <p><strong>主诉症状：</strong>{item.symptoms}</p>
                                    <p><strong>医生诊断：</strong>{item.diagnosis}</p>
                                    <p><strong>处方药品：</strong>{item.prescription}</p>
                                    <p><strong>医嘱建议：</strong>{item.notes}</p>
                                  </Card>
                                </Col>
                                <Col span={24} md={12}>
                                  <Card size="small" title="问诊评价">
                                    <Rate defaultValue={4} />
                                    <TextArea
                                        placeholder="请对本次问诊进行评价..."
                                        style={{ marginTop: 16, marginBottom: 16 }}
                                        rows={2}
                                    />
                                    <Button type="primary" size="small">提交评价</Button>
                                  </Card>
                                </Col>
                              </Row>
                            </div>
                        )}
                      </List.Item>
                    </Card>
                )}
            />
          </TabPane>

          <TabPane
              tab={
                <span>
              <MessageOutlined />
              健康咨询
            </span>
              }
              key="4"
          >
            <Card>
              <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{ height: 160 }}
                  description="健康咨询功能即将上线"
              >
                <Button type="primary">敬请期待</Button>
              </Empty>
            </Card>
          </TabPane>
        </Tabs>
      </div>
  );
};

// 分隔线组件
const Divider = ({ style }) => (
    <div
        style={{
          height: 1,
          background: '#f0f0f0',
          margin: '24px 0',
          ...style
        }}
    />
);

export default OnlineConsultation;