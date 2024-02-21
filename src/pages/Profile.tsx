import React, { FC } from 'react';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Image,
  Layout,
  Row,
  Select,
  Typography,
  Upload,
} from 'antd';
import { useAuth } from '../context/AuthContext';

const { Header } = Layout;
const { Text } = Typography;
const { Dragger } = Upload;

const processors = ['NER', 'BERT'];

const courses = ['Course 1', 'Course 2'];

const Profile: FC<any> = () => {
  const { logout } = useAuth();

  const dropDownItems = {
    items: [
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
              <Text
                style={{ color: '#62B3ED' }}
                className={'font-semibold text-2xl'}
              >
                CMS
              </Text>
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
        <Col className={'h-full'} xs={{ span: 24 }} xl={{ span: 12 }}>
          <Card
            className={'w-full mb-5'}
            title={'Add skill that you want to learn'}
          >
            <Row className={'mb-3'}>
              <Select
                className={'w-full'}
                options={[
                  {
                    value: '1',
                    label: 'Javascript',
                  },
                  {
                    value: '2',
                    label: 'Typescript',
                  },
                ]}
              />
            </Row>
            <Row>
              <Button
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
        <Col className={'h-full'} xs={{ span: 24 }} xl={{ span: 12 }}>
          <Card
            style={{ height: '100%' }}
            className={'w-full h-full'}
            title={'Recommended courses'}
          >
            {courses.map(course => {
              return (
                <Row className={'justify-between m-4'}>
                  <Text>{course}</Text>
                  <Button>Show more</Button>
                </Row>
              );
            })}
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <Layout>
      <>
        {renderHeader()}
        {renderContent()}
      </>
    </Layout>
  );
};

export default Profile;
