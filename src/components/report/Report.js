import SideMenu from "./../common/SideMenu";
import {FaBars} from "react-icons/fa";

const getDateStamp = (rs = false) => {
  const d = new Date();
  let day = d.getDate().toString();
  day = day.length === 1 ? '0' + day : day;
  let month = (d.getMonth() + 1).toString();
  month = month.length === 1 ? '0' + month : month;
  const year = d.getFullYear();
  
  return rs ? `${day}.${month}.${year}.` : `${year}-${month}-${day}`
}

const getUnixTimestamp = () => {
  const d = new Date;
  
  return d.getTime();
}

const Report = ({operations, handleSidebarToggling}) => {
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