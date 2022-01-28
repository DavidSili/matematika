import {useRef} from 'react';

const TestForm = ({operation, stepData, answer, setAnswer, handleAnswerSubmit}) => {
  const inputRef = useRef();
  
  return (
    <form
      autoComplete="off"
      className={"form form--question"}
      onSubmit={handleAnswerSubmit}
    >
      <div className="mb-3">
        <div className="form__label form__label--question">
          <span className="form__label-item">{stepData.number1}</span>
          <span className="form__label-item">{operation.operand}</span>
          <span className="form__label-item">{stepData.number2}</span>
          <span className="form__label-item">=</span>
        </div>
        <input
          autoFocus
          ref={inputRef}
          className={"form__input form__input--medium form__input--large-font"}
          type="number"
          step="1"
          min="0"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
      <button
        className={"btn btn--secondary btn--large-font"}
        aria-label="Dalje"
        onClick={() => inputRef.current.focus()}
      >Sledeći</button>

    </form>
  )
}

export default TestForm;