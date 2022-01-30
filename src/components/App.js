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
  
  return (
    <Routes>
      <Route index element={<Home operations={operations} />} />
      <Route path=":operationUrl" element={<Main operations={operations} />} />
      <Route path="izvestaj" element={<Report operations={operations} />} />
    </Routes>
  );
}

export default App;
