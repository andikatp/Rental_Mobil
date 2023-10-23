import React from "react";
import "./style.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../searchItem";
import useFetch from "../../../hooks/useFetch";

const ListPart = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [passanger, setPassanger] = useState(location.state.passanger);

  const { data, loading, error, reFetch } = useFetch(
    `/mobil?kota=${destination}&penumpang=${passanger}`
  );

  const handleSearch = async () => {
    await reFetch();
  };

  return (
    <>
      <div className="container-list">
        <div className="list-wrapper">
          <div className="list-search">
            <h1 className="list-title">Cari</h1>
            <div className="list-item">
              <label>Kota</label>
              <input
                placeholder={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="list-item">
              <label>Tanggal Peminjaman</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="list-item">
              <label>Penumpang</label>
              <input placeholder={passanger} type="text" onChange={(e) => setPassanger(e.target.value)} />
            </div>
            <button
              onClick={() => {
                handleSearch();
              }}
            >
              Search
            </button>
          </div>
          <div className="listResult">
            {loading ? (
              "Loading..."
            ) : (
              <>
                {data && data.length > 0
                  ? data.map((item) => <SearchItem item={item} key={item.id} />)
                  : "No Data..."}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPart;
