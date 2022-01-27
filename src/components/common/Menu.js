import MenuItem from "./MenuItem";

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
        {menuItems.map((item) => (
          <MenuItem
            item={item}
            key={item.name}
            active={item === operation}
          />
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
