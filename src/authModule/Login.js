import React from "react";
import { Form, Input, Button } from "antd";

// eslint-disable-next-line no-unused-vars
import { app } from "../firebase/firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

// import "antd/dist/antd.css";
import "./Login.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { span: 16 },
};

const Login = () => {
  // state to save any error that might occur during login
  const [error, setError] = React.useState();

  // antd form component
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = (values) => {
    const authentication = getAuth();

    // firebase in-built method for login using email and password
    signInWithEmailAndPassword(authentication, values.email, values.password)
      // if email and password combination is correct
      .then((response) => {
        navigate("/task");
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
      })

      // if any error occures during login
      .catch((error) => {
        // firebase in-built error for wrong password
        if (error.code === "auth/wrong-password") {
          setError("Please check the Password");
        }

        // firebase in-built error for wrong email
        else if (error.code === "auth/user-not-found") {
          setError("Please check the Email");
        }

        // for any other errors
        else {
          setError("Email and Password does not match");
        }
      });
  };

  // if any error occures while submitting form
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-main-wrapper">
      <div className="login-form-wrapper">
        <Form
          {...layout}
          form={form}
          name="login"
          layout={"vertical"}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name={"email"}
            rules={[
              {
                required: true,
                message: "Please enter email!",
              },
            ]}
          >
            <Input
              onChange={() => {
                setError();
              }}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name={"password"}
            rules={[
              {
                required: true,
                message: "Please enter password!",
              },
            ]}
          >
            <Input
              onChange={() => {
                setError();
              }}
            />
          </Form.Item>
          <div className="error-wrapper">{error}</div>
          <Form.Item {...tailLayout} className="login-form-tail">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
