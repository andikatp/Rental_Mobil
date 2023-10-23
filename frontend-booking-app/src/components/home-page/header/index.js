import "./style.css";
import React, { useContext, useState } from "react";
import {
  faCalendarDays,
  faCar,
  faTruckPlane,
} from "@fortawesome/free-solid-svg-icons";
import { DateRangePicker } from "react-date-range";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../../context/search-context";
import { AuthContext } from "../../../context/auth-context";

const HeaderPart = () => {
  const { user } = useContext(AuthContext);
  const [destination, setDestination] = useState("");
  const [openDates, setOpenDates] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { dispatch } = useContext(SearchContext);

  const [passanger, setPassanger] = useState(1);

  const handleOption = (operation) => {
    if (operation === "+" && passanger < 8) {
      setPassanger(passanger + 1);
    } else if (operation === "-" && passanger > 1) {
      setPassanger(passanger - 1);
    }
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, passanger },
    });
    navigate("/lists", { state: { destination, dates, passanger } });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  }

  return (
    <>
      <div className="header">
        <h1>Diskon Besar-Besarann!!</h1>
        <h2>
          Dapatkan diskon 10% dalam merental kendaraan kesukaan anda dengan
          membuat akun di GoRent
        </h2>
        {!user && <button className="header-button" onClick={handleLogin}>Masuk / Daftar</button>}
        <div className="header-search">
          <div className="header-search-item">
            <FontAwesomeIcon icon={faCar} className="header-icon" />
            <input
              type="text"
              placeholder="Dimana Anda Berada?"
              className="header-search-input"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="header-search-item">
            <FontAwesomeIcon icon={faCalendarDays} className="header-icon" />
            <span
              onClick={() => {
                setOpenDates(!openDates);
                setOpenOptions(false);
              }}
              className="header-search-text"
            >
              {`${format(dates[0].startDate, "dd-MM-yyy")} to ${format(
                dates[0].endDate,
                "dd-MM-yyy"
              )}`}{" "}
            </span>
            {openDates && (
              <DateRangePicker
                className="date"
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
              />
            )}
          </div>
          <div className="header-search-item">
            <FontAwesomeIcon icon={faTruckPlane} className="header-icon" />
            <span
              onClick={() => {
                setOpenOptions(!openOptions);
                setOpenDates(false);
              }}
              className="header-search-text"
            >
              {`Penumpang: ${passanger}`}
            </span>
            {openOptions && (
              <div className="options">
                <div className="option-item">
                  <span className="option-text">Penumpang</span>
                  <button
                    className="option-button"
                    onClick={() => handleOption("-")}
                  >
                    -
                  </button>
                  <span className="option-counter">{passanger}</span>
                  <button
                    className="option-button"
                    onClick={() => handleOption("+")}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="header-search-item">
            <button className="header-button" onClick={() => handleSearch()}>
              Cari
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderPart;
