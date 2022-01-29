import SideMenu from "../common/SideMenu";
import Test from "../main/Test";
import { useParams } from "react-router-dom";

const Main = ({
  operations,
  numberOfQuestions,
  handleSidebarToggling,
  getDateStamp,
  getStoredTestReports,
}) => {
  
  const { operationUrl } = useParams();
  const operation = operations.find(operations => operations.url === `/${operationUrl}`);
  
  return (
    <div className={"wrapper grid"}>
      <SideMenu
        operations={operations}
        operation={operation}
        padded={false}
      />
      <Test
        operation={operation}
        numberOfQuestions={numberOfQuestions}
        handleSidebarToggling={handleSidebarToggling}
        getDateStamp={getDateStamp}
        getStoredTestReports={getStoredTestReports}
      />
    </div>
  )
}

export default Main;