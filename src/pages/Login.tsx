import React, { FC, useEffect } from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Typography,
  message,
} from 'antd';
import { LockOutlined, MailOutlined, SettingFilled } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const { Content } = Layout;
const { Text } = Typography;
const Login: FC<any> = ({ history }) => {
  const [form] = Form.useForm();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated]);

  const onLogin = async values => {
    const { username, password } = values;
    try {
      await axios.post('/login', { username, password }).then(res => {
        login(res);
        navigate('/profile');
      });
    } catch (e) {
      console.log(e);
      messageApi.error(e?.message);
    }
  };

  return (
    <Layout>
      {contextHolder}
      <SettingFilled
        className={
          'pointer-events-auto hover:opacity-50 text-xl absolute top-12 right-12'
        }
        onClick={() => {
          navigate('/process');
        }}
      />
      <Content
        style={{ height: '100vh' }}
        className={'justify-center items-center flex flex-col px-4'}
      >
        <Text
          style={{ color: '#2B4365' }}
          className={'text-3xl font-bold mb-6'}
        >
          CourseConsult
        </Text>
        <Form
          className={
            'bg-white px-8 py-4 pt-8 rounded-2xl w-full xl:w-1/4 lg:w-1/3 sm:w-2/3 h-96'
          }
          onFinish={onLogin}
          form={form}
        >
          <Form.Item
            rules={[{ required: true, message: 'Username is required' }]}
            name={'username'}
          >
            <Col>
              <Row>
                <MailOutlined
                  style={{ color: '#2C4466' }}
                  className={'text-lg mr-2 font-medium'}
                />
                <Text
                  style={{ color: '#2C4466' }}
                  className={'text-lg font-medium'}
                >
                  Username
                </Text>
              </Row>
              <Input className={'w-full mt-2 h-16'} />
            </Col>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters long!',
              },
            ]}
            name={'password'}
          >
            <Col>
              <Row>
                <LockOutlined
                  style={{ color: '#2C4466' }}
                  className={'text-lg mr-2 font-medium'}
                />
                <Text
                  style={{ color: '#2C4466' }}
                  className={'text-lg font-medium'}
                >
                  Password
                </Text>
              </Row>
              <Input.Password className={'w-full mt-2 h-16 '} />
            </Col>
          </Form.Item>
          <Form.Item>
            <Row className={'justify-between w-full'}>
              <Button
                onClick={() => {
                  navigate('/register');
                }}
                style={{ color: '#438ED2' }}
                className={'p-0 text-lg mb-2'}
                type={'text'}
              >
                Do not have an account?
              </Button>
              <Button
                style={{ background: '#2B4365', width: '40%' }}
                htmlType={'submit'}
                type={'primary'}
                size={'large'}
              >
                Login
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Login;
