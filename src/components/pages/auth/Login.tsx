import { Button, Form, FormProps, Input, Row } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { RiBox3Line } from "react-icons/ri";
import { useNavigate } from "react-router";

type FieldType = {
  username?: string;
  password?: string;
  id?: string;
};

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const login = async ({
    username,
    password,
  }: {
    username: any;
    password: any;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, _id } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", _id);

      navigate("/chooser");

      form.resetFields();

      return { token, _id }; 
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed");
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    login({ username: values.username, password: values.password });
  };

  return (
    <div
      style={{ backgroundColor: "gray" }}
      className="w-100 h-100 flex justify-center align-center"
    >
      <div
        className="w-75 h-75 bg-white flex justify-center align-center"
        style={{
          borderRadius: "1.2%",
          boxShadow: "6px 20px 30px black",
          overflow: "hidden",
        }}
      >
        <div>
          <div className="mb-1">
            <div className="w-100 h-100 flex align-center justify-center mt-2 mb-1">
              <RiBox3Line
                style={{
                  transform: "scale(2.5)",
                  padding: ".2rem",
                  border: "1px solid black",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div
              className="font-20 bold text-center"
              style={{ textDecoration: "underline" }}
            >
              LOGIN
            </div>
          </div>
          <div>
            <Form
              name="basic"
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 500 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Row justify={"center"}>
                <Form.Item
                  label="Id"
                  name="id"
                  className="w-100 h-0"
                  style={{ visibility: "hidden" }}
                >
                  <Input placeholder="Id..." />
                </Form.Item>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Row>

              <Row justify={"center"}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </div>
          <div
            className="w-100 text-center"
            style={{
              textDecoration: "underline",
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/register");
            }}
          >
            Register now
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
