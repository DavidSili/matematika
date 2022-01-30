import Menu from '../common/Menu';

/**
 * A toggleable side menu that should contain a menu
 *
 * @param {array} operations
 * @param {object} operation
 * @returns {JSX.Element}
 * @constructor
 * @public
 */
const SideMenu = ({operations, operation}) => {
  const menuItems = [{
    name: 'home',
    url: '/',
    title: 'Izbor testa',
    menuLabel: `Izbor testa`,
    operand: null,
    fa: 'home',
  }, ...operations]
  
  return (
    <aside className="grid__container grid__container--first">
      <Menu
        operations={menuItems}
        operation={operation}
      />
    </aside>
  )
}

export default SideMenu;