import Header from './Header';
import { useEffect, useState, useCallback } from 'react';
import Results from './Results';
import TestForm from './TestForm';
import * as Utils from './../common/utils';
import settings from './../common/settings.json';

/**
 * @param {object} operation
 * @returns {JSX.Element}
 * @constructor
 */
const Test = ({ operation }) => {
  
  const getPreferredTestType = useCallback(() => {
    const typesPreferenceStored = localStorage.getItem('typesPreference');
    const typesPreference = typesPreferenceStored ? JSON.parse(typesPreferenceStored) : {};
    return typesPreference.hasOwnProperty(operation.name) ?
      typesPreference[operation.name] : operation.defaultType;
  }, [operation])
  
  const [answer, setAnswer] = useState('');
  const [step, setStep] = useState(1);
  const [testType, setTestType] = useState(getPreferredTestType());
  const [test, setTest] = useState({});
  const [testResults, setTestResults] = useState({});
  
  // Test type related function
  
  /**
   * @param {int} id
   */
  const handleTypeChange = (id) => {
    setTestType(id);
    const typesPreferenceStored = localStorage.getItem('typesPreference');
    const typesPreference = typesPreferenceStored ? JSON.parse(typesPreferenceStored) : {};
    typesPreference[operation.name] = id;
    localStorage.setItem('typesPreference', JSON.stringify(typesPreference));
  }
  
  // Test related functions
  
  /**
   * @returns {{answer: int, number1: int, number2: int}|
   *           {answer: null, number1: null, number2: null}}
   */
  const getTestItem = useCallback(() => {
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
  }, [testType, operation]);
  
  /**
   * @returns {int}
   */
  const generateNewTest = useCallback(() => {
    let newTest = {};
    let hasZero = false;
    let newTestItem;
    for (let i = 1; i <= (settings.numberOfQuestions + 1); i++) {
      if (i > settings.numberOfQuestions) {
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
  }, [getTestItem, operation]);
  
  /**
   * Checks if the similar objects is already present in the array
   *
   * @param {array} collection
   * @param {object} object
   * @returns {boolean}
   */
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
  
  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!answer) return;
    setAnswer('');
    addAnswer(answer);
  }
  
  /**
   * @param {int|string} value
   */
  const addAnswer = (value) => {
    const newResults = {
      ...testResults,
      [step]: parseInt(value)
    };
    setTestResults(newResults);
    if (step === settings.numberOfQuestions) {
      setStep(0);
    } else {
      setStep(step + 1);
    }
  }
  
  /**
   * @returns {int|bigint}
   */
  const getUnixTimestamp = () => {
    const d = new Date();
    
    return d.getTime();
  }
  
  /**
   * @returns {int}
   */
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
  
  /**
   * @param {object} reports
   */
  const setStoredTestReports = (reports) => {
    localStorage.setItem('reports', JSON.stringify(reports));
  }
  
  const correctAnswers = calculateCorrectAnswers();
  
  const storeTestResults = useCallback(() => {
    const currentReports = Utils.getStoredTestReports();
    if (!currentReports.hasOwnProperty(operation.name)) currentReports[operation.name] = [];
    const thisTestStats = {
      correctAnswers: correctAnswers,
      numberOfTests: settings.numberOfQuestions,
      percentage: correctAnswers === 0 ? 0 :
        Math.round((correctAnswers / settings.numberOfQuestions) * 100) / 100,
      timestamp: Utils.getTimeRs(false),
      unixTimestamp: getUnixTimestamp(),
      type: testType,
    };
    currentReports[operation.name].push(thisTestStats);
    setStoredTestReports(currentReports);
  }, [correctAnswers, operation, testType]);
  
  /**
   * Empties the stored reports on the first test of the day
   */
  const checkTestsReportData = () => {
    const savedDate = localStorage.getItem('testDate');
    const currentDate = Utils.getDateStamp();
    if (savedDate !== currentDate) {
      localStorage.setItem('testDate', currentDate);
      localStorage.setItem('reports', JSON.stringify({}));
    }
  }
  
  useEffect(() => {
    setTestType(getPreferredTestType());
  }, [operation, getPreferredTestType]);
  useEffect(() => {
    generateNewTest();
  }, [operation, testType, generateNewTest]);
  useEffect(() => {
    if (step === 0) storeTestResults();
    if (step === 1) checkTestsReportData();
  }, [step, storeTestResults])
  
  return (
    <main className="grid__container grid__container--last">
      <Header
        operation={operation}
        step={step}
        testType={testType}
        handleTypeChange={handleTypeChange}
      />
      {step === 0 && <Results
        test={test}
        testResults={testResults}
        operation={operation}
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