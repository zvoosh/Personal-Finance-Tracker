import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams } from "react-router";
import ServerErrorPage from "../routes/ServerErrorPage";
import LoadingPage from "../routes/LoadingPage";

const RowDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("authToken");

  const { data, error, isLoading } = useQuery({
    queryKey: ["table"],
    queryFn: () =>
      fetch(
        `http://localhost:3000/api/table/${localStorage.getItem(
          "activeTableId"
        )}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      ).then((res) => res.json()),
    staleTime: 0,
  });

  
  if (data) {
    console.log("Row Details page data fetched succesfully");
  }

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
          className="flex align-center bg-blue justify-center sidePaddings "
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
              <div>
                {data && (
                  <div className="flex flex-row justify-center">
                    <div>{data.gost ? data.gost : "Gost"} - </div>
                    <div className="ml-05">
                      {data.rezervacija ? data.rezervacija : "Rezervacija"}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-100 h-75 ">
              {data && (
                <div
                  className="w-100 h-100 "
                  style={{
                    overflowY: "auto",
                    borderBottom: "1px solid black",
                    borderTop: "1px solid black",
                  }}
                >
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>NOVAC: </span>
                    <span>{data.novac}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>ULAZ: </span>
                    <span>
                      {dayjs(data.ulaz, "YYYY/MM/DD").format("DD/MM/YYYY")}
                    </span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>IZLAZ: </span>
                    <span>
                      {dayjs(data.izlaz, "YYYY/MM/DD").format("DD/MM/YYYY")}
                    </span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>NOCI: </span>
                    <span>{data.noci}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>ODRASLI: </span>
                    <span>{data.odrasli}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>DECA: </span>
                    <span>{data.deca}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>LJUBIMAC: </span>
                    <span>{data.ljubimac}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>ZA NAPLATU: </span>
                    <span>{data.zaNaplatu}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>RUZA: </span>
                    <span>{data.ruza}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>NAMA: </span>
                    <span>{data.nama}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>OTKAZANO: </span>
                    <span>{data.otkazano ? "DA" : "NE"}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>GOST: </span>
                    <span>{data.gost}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>TELEFON: </span>
                    <span>{data.telefon}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>REZERVACIJA: </span>
                    <span>{data.rezervacija}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>STRUJA: </span>
                    <span>{data.struja}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>VODA: </span>
                    <span>{data.voda}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>INVESTICIJA: </span>
                    <span>{data.investicija}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>POREZ: </span>
                    <span>{data.porez}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>KUCNI SAVET: </span>
                    <span>{data.kucniSavet}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default   RowDetails ;
