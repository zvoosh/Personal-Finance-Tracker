import { Modal } from "antd";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { FaSuitcase } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { Expenses } from "../../types";

const DetailModal = ({
  selectedRow,
  isVisible,
  handleOk,
  handleCancel,
}: {
  selectedRow: Expenses;
  isVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}) => {
  return (
    <Modal
      title={selectedRow.description}
      open={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {selectedRow && (
        <div>
          <div className="flex flex-row">
            Category:
            <div className="ml-1">
              <FaSuitcase className="mr-05" /> {selectedRow.category}
            </div>
          </div>
          <div className="flex flex-row">
            Amount:
            <div className="ml-1">
              <GiMoneyStack className="mr-05" /> {selectedRow.amount}€
            </div>
          </div>
          <div
            style={{ textTransform: "capitalize" }}
            className="flex flex-row"
          >
            Type:
            <div className="ml-1">
              {selectedRow.type == "income" && (
                <BsGraphUpArrow className="mr-05" />
              )}
              {selectedRow.type == "expense" && (
                <BsGraphDownArrow className="mr-05" />
              )}{" "}
              {selectedRow.type}
            </div>
          </div>
          <div className="flex flex-row">
            Date:
            <div className="ml-1">{selectedRow.date}</div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export { DetailModal };
