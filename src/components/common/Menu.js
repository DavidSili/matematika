import { Link } from 'react-router-dom';
import { FaHome, FaList } from 'react-icons/fa';

const getFaIcon = (name) => {
  switch (name) {
    case 'list':
      return <FaList />
    case 'home':
      return <FaHome />
    default:
      return '';
  }
}

/**
 * @param {array} operations
 * @param {boolean} padded
 * @param {object} operation
 * @returns {JSX.Element}
 * @constructor
 * @public
 */
const Menu = ({operations, padded, operation= {}}) => {
  const menuItems = [...operations, {
    name: 'report',
    url: '/izvestaj',
    title: 'Pregled testova',
    menuLabel: `Pregled testova`,
    operand: null,
    fa: 'list',
  }]
  
  return (
    <nav>
      <ul className={`menu ${padded ? 'menu--padded' : ''}`}>
        {menuItems.map((item) => {
          return (
            <li
              className={`menu__item ${item.name === operation.name ? 'menu__item--active' : ''}`}
              key={item.name}
            >
            <Link
              to={item.url}
              className="menu__link"
            >{item.fa && getFaIcon(item.fa)} {item.menuLabel}</Link>
            </li>
          )})}
      </ul>
    </nav>
  );
}

export default Menu;
