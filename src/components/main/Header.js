import {FaBars} from 'react-icons/fa';
import TypeSelector from './TypeSelector';
import * as Utils from './../common/utils';
import settings from './../common/settings.json'

/**
 * @param {object} operation
 * @param {int} step
 * @param {int} testType
 * @param {function} handleTypeChange
 * @returns {JSX.Element}
 * @constructor
 */
const Header = ({
  operation,
  step,
  testType,
  handleTypeChange,
}) => {
  return (
    <header className="header header--bottom-padding">
      <button
        className="btn btn--secondary btn-tiny menu-btn"
        onClick={(e) => Utils.handleSidebarToggling(e.target)}
      >
        <FaBars role="button" />
      </button>
      <div className="title title--marg-bottom">{operation.title}</div>
      <div className="progress-indicator">{step}/{settings.numberOfQuestions}</div>
      <TypeSelector
        types={operation.testTypes}
        selectedType={testType}
        handleTypeChange={handleTypeChange}
      />
    </header>
  )
}

export default Header;