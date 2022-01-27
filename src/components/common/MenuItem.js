import {Link} from "react-router-dom";
import {FaHome, FaList} from "react-icons/fa";

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

const MenuItem = ({item, active}) => {
  return (
    <li className={`menu__item ${active ? 'menu__item--active' : ''}`}>
      <Link
        to={item.url}
        className="menu__link"
      >{item.fa && getFaIcon(item.fa)} {item.menuLabel}</Link>
    </li>
  )
}

export default MenuItem;