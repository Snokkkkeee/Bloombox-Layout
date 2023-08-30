import React, { useState } from "react";
import { Form, Input, Button, Layout, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import { signIn } from "../Services/auth"; // Assuming you have the signIn function defined here
import logo from "../assets/GrowBox.png";
import backgroundImage from "../assets/c71c3bbd-6268-43da-aa49-14ce1d1700f1.png";

const { Content } = Layout;
const { Title, Text } = Typography;

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  color: "#333",
};

export default function SignIn() {
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { user, errorMessage } = await signIn(
      values.username,
      values.password
    );

    if (user) {
      // Assuming you have a user ID or some unique identifier in the user object
      // This check ensures that only registered users can sign in
      if (user.userId) {
        setRedirectToDashboard(true);
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } else {
      setErrorMessage(errorMessage);
    }
  };

  if (redirectToDashboard) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Layout
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        minWidth: "50vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "50px",
            borderRadius: "25px",
            textAlign: "center",
            margin: "20px",
          }}
        >
          <Title level={2} style={{ color: "#2accb6", marginBottom: "20px" }}>
            Connect to{" "}
            <img
              src={logo}
              alt="GrowBox"
              style={{
                width: "200px",
                verticalAlign: "middle",
                marginBottom: "20px",
              }}
            />
          </Title>
          <Text type="secondary" style={{ marginBottom: "30px" }}>
            Sign in to continue to your dashboard
          </Text>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ marginTop: "30px" }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username/Email"
                style={inputStyle}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                style={inputStyle}
              />
            </Form.Item>
            {errorMessage && (
              <Text type="danger" style={{ marginBottom: "15px" }}>
                {errorMessage}
              </Text>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "80%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "15px",
                  border: "none",
                  marginBottom: "10px",
                }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>

          <Button
            icon={<GoogleOutlined />}
            style={{
              width: "60%",
              height: "40px",
              fontSize: "16px",
              backgroundColor: "#2accb6",
              color: "white",
              borderRadius: "15px",
              border: "none",
              marginBottom: "15px",
            }}
          >
            Sign in with Google
          </Button>
          <Button
            icon={<GithubOutlined />}
            style={{
              width: "60%",
              height: "40px",
              fontSize: "16px",
              backgroundColor: "#333",
              color: "white",
              borderRadius: "15px",
              border: "none",
              marginBottom: "15px",
            }}
          >
            Sign in with GitHub
          </Button>
          <Button
            type="link"
            onClick={() => navigate("/SignUp")}
            htmlType="submit"
            style={{
              width: "80%",
              height: "40px",
              fontSize: "16px",
              borderRadius: "15px",
              border: "none",
              marginBottom: "10px",
            }}
          >
            Register
          </Button>
        </div>
      </Content>
    </Layout>
  );
}
