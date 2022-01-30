import Menu from '../common/Menu';

/**
 * A landing page component
 *
 * @param {array} operations
 * @param {function} useTitle
 * @returns {JSX.Element}
 * @constructor
 * @public
 */
const Home = ({operations, useTitle}) => {
  useTitle('Matematika');
  return (
    <div className="home">
      <header className="header">
        <h1 className="title title--centered title--marg-top-bottom">Matematika</h1>
      </header>
      <Menu
        operations={operations}
        padded={true}
      />
    </div>
  );
}

export default Home;
