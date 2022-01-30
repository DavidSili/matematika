import SideMenu from '../common/SideMenu';
import Test from '../main/Test';
import { useParams } from 'react-router-dom';

/**
 * The main wrapper that contains both side menu and the test
 *
 * @param {array} operations
 * @returns {JSX.Element}
 * @constructor
 */
const Main = ({ operations }) => {
  
  const { operationUrl } = useParams();
  const operation = operations.find(operations => operations.url === `/${operationUrl}`);
  
  return (
    <div className="wrapper grid">
      <SideMenu
        operations={operations}
        operation={operation}
        padded={false}
      />
      <Test operation={operation} />
    </div>
  )
}

export default Main;