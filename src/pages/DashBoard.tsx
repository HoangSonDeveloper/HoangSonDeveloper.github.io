import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Image,
  Layout,
  message,
  Row,
  Select,
  Typography,
} from 'antd';
import { useAuth } from '../context/AuthContext';
import api from '../axios';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Text } = Typography;

const DashBoard: FC<any> = () => {
  const { logout } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [favCourses, setFavCourses] = useState([]);
  const [recommendCourses, setRecommendCourses] = useState([]);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getCourses();
    getFavCourses();
  }, []);

  const getCourses = async () => {
    await api.get('/jobs').then(res => setJobs(res?.data?.titles));
  };

  const getFavCourses = async () => {
    try {
      await api
        .get('/user/courses')
        .then(res => setFavCourses(res?.data?.courses));
    } catch (e) {
      console.log('Error on getting courses!!!', e);
    }
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
        .then(res => {
          getFavCourses();
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

  const renderHeader = () => {
    return (
      <Header>
        <Row className={'h-full'}>
          <Row className={'h-full flex-1 flex items-center'}>
            <Image
              src={require('../assets/cms_icon.png')}
              style={{
                width: 40,
                height: 40,
              }}
              preview={false}
              alt={'Web icon'}
            />
            <Text className={'text-2xl font-semibold text-white'}>
              CourseConsult
            </Text>
          </Row>
          <Row className={'h-full  flex items-center'}>
            <Dropdown menu={dropDownItems}>
              <Image
                src={
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
                style={{ width: 52, height: 52, borderRadius: 26 }}
                preview={false}
              />
            </Dropdown>
          </Row>
        </Row>
      </Header>
    );
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
                    className={'font-bold'}
                    target="_blank"
                    href={course?.url}
                  >
                    Go to course
                  </a>
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
        {renderHeader()}
        {renderContent()}
      </>
    </Layout>
  );
};

export default DashBoard;
