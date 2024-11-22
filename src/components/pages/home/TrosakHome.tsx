import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Form, FormProps, Input, Modal, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { openNotificationWithIcon } from "../../hooks/components/Notification";
import ServerErrorPage from "../routes/ServerErrorPage";
import LoadingPage from "../routes/LoadingPage";

const initialValCreate = {
  entitet: null,
  predmet: null,
  maj: null,
  jun: null,
  jul: null,
  avgust: null,
  septembar: null,
  oktobar: null,
  novembar: null,
  decembar: null,
  ukupnoZaGod: null,
  ukupnoEu: null,
  prodato: null,
  zaradjeno: null,
  ostaje: null,
  _id: null,
};

type FieldType = {
  entitet: string;
  predmet: string;
  maj?: string;
  jun?: string;
  jul?: Number;
  avgust?: Number;
  septembar?: Number;
  oktobar?: Number;
  novembar?: Number;
  decembar?: Number;
  ukupnoZaGod?: Boolean;
  ukupnoEu?: string;
  prodato?: string;
  zaradjeno?: string;
  ostaje?: string;
  _id?: string;
};

interface DataType {
  entitet: string;
  predmet: string;
  maj?: string;
  jun?: string;
  jul?: Number;
  avgust?: Number;
  septembar?: Number;
  oktobar?: Number;
  novembar?: Number;
  decembar?: Number;
  ukupnoZaGod?: Boolean;
  ukupnoEu?: string;
  prodato?: string;
  zaradjeno?: string;
  ostaje?: string;
  _id?: string;
}

const TrosakHome = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const token = localStorage.getItem("authToken");

  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();

  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["tableTrosak"],
    queryFn: () =>
      fetch(
        `http://localhost:3000/api/trosak/${localStorage.getItem(
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
    console.log("Trosak Home page data fetched succesfully");
  }

  const mutationEdit = useMutation({
    mutationFn: ({ rowId, validData }: { rowId?: string; validData: any }) =>
      fetch(
        rowId
          ? `http://localhost:3000/api/trosak/${localStorage.getItem(
              "activeTableId"
            )}/${rowId}`
          : `http://localhost:3000/api/trosak/${localStorage.getItem(
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
        `http://localhost:3000/api/trosak/${localStorage.getItem(
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
  }, [searchText, data]);

  const filterData = () => {
    if (data && data.values) {
      const filtered = data.values.filter((record: any) => {
        const textMatch =
          (record.entitet?.toLowerCase() || "").includes(
            searchText.toLowerCase()
          ) ||
          (record.predmet?.toLowerCase() || "").includes(
            searchText.toLowerCase()
          );

        return textMatch;
      });

      setFilteredData(filtered);
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (values) {
      const validData: any = {
        entitet: values.entitet,
        predmet: values.predmet,
        maj: values.maj,
        jun: values.jun,
        jul: values.jul,
        avgust: values.avgust,
        septembar: values.septembar,
        oktobar: values.oktobar,
        novembar: values.novembar,
        decembar: values.decembar,
        ukupnoZaGod: values.ukupnoZaGod,
        ukupnoEu: values.ukupnoEu,
        prodato: values.prodato,
        zaradjeno: values.zaradjeno,
        ostaje: values.ostaje,
        _id: values._id,
      };
      mutationEdit.mutate({ validData });
      form.resetFields();
    }
  };
  const onFinishEditing: FormProps<FieldType>["onFinish"] = (values) => {
    if (values) {
      const validData: any = {
        entitet: values.entitet,
        predmet: values.predmet,
        maj: values.maj,
        jun: values.jun,
        jul: values.jul,
        avgust: values.avgust,
        septembar: values.septembar,
        oktobar: values.oktobar,
        novembar: values.novembar,
        decembar: values.decembar,
        ukupnoZaGod: values.ukupnoZaGod,
        ukupnoEu: values.ukupnoEu,
        prodato: values.prodato,
        zaradjeno: values.zaradjeno,
        ostaje: values.ostaje,
        _id: values._id,
      };
      mutationEdit.mutate({ validData, rowId: values._id });
      formEdit.resetFields();
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Entitet",
      dataIndex: "entitet",
      key: "entitet",
    },
    {
      title: "Predmet",
      dataIndex: "predmet",
      key: "predmet",
    },
    {
      title: "Maj",
      dataIndex: "maj",
      key: "maj",
    },
    {
      title: "Jun",
      dataIndex: "jun",
      key: "jun",
    },
    {
      title: "Jul",
      dataIndex: "jul",
      key: "jul",
    },
    {
      title: "Avgust",
      dataIndex: "avgust",
      key: "avgust",
    },
    {
      title: "Septembar",
      dataIndex: "septembar",
      key: "septembar",
    },
    {
      title: "Oktobar",
      dataIndex: "oktobar",
      key: "oktobar",
    },
    {
      title: "Novembar",
      dataIndex: "novembar",
      key: "novembar",
    },
    {
      title: "Decembar",
      dataIndex: "decembar",
      key: "decembar",
    },
    {
      title: "Ukupno za godinu",
      dataIndex: "ukupnoZaGod",
      key: "ukupnoZaGod",
    },
    {
      title: "Ukupno Eura",
      dataIndex: "ukupnoEu",
      key: "ukupnoEu",
    },
    {
      title: "Prodato",
      dataIndex: "prodato",
      key: "prodato",
    },
    {
      title: "Zaradjeno",
      dataIndex: "zaradjeno",
      key: "zaradjeno",
    },
    {
      title: "Ostaje",
      dataIndex: "ostaje",
      key: "ostaje",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex justify-center">
          <Button
            type="primary"
            onClick={() => {
              navigate(`/trosakrowDetails/${record._id}`);
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
                entitet: record.entitet,
                predmet: record.predmet,
                maj: record.maj,
                jun: record.jun,
                jul: record.jul,
                avgust: record.avgust,
                septembar: record.septembar,
                oktobar: record.oktobar,
                novembar: record.novembar,
                decembar: record.decembar,
                ukupnoZaGod: record.ukupnoZaGod,
                ukupnoEu: record.ukupnoEu,
                prodato: record.prodato,
                zaradjeno: record.zaradjeno,
                ostaje: record.ostaje,
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
  
  if(error){
    return (<ServerErrorPage/>)
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
              <div>{data ? data.tableName : "Praćenje Troškova"}</div>
            </div>
            <div className="w-100 h-75">
              <div className="w-100 flex space-between font-12 bold">
                <div>
                  <Input
                    placeholder="Search..."
                    style={{ marginBottom: 16 }}
                    className="w-100"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </div>
              <div>
                {filteredData ? (
                  <Table
                    rowKey={(record) => record._id!}
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
                          <div>Tabela Troškova</div>
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
                    <Form.Item
                      label="Entitet"
                      name={"entitet"}
                      className="w-100"
                    >
                      <Input placeholder="Entitet..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Predmet"
                      name={"predmet"}
                      className="w-100"
                    >
                      <Input placeholder="Predmet..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Maj" name={"maj"} className="w-100">
                      <Input placeholder="Maj..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item label="Jun" name={"jun"} className="w-100">
                      <Input placeholder="jun..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Jul" name={"jul"} className="w-100">
                      <Input placeholder="Jul..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Avgust" name={"avgust"} className="w-100">
                      <Input placeholder="Avgust..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item
                      label="Septembar"
                      name={"septembar"}
                      className="w-100"
                    >
                      <Input placeholder="Septembar..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Oktobar"
                      name={"oktobar"}
                      className="w-100"
                    >
                      <Input placeholder="Oktobar..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Novembar"
                      name={"novembar"}
                      className="w-100"
                    >
                      <Input placeholder="Novembar..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item
                      label="Decembar"
                      name={"decembar"}
                      className="w-100"
                    >
                      <Input placeholder="Decembar..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Ukupno za godinu"
                      name={"ukupnoZaGod"}
                      className="w-100"
                    >
                      <Input placeholder="UkupnoZaGod..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Ukupno Eura"
                      name={"ukupnoEu"}
                      className="w-100"
                    >
                      <Input placeholder="Ukupno Eura..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item
                      label="Prodato"
                      name={"prodato"}
                      className="w-100"
                    >
                      <Input placeholder="Prodato..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Zajedno"
                      name={"zajedno"}
                      className="w-100"
                    >
                      <Input placeholder="Zajedno..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Ostaje" name={"ostaje"} className="w-100">
                      <Input placeholder="Ostaje..." />
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
                    <Form.Item
                      label="Entitet"
                      name={"entitet"}
                      className="w-100"
                    >
                      <Input placeholder="Entitet..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Predmet"
                      name={"predmet"}
                      className="w-100"
                    >
                      <Input placeholder="Predmet..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Maj" name={"maj"} className="w-100">
                      <Input placeholder="Maj..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item label="Jun" name={"jun"} className="w-100">
                      <Input placeholder="jun..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Jul" name={"jul"} className="w-100">
                      <Input placeholder="Jul..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Avgust" name={"avgust"} className="w-100">
                      <Input placeholder="Avgust..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item
                      label="Septembar"
                      name={"septembar"}
                      className="w-100"
                    >
                      <Input placeholder="Septembar..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Oktobar"
                      name={"oktobar"}
                      className="w-100"
                    >
                      <Input placeholder="Oktobar..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Novembar"
                      name={"novembar"}
                      className="w-100"
                    >
                      <Input placeholder="Novembar..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item
                      label="Decembar"
                      name={"decembar"}
                      className="w-100"
                    >
                      <Input placeholder="Decembar..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Ukupno za godinu"
                      name={"ukupnoZaGod"}
                      className="w-100"
                    >
                      <Input placeholder="UkupnoZaGod..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Ukupno Eura"
                      name={"ukupnoEu"}
                      className="w-100"
                    >
                      <Input placeholder="Ukupno Eura..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Col span={8}>
                    <Form.Item
                      label="Prodato"
                      name={"prodato"}
                      className="w-100"
                    >
                      <Input placeholder="Prodato..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Zajedno"
                      name={"zajedno"}
                      className="w-100"
                    >
                      <Input placeholder="Zajedno..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Ostaje" name={"ostaje"} className="w-100">
                      <Input placeholder="Ostaje..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"}>
                  <Button
                    onClick={() => {
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

export default   TrosakHome ;
