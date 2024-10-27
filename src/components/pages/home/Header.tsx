import { Button } from "antd";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue p-1 white flex flex-row space-between">
      <div className="bold font-12">Finance Tracker</div>
      <div><Button onClick={()=>{
        navigate('/')
      }}>Logout</Button></div>
    </div>
  );
};

export { Header };
