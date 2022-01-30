import { Link } from 'react-router-dom';
import settings from './../common/settings.json';

const Results = ({
  test,
  testResults,
  operation,
  generateNewTest,
  correctAnswers,
}) => {
  
  const trKeys = Object.keys(testResults);
  
  /**
   * Prepares the correct form of nouns in serbian language
   *
   * @param {int} number
   * @param {string} one
   * @param {string} two
   * @param {string} rest
   * @returns {string}
   */
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
        {trKeys.map((key) => {
          const answer = testResults[key]
          const testData = test[key]
          const correct = answer === testData.answer;
          const answerCellClassName = correct ? 'results__answer--correct' : 'results__answer--incorrect';
          return (
            <tr key={key}>
              <td className="results__cell results__cell--right">{testData.number1}</td>
              <td className="results__cell">{operation.operand}</td>
              <td className="results__cell results__cell--left">{testData.number2}</td>
              <td className="results__cell results__cell--">=</td>
              <td className="results__cell results__cell--left"><span className={`results__answer ${answerCellClassName}`}>{answer}</span>
            {!correct && <span className="results__answer results__answer--correction">{testData.answer}</span>}
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
      {correctAnswers === settings.numberOfQuestions && <div className="mtb-5">Bravo! Svi odgovori su ti tačni!</div>}
      {correctAnswers < settings.numberOfQuestions &&
        <div className="mtb-5">
          {`${correctAnswers} ${numberDeclension(correctAnswers, 'tačan', 'tačna', 'tačnih')} od` +
            ` ukupno ${settings.numberOfQuestions} ${numberDeclension(settings.numberOfQuestions, 'zadatka',
            'zadatka', 'zadataka')}. Sledeći put će biti bolje!`}
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