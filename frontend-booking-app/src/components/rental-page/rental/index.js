import { useContext, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { SearchContext } from "../../../context/search-context";
import { AuthContext } from "../../../context/auth-context";
import axios from "axios";
import Swal from "sweetalert2";

const RentalPart = () => {
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getDayDifference = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dayDifference = Math.round(Math.abs((end - start) / oneDay));
    return dayDifference;
  };

  const location = useLocation();
  const { data, loading, error, reFetch } = useFetch(`/mobil/${location.state.id}`);
  if (loading) {
    return "Loading...";
  }

  if (error) {
    return "An error occurred while fetching data.";
  }

  const photos = data ? data.photo : [];

  const handleClick = async () => {
    if (!user) {
      navigate("/login");
    }
    try{await axios({
      method: "post",
      url: `/mobil/booking/${location.state.id}`,
    });
   
    Swal.fire({
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });} catch(e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.message,
        footer: e.stack
      })
    }
    
    await reFetch();
  };

  return (
    <>
      <div className="container-rental">
        <div className="rental-wrapper">
          <h1 className="rental-title">{data.name}</h1>
          <div className="rental-address">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Banda Aceh, Mewarnanai, no. 79</span>
          </div>
          <span className="rental-distance">
            Lokasi Ideal - 500M dari pusat kota
          </span>
          <span className="rental-harga">
            Mulai dari Rp. 100.000,00 dan dapatkan gratis 2 liter minyak
          </span>
          <div className="rental-img">
            {photos.map((photo) => (
              <div className="rental-img-wrapper" key={data.id}>
                <img src={photo} alt="rental" className="rental-img" />
              </div>
            ))}
          </div>
          <div className="rental-details">
            <div className="rental-detail-text">
              <h1 className="rental-title">{data.nama.toUpperCase()}</h1>
              <p className="rental-description">{data.deskripsi} </p>
            </div>
            <div className="rental-detail-price">
              <h1>Cocok Untuk Perjalanan Anda!</h1>
              <span>{data.Rental.deskripsi}</span>
              <h2>
                <b>
                  {data.harga *
                    getDayDifference(dates[0].startDate, dates[0].endDate) ||
                    data.harga}
                </b>{" "}
                ({getDayDifference(dates[0].startDate, dates[0].endDate) || 1}{" "}
                Hari)
              </h2>
              {
                !data.userId ?  <button onClick={handleClick}>Booking Sekarang!</button> : <button disabled='true' >Booked</button> 
              }
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentalPart;
