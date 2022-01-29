import Header from './Header';
import { useEffect, useState } from "react";
import Results from "./Results";
import TestForm from "./TestForm";

const Test = ({
  operation,
  numberOfQuestions,
  handleSidebarToggling,
  getDateStamp,
  getStoredTestReports
}) => {
  const getPreferredTestType = () => {
    const typesPreferenceStored = localStorage.getItem('typesPreference');
    const typesPreference = typesPreferenceStored ? JSON.parse(typesPreferenceStored) : {};
    return typesPreference.hasOwnProperty(operation.name) ?
      typesPreference[operation.name] : operation.defaultType;
  }
  
  const [answer, setAnswer] = useState('');
  const [step, setStep] = useState(1);
  const [testType, setTestType] = useState(getPreferredTestType);
  const [test, setTest] = useState({});
  const [testResults, setTestResults] = useState({});
  
  useEffect(() => {
    setTestType(getPreferredTestType);
  }, [operation]);
  useEffect(() => {
    generateNewTest();
  }, [operation, testType]);
  useEffect(() => {
    if (step === 0) storeTestResults();
    if (step === 1) checkTestsReportData();
  }, [step])
  
  // Test type related function
  
  const handleTypeChange = (id) => {
    setTestType(id);
    const typesPreferenceStored = localStorage.getItem('typesPreference');
    const typesPreference = typesPreferenceStored ? JSON.parse(typesPreferenceStored) : {};
    typesPreference[operation.name] = id;
    localStorage.setItem('typesPreference', JSON.stringify(typesPreference));
  }
  
  // Test related functions
  
  const generateNewTest = () => {
    let newTest = {};
    let hasZero = false;
    let newTestItem;
    for (let i = 1; i <= (numberOfQuestions + 1); i++) {
      if (i > numberOfQuestions) {
        setTestResults({});
        setStep(1);
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
          number1: number1,
          number2: number2,
          answer: max,
        }
      case 'subtraction':
        number1 = Math.floor(Math.random() * (testType - 1)) + 2;
        number2 = Math.floor(Math.random() * (number1 - 1)) + 1;
        return {
          number1: number1,
          number2: number2,
          answer: number1 - number2,
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
          number1: number1,
          number2: number2,
          answer: number1 * number2,
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
          number1: product,
          number2: number1,
          answer: number2,
        }
      default:
        return {
          number1: null,
          number2: null,
          answer: null,
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
  
  const getUnixTimestamp = () => {
    const d = new Date;
    
    return d.getTime();
  }
  
  const calculateCorrectAnswers = () => {
    const trKeys = Object.keys(testResults);
    let correctAnswers = 0;
    trKeys.map((key) => {
      if (test[key].answer === testResults[key]) correctAnswers++;
      return true;
    });
    return correctAnswers;
  }
  
  // Local storage related functions
  
  const setStoredTestReports = (reports) => {
    localStorage.setItem('reports', JSON.stringify(reports));
  }
  
  const storeTestResults = () => {
    const currentReports = getStoredTestReports();
    if (!currentReports.hasOwnProperty(operation.name)) currentReports[operation.name] = [];
    const thisTestStats = {
      correctAnswers: correctAnswers,
      numberOfTests: numberOfQuestions,
      percentage: correctAnswers === 0 ? 0 :
        Math.round((correctAnswers / numberOfQuestions) * 100) / 100,
      timestamp: getTimeRs(false),
      unixTimestamp: getUnixTimestamp(),
      type: testType,
    };
    currentReports[operation.name].push(thisTestStats);
    setStoredTestReports(currentReports);
  }
  
  const checkTestsReportData = () => {
    const savedDate = localStorage.getItem('testDate');
    const currentDate = getDateStamp();
    if (savedDate !== currentDate) {
      localStorage.setItem('testDate', currentDate);
      localStorage.setItem('reports', JSON.stringify({}));
    }
  }
  
  const getTimeRs = (seconds = true) => {
    const d = new Date();
    const hr = d.getHours();
    let min = d.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }
    let sec = d.getSeconds();
    if (sec < 10) {
      sec = '0' + sec;
    }
    sec = seconds ? `:${sec}` : ''
    
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    
    return `${day}.${month}.${year}. ${hr}:${min}${sec}`;
  }
  
  // Results related function
  
  const correctAnswers = calculateCorrectAnswers();
  
  return (
    <main className="grid__container grid__container--last">
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
        correctAnswers={correctAnswers}
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