import { Button } from "antd";
import { useLocation, useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="bg-blue p-1 white flex flex-row space-between">
      <div className="bold font-12">Finance Tracker</div>
      <div>
        {location.pathname !== "/" && (
          <div>
            {location.pathname !== "/chooser" && (
              <>
                <Button
                  className="mr-1"
                  onClick={() => {
                    navigate("/chooser");
                  }}
                >
                  Home
                </Button>
                <Button
                  className="mr-1"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back
                </Button>
              </>
            )}
            <Button
              onClick={() => {
                navigate("/");
                localStorage.clear();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default   Header ;
