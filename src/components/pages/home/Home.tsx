import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Col,
  DatePickerProps,
  Form,
  FormProps,
  Input,
  Modal,
  Row,
  Switch,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { DatePicker } from "antd";
import { FaEye } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router";
import { openNotificationWithIcon } from "../../hooks/components/Notification";
import ServerErrorPage from "../routes/ServerErrorPage";
import LoadingPage from "../routes/LoadingPage";

const { RangePicker } = DatePicker;

const initialValCreate = {
  novac: null,
  ulaz: null,
  izlaz: null,
  noci: null,
  odrasli: null,
  deca: null,
  ljubimac: null,
  zaNaplatu: null,
  ruza: null,
  nama: null,
  otkazano: null,
  gost: null,
  telefon: null,
  rezervacija: null,
  struja: null,
  voda: null,
  kucniSavet: null,
  investicija: null,
  porez: null,
};

type FieldType = {
  novac?: string;
  ulaz?: string;
  izlaz?: string;
  noci?: string;
  odrasli?: Number;
  deca?: Number;
  ljubimac?: Number;
  zaNaplatu?: Number;
  ruza?: Number;
  nama?: Number;
  otkazano?: Boolean;
  gost?: string;
  telefon?: string;
  rezervacija?: string;
  struja?: string;
  voda?: string;
  kucniSavet?: string;
  investicija?: string;
  porez?: string;
  _id?: string;
};

interface DataType {
  novac?: string;
  ulaz?: string;
  izlaz?: string;
  noci?: string;
  odrasli?: Number;
  deca?: Number;
  ljubimac?: Number;
  zaNaplatu?: Number;
  ruza?: Number;
  nama?: Number;
  otkazano?: Boolean;
  gost?: string;
  telefon?: string;
  rezervacija?: string;
  struja?: string;
  voda?: string;
  kucniSavet?: string;
  investicija?: string;
  porez?: string;
  _id: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<(Dayjs | null)[]>([null, null]);
  const dateRef1 = useRef<string | string[] | null>(null);
  const dateRef2 = useRef<string | string[] | null>(null);
  const token = localStorage.getItem("authToken");

  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();

  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["table"],
    queryFn: () =>
      fetch(
        `http://localhost:3000/api/table/${localStorage.getItem(
          "activeTableId"
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      ).then((res) => res.json()),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (data) {
    console.log("Home page data fetched succesfully");
  }

  const mutationEdit = useMutation({
    mutationFn: ({ rowId, validData }: { rowId?: string; validData: any }) =>
      fetch(
        rowId
          ? `http://localhost:3000/api/table/${localStorage.getItem(
              "activeTableId"
            )}/${rowId}`
          : `http://localhost:3000/api/table/${localStorage.getItem(
              "activeTableId"
            )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({ ...validData }),
        }
      ),
    onSuccess: () => {
      refetch();
      setIsEditing(false);
      setIsCreating(false);
      openNotificationWithIcon({
        type: "success",
        title: "Izmena podataka",
        description: "Uspešno ste izmeni podatak.",
      });
    },
    onError: (error: any) => {
      openNotificationWithIcon({
        type: "error",
        title: "Izmena podataka",
        description: "Neuspešna izmena podatka.",
      });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (rowId: string) =>
      fetch(
        `http://localhost:3000/api/table/${localStorage.getItem(
          "activeTableId"
        )}/${rowId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      ),
    onSuccess: () => {
      refetch();
      openNotificationWithIcon({
        type: "success",
        title: "Brisanje podatka",
        description: "Uspešno ste obrisali podatak.",
      });
    },
    onError: (error: any) => {
      openNotificationWithIcon({
        type: "error",
        title: "Brisanje podatka",
        description: "Neuspešno brisanje podatka.",
      });
    },
  });

  useEffect(() => {
    filterData();
  }, [searchText, dateRange, data]);

  const filterData = () => {
    if (data && data.values) {
      const filtered = data.values.filter((record: any) => {
        const textMatch =
          (record.gost?.toLowerCase() || "").includes(
            searchText.toLowerCase()
          ) ||
          (record.rezervacija?.toLowerCase() || "").includes(
            searchText.toLowerCase()
          ) ||
          (record.novac?.toLowerCase() || "").includes(
            searchText.toLowerCase()
          );
        const [startDate, endDate] = dateRange;
        const dateMatch =
          !startDate || !endDate
            ? true
            : (dayjs(record.ulaz).isAfter(startDate, "day") &&
                dayjs(record.ulaz).isBefore(endDate, "day")) ||
              (dayjs(record.izlaz).isAfter(startDate, "day") &&
                dayjs(record.izlaz).isBefore(endDate, "day"));

        return textMatch && dateMatch;
      });

      setFilteredData(filtered);
    }
  };

  const onChangeUlaz: DatePickerProps["onChange"] = (date, dateString) => {
    dateRef1.current = dateString;
  };

  const onChangeIzlaz: DatePickerProps["onChange"] = (date, dateString) => {
    dateRef2.current = dateString;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (values) {
      const validData: any = {
        novac: values.novac,
        ulaz: dateRef1.current,
        izlaz: dateRef2.current,
        noci: values.noci,
        odrasli: values.odrasli,
        deca: values.deca,
        ljubimac: values.ljubimac,
        zaNaplatu: values.zaNaplatu,
        ruza: values.ruza,
        nama: values.nama,
        otkazano: values.otkazano,
        gost: values.gost,
        telefon: values.telefon,
        rezervacija: values.rezervacija,
        struja: values.struja,
        voda: values.voda,
        kucniSavet: values.kucniSavet,
        investicija: values.investicija,
        porez: values.porez,
      };
      mutationEdit.mutate({ validData });
    }
  };
  const onFinishEditing: FormProps<FieldType>["onFinish"] = (values) => {
    if (values) {
      const validData: any = {
        novac: values.novac,
        ulaz: values.ulaz,
        izlaz: values.izlaz,
        noci: values.noci,
        odrasli: values.odrasli,
        deca: values.deca,
        ljubimac: values.ljubimac,
        zaNaplatu: values.zaNaplatu,
        ruza: values.ruza,
        nama: values.nama,
        otkazano: values.otkazano,
        gost: values.gost,
        telefon: values.telefon,
        rezervacija: values.rezervacija,
        struja: values.struja,
        voda: values.voda,
        kucniSavet: values.kucniSavet,
        investicija: values.investicija,
        porez: values.porez,
      };
      mutationEdit.mutate({ validData, rowId: values._id });
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Novac",
      dataIndex: "novac",
      key: "novac",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Ulaz",
      dataIndex: "ulaz",
      key: "ulaz",
      render(value: string) {
        return (
          <div>
            {value ? (
              <div>{dayjs(value, "YYYY/MM/DD").format("DD/MM/YYYY")}</div>
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      title: "Izlaz",
      dataIndex: "izlaz",
      key: "izlaz",
      render(value: string) {
        return (
          <div>
            {value ? (
              <div>{dayjs(value, "YYYY/MM/DD").format("DD/MM/YYYY")}</div>
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      title: "Noci",
      dataIndex: "noci",
      key: "noci",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Odrasli",
      dataIndex: "odrasli",
      key: "odrasli",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Deca",
      dataIndex: "deca",
      key: "deca",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Ljubimac",
      dataIndex: "ljubimac",
      key: "ljubimac",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Za Naplatu",
      dataIndex: "zaNaplatu",
      key: "zaNaplatu",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Ruza",
      dataIndex: "ruza",
      key: "ruza",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Otkazano",
      dataIndex: "otkazano",
      key: "otkazano",
      render(value) {
        return <div>{value ? "Da" : "Ne"}</div>;
      },
    },
    {
      title: "Gost",
      dataIndex: "gost",
      key: "gost",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Telefon",
      dataIndex: "telefon",
      key: "telefon",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Rezervacija",
      dataIndex: "rezervacija",
      key: "rezervacija",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Struja",
      dataIndex: "struja",
      key: "struja",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Voda",
      dataIndex: "voda",
      key: "voda",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Kucni savet",
      dataIndex: "kucniSavet",
      key: "kucniSavet",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Investicija",
      dataIndex: "investicija",
      key: "investicija",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Porez",
      dataIndex: "porez",
      key: "porez",
      render(value) {
        return <div>{value ? value : value == 0 ? "0" : "-"}</div>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex justify-center">
          <Button
            type="primary"
            onClick={() => {
              navigate(`/rowDetails/${record._id}`);
            }}
          >
            <FaEye />
          </Button>
          <Button
            type="primary"
            className="ml-1"
            onClick={() => {
              setIsEditing(true);
              formEdit.setFieldsValue({
                novac: record.novac,
                ulaz: record.ulaz,
                izlaz: record.izlaz,
                noci: record.noci,
                odrasli: record.odrasli,
                deca: record.deca,
                ljubimac: record.ljubimac,
                zaNaplatu: record.zaNaplatu,
                ruza: record.ruza,
                nama: record.nama,
                otkazano: record.otkazano,
                gost: record.gost,
                telefon: record.telefon,
                rezervacija: record.rezervacija,
                struja: record.struja,
                voda: record.voda,
                kucniSavet: record.kucniSavet,
                investicija: record.investicija,
                porez: record.porez,
                _id: record._id,
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
              mutationDelete.mutate(record._id);
            }}
          >
            <HiOutlineXMark />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ServerErrorPage />;
  }

  return (
    <div>
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
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            <div className="font-17 bold text-center w-100 mt-1">
              <div>{data ? data.tableName : "Tabela rezervacija"}</div>
            </div>
            <div className="w-100 h-75">
              <div className="w-100 flex space-between font-12 bold">
                <div>
                  <Input
                    placeholder="Search..."
                    style={{ marginBottom: 16 }}
                    className="w-40"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <RangePicker
                    className="w-50 ml-1"
                    onChange={(dates) => {
                      setDateRange(dates ? [dates[0], dates[1]] : [null, null]);
                    }}
                  />
                </div>
              </div>
              <div>
                {filteredData ? (
                  <Table
                    rowKey={(record) => record._id}
                    scroll={{ x: 250 }}
                    dataSource={filteredData ? filteredData : undefined}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    title={() => {
                      return (
                        <div
                          className="bold font-11 flex space-between w-100"
                          style={{ letterSpacing: ".05rem" }}
                        >
                          <div>{"Tabela rezervacija"}</div>
                          <div
                            style={{
                              color: "green",
                              textDecoration: "underline",
                              fontSize: ".9rem",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setIsCreating(true);
                            }}
                          >
                            <CiCirclePlus
                              style={{
                                transform: "scale(1.3)",
                                color: "green",
                              }}
                            />
                            <span className="p-05">Kreiraj novi podatak</span>
                          </div>
                        </div>
                      );
                    }}
                    className="w-100"
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>
            <Modal
              title={"Editing row"}
              open={isEditing}
              footer={null}
              width={1000}
              onCancel={() => setIsEditing(false)}
              destroyOnClose={true}
            >
              <Form
                name="basic"
                form={formEdit}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinishEditing}
                autoComplete="off"
                className="mt-1"
              >
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item label="Novac" name={"novac"} className="w-100">
                      <Input placeholder="Novac..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Ulaz" name={"ulaz"} className="w-100">
                      <Input placeholder="Ulaz..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Izlaz" name={"izlaz"} className="w-100">
                      <Input placeholder="Izlaz..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item label="Noci" name={"noci"} className="w-100">
                      <Input placeholder="Noci..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Odrasli"
                      name={"odrasli"}
                      className="w-100"
                    >
                      <Input placeholder="Odrasli..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Deca" name={"deca"} className="w-100">
                      <Input placeholder="Deca..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item
                      label="Ljubimac"
                      name={"ljubimac"}
                      className="w-100"
                    >
                      <Input placeholder="Ljubimac..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Za naplatu"
                      name={"zaNaplatu"}
                      className="w-100"
                    >
                      <Input placeholder="Za naplatu..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Ruza" name={"ruza"} className="w-100">
                      <Input placeholder="ruza..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item label="Nama" name={"nama"} className="w-100">
                      <Input placeholder="Nama..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Otkazano"
                      name={"otkazano"}
                      className="w-100"
                    >
                      <Input placeholder="Otkazano..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Gost" name={"gost"} className="w-100">
                      <Input placeholder="Gost..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item
                      label="Telefon"
                      name={"telefon"}
                      className="w-100"
                    >
                      <Input placeholder="Telefon..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Rezervacija"
                      name={"rezervacija"}
                      className="w-100"
                    >
                      <Input placeholder="Rezervacija..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Struja" name={"struja"} className="w-100">
                      <Input placeholder="Struja..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item label="Voda" name={"voda"} className="w-100">
                      <Input placeholder="Voda..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Kucni savet"
                      name={"kucniSavet"}
                      className="w-100"
                    >
                      <Input placeholder="Kucni savet..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Investicija"
                      name={"investicija"}
                      className="w-100"
                    >
                      <Input placeholder="Investicija..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item label="Porez" name={"porez"} className="w-100">
                      <Input placeholder="Porez..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Col span={8} style={{ visibility: "hidden" }}>
                  <Form.Item label="Id" name={"_id"} className="w-100">
                    <Input placeholder="ID..." />
                  </Form.Item>
                </Col>
                <Row justify={"center"}>
                  <Button
                    onClick={() => {
                      dateRef1.current = null;
                      dateRef2.current = null;
                      formEdit.resetFields();
                      setIsEditing(false);
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
            <Modal
              title={"Creating a row"}
              open={isCreating}
              footer={null}
              width={1000}
              onCancel={() => {
                dateRef1.current = null;
                dateRef2.current = null;
                form.resetFields();
                setIsCreating(false);
              }}
              destroyOnClose={true}
            >
              <Form
                name="basic"
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                initialValues={initialValCreate}
                onFinish={onFinish}
                autoComplete="off"
                className="mt-1 w-100"
              >
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item label="Novac" name={"novac"} className="w-100">
                      <Input placeholder="Novac..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Ulaz" name={"ulaz"} className="w-100">
                      <DatePicker onChange={onChangeUlaz} className="w-100" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Izlaz" name={"izlaz"} className="w-100">
                      <DatePicker onChange={onChangeIzlaz} className="w-100" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item label="Noci" name={"noci"} className="w-100">
                      <Input placeholder="Noci..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Odrasli"
                      name={"odrasli"}
                      className="w-100"
                    >
                      <Input placeholder="Odrasli..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Deca" name={"deca"} className="w-100">
                      <Input placeholder="Deca..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item
                      label="Ljubimac"
                      name={"ljubimac"}
                      className="w-100"
                    >
                      <Input placeholder="Ljubimac..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Za naplatu"
                      name={"zaNaplatu"}
                      className="w-100"
                    >
                      <Input placeholder="Za naplatu..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Ruza" name={"ruza"} className="w-100">
                      <Input placeholder="ruza..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item label="Nama" name={"nama"} className="w-100">
                      <Input placeholder="Nama..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Porez" name={"porez"} className="w-100">
                      <Input placeholder="Porez..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Gost" name={"gost"} className="w-100">
                      <Input placeholder="Gost..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item
                      label="Telefon"
                      name={"telefon"}
                      className="w-100"
                    >
                      <Input placeholder="Telefon..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Rezervacija"
                      name={"rezervacija"}
                      className="w-100"
                    >
                      <Input placeholder="Rezervacija..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Struja" name={"struja"} className="w-100">
                      <Input placeholder="Struja..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item label="Voda" name={"voda"} className="w-100">
                      <Input placeholder="Voda..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Kucni savet"
                      name={"kucniSavet"}
                      className="w-100"
                    >
                      <Input placeholder="Kucni savet..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Investicija"
                      name={"investicija"}
                      className="w-100"
                    >
                      <Input placeholder="Investicija..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item
                      label="Otkazano"
                      name={"otkazano"}
                      className="w-100"
                    >
                      <Switch
                        checkedChildren="Da"
                        unCheckedChildren="Ne"
                        defaultChecked
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"}>
                  <Button
                    onClick={() => {
                      dateRef1.current = null;
                      dateRef2.current = null;
                      form.resetFields();
                      setIsCreating(false);
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
    </div>
  );
};

export default Home;
