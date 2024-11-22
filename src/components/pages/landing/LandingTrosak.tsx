import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router";
import { Table, TableTrosak } from "../../types";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import axios from "axios";
import { openNotificationWithIcon } from "../../hooks/components/Notification";
import { postData } from "../../hooks";
import ServerErrorPage from "../routes/ServerErrorPage";
import LoadingPage from "../routes/LoadingPage";

const LandingTrosak = () => {
  const [formCreateTable] = Form.useForm();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["tablesData"],
    queryFn: () =>
      fetch("http://localhost:3000/api/trosak/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }).then((res) => res.json()),
    staleTime: 0,
  });
  
  if (data) {
    console.log("Landing Trosak page data fetched succesfully");
  }

  const mutation = useMutation({
    mutationFn: (validData: any) =>
      postData("http://localhost:3000/api/trosak", validData),
    onSuccess: () => {
      refetch();
      setIsCreating(false);
      openNotificationWithIcon({
        type: "success",
        title: "Kreiranje tabele",
        description: "Uspešno ste kreirali tabelu.",
      });
    },
    onError: (error: any) => {
      openNotificationWithIcon({
        type: "error",
        title: "Kreiranje tabele",
        description:
          "Neuspešno ste kreirali tabelu. Proverite podatke koje ste uneli.",
      });
    },
  });
  const mutationDelete = useMutation({
    mutationFn: (id: any) =>
      fetch(`http://localhost:3000/api/trosak/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }),
    onSuccess: () => {
      refetch();
      openNotificationWithIcon({
        type: "success",
        title: "Brisanje tabele",
        description: "Uspešno ste obrisali tabelu.",
      });
    },
    onError: (error: any) => {
      openNotificationWithIcon({
        type: "error",
        title: "Brisanje tabele",
        description: "Neuspešno ste obrisali tabelu. Pokušajte kasnije.",
      });
    },
  });
  const tableNavigate = (id: string, table: TableTrosak) => {
    // setTable(table);
    localStorage.setItem("activeTableId", id);
    navigate("/trosakHome");
  };

  const onFinish = (values: any) => {
    mutation.mutate(values);
    formCreateTable.resetFields();
  };


  if (isLoading) {
    return <LoadingPage />;
  }
  
  if(error){
    return (<ServerErrorPage />)
  }

  return (
    <>
      <div className="w-100 h-100 bg-white" style={{ overflow: "hidden" }}>
        <div className="w-100 h-100 flex justify-center bg-blue">
          <div
            className="w-80 h-100 p-1 bg-white"
            style={{ height: "90%", borderRadius: ".5%" }}
          >
            <div className=" w-100 h-100" style={{ overflowY: "auto" }}>
              <div
                className="p-1 pl-2 font-18 bg-gray bg-gray white bold"
                style={{ position: "sticky" }}
              >
                TABELE TROŠKOVA
              </div>
              <div
                className="w-100 pt-05 flex flex-row justify-end align-center"
                style={{
                  color: "green",
                  textDecoration: "underline",
                }}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsCreating(true);
                  }}
                >
                  <CiCirclePlus style={{ transform: "scale(1.5)" }} />
                  <span className="p-05">Kreiraj novu tabelu</span>{" "}
                </div>
              </div>
              <div className="flex h-100 w-100 flex-wrap justify-center">
                {isLoading ? (
                  <>Loading</>
                ) : (
                  data &&
                  data.map((item: TableTrosak) => {
                    return (
                      <div
                        key={`${item._id}`}
                        className="h-30 white  m-2"
                        style={{
                          borderRadius: "5%",
                          width: "22%",
                          userSelect: "none",
                          padding: "2rem",
                          backgroundColor: "#F8D775",
                        }}
                      >
                        <div
                          className="flex justify-center sizing-transition"
                          style={{
                            border: "1px solid gray",
                            width: ".75rem",
                            height: "1.5rem",
                            marginTop: "-1.5rem",
                            padding: ".1rem .5rem .1rem .5rem",
                            borderRadius: "20px",
                            position: "relative",
                            left: "99%",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            mutationDelete.mutate(item._id);
                          }}
                        >
                          x
                        </div>
                        <div
                          className="bg-blue w-100 h-100 flex align-center justify-center shadow-transition"
                          style={{ borderRadius: "5%", cursor: "pointer" }}
                          onClick={() => {
                            tableNavigate(item._id as string, item);
                          }}
                        >
                          <div>{item.tableName}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <Modal
                title={"Create a table"}
                open={isCreating}
                footer={null}
                width={1000}
                onCancel={() => setIsCreating(false)}
                destroyOnClose={true}
              >
                <Form
                  name="basic"
                  form={formCreateTable}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  autoComplete="off"
                  className="mt-1"
                >
                  <Row>
                    <Col span={8}>
                      <Form.Item
                        label="Ime tabele"
                        name={"tableName"}
                        className="w-100"
                      >
                        <Input placeholder="Ime tabele..." />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify={"center"}>
                    <Button>Cancel</Button>
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
    </>
  );
};

export default   LandingTrosak ;
