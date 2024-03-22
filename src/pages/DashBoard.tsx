import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Layout,
  message,
  Row,
  Select,
  Typography,
} from 'antd';
import { useAuth } from '../context/AuthContext';
import api from '../axios';
import { useNavigate } from 'react-router-dom';
import { renderHeader } from '../utils/LayoutUtils';

const { Text } = Typography;

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
                  <a
                    style={{ fontSize: 16 }}
                    className={'font-bold flex'}
                    target="_blank"
                    href={course?.url}
                  >
                    Go to course
                  </a>
                  <Text>
                    {`Necessity score: ${course?.necessity_score} - Added score: ${course?.added_score}`}
                  </Text>
                </Col>
                <Button onClick={() => onAddUserCourse(course?.uid)}>
                  Add to favorite
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
