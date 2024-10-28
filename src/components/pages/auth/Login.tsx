import { useQuery } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message, Row } from "antd";
import { useContext } from "react";
import { RiBox3Line } from "react-icons/ri";
import { useNavigate } from "react-router";
import { Context } from "../../context";

type FieldType = {
  username?: string;
  password?: string;
  id?: string;
};

type UserType = {
  username: string;
  password: string;
  id: string;
};

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const context = useContext(Context);
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        "https://671b6bb62c842d92c37fd521.mockapi.io/api/expense/Users"
      ).then((res) => res.json()),
  });
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!context) {
    throw new Error("MyComponent must be used within a MyProvider");
  }

  const { setUserId } = context;

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const validData = data.find(
      (currVal: UserType) =>
        currVal.username == values.username &&
        currVal.password == values.password
    );
    console.log(validData);
    if (validData) {
      setUserId(validData.id)
      navigate("/home");
    }
    if (!validData) {
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

export { Login };
