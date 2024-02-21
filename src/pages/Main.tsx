import React, { FC } from 'react';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Image,
  Layout,
  Radio,
  Row,
  Table,
  Typography,
  Upload,
} from 'antd';
import { useAuth } from '../context/AuthContext';
import { InboxOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;
const { Dragger } = Upload;

const processors = ['NER', 'BERT'];

const Main: FC<any> = () => {
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
    const fileProps = {
      name: 'file',
      multiple: true,
      accept: '.json, .xlsx',
      beforeUpload: file => {
        return false;
      },
      onChange(info) {
        console.log('File changed', info);
      },
    };

    return (
      <Row gutter={[24, 24]} className={'p-8'}>
        <Col sm={{ span: 10 }}>
          <Card title={'Dataset'}>
            <Dragger {...fileProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </Card>
        </Col>
        <Col className={'flex flex-1'} sm={{ span: 14 }}>
          <Card className={'w-full'} title={'Processor'}>
            <Row className={'mb-8'}>
              {processors.map(processor => {
                return (
                  <div
                    className={
                      'border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center p-4 mr-8'
                    }
                    style={{
                      width: 120,
                      height: 120,
                    }}
                  >
                    <Text className={'font-bold text-center w-full mb-4'}>
                      {processor}
                    </Text>
                    <Radio className={''} />
                  </div>
                );
              })}
            </Row>
            <Row className={'w-full items-center justify-center'}>
              <Button
                style={{
                  background: '#198754',
                  textTransform: 'uppercase',
                  color: 'white',
                }}
              >
                Run
              </Button>
            </Row>
          </Card>
        </Col>
        <Col sm={{ span: 24 }}>
          <Card title={'Dashboard'}>
            <Table />
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

export default Main;
