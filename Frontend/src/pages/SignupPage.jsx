import { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";

const { Option } = Select;

const SignupPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/signup", values);
      message.success("Signup successful!");
      console.log(response.data);
    } catch (error) {
      message.error("Signup failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Signup</h2>
      <Form
        name="signup"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="role"
          rules={[{ required: true, message: "Please select your Role!" }]}
        >
          <Select placeholder="Select a role">
            <Option value="buyer">Buyer</Option>
            <Option value="seller">Seller</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupPage;
