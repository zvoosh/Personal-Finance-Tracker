import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import ServerErrorPage from "../routes/ServerErrorPage";
import LoadingPage from "../routes/LoadingPage";

const TrosakRowDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("authToken");

  const { data, error, isLoading } = useQuery({
    queryKey: ["table"],
    queryFn: () =>
      fetch(
        `http://localhost:3000/api/trosak/${localStorage.getItem(
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
    console.log("Trosak Row Details page data fetched succesfully");
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
                    <div>{data.entitet ? data.entitet : "Entitet"} - </div>
                    <div className="ml-05">
                      {data.predmet ? data.predmet : "Predmet"}
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
                    <span>ENTITET: </span>
                    <span>{data.entitet}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>PREDMET: </span>
                    <span>{data.predmet}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>MAJ: </span>
                    <span>{data.maj}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>JUN: </span>
                    <span>{data.jun}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>JUL: </span>
                    <span>{data.jul}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>AVGUST: </span>
                    <span>{data.avgust}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>SEPTEMBAR: </span>
                    <span>{data.septembar}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>OKTOBAR: </span>
                    <span>{data.oktobar}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>NOVEMBAR: </span>
                    <span>{data.novembar}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>DECEMBAR: </span>
                    <span>{data.decembar}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>UKUPNO ZA GODINU: </span>
                    <span>{data.ukupnoZaGod}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>UKUPNO EURA: </span>
                    <span>{data.ukupnoEu}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>PRODATO: </span>
                    <span>{data.prodato}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#dddada",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    <span>ZARADJENO: </span>
                    <span>{data.zaradjeno}</span>
                  </div>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#a8a8a8",
                      border: "1px solid black",
                    }}
                  >
                    <span>OSTAJE: </span>
                    <span>{data.ostaje}</span>
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

export default   TrosakRowDetails ;
