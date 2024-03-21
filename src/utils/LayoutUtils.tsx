import { Image, Layout, Row, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Text } = Typography;

export const renderHeader = (navigate?: any) => {
  return (
    <Header>
      <Row className={'h-full'}>
        <a
          onClick={() => {
            navigate?.('/');
          }}
        >
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
        </a>
      </Row>
    </Header>
  );
};
