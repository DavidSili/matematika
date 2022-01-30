// UI related utilities

/**
 * @param btn DOM element for checking
 */
export const handleSidebarToggling = (btn) => {
  if (btn.classList.contains('toggled')) {
    btn.classList.remove('toggled');
    openSidebar(false);
  } else {
    btn.classList.add('toggled');
    openSidebar(true);
  }
}

/**
 * @param {boolean} open
 */
export const openSidebar = (open) => {
  document.querySelector('.wrapper').scrollLeft = open ? -1000 : 1000;
}

// Local storage related utilities

/**
 * @returns {object}
 */
export const getStoredTestReports = () => {
  const currentReportsStored = localStorage.getItem('reports');
  return currentReportsStored ? JSON.parse(currentReportsStored) : {};
}

// Time/date related utilities

/**
 * @param {boolean} rs  If true - serbian standard, if false - ISO 8601
 * @returns {string}
 */
export const getDateStamp = (rs = false) => {
  const d = new Date();
  let day = d.getDate().toString();
  day = day.length === 1 ? '0' + day : day;
  let month = (d.getMonth() + 1).toString();
  month = month.length === 1 ? '0' + month : month;
  const year = d.getFullYear();
  
  return rs ? `${day}.${month}.${year}.` : `${year}-${month}-${day}`
}

/**
 * @param {boolean} seconds
 * @returns {`${number}.${number}.${number}. ${number}:${number}${string|string}`}
 */
export const getTimeRs = (seconds = true) => {
  const d = new Date();
  const hr = d.getHours();
  let min = d.getMinutes();
  if (min < 10) {
    min = '0' + min;
  }
  let sec = d.getSeconds();
  if (sec < 10) {
    sec = '0' + sec;
  }
  sec = seconds ? `:${sec}` : ''
  
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  
  return `${day}.${month}.${year}. ${hr}:${min}${sec}`;
}
