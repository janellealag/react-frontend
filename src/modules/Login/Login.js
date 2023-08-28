import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Col, Row } from 'antd';
import { useAccountContext } from '../Account/AccountProvider';

const Login = () => {
  const {
    signIn
  } = useAccountContext();

  const onFinish = async (values) => {
    const user = {
      username: values.username,
      password: values.password,
      remember: values.remember,
    };
    // console.log(user)
    await signIn(user);
 
  };
  return (
    <>
      <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
        <Col flex={4}></Col>
        <Col flex={1}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="test.com">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <a href="test.com"> Or register now!</a>
            </Form.Item>
          </Form>
        </Col>
        <Col flex={4}></Col>
      </Row>
    </>
  );
};
export default Login;
