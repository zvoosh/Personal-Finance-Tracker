import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { FaEye } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { DatePicker } from "antd";
import { format, isWithinInterval } from "date-fns";
import { Dayjs } from "dayjs";
import { HiOutlineXMark } from "react-icons/hi2";
import { Expenses } from "../../types";
import { expensesDelete, expensesPut } from "../../api";
import { DetailModal } from "./DetailModal";
import { Header } from "./Header";
import { Summarium } from "./Summarium";
import { Context } from "../../context";

const { RangePicker } = DatePicker;

type FieldType = {
  description?: string;
  amount?: number;
  type?: string;
  date?: string;
  category?: string;
  id?: string;
};

interface DataType {
  description: string;
  amount: number;
  type: string;
  date: string;
  category: string;
  id: string;
}

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const context = useContext(Context);
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Expenses | null>(null);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  if (!context) {
    throw new Error("MyComponent must be used within a MyProvider");
  }

  const { value, setValue, userId, getUserExpenses } = context;

  // React Query hooks
  const {
    isLoading,
    error,
    data: origin,
    refetch,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        "https://671b6bb62c842d92c37fd521.mockapi.io/api/expense/expenses"
      ).then((res) => res.json()),
  });
  const mutationEdit = useMutation({
    mutationFn: (newExpData: Expenses) =>
      expensesPut({ newExp: newExpData, id: newExpData.id }),
    onSuccess: () => {
      refetch();
      setIsEditing(false);
    },
    onError: (error: any) => {
      console.error("Mutation failed:", error);
    },
  });
  const mutationDelete = useMutation({
    mutationFn: (id: string) => expensesDelete(id),
    onSuccess: () => {
      message.success("Row deleted");
    },
    onError: () => {
      message.error("Error while deleting, try again.");
    },
  });

  //Form hooks userId
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (values) {
      const validData: Expenses = {
        description: values.description!,
        amount: values.amount!,
        category: values.category!,
        date: values.date!,
        type: values.type!,
        id: (
          filteredData.reduce((max: any, obj: any) => {
            console.log("id", parseInt(obj.id), "max", parseInt(max));
            let objId = parseInt(obj.id);
            return objId > max ? objId : max;
          }, -Infinity) + 1
        ).toString(),
        userId: userId!
      };
      setValue((prev: any) => {
        if (prev) {
          return [...prev, validData];
        } else {
          return [validData];
        }
      });
    }
  };
  const onFinishEditing: FormProps<FieldType>["onFinish"] = (values) => {
    if (values) {
      const validData: Expenses = {
        description: values.description!,
        amount: values.amount!,
        category: values.category!,
        date: values.date!,
        type: values.type!,
        id: values.id!,
      };
      if (value?.some((item: Expenses) => {
        return item.id === values.id;
      })) {
        let element = value.find((item: Expenses)=> item.id === values.id);
        const filteredArray = value.filter((item: Expenses)=>{
          return item !== element;
        });
        element = {...validData, userId: userId!};
        setValue(()=>{
          return [...filteredArray, element];
        })
        setIsEditing(false);
      } else {
        mutationEdit.mutate(validData);
      }
    }
  };

  //handlers
  const showModal = (record: any) => {
    setSelectedRow(record);
    setIsVisible(true);
  };

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleOk = () => {
    setIsVisible(false);
    setSelectedRow(null);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setSelectedRow(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDateChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    setDateRange(dates);
  };

  const [filteredData, setFilteredData] = useState<Expenses[]>(origin || []);

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }

    return format(date, "dd-MM-yyyy");
  };

  //useEffect
  useEffect(() => {
    if (origin) {
      const updatedData = origin.map((item: Expenses) => ({
        ...item,
        date: formatDate(item.date),
      }));
      setFilteredData(updatedData);
    }
  }, [origin]);

  useEffect(() => {
    if (origin) {
      const newData = origin.filter((item: Expenses) => {
        const description = item.description || "";
        const category = item.category || "";
        const type = item.type || "";

        const matchesSearch =
          description.toLowerCase().includes(searchText.toLowerCase()) ||
          category.toLowerCase().includes(searchText.toLowerCase()) ||
          type.toLowerCase().includes(searchText.toLowerCase());

        const matchesDateRange =
          dateRange &&
          dateRange[0] &&
          dateRange[1] &&
          isWithinInterval(new Date(item.date), {
            start: dateRange[0].toDate(),
            end: dateRange[1].toDate(),
          });

        return matchesSearch && (!dateRange || matchesDateRange);
      });

      let combinedData;
      let userExpensesCtx = getUserExpenses();
      if (userExpensesCtx) {
        combinedData = [...newData, ...userExpensesCtx];
      } else {
        combinedData = [...newData];
      }

      if (isCreating) {
        setIsCreating(false);
      }
      setFilteredData(combinedData);
    }
  }, [origin, searchText, dateRange, value]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) => a.amount - b.amount,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string) => formatDate(text),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        {
          text: "Job",
          value: "Job",
        },
        {
          text: "Food",
          value: "Food",
        },
        {
          text: "Fun",
          value: "Fun",
        },
        {
          text: "Tech",
          value: "Tech",
        },
        {
          text: "Education",
          value: "Education",
        },
      ],
      onFilter: (value: any, record: any) =>
        record.category.indexOf(value) === 0,
      sorter: (a: any, b: any) => a.category.length - b.category.length,
      sortDirections: ["descend"],
    },
    {
      title: "Action",
      key: "action",
      render: (id, record) => (
        <div className="flex justify-center">
          <Button type="primary" onClick={() => showModal(record)}>
            <FaEye />
          </Button>
          <Button
            type="primary"
            className="ml-1"
            onClick={() => {
              setIsEditing(true);
              formEdit.setFieldsValue({
                description: record.description,
                amount: record.amount,
                type: record.type,
                date: record.date,
                category: record.category,
                id: record.id,
              });
            }}
          >
            <CiEdit />
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "red" }}
            className="ml-1"
            onClick={() => {
              if (value) {
                const included = value.includes(record);
                if (included) {
                  const filteredValue = value.filter(
                    (item: Expenses) => item !== record
                  );
                  setValue(filteredValue);
                  message.success("Row deleted");
                } else {
                  mutationDelete.mutate(record.id, {
                    onSuccess: () => {
                      refetch();
                    },
                  });
                }
              } else {
                mutationDelete.mutate(record.id, {
                  onSuccess: () => {
                    refetch();
                  },
                });
              }
            }}
          >
            <HiOutlineXMark />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const incomeTotal = origin
    .filter((obj: Expenses) => obj.type === "income")
    .map((obj: Expenses) => obj.amount)
    .reduce((acc: any, amount: any) => acc + amount, 0);

  const expenseTotal = origin
    .filter((obj: Expenses) => obj.type === "expense")
    .map((obj: Expenses) => {
      return obj.amount;
    })
    .reduce((acc: any, amount: any) => acc + amount, 0);

  const totals = { income: incomeTotal, expense: expenseTotal };

  return (
    <div>
      <Header />
      <div className="w-100 h-100 flex align-center justify-center ">
        <div
          style={{
            height: "calc(100vh - 4rem)",
            width: "100vw",
            overflow: "hidden",
          }}
          className="flex align-center bg-blue justify-center sidePaddings"
        >
          <div
            className="bg-white flex flex-row flex-wrap"
            style={{
              width: "90%",
              height: "100%",
              marginTop: "2rem",
              borderRadius: ".9%",
              overflowY: "auto",
            }}
          >
            <div className="font-17 bold text-center w-100 mt-1">
              <div>Financial Tracker</div>
            </div>
            <div className="w-100 h-75 padding-4">
              <div className="w-100 flex space-between font-12 bold">
                <div>
                  <Input
                    placeholder="Search..."
                    value={searchText}
                    onChange={handleSearch}
                    style={{ marginBottom: 16 }}
                    className="w-40"
                  />
                  <RangePicker
                    className="w-50 ml-1"
                    onChange={handleDateChange}
                  />
                </div>
                <div className="mr-05">
                  Balance: {totals.income - totals.expense}€
                </div>
              </div>
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error loading data.</p>
              ) : (
                <Table
                  rowKey="id"
                  scroll={{ x: 250 }}
                  dataSource={filteredData}
                  columns={columns}
                  pagination={{ pageSize: 6 }}
                  title={() => {
                    return (
                      <div
                        className="bold font-11 flex space-between w-100"
                        style={{ letterSpacing: ".05rem" }}
                      >
                        <div>Financial invoice</div>
                        <div>
                          <CiCirclePlus
                            style={{
                              transform: "scale(1.3)",
                              color: "green",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setIsCreating(true);
                            }}
                          />
                        </div>
                      </div>
                    );
                  }}
                  className="w-100"
                />
              )}
            </div>
            <Summarium income={totals.income} expense={totals.expense} />
          </div>
          {selectedRow && (
            <DetailModal
              selectedRow={selectedRow}
              isVisible
              handleCancel={handleCancel}
              handleOk={handleOk}
            />
          )}
          <Modal
            title={"Editing transaction"}
            open={isEditing}
            footer={null}
            onCancel={() => setIsEditing(false)}
            destroyOnClose={true}
          >
            <Form
              name="basic"
              form={formEdit}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 500 }}
              initialValues={{ remember: true }}
              onFinish={onFinishEditing}
              autoComplete="off"
              className="mt-1"
            >
              <Row justify={"center"}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input your description!",
                    },
                  ]}
                  className="w-100"
                >
                  <Input placeholder="Description..." />
                </Form.Item>

                <Form.Item
                  label="Amount"
                  name="amount"
                  rules={[
                    { required: true, message: "Please input your amount!" },
                  ]}
                  className="w-100"
                >
                  <InputNumber className="w-100" placeholder="Amount..." />
                </Form.Item>
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[
                    { required: true, message: "Please input your type!" },
                  ]}
                  className="w-100"
                >
                  <Input placeholder="Type..." />
                </Form.Item>
                <Form.Item
                  label="Date"
                  name="date"
                  rules={[
                    { required: true, message: "Please input your date!" },
                  ]}
                  className="w-100"
                >
                  <Input placeholder="Date..." />
                </Form.Item>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    { required: true, message: "Please input your category!" },
                  ]}
                  className="w-100"
                >
                  <Input placeholder="Category..." />
                </Form.Item>
                <Form.Item
                  label="Id"
                  name="id"
                  className="w-100 h-0"
                  style={{ visibility: "hidden" }}
                >
                  <Input placeholder="Id..." />
                </Form.Item>
              </Row>

              <Row justify={"center"}>
                <Button onClick={handleCancelEdit}>Cancel</Button>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Modal>
          <Modal
            title={"Creating a transaction"}
            open={isCreating}
            footer={null}
            onCancel={() => {
              setIsCreating((prev) => !prev);
            }}
            destroyOnClose={true}
          >
            <Form
              name="basic"
              form={form}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 500 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              className="mt-1"
            >
              <Row justify={"center"}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input your description!",
                    },
                  ]}
                  className="w-100"
                >
                  <Input placeholder="Description..." />
                </Form.Item>
                <Form.Item
                  label="Amount"
                  name="amount"
                  rules={[
                    { required: true, message: "Please input your amount!" },
                  ]}
                  className="w-100"
                >
                  <InputNumber placeholder="Amount..." className="w-100" />
                </Form.Item>
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[
                    { required: true, message: "Please input your type!" },
                  ]}
                  className="w-100"
                >
                  <Input placeholder="Type..." />
                </Form.Item>
                <Form.Item
                  label="Date"
                  name="date"
                  rules={[
                    { required: true, message: "Please input your date!" },
                  ]}
                  className="w-100"
                >
                  <Input placeholder="Date..." />
                </Form.Item>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    { required: true, message: "Please input your category!" },
                  ]}
                  className="w-100"
                >
                  <Input placeholder="Category..." />
                </Form.Item>
              </Row>

              <Row justify={"center"}>
                <Button
                  onClick={() => {
                    setIsCreating((prev) => !prev);
                  }}
                >
                  Cancel
                </Button>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export { Home };
