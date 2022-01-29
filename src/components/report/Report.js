import SideMenu from "./../common/SideMenu";
import {FaBars} from "react-icons/fa";

const Report = ({operations, handleSidebarToggling, getDateStamp}) => {
  return (
    <div className="wrapper grid">
      <SideMenu
        operations={operations}
        operation={{name: 'report'}}
        padded={false}
      />
      <main className="grid__container grid__container--last">
        <header className={"header header--bottom-padding"}>
          <button
            className="btn btn--secondary btn-tiny menu-btn"
            onClick={(e) => handleSidebarToggling(e.target)}
          >
            <FaBars role="button" />
          </button>
          <div className={"title title--smaller"}>Izveštaj za: {getDateStamp(true)}</div>
        </header>
      </main>
    </div>
  )
}

export default Report;