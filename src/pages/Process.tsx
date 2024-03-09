import React from 'react';
import {
  Dropdown,
  Image,
  Row,
  Layout,
  Typography,
  Col,
  Card,
  Select,
  Input,
  Button,
  Checkbox,
  Radio,
  Tag,
} from 'antd';
import ReactJson from 'react-json-view';

const { Header } = Layout;
const { Text } = Typography;

const providers = [
  { label: 'Udemy', value: 'udemy' },
  { label: 'Coursera', value: 'coursera' },
  { label: 'Codecademy', value: 'codecademy' },
];
const Process = () => {
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
        </Row>
      </Header>
    );
  };

  const renderContent = () => {
    return (
      <Row gutter={[24, 24]} className={'p-8'}>
        <Col span={24} xxl={{ span: 12 }}>
          <Card title={'Crawl data'}>
            <Row gutter={16}>
              <Col span={24} md={{ span: 12 }} className={'mb-4'}>
                <Text className={'text-md font-bold'}>Providers</Text>
                <Select
                  placeholder={'Select provider'}
                  className={'w-full mt-2'}
                  options={providers}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} className={'mb-4'}>
                <Text className={'text-md font-bold'}>Course url</Text>
                <Input
                  placeholder={'Input course url'}
                  className={'w-full mt-2'}
                />
              </Col>
              <Col span={24} className={'mb-4'}>
                <Button
                  style={{
                    background: '#198754',
                    textTransform: 'uppercase',
                    color: 'white',
                    fontWeight: 600,
                  }}
                  type={'primary'}
                >
                  Start crawling
                </Button>
              </Col>
              <Text className={'text-md font-bold mb-2'}>Crawl result</Text>
              <Col className={'p-6 bg-gray-200 rounded-lg'} span={24}>
                <ReactJson
                  src={{
                    title: 'Course Demo 1',
                    description: 'Description for course demo 1',
                    tutor: 'Son Nguyen',
                    rating: 5.0,
                    link: 'https://www.coursera.org/',
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24} xxl={{ span: 12 }}>
          <Card title={'Extraction'}>
            <Text className={'text-md font-bold'}>Prompts</Text>
            <Row className={'mt-2 mb-4'}>
              <Col className={'mr-8'}>
                <Radio />
                <Text>Zero shot prompt</Text>
              </Col>
              <Col>
                <Radio />
                <Text>Few shot prompt</Text>
              </Col>
            </Row>
            <Col className={'mb-4'}>
              <Button
                style={{
                  background: '#198754',
                  textTransform: 'uppercase',
                  color: 'white',
                  fontWeight: 600,
                }}
                type={'primary'}
              >
                Start extracting
              </Button>
            </Col>
            <Text className={'text-md font-bold'}>Extract result</Text>
            <Col className={'p-6 bg-gray-200 rounded-lg mt-2'} span={24}>
              {['Course', 'Demo', 'something'].map(item => {
                return <Tag>{item}</Tag>;
              })}
            </Col>
          </Card>
        </Col>
        <Col span={24} xxl={{ span: 12 }}>
          <Card title={'Canonicalization'}>
            <Text className={'text-md font-bold'}>Algorithm</Text>
            <Row className={'mt-2 mb-4'}>
              <Col className={'mr-8'}>
                <Radio />
                <Text>Edit distance</Text>
              </Col>
              <Col>
                <Radio />
                <Text>Vector similarity</Text>
              </Col>
            </Row>
            <Col className={'mb-4'}>
              <Button
                style={{
                  background: '#198754',
                  textTransform: 'uppercase',
                  color: 'white',
                  fontWeight: 600,
                }}
                type={'primary'}
              >
                Start mapping
              </Button>
            </Col>
            <Text className={'text-md font-bold'}>Mapping result</Text>
            <Col className={'p-6 bg-gray-200 rounded-lg mt-2'} span={24}></Col>
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

export default Process;
