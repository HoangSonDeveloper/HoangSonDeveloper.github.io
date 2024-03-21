import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Image,
  Layout,
  message,
  Row,
  Table,
  Typography,
} from 'antd';
import api from '../axios';
import { useNavigate } from 'react-router-dom';
import { renderHeader } from '../utils/LayoutUtils';

const { Header } = Layout;
const { Text, Paragraph } = Typography;

const Process = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      await api.get('/courses').then(res => setCourses(res?.data?.courses));
      messageApi.success('Load courses data successfully');
    } catch (e) {
      messageApi.success('Load courses data error');
    }
  };

  const renderTable = () => {
    return (
      <Table
        scroll={{ x: 2000, y: 1000 }}
        className={'w-full '}
        dataSource={courses}
        columns={[
          {
            title: 'No.',
            key: 'index',
            width: 80,
            render: (text, record, index) => {
              return (
                <div className={'flex justify-center items-center'}>
                  <Text style={{ fontWeight: 'bold' }}>{index + 1}</Text>
                </div>
              );
            },
            fixed: 'left',
          },
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            fixed: 'left',
            render: value => {
              return (
                <div>
                  <Paragraph ellipsis={{ rows: 2, expandable: false }}>
                    {value}
                  </Paragraph>
                </div>
              );
            },
          },
          {
            title: 'Instructor',
            dataIndex: 'instructor',
            key: 'instructor',
          },
          {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            width: '30%',
            render: value => {
              return (
                <div>
                  <Paragraph ellipsis={{ rows: 2, expandable: false }}>
                    {value}
                  </Paragraph>
                </div>
              );
            },
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: value => {
              return (
                <div>
                  <Paragraph ellipsis={{ rows: 2, expandable: false }}>
                    {value}
                  </Paragraph>
                </div>
              );
            },
          },
          {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            width: 80,
            render: value => {
              let ratingColor = 'green';
              if (value < 3.5) {
                ratingColor = 'orange';
              }
              if (value < 2.5) {
                ratingColor = 'red';
              }
              return (
                <div className={'flex justify-center items-center'}>
                  <Text style={{ color: ratingColor, fontWeight: 'bold' }}>
                    {value}
                  </Text>
                </div>
              );
            },
          },
          {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
            width: 300,
            render: value => {
              return (
                <a target="_blank" className={'font-semibold'} href={value}>
                  {value}
                </a>
              );
            },
          },
        ]}
      />
    );
  };

  const renderContent = () => {
    return (
      <Row gutter={[24, 24]} className={'p-8'}>
        <Col span={24}>{renderTable()}</Col>
        <Col span={24} className={'flex justify-center'}>
          <Button
            style={{
              background: '#198754',
              textTransform: 'uppercase',
              color: 'white',
              fontWeight: 600,
            }}
            type={'primary'}
            onClick={() => navigate('/process-steps')}
          >
            Data process steps
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <Layout>
      {contextHolder}
      <>
        {renderHeader(navigate)}
        {renderContent()}
      </>
    </Layout>
  );
};

export default Process;
