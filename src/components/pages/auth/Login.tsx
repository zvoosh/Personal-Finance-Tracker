import { useQuery } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message, Row } from "antd";
import { RiBox3Line } from "react-icons/ri";
import { useNavigate } from "react-router";

type FieldType = {
  username?: string;
  password?: string;
};

type UserType = {
  username: string;
  password: string;
};

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        "https://671b6bb62c842d92c37fd521.mockapi.io/api/expense/Users"
      ).then((res) => res.json())
    
  });
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const validData = data.map((currVal: UserType, index: string) => {
      return (
        currVal.username == values.username &&
        currVal.password == values.password
      );
    });
    if (validData[0]) {
      navigate("/home");
    }
    if (!validData[0]) {
      message.error("Wrong username or password");
      form.resetFields();
    }
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
          {/* LOGIN */}
          <div className="mb-4">
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
          {/* FORM */}
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
              className="mt-1"
            >
              <Row justify={"center"}>
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

export { Login };
