import { Button } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../../context";

const Header = () => {
  const navigate = useNavigate();
  const context = useContext(Context);
  if (!context) {
    throw new Error("MyComponent must be used within a MyProvider");
  }

  const { user } = context;
  return (
    <div className="bg-blue p-1 white flex flex-row space-between">
      <div className="bold font-12">Finance Tracker</div>
      <div className="font-11">{user && user?.username}</div>
      <div>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export { Header };
