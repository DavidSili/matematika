import ResultRow from "./ResultRow";
import {Link} from "react-router-dom";

const Results = ({
  test,
  testResults,
  operation,
  numberOfQuestions,
  generateNewTest,
  correctAnswers,
}) => {
  
  const trKeys = Object.keys(testResults);
  
  const numberDeclension = (number, one, two, rest) => {
    const numberText = number.toString();
    const numberTextLength = numberText.length;
    const ones = numberText.substring(numberTextLength - 1);
    const tens = numberText.substring(numberTextLength - 2, 1);
    if (ones === '1' && !(tens === '1' && numberTextLength > 1)) {
      return one;
    } else if (['2', '3', '4'].indexOf(ones) !== -1 && tens !== '1') {
      return two;
    } else {
      return rest;
    }
  }
  
  return (
    <section className="results">
      <table className="results__table">
        <tbody>
        {trKeys.map(( key) => (
          <ResultRow
            key={key}
            answer={testResults[key]}
            testData={test[key]}
            operand={operation.operand}
          >
          </ResultRow>
        ))}
        </tbody>
      </table>
      {correctAnswers === numberOfQuestions && <div className="mtb-5">Bravo! Svi odgovori su ti tačni!</div>}
      {correctAnswers < numberOfQuestions &&
        <div className="mtb-5">
          {`${correctAnswers} ${numberDeclension(correctAnswers, 'tačan', 'tačna', 'tačnih')} od ukupno ${numberOfQuestions} ${numberDeclension(numberOfQuestions, 'zadatka', 'zadatka', 'zadataka')}. Sledeći put će biti bolje!`}
        </div>
      }
      <Link to="/izvestaj">
        <button className="btn btn--secondary btn--large-font">Pregled testova</button>
      </Link>
      <button
        className="btn btn--secondary btn--large-font"
        onClick={generateNewTest}
      >Ponovi test</button>
    </section>
  )
}

export default Results;