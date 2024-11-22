import { useNavigate } from "react-router";

const Chooser = () => {
  const navigate = useNavigate();


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
                POČETNA STRANICA - PODACI
              </div>
              <div className="flex h-100 w-100 flex-wrap  justify-center">
                <div
                  className="w-25 h-30 white bg-red m-2  p-1"
                  style={{
                    borderRadius: "5%",
                    userSelect: "none",
                    cursor: "pointer",
                  }}
                  onClick={()=>{
                    navigate("/landing")
                  }}
                >
                  <div
                    className="bg-blue w-100 h-100 flex align-center justify-center"
                    style={{ borderRadius: "5%" }}
                  >
                    <div>Rezervacije</div>
                  </div>
                </div>
                <div
                  className="w-25 h-30 white bg-red m-2  p-1"
                  style={{
                    borderRadius: "5%",
                    userSelect: "none",
                    cursor: "pointer",
                  }}
                >
                  <div
                    className="bg-blue w-100 h-100 flex align-center justify-center"
                    style={{ borderRadius: "5%" }}
                    onClick={()=>{
                      navigate("/landing/trosak")
                    }}
                  >
                    <div>Troškovi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default   Chooser ;
