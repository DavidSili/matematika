import SideMenu from "../main/SideMenu";
import Test from "../main/Test";
import { useParams } from "react-router-dom";

const Main = ({
  operations,
  numberOfQuestions,
  handleSidebarToggling,
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
      />
    </div>
  )
}

export default Main;