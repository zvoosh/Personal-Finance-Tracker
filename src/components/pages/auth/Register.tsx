import { useMutation } from "@tanstack/react-query";
import { Button, Col, Form, FormProps, Input, message, Row } from "antd";
import axios from "axios";
import { RiBox3Line } from "react-icons/ri";
import { useNavigate } from "react-router";

type FieldType = {
  username?: string;
  password?: string;
  passwordRepeated?: string;
};

type UserType = {
  username: string;
  password: string;
};

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (newExpense: UserType) => {
      return axios.post(
        "https://671b6bb62c842d92c37fd521.mockapi.io/api/expense/Users",
        newExpense
      );
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      message.error("Wrong username or password");
      form.resetFields();
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (
      values.username &&
      values.password &&
      values.password == values.passwordRepeated
    ) {
      const validData: UserType = {
        username: values.username,
        password: values.password,
      };
      mutation.mutate(validData);
    }
  };
  return (
    <div
      style={{ backgroundColor: "gray" }}
      className="w-100 h-100 flex justify-center align-center"
    >
      <div
        className="w-25 h-75 bg-white flex justify-center align-center"
        style={{ borderRadius: "3.5%", boxShadow: "6px 20px 30px black" }}
      >
        <div>
          {/* LOGIN */}
          <div>
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
              REGISTER
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
                    {
                      required: true,
                      message: "Username must have more then 5 letters!",
                      len: 5,
                    },
                  ]}
                >
                  <Input placeholder="Username..." />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="Password..." />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="passwordRepeated"
                  rules={[
                    { required: true, message: "The passwords must match!" },
                  ]}
                >
                  <Input.Password placeholder="Password repeat..." />
                </Form.Item>
              </Row>

              <Row justify={"center"}>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
              navigate("/");
            }}
          >
            Login now
          </div>
        </div>
      </div>
    </div>
  );
};

export { Register };
