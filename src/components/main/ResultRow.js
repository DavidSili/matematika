const ResultRow = ({answer, testData, operand}) => {
  const correct = answer === testData.answer;
  const answerCellClassName = correct ? 'results__answer--correct' : 'results__answer--incorrect';
  return (
    <tr>
      <td className="results__cell results__cell--right">{testData.number1}</td>
      <td className="results__cell">{operand}</td>
      <td className="results__cell results__cell--left">{testData.number2}</td>
      <td className="results__cell results__cell--">=</td>
      <td className="results__cell results__cell--left"><span className={`results__answer ${answerCellClassName}`}>{answer}</span>
        {!correct && <span className="results__answer results__answer--correction">{testData.answer}</span>}
      </td>
    </tr>
  )
}

export default ResultRow;