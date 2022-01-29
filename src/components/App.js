import {Route, Routes} from 'react-router-dom';
import Home from "./home/Home";
import Main from "./main/Main";
import { useEffect } from "react";
import operationsObj from "./common/operations.json";
import Report from "./report/Report";

const App = () => {
  const operations = operationsObj.items;
  const numberOfQuestions = 10;
  
  // UI related functions
  
  const handleSidebarToggling = (btn) => {
    if (btn.classList.contains('toggled')) {
      btn.classList.remove('toggled');
      openSidebar(false);
    } else {
      btn.classList.add('toggled');
      openSidebar(true);
    }
  }
  
  const openSidebar = (open) => {
    document.querySelector('.wrapper').scrollLeft = open ? -1000 : 1000;
  }
  
  useEffect(() => {
    if (window.location.pathname !== '/') {
      openSidebar(false);
    }
  }, []);

  // Report related functions
  
  const getStoredTestReports = () => {
    const currentReportsStored = localStorage.getItem('reports');
    return currentReportsStored ? JSON.parse(currentReportsStored) : {};
  }
  
  const getDateStamp = (rs = false) => {
    const d = new Date();
    let day = d.getDate().toString();
    day = day.length === 1 ? '0' + day : day;
    let month = (d.getMonth() + 1).toString();
    month = month.length === 1 ? '0' + month : month;
    const year = d.getFullYear();
    
    return rs ? `${day}.${month}.${year}.` : `${year}-${month}-${day}`
  }
  
  return (
    <Routes>
      <Route index element={<Home
        operations={operations}
      />} />
      <Route path="izvestaj" element={<Report
        operations={operations}
        handleSidebarToggling={handleSidebarToggling}
        getDateStamp={getDateStamp}
        getStoredTestReports={getStoredTestReports}
      />} />
      <Route path=":operationUrl" element={<Main
        operations={operations}
        numberOfQuestions={numberOfQuestions}
        handleSidebarToggling={handleSidebarToggling}
        getDateStamp={getDateStamp}
        getStoredTestReports={getStoredTestReports}
      />} />
    </Routes>
  );
}

export default App;
