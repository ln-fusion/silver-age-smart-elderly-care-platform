import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Table, Tag, Badge, Space, Button, Tabs, Timeline, Empty } from 'antd';
import { 
  SafetyOutlined, 
  CheckCircleOutlined, 
  WarningOutlined, 
  PhoneOutlined,
  BellOutlined,
  FireOutlined,
  LinkOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const EmergencyLinkage = () => {
  const [activeTab, setActiveTab] = useState("1");
  
  // 模拟应急平台对接状态数据
  const platformStatus = {
    connected: true,
    lastCheckTime: '2023-05-15 14:30:25',
    platformName: '城市应急救援中心',
    connectionType: 'API接口',
    responseTime: '< 3秒',
    alertTypes: ['跌倒告警', '烟雾告警', '紧急呼叫', '电子围栏越界']
  };
  
  // 模拟历史告警上报记录
  const alertReportHistory = [
    {
      id: 'AR001',
      alertId: 'ALM023',
      alertType: '跌倒告警',
      elderName: '张大爷',
      reportTime: '2023-05-15 09:23:45',
      responseTime: '2023-05-15 09:25:12',
      responder: '城市应急救援中心',
      status: '已处理',
      result: '救援人员已到达现场，老人已送医'
    },
    {
      id: 'AR002',
      alertId: 'ALM025',
      alertType: '烟雾告警',
      elderName: '李奶奶',
      reportTime: '2023-05-14 18:45:30',
      responseTime: '2023-05-14 18:46:22',
      responder: '城市消防中心',
      status: '已处理',
      result: '消防人员确认为烹饪产生的烟雾，无火灾风险'
    },
    {
      id: 'AR003',
      alertId: 'ALM027',
      alertType: '紧急呼叫',
      elderName: '王大爷',
      reportTime: '2023-05-13 22:10:15',
      responseTime: '2023-05-13 22:11:03',
      responder: '社区医疗中心',
      status: '已处理',
      result: '医护人员已到达现场，提供了必要的医疗协助'
    },
    {
      id: 'AR004',
      alertId: 'ALM030',
      alertType: '电子围栏越界',
      elderName: '赵奶奶',
      reportTime: '2023-05-12 16:30:45',
      responseTime: '2023-05-12 16:32:10',
      responder: '社区工作人员',
      status: '已处理',
      result: '工作人员已找到老人并安全护送回家'
    }
  ];

  const historyColumns = [
    {
      title: '记录ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '告警ID',
      dataIndex: 'alertId',
      key: 'alertId',
      width: 100,
    },
    {
      title: '告警类型',
      dataIndex: 'alertType',
      key: 'alertType',
      render: (text) => {
        let color = 'blue';
        let icon = <BellOutlined />;
        
        if (text === '跌倒告警') {
          color = 'red';
          icon = <WarningOutlined />;
        } else if (text === '烟雾告警') {
          color = 'orange';
          icon = <FireOutlined />;
        } else if (text === '紧急呼叫') {
          color = 'purple';
          icon = <PhoneOutlined />;
        }
        
        return (
          <Tag color={color} icon={icon}>
            {text}
          </Tag>
        );
      }
    },
    {
      title: '老人姓名',
      dataIndex: 'elderName',
      key: 'elderName',
    },
    {
      title: '上报时间',
      dataIndex: 'reportTime',
      key: 'reportTime',
    },
    {
      title: '响应时间',
      dataIndex: 'responseTime',
      key: 'responseTime',
    },
    {
      title: '响应单位',
      dataIndex: 'responder',
      key: 'responder',
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
        <Button type="link">查看详情</Button>
      ),
    },
  ];

  return (
    <div className="emergency-linkage">
      <Title level={2}>应急联动模块</Title>
      <Paragraph>
        与区域应急平台对接，实现紧急情况下的快速响应和救援。
      </Paragraph>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic
              title="应急平台连接状态"
              value={platformStatus.connected ? '已连接' : '未连接'}
              valueStyle={{ color: platformStatus.connected ? '#52c41a' : '#cf1322' }}
              prefix={platformStatus.connected ? <CheckCircleOutlined /> : <WarningOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic
              title="最近一次连接检查"
              value={platformStatus.lastCheckTime}
              prefix={<SafetyOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic
              title="平均响应时间"
              value={platformStatus.responseTime}
              prefix={<LinkOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Card style={{ marginTop: 16 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane 
            tab={
              <span>
                <LinkOutlined />
                平台对接状态
              </span>
            } 
            key="1"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card title="应急平台信息" bordered={false}>
                  <div className="info-item">
                    <Text type="secondary">平台名称</Text>
                    <div>{platformStatus.platformName}</div>
                  </div>
                  <div className="info-item">
                    <Text type="secondary">连接类型</Text>
                    <div>{platformStatus.connectionType}</div>
                  </div>
                  <div className="info-item">
                    <Text type="secondary">连接状态</Text>
                    <div>
                      <Badge 
                        status={platformStatus.connected ? 'success' : 'error'} 
                        text={platformStatus.connected ? '已连接' : '未连接'} 
                      />
                    </div>
                  </div>
                  <div className="info-item">
                    <Text type="secondary">最近检查时间</Text>
                    <div>{platformStatus.lastCheckTime}</div>
                  </div>
                  <div className="info-item">
                    <Text type="secondary">平均响应时间</Text>
                    <div>{platformStatus.responseTime}</div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card title="支持的告警类型" bordered={false}>
                  <Space wrap>
                    {platformStatus.alertTypes.map((type, index) => {
                      let color = 'blue';
                      let icon = <BellOutlined />;
                      
                      if (type === '跌倒告警') {
                        color = 'red';
                        icon = <WarningOutlined />;
                      } else if (type === '烟雾告警') {
                        color = 'orange';
                        icon = <FireOutlined />;
                      } else if (type === '紧急呼叫') {
                        color = 'purple';
                        icon = <PhoneOutlined />;
                      }
                      
                      return (
                        <Tag color={color} icon={icon} key={index}>
                          {type}
                        </Tag>
                      );
                    })}
                  </Space>
                </Card>
                
                <Card title="连接日志" bordered={false} style={{ marginTop: 16 }}>
                  <Timeline>
                    <Timeline.Item color="green">
                      <p>2023-05-15 14:30:25 连接检查成功</p>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      <p>2023-05-15 09:23:45 告警上报成功 (ALM023)</p>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      <p>2023-05-14 18:45:30 告警上报成功 (ALM025)</p>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      <p>2023-05-14 14:30:10 连接检查成功</p>
                    </Timeline.Item>
                    <Timeline.Item color="red">
                      <p>2023-05-13 23:15:42 连接中断</p>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      <p>2023-05-13 22:10:15 告警上报成功 (ALM027)</p>
                    </Timeline.Item>
                  </Timeline>
                </Card>
              </Col>
            </Row>
            
            <Card title="应急联动流程" style={{ marginTop: 16 }}>
              <Row gutter={16}>
                <Col xs={24} md={24}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div className="process-step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <Title level={5}>告警触发</Title>
                        <Text>智能设备检测到紧急情况并触发告警</Text>
                      </div>
                    </div>
                    <div className="process-arrow">→</div>
                    <div className="process-step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <Title level={5}>平台接收</Title>
                        <Text>智慧养老平台接收告警信息</Text>
                      </div>
                    </div>
                    <div className="process-arrow">→</div>
                    <div className="process-step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <Title level={5}>应急上报</Title>
                        <Text>将告警信息上报至区域应急平台</Text>
                      </div>
                    </div>
                    <div className="process-arrow">→</div>
                    <div className="process-step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <Title level={5}>应急响应</Title>
                        <Text>应急平台派遣相关人员进行处理</Text>
                      </div>
                    </div>
                    <div className="process-arrow">→</div>
                    <div className="process-step">
                      <div className="step-number">5</div>
                      <div className="step-content">
                        <Title level={5}>结果反馈</Title>
                        <Text>处理结果反馈至智慧养老平台</Text>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <BellOutlined />
                历史告警上报记录
              </span>
            } 
            key="2"
          >
            <Table 
              columns={historyColumns} 
              dataSource={alertReportHistory} 
              rowKey="id"
              expandable={{
                expandedRowRender: record => (
                  <p style={{ margin: 0 }}>
                    <Text strong>处理结果：</Text> {record.result}
                  </p>
                ),
              }}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <SafetyOutlined />
                应急预案
              </span>
            } 
            key="3"
          >
            <Card>
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 160 }}
                description="应急预案模块正在建设中"
              >
                <Button type="primary">敬请期待</Button>
              </Empty>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
      
      <style jsx>{`
        .info-item {
          margin-bottom: 16px;
        }
        .info-item .ant-typography-secondary {
          display: block;
          margin-bottom: 4px;
        }
        .process-step {
          display: flex;
          align-items: flex-start;
          margin-bottom: 16px;
          flex: 1;
          min-width: 150px;
        }
        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #1890ff;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 12px;
          flex-shrink: 0;
        }
        .step-content {
          flex: 1;
        }
        .process-arrow {
          display: flex;
          align-items: center;
          color: #1890ff;
          font-size: 24px;
          margin: 0 8px;
        }
        @media (max-width: 768px) {
          .process-arrow {
            display: none;
          }
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

export default EmergencyLinkage;
