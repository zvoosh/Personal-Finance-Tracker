const Summarium = ({ income, expense }: { income: any; expense: any }) => {
  return (
    <div className="w-100 padding-4 margin-phone-8 margin-top-1">
      <div className="w-100 h-100" style={{ backgroundColor: "#f9f9f9" }}>
        <div className="w-100 h-100 flex">
          <div className="flex flex-col m-2 p-1 w-100 bg-white">
            <div
              className="flex flex-col p-1"
              style={{ height: "fit-content" }}
            >
              <div>
                <div className="font-12 mt-05 flex flex-row">
                  Income Sum: {income}
                  <div className="ml-1"></div>
                </div>
                <div className="font-12 pt-05 flex flex-row">
                  Expense Sum: {expense}
                  <div className="ml-1"></div>
                </div>
              </div>

              <div className="mt-2 flex justify-end"></div>
            </div>
            <div className="flex h-100 w-100">
              <div
                className="w-100"
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "space-between",
                }}
              >
                <div className="font-17 bold mt-05">
                  Current balance: {income - expense}€
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default   Summarium ;
