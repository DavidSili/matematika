import Menu from "../common/Menu";

const Home = ({operations}) => {
  return (
    <div className="home">
      <header className="header">
        <h1 className={"title title--centered title--marg-top-bottom"}>Matematika</h1>
      </header>
      <Menu
        operations={operations}
        padded={true}
      />
    </div>
  );
}

export default Home;
