import {FaBars} from "react-icons/fa";
import ProgressIndicator from "./ProgressIndicator";
import TypeSelector from "./TypeSelector";

const Header = ({
  operation,
  step,
  numberOfQuestions,
  testType,
  handleTypeChange,
  handleSidebarToggling
}) => {
  return (
    <header className={"header header--bottom-padding"}>
      <button
        className="btn btn--secondary btn-tiny menu-btn"
        onClick={(e) => handleSidebarToggling(e.target)}
      >
        <FaBars
          role="button"
        />
      </button>
      <div className={"title title--marg-bottom"}>{operation.title}</div>
      <ProgressIndicator
        step={step}
        numberOfQuestions={numberOfQuestions}
      />
      <TypeSelector
        types={operation.testTypes}
        selectedType={testType}
        handleTypeChange={handleTypeChange}
      />
    </header>
  )
}

export default Header;