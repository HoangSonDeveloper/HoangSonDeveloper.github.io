import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Image,
  Input,
  Layout,
  message,
  Radio,
  Row,
  Select,
  Tag,
  Typography,
} from 'antd';
import ReactJson from 'react-json-view';
import api from '../axios';

const { Header } = Layout;
const { Text } = Typography;

const providers = [
  { label: 'Udemy', value: 'udemy' },
  { label: 'Coursera', value: 'coursera' },
  { label: 'Codecademy', value: 'codecademy' },
];
const Process = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [provider, setProvider] = useState();
  const [crawlUrl, setCrawlUrl] = useState('');
  const [crawledData, setCrawledData] = useState<{ course: any }>({
    course: {},
  });
  const [mappedData, setMappedData] = useState([]);
  const [extractedData, setExtractedData] = useState([]);
  const [promptType, setPromptType] = useState('zero-shot');
  const onCrawlData = async () => {
    if (provider && !!crawlUrl) {
      try {
        await api
          .post('/process/crawl', {
            provider,
            url: crawlUrl,
          })
          .then(res => setCrawledData(res?.data))
          .then(res => messageApi.success('Crawl data successfully'));
      } catch (e) {
        console.log(e);
        messageApi.error('Failed to crawl data');
      }
    }
  };

  const onExtractData = async () => {
    if (!!crawledData) {
      try {
        await api
          .post('/process/extraction', {
            prompt_type: promptType,
            content: crawledData?.course?.content,
          })
          .then(res => setExtractedData(res?.data?.technologies))
          .then(res => messageApi.success('Extract data successfully'));
      } catch (e) {
        console.log(e);
        messageApi.error('Failed to extract data');
      }
    }
  };

  const onCanonicalizeData = async () => {
    if (!!crawledData) {
      try {
        await api
          .post('/process/canonicalization', {
            technologies: extractedData,
          })
          .then(res => setMappedData(res?.data?.technologies))
          .then(res => messageApi.success('Canonicalize data successfully'));
      } catch (e) {
        console.log(e);
        messageApi.error('Failed to canonicalize data');
      }
    }
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
                  onChange={value => {
                    setProvider(value);
                  }}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} className={'mb-4'}>
                <Text className={'text-md font-bold'}>Course url</Text>
                <Input
                  onChange={e => {
                    const { value } = e.target;
                    setCrawlUrl(value);
                  }}
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
                  onClick={onCrawlData}
                >
                  Start crawling
                </Button>
              </Col>
              <Text className={'text-md font-bold mb-2'}>Crawl result</Text>
              <Col className={'p-6 bg-gray-200 rounded-lg'} span={24}>
                <ReactJson src={crawledData} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24} xxl={{ span: 12 }}>
          <Card title={'Extraction'}>
            <Text className={'text-md font-bold'}>Prompts</Text>
            <Row className={'mt-2 mb-4'}>
              <Col className={'mr-8'}>
                <Radio
                  onChange={e => {
                    setPromptType(e.target.value);
                  }}
                  value={'zero-shot'}
                  checked={promptType === 'zero-shot'}
                />
                <Text>Zero shot prompt</Text>
              </Col>
              <Col>
                <Radio
                  onChange={e => {
                    setPromptType(e.target.value);
                  }}
                  value={'few-shot'}
                  checked={promptType === 'few-shot'}
                />
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
                onClick={onExtractData}
                type={'primary'}
              >
                Start extracting
              </Button>
            </Col>
            <Text className={'text-md font-bold'}>Extract result</Text>
            <Col className={'p-6 bg-gray-200 rounded-lg mt-2'} span={24}>
              {extractedData.map(item => {
                return <Tag>{item}</Tag>;
              })}
            </Col>
          </Card>
        </Col>
        <Col span={24} xxl={{ span: 12 }}>
          <Card title={'Canonicalization'}>
            <Col className={'mb-4'}>
              <Button
                style={{
                  background: '#198754',
                  textTransform: 'uppercase',
                  color: 'white',
                  fontWeight: 600,
                }}
                type={'primary'}
                onClick={onCanonicalizeData}
              >
                Start mapping
              </Button>
            </Col>
            <Text className={'text-md font-bold'}>Mapping result</Text>
            <Col className={'p-6 bg-gray-200 rounded-lg mt-2'} span={24}>
              {mappedData.map(item => {
                return <Tag>{item}</Tag>;
              })}
            </Col>
          </Card>
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

export default Process;
