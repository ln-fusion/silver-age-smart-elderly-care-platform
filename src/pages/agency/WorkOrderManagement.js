import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Table, Tag, Badge, Space, Button, Tabs, Form, Input, Select, DatePicker, TimePicker, Modal } from 'antd';
import { 
  ToolOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  FileTextOutlined
} from '@ant-design/icons';

// 导入模拟数据
import workOrderData from '../../mock/workOrderData.json';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const WorkOrderManagement = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  useEffect(() => {
    // 在实际应用中，这里会从API获取数据
    setData(workOrderData);
  }, []);

  const handleViewDetails = (record) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: '工单编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '工单类型',
      dataIndex: 'type',
      key: 'type',
      render: (text) => {
        let color = 'blue';
        if (text === '健康干预') color = 'green';
        if (text === '上门护理') color = 'purple';
        if (text === '设备维护') color = 'orange';
        if (text === '紧急救助') color = 'red';
        return <Tag color={color}>{text}</Tag>;
      },
      filters: [
        { text: '健康干预', value: '健康干预' },
        { text: '上门护理', value: '上门护理' },
        { text: '设备维护', value: '设备维护' },
        { text: '紧急救助', value: '紧急救助' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: '服务对象',
      dataIndex: 'elderName',
      key: 'elderName',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (a, b) => new Date(a.createTime) - new Date(b.createTime),
    },
    {
      title: '预约时间',
      dataIndex: 'scheduledTime',
      key: 'scheduledTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        let status = 'default';
        if (text === '在线') status = 'success';
        if (text === '离线') status = 'default';
        if (text === '故障') status = 'error';
        // 根据电池电量判断是否为低电量
        if (record.battery < 30) {
          status = 'warning';
          text = '低电量';
        }
        return <Badge status={status} text={text} />;
      },
      filters: [
        { text: '在线', value: '在线' },
        { text: '离线', value: '离线' },
        { text: '故障', value: '故障' },
        { text: '低电量', value: '低电量' },
      ],
      onFilter: (value, record) => {
        if (value === '低电量') {
          return record.battery < 30;
        }
        return record.status === value;
      },
    },
      // 什么鬼啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
    // {
    //   title: '指派人员',
    //   dataIndex: 'assignee',
    //   key: 'assignee',
    //   render: (text) => text || '-',
    // },
    // {
    //   title: '操作',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space>
    //       <Button type="link" onClick={() => handleViewDetails(record)}>查看详情</Button>
    //       {record.status === '待处理' && (
    //         <Button type="link">指派人员</Button>
    //       )}
    //       {record.status === '进行中' && (
    //         <Button type="link">更新状态</Button>
    //       )}
    //     </Space>
    //   ),
    // },
  ];

  // 按状态分组工单数据
  const pendingOrders = data.filter(order => order.status === '待处理');
  const inProgressOrders = data.filter(order => order.status === '进行中');
  const completedOrders = data.filter(order => order.status === '已完成');

  return (
    <div className="work-order-management">
      <Title level={2}>工单管理系统</Title>
      <Paragraph>
        高效管理各类服务工单，确保及时响应老人需求。
      </Paragraph>
      
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="待处理工单"
              value={pendingOrders.length}
              valueStyle={{ color: pendingOrders.length > 0 ? '#faad14' : '#52c41a' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="进行中工单"
              value={inProgressOrders.length}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ToolOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="已完成工单"
              value={completedOrders.length}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Card 
        title="工单管理" 
        extra={
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            创建工单
          </Button>
        }
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="全部工单" key="1">
            <Table 
              columns={columns} 
              dataSource={data} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab={`待处理 (${pendingOrders.length})`} key="2">
            <Table 
              columns={columns} 
              dataSource={pendingOrders} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab={`进行中 (${inProgressOrders.length})`} key="3">
            <Table 
              columns={columns} 
              dataSource={inProgressOrders} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab={`已完成 (${completedOrders.length})`} key="4">
            <Table 
              columns={columns} 
              dataSource={completedOrders} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>
      
      {/* 工单详情模态框 */}
      <Modal
        title={selectedOrder ? `工单详情 - ${selectedOrder.id}` : "创建新工单"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedOrder(null);
        }}
        footer={selectedOrder ? [
          <Button key="back" onClick={() => {
            setIsModalVisible(false);
            setSelectedOrder(null);
          }}>
            关闭
          </Button>,
          selectedOrder.status !== '已完成' && (
            <Button key="submit" type="primary">
              {selectedOrder.status === '待处理' ? '指派人员' : '更新状态'}
            </Button>
          )
        ] : [
          <Button key="back" onClick={() => {
            setIsModalVisible(false);
            setSelectedOrder(null);
          }}>
            取消
          </Button>,
          <Button key="submit" type="primary">
            创建工单
          </Button>
        ]}
        width={700}
      >
        {selectedOrder ? (
          // 工单详情视图
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">工单类型</Text>
                  <div>
                    <Tag color={
                      selectedOrder.type === '健康干预' ? 'green' : 
                      selectedOrder.type === '上门护理' ? 'purple' : 
                      selectedOrder.type === '设备维护' ? 'orange' : 
                      selectedOrder.type === '紧急救助' ? 'red' : 'blue'
                    }>
                      {selectedOrder.type}
                    </Tag>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">工单状态</Text>
                  <div>
                    <Badge 
                      status={
                        selectedOrder.status === '已完成' ? 'success' : 
                        selectedOrder.status === '进行中' ? 'processing' : 
                        selectedOrder.status === '待处理' ? 'warning' : 'error'
                      } 
                      text={selectedOrder.status} 
                    />
                  </div>
                </div>
              </Col>
            </Row>
            
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">服务对象</Text>
                  <div>
                    <UserOutlined style={{ marginRight: 8 }} />
                    {selectedOrder.elderName}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">联系电话</Text>
                  <div>
                    <PhoneOutlined style={{ marginRight: 8 }} />
                    {selectedOrder.phone}
                  </div>
                </div>
              </Col>
            </Row>
            
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={24}>
                <div className="detail-item">
                  <Text type="secondary">服务地址</Text>
                  <div>
                    <HomeOutlined style={{ marginRight: 8 }} />
                    {selectedOrder.address}
                  </div>
                </div>
              </Col>
            </Row>
            
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">创建时间</Text>
                  <div>{selectedOrder.createTime}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">预约时间</Text>
                  <div>{selectedOrder.scheduledTime}</div>
                </div>
              </Col>
            </Row>
            
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">指派人员</Text>
                  <div>{selectedOrder.assignee || '未指派'}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">紧急程度</Text>
                  <div>
                    <Tag color={
                      selectedOrder.priority === '高' ? 'red' : 
                      selectedOrder.priority === '中' ? 'orange' : 'green'
                    }>
                      {selectedOrder.priority}
                    </Tag>
                  </div>
                </div>
              </Col>
            </Row>
            
            <div style={{ marginTop: 16 }}>
              <Text type="secondary">工单描述</Text>
              <Card size="small" style={{ marginTop: 8 }}>
                <div style={{ whiteSpace: 'pre-line' }}>{selectedOrder.description}</div>
              </Card>
            </div>
            
            {selectedOrder.status !== '待处理' && (
              <div style={{ marginTop: 16 }}>
                <Text type="secondary">处理记录</Text>
                <Card size="small" style={{ marginTop: 8 }}>
                  <div style={{ whiteSpace: 'pre-line' }}>{selectedOrder.processingRecord || '暂无处理记录'}</div>
                </Card>
              </div>
            )}
          </div>
        ) : (
          // 创建工单表单
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="工单类型" required>
                  <Select placeholder="请选择工单类型">
                    <Option value="健康干预">健康干预</Option>
                    <Option value="上门护理">上门护理</Option>
                    <Option value="设备维护">设备维护</Option>
                    <Option value="紧急救助">紧急救助</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="紧急程度" required>
                  <Select placeholder="请选择紧急程度">
                    <Option value="高">高</Option>
                    <Option value="中">中</Option>
                    <Option value="低">低</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="服务对象" required>
                  <Input placeholder="请输入老人姓名" prefix={<UserOutlined />} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="联系电话" required>
                  <Input placeholder="请输入联系电话" prefix={<PhoneOutlined />} />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item label="服务地址" required>
              <Input placeholder="请输入详细地址" prefix={<HomeOutlined />} />
            </Form.Item>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="预约日期" required>
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="预约时间" required>
                  <TimePicker style={{ width: '100%' }} format="HH:mm" />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item label="工单描述" required>
              <TextArea rows={4} placeholder="请详细描述服务需求..." prefix={<FileTextOutlined />} />
            </Form.Item>
            
            <Form.Item label="指派人员">
              <Select placeholder="请选择指派人员">
                <Option value="张三">张三</Option>
                <Option value="李四">李四</Option>
                <Option value="王五">王五</Option>
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>
      
      <style jsx>{`
        .detail-item {
          margin-bottom: 8px;
        }
        .detail-item .ant-typography-secondary {
          display: block;
          margin-bottom: 4px;
        }
      `}</style>
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

export default WorkOrderManagement;
