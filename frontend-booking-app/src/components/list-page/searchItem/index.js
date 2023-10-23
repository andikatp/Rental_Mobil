import "./style.css";
import React from "react";
import { useNavigate } from "react-router-dom";


const SearchItem = ({item}) => {

  const navigate = useNavigate();

  const handeRental = (id) => {
    navigate(`/mobil`, {state : {id}});
  };
  return (
    <div className="search-item">
      <img
        src={item.photo[0]}
        alt="rental"
      />
      <div className="search-item-description">
        <h1 className="sid-title">{item.nama}</h1>
        <span className="sid-subtitle">
          {item.Rental.kota.toUpperCase()}
        </span>
        <span className="sid-distance">{item.Rental.jarak} dari pusat kota</span>
        <span className="sid-promo">Gratis bensin 2 Liter</span>
        <span className="sid-subtitle">
          Best Rental in this City
        </span>
        <span className="sid-cancel">Gratis Pembatalan </span>
        <span className="sid-cancel-subtitle">
         Rental sekarang, tidak cocok gratis pembatalan!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>{item.Rental.penilaian}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">Rp.{item.harga}</span>
          <span className="siTaxOp">Sudah termasuk Pajak</span>
          <button className="siCheckButton" onClick={()=>handeRental(item.id)}>See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
