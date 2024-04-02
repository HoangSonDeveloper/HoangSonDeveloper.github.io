import { Dropdown, Image, Layout, MenuProps, Row, Typography } from 'antd';
import React from 'react';

const { Header } = Layout;
const { Text } = Typography;

export const renderHeader = (
  navigate?: any,
  logout?: any,
  showAvatar = false,
  dropDownItems?: MenuProps,
) => {
  return (
    <Header>
      <Row className={'h-full justify-between'}>
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
        <Row className={'h-full  flex items-center'}>
          {dropDownItems && (
            <Dropdown menu={dropDownItems}>
              <Image
                src={
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
                style={{ width: 52, height: 52, borderRadius: 26 }}
                preview={false}
              />
            </Dropdown>
          )}
        </Row>
      </Row>
    </Header>
  );
};
