import SideMenu from "../main/SideMenu";
import Test from "../main/Test";
import {useParams} from "react-router-dom";

const Main = ({
  operations,
  step,
  type,
  numberOfQuestions,
  handleTypeChange,
  handleSidebarToggling
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
        step={step}
        type={type}
        numberOfQuestions={numberOfQuestions}
        handleTypeChange={handleTypeChange}
        handleSidebarToggling={handleSidebarToggling}
      />
    </div>
  )
}

export default Main;