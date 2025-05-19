import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Table, Tag, Badge, Space, Button, Tabs, Form, Input, Select, Upload, Modal } from 'antd';
import { 
  MobileOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  WarningOutlined,
  UploadOutlined,
  SyncOutlined,
  SettingOutlined,
  SearchOutlined
} from '@ant-design/icons';

// 导入模拟数据
import deviceData from '../../mock/deviceData.json';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const DeviceManagement = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  
  useEffect(() => {
    // 在实际应用中，这里会从API获取数据
    setData(deviceData);
  }, []);

  const handleViewDetails = (record) => {
    setSelectedDevice(record);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: '设备ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type',
      render: (text) => {
        let color = 'blue';
        if (text === '智能手环') color = 'green';
        if (text === '家庭终端') color = 'purple';
        if (text === '智能药盒') color = 'orange';
        if (text === '紧急呼叫器') color = 'red';
        return <Tag color={color}>{text}</Tag>;
      },
      filters: [
        { text: '智能手环', value: '智能手环' },
        { text: '家庭终端', value: '家庭终端' },
        { text: '智能药盒', value: '智能药盒' },
        { text: '紧急呼叫器', value: '紧急呼叫器' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: '设备型号',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: '绑定用户',
      dataIndex: 'userName',
      key: 'userName',
      render: (text) => text || '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let status = 'default';
        if (text === '在线') status = 'success';
        if (text === '离线') status = 'default';
        if (text === '故障') status = 'error';
        if (text === '低电量') status = 'warning';
        return <Badge status={status} text={text} />;
      },
      filters: [
        { text: '在线', value: '在线' },
        { text: '离线', value: '离线' },
        { text: '故障', value: '故障' },
        { text: '低电量', value: '低电量' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: '电池电量',
      dataIndex: 'battery',
      key: 'battery',
      render: (text) => {
        let color = 'green';
        const batteryLevel = typeof text === 'number' ? text : parseFloat(text);
        if (!isNaN(batteryLevel)) {
          if (batteryLevel < 30) color = 'red';
          else if (batteryLevel < 50) color = 'orange';
        }
        return (
            <div style={{ width: '100%' }}>
              <div style={{ width: `${batteryLevel}%`, background: color, height: '8px', borderRadius: '4px' }} />
              <div style={{ marginTop: '4px' }}>{isNaN(batteryLevel) ? 'N/A' : `${batteryLevel}%`}</div>
            </div>
        );
      },
      sorter: (a, b) => {
        const batteryA = typeof a.battery === 'number' ? a.battery : parseFloat(a.battery);
        const batteryB = typeof b.battery === 'number' ? b.battery : parseFloat(b.battery);
        return batteryA - batteryB;
      },
    },
    {
      title: '固件版本',
      dataIndex: 'firmwareVersion',
      key: 'firmwareVersion',
    },
    {
      title: '最后活动时间',
      dataIndex: 'lastActiveTime',
      key: 'lastActiveTime',
      sorter: (a, b) => new Date(a.lastActiveTime) - new Date(b.lastActiveTime),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleViewDetails(record)}>查看详情</Button>
          <Button type="link" disabled={record.status === '离线'}>远程配置</Button>
        </Space>
      ),
    },
  ];

  // 按状态分组设备数据
  const onlineDevices = data.filter(device => device.status === '在线');
  const offlineDevices = data.filter(device => device.status === '离线');
  const malfunctionDevices = data.filter(device => device.status === '故障' || device.status === '低电量');

  return (
    <div className="device-management">
      <Title level={2}>设备管理</Title>
      <Paragraph>
        管理和监控智能养老设备，确保设备正常运行。
      </Paragraph>
      
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="在线设备"
              value={onlineDevices.length}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="离线设备"
              value={offlineDevices.length}
              valueStyle={{ color: '#8c8c8c' }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="故障/低电量设备"
              value={malfunctionDevices.length}
              valueStyle={{ color: malfunctionDevices.length > 0 ? '#faad14' : '#52c41a' }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Card 
        title="设备列表" 
        extra={
          <Space>
            <Button icon={<SearchOutlined />}>搜索设备</Button>
            <Button type="primary" icon={<MobileOutlined />}>添加设备</Button>
          </Space>
        }
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="全部设备" key="1">
            <Table 
              columns={columns} 
              dataSource={data} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab={`在线设备 (${onlineDevices.length})`} key="2">
            <Table 
              columns={columns} 
              dataSource={onlineDevices} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab={`离线设备 (${offlineDevices.length})`} key="3">
            <Table 
              columns={columns} 
              dataSource={offlineDevices} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab={`故障/低电量设备 (${malfunctionDevices.length})`} key="4">
            <Table 
              columns={columns} 
              dataSource={malfunctionDevices} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>
      
      {/* 设备详情模态框 */}
      <Modal
        title={selectedDevice ? `设备详情 - ${selectedDevice.id}` : "设备详情"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedDevice(null);
        }}
        footer={[
          <Button key="back" onClick={() => {
            setIsModalVisible(false);
            setSelectedDevice(null);
          }}>
            关闭
          </Button>,
          selectedDevice && selectedDevice.status !== '离线' && (
            <Button key="config" type="primary">
              远程配置
            </Button>
          )
        ]}
        width={700}
      >
        {selectedDevice && (
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">设备类型</Text>
                  <div>
                    <Tag color={
                      selectedDevice.type === '智能手环' ? 'green' : 
                      selectedDevice.type === '家庭终端' ? 'purple' : 
                      selectedDevice.type === '智能药盒' ? 'orange' : 
                      selectedDevice.type === '紧急呼叫器' ? 'red' : 'blue'
                    }>
                      {selectedDevice.type}
                    </Tag>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">设备状态</Text>
                  <div>
                    <Badge 
                      status={
                        selectedDevice.status === '在线' ? 'success' : 
                        selectedDevice.status === '离线' ? 'default' : 
                        selectedDevice.status === '故障' ? 'error' : 'warning'
                      } 
                      text={selectedDevice.status} 
                    />
                  </div>
                </div>
              </Col>
            </Row>
            
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">设备型号</Text>
                  <div>{selectedDevice.model}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">序列号</Text>
                  <div>{selectedDevice.serialNumber}</div>
                </div>
              </Col>
            </Row>
            
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">绑定用户</Text>
                  <div>{selectedDevice.userName || '未绑定'}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">MAC地址</Text>
                  <div>{selectedDevice.macAddress}</div>
                </div>
              </Col>
            </Row>
            
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">固件版本</Text>
                  <div>{selectedDevice.firmwareVersion}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">电池电量</Text>
                  <div>
                    <div style={{ width: '100%', maxWidth: '150px' }}>
                      <div 
                        style={{ 
                          width: `${selectedDevice.battery}%`, 
                          background: selectedDevice.battery < 30 ? 'red' : selectedDevice.battery < 50 ? 'orange' : 'green', 
                          height: '8px', 
                          borderRadius: '4px' 
                        }} 
                      />
                      <div style={{ marginTop: '4px' }}>{selectedDevice.battery}%</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">最后活动时间</Text>
                  <div>{selectedDevice.lastActiveTime}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="detail-item">
                  <Text type="secondary">激活时间</Text>
                  <div>{selectedDevice.activationTime}</div>
                </div>
              </Col>
            </Row>
            
            <div style={{ marginTop: 16 }}>
              <Text type="secondary">设备描述</Text>
              <Card size="small" style={{ marginTop: 8 }}>
                <div style={{ whiteSpace: 'pre-line' }}>{selectedDevice.description}</div>
              </Card>
            </div>
            
            <div style={{ marginTop: 16 }}>
              <Text type="secondary">传感器状态</Text>
              <Card size="small" style={{ marginTop: 8 }}>
                <Row gutter={16}>
                  {selectedDevice.sensors.map((sensor, index) => (
                    <Col span={8} key={index}>
                      <div style={{ textAlign: 'center', padding: '8px' }}>
                        <Badge 
                          status={sensor.status === '正常' ? 'success' : 'error'} 
                          text={`${sensor.name}: ${sensor.status}`} 
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card>
            </div>
            
            <div style={{ marginTop: 16 }}>
              <Text type="secondary">操作记录</Text>
              <Card size="small" style={{ marginTop: 8 }}>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  {selectedDevice.operationLogs.map((log, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      <Text>{log.time} - {log.operation}</Text>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
            
            {selectedDevice.status !== '离线' && (
              <div style={{ marginTop: 16 }}>
                <Text type="secondary">可用操作</Text>
                <Card size="small" style={{ marginTop: 8 }}>
                  <Space>
                    <Button icon={<SyncOutlined />}>同步数据</Button>
                    <Button icon={<SettingOutlined />}>设备配置</Button>
                    <Button icon={<UploadOutlined />}>固件升级</Button>
                  </Space>
                </Card>
              </div>
            )}
          </div>
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

export default DeviceManagement;
