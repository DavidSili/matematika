import Header from './Header';

const Test = ({
  operation,
  step,
  type,
  numberOfQuestions,
  handleTypeChange,
  handleSidebarToggling
}) => {
  return (
    <main className={"grid__container grid__container--last"}>
      <Header
        operation={operation}
        step={step}
        numberOfQuestions={numberOfQuestions}
        type={type}
        handleTypeChange={handleTypeChange}
        handleSidebarToggling={handleSidebarToggling}
      />
      <h1>Test</h1>
    </main>
  )
}

export default Test;