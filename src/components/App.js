import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Main from './main/Main';
import { useEffect } from 'react';
import operationsObj from './common/operations.json';
import Report from './report/Report';
import * as Utils from './common/utils';

/**
 * @returns {JSX.Element}
 * @constructor
 * @public
 */
const App = () => {
  const operations = operationsObj.items;
  
  useEffect(() => {
    if (window.location.pathname !== '/') {
      Utils.openSidebar(false);
    }
  }, []);
  
  const useTitle = (title) => {
    useEffect(() => {
      const prevTitle = document.title
      document.title = title
      return () => {
        document.title = prevTitle
      }
    })
  }
  
  return (
    <Routes>
      <Route index element={<Home
        operations={operations}
        useTitle={useTitle}
      />} />
      <Route path=":operationUrl" element={<Main
        operations={operations}
        useTitle={useTitle}
      />} />
      <Route path="izvestaj" element={<Report
        operations={operations}
        useTitle={useTitle}
      />} />
    </Routes>
  );
}

export default App;
