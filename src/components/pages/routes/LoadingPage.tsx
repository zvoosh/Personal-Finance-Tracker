import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from 'antd';

const LoadingPage = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin={true} />;

  return <div className="w-100 h-100 flex justify-center align-center">
    <Spin  indicator={antIcon} style={{transform: "scale(2)"}}/>
  </div>;
};

export default LoadingPage;
