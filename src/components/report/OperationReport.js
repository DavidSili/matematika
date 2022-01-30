/**
 * @param {array} operationReport
 * @param {object} operation
 * @returns {JSX.Element}
 * @constructor
 */
const OperationReport = ({operationReport, operation}) => {
  return (
    <div
      className="report__operation-container"
    >
      <h2 className="report__operation-title">{operation.title}</h2>
      <table className="report__operation-table table align-right">
        <thead>
        <tr><th>#</th><th>Tačnih</th><th>Ukupno</th><th>Vrsta</th><th>Vreme</th></tr>
        </thead>
        <tbody>
        {operationReport.map((rowData, key) => {
        return <tr
          key={key}
        >
          <td>{key + 1}</td>
          <td>{rowData.correctAnswers}</td>
          <td>{rowData.numberOfTests}</td>
          <td>Do {rowData.type}</td>
          <td>{rowData.timestamp}</td>
        </tr>
        })}
        </tbody>
      </table>
    </div>
  )
}

export default OperationReport;