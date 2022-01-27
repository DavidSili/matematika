import {Route, Routes} from 'react-router-dom';
import Home from "./home/Home";
import Main from "./main/Main";
import { useState, useEffect } from "react";
import operationsObj from "./common/operations.json";

const App = () => {
  const operations = operationsObj.items;
  const numberOfQuestions = 10;
  
  const [step, setStep] = useState(1);
  const [type, setType] = useState(10);
  
  const handleTypeChange = (id) => {
    setType(id);
  }
  
  const handleSidebarToggling = (btn) => {
    if (btn.classList.contains('toggled')) {
      btn.classList.remove('toggled');
      openSidebar(false);
    } else {
      btn.classList.add('toggled');
      openSidebar(true);
    }
  }
  
  useEffect(() => {
    if (window.location.pathname !== '/') {
      openSidebar(false);
    }
  }, []);
  
  const openSidebar = (open) => {
    document.querySelector('.wrapper').scrollLeft = open ? -1000 : 1000;
  }
  
  return (
    <Routes>
      <Route index element={<Home
        operations={operations}
      />} />
      <Route path=":operationUrl" element={<Main
        operations={operations}
        step={step}
        type={type}
        numberOfQuestions={numberOfQuestions}
        handleTypeChange={handleTypeChange}
        handleSidebarToggling={handleSidebarToggling}
      />} />
    </Routes>
  );
}

export default App;
