import SideMenu from "./../common/SideMenu";
import {FaBars} from "react-icons/fa";
import OperationReport from "./OperationReport";

const Report = ({
  operations,
  handleSidebarToggling,
  getDateStamp,
  getStoredTestReports,
}) => {
  const storedTestReports = getStoredTestReports();
  const operationReportsKeys = Object.keys(storedTestReports);
  
  return (
    <div className="wrapper grid">
      <SideMenu
        operations={operations}
        operation={{name: 'report'}}
        padded={false}
      />
      <main className="grid__container grid__container--last">
        <header className={"header header--bottom-padding"}>
          <button
            className="btn btn--secondary btn-tiny menu-btn"
            onClick={(e) => handleSidebarToggling(e.target)}
          >
            <FaBars role="button" />
          </button>
          <div className={"title title--smaller"}>Izveštaj za: {getDateStamp(true)}</div>
        </header>
        <section
          className="report"
        >
          {operationReportsKeys.map((operationReportKey, key) => {
            return <OperationReport
              operationReport={storedTestReports[operationReportKey]}
              operation={operations.find((operation) => {
                return operation.name === operationReportKey;
              })}
              key={key}
            />
          })}
        </section>
      </main>
    </div>
  )
}

export default Report;