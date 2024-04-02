import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Layout,
  message,
  Row,
  Select,
  Tag,
  Typography,
} from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import api from '../axios';
import { useNavigate } from 'react-router-dom';
import { renderHeader } from '../utils/LayoutUtils';

const { Text } = Typography;
const tagColors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

const DashBoard: FC<any> = () => {
  const { logout } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [recommendCourses, setRecommendCourses] = useState([]);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    await api.get('/jobs').then(res => setJobs(res?.data?.titles));
  };

  const onFindCourses = async () => {
    try {
      await api
        .post('/user/recommendation', { job_title: selectedJob })
        .then(res => setRecommendCourses(res?.data?.courses))
        .then(res => {
          messageApi.success('Find course successfully');
        });
    } catch (e) {
      console.log('Error on finding courses!!!', e);
    }
  };

  const onAddUserCourse = async (courseUid: string) => {
    try {
      await api
        .post('/user/courses', { courses_uid: [courseUid] })
        .then(async res => {
          await onFindCourses();
          messageApi.success('Add course successfully');
        });
    } catch (e) {
      console.log('Error on finding courses!!!', e);
    }
  };

  const formattedJobs = jobs?.map(job => {
    return {
      value: job,
      label: job,
    };
  });

  const getRandomColor = () => {
    return tagColors[Math.floor(Math.random() * tagColors.length)];
  };

  const dropDownItems = {
    items: [
      {
        key: 1,
        label: (
          <Button
            type={'text'}
            onClick={() => {
              navigate('/profile');
            }}
          >
            Profile
          </Button>
        ),
      },
      {
        key: 1,
        label: (
          <Button type={'text'} onClick={logout}>
            Logout
          </Button>
        ),
      },
    ],
  };

  const renderContent = () => {
    return (
      <Row gutter={[24, 24]} className={'p-8'}>
        <Col className={'h-full sticky'} span={24}>
          <Card
            className={'w-full h-60 mb-5'}
            title={'Choose a profession that you want to pursuit'}
          >
            <Row className={'mb-3'}>
              <Select
                className={'w-full max-w-2xl h-10 mb-4'}
                onChange={value => setSelectedJob(value)}
                options={formattedJobs}
              />
            </Row>
            <Row>
              <Button
                onClick={onFindCourses}
                style={{
                  background: '#198754',
                  textTransform: 'uppercase',
                  color: 'white',
                }}
              >
                Find course
              </Button>
            </Row>
          </Card>
        </Col>
        <Col className={'h-full'} span={24}>
          <Row className={'mb-8'}>
            <Text className={'text-2xl'}>Recommended courses</Text>
          </Row>
          {recommendCourses?.length === 0 && (
            <Text className={'text-lg'}>
              Do not have any recommended courses
            </Text>
          )}
          {recommendCourses.map(course => {
            let ratingColor = 'green';
            if (course?.rating < 3.5) {
              ratingColor = 'orange';
            }
            if (course?.rating < 2.5) {
              ratingColor = 'red';
            }
            return (
              <Card className={'mb-4'}>
                <Col className={'justify-between'}>
                  <Text className={'text-lg font-bold flex'}>
                    {course?.title}
                  </Text>
                  <Text style={{ color: '#727272' }}>
                    {`Necessity score: ${course?.necessity_score} - Added score: ${course?.added_score}`}
                  </Text>
                  <Text style={{ fontSize: 16 }} className={'flex'}>
                    {course?.description}
                  </Text>
                  <Text
                    style={{ fontSize: 16 }}
                    className={'flex'}
                  >{`Instructor: ${course?.instructor}`}</Text>
                  <Text className={'flex'} style={{ fontSize: 16 }}>
                    Rating:
                    <Text
                      className={'font-bold'}
                      style={{
                        color: ratingColor,
                        marginLeft: 4,
                        fontSize: 16,
                      }}
                    >
                      {course?.rating}
                    </Text>
                  </Text>
                  <Row className={'my-4'}>
                    {course?.technologies?.map(item => {
                      return <Tag color={getRandomColor()}>{item}</Tag>;
                    })}
                  </Row>
                  <a
                    style={{ fontSize: 16, color: '#2C73D2' }}
                    className={'font-bold flex'}
                    target="_blank"
                    href={course?.url}
                  >
                    Go to course
                  </a>
                </Col>
                <Button
                  style={{
                    position: 'absolute',
                    top: 24,
                    right: 24,
                    width: 52,
                    height: 52,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => onAddUserCourse(course?.uid)}
                >
                  <HeartFilled style={{ fontSize: 20 }} />
                </Button>
              </Card>
            );
          })}
        </Col>
      </Row>
    );
  };

  return (
    <Layout>
      {contextHolder}
      <>
        {renderHeader(navigate, logout, true, dropDownItems)}
        {renderContent()}
      </>
    </Layout>
  );
};

export default DashBoard;
