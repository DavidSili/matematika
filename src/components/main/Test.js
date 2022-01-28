import Header from './Header';
import { useEffect, useState } from "react";
import Results from "./Results";
import TestForm from "./TestForm";

const Test = ({
  operation,
  numberOfQuestions,
  handleSidebarToggling,
}) => {
  
  const [answer, setAnswer] = useState('');
  const [step, setStep] = useState(1);
  const [testType, setTestType] = useState(10);
  const [test, setTest] = useState({});
  const [testResults, setTestResults] = useState({});
  
  useEffect(() => {
    // generateNewTest();
  }, []);
  useEffect(() => {
    setTestResults({});
    setStep(1);
  }, [test]);
  useEffect(() => {
    generateNewTest();
  }, [operation, testType]);
  
  const handleTypeChange = (id) => {
    setTestType(id);
  }
  
  const generateNewTest = () => {
    let newTest = {};
    let hasZero = false;
    let newTestItem;
    for (let i = 1; i <= (numberOfQuestions + 1); i++) {
      if (i > numberOfQuestions) {
        setTest(newTest);
      } else {
        newTestItem = getTestItem();
        if (inArrayObj(newTest, newTestItem)) {
          i--;
          continue;
        }
        if (operation.name === 'multiplication' && newTestItem.answer === 0) {
          if (!hasZero) {
            hasZero = true;
            newTest[i] = newTestItem;
          } else {
            i--;
          }
        } else {
          newTest[i] = newTestItem;
        }
      }
    }
  }
  
  const inArrayObj = (collection, object) => {
    const keys = Object.keys(collection);
    let row;
    for (let i = 0; i < keys.length; i++) {
      row = collection[parseInt(keys[i])];
      if (row.number1 === object.number1 && row.number2 === object.number2) {
        return true;
      }
    }
    
    return false;
  }
  
  const getTestItem = () => {
    let number1, number2, max, max2, product;
    let foundAnswer = false;
    switch (operation.name) {
      case 'addition':
        max = Math.floor(Math.random() * (testType - 1)) + 2;
        number1 = Math.floor(Math.random() * (max - 1)) + 1;
        number2 = max - number1;
        return {
          'number1': number1,
          'number2': number2,
          'answer': max,
        }
      case 'subtraction':
        number1 = Math.floor(Math.random() * (testType - 1)) + 2;
        number2 = Math.floor(Math.random() * (number1 - 1)) + 1;
        return {
          'number1': number1,
          'number2': number2,
          'answer': number1 - number2,
        }
      case 'multiplication':
        while (foundAnswer === false) {
          max2 = testType > 10 ? testType : 10;
          number1 = Math.floor(Math.random() * (testType + 1));
          number2 = Math.floor(Math.random() * (max2 + 1));
          if (!(number1 === 0 && number2 === 0)) {
            foundAnswer = true;
          }
        }
        return {
          'number1': number1,
          'number2': number2,
          'answer': number1 * number2,
        }
      case 'division':
        while (foundAnswer === false) {
          number1 = Math.floor(Math.random() * testType) + 1;
          number2 = Math.floor(Math.random() * testType) + 1;
          product = number1 * number2;
          if (product <= testType && !(testType > 10 && (number1 === 1 || number2 === 1 || product === 1))) {
            foundAnswer = true;
          }
        }
        return {
          'number1': product,
          'number2': number1,
          'answer': number2,
        }
    }
  }
  
  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!answer) return;
    setAnswer('');
    addAnswer(answer);
  }
  
  const addAnswer = (value) => {
    const newResults = {
      ...testResults,
      [step]: parseInt(value)
    };
    setTestResults(newResults);
    if (step === numberOfQuestions) {
      setStep(0);
    } else {
      setStep(step + 1);
    }
  }
  
  return (
    <main className={"grid__container grid__container--last"}>
      <Header
        operation={operation}
        step={step}
        numberOfQuestions={numberOfQuestions}
        testType={testType}
        handleTypeChange={handleTypeChange}
        handleSidebarToggling={handleSidebarToggling}
      />
      {step === 0 && <Results
        test={test}
        testResults={testResults}
        operation={operation}
        numberOfQuestions={numberOfQuestions}
        generateNewTest={generateNewTest}
      />}
      {step > 0 && Object.keys(test).length > 0 && <TestForm
        operation={operation}
        stepData={test[step]}
        answer={answer}
        setAnswer={setAnswer}
        handleAnswerSubmit={handleAnswerSubmit}
      />}
    </main>
  )
}

export default Test;