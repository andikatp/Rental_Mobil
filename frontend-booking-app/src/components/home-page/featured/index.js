import React from "react";
import "./style.css";
import useFetch from "../../../hooks/useFetch";

const FeaturedPart = () => {
  const { data, loading, error } = useFetch("/rental/getfeatured");

  return (
    <>
      <div className="container-featured">
        <h1>Rental Pilihan</h1>
        {loading ? (
          "Loading..."
        ) : (
          <>
            <div className="featured-list">
              {data && data.length > 0 
                ?
                 data.map((item, index) => (
                    <div className="featured-item" key={index}>
                      <img
                        src={item ? item.photo : "https://fakeimg.pl/600x400"}
                        alt="rental car"
                      />
                      <h1>{item ? item.nama : "loading"}</h1>
                      <h2>{item ? item.kota : "loading"}</h2>
                      <span className="harga">
                        Mulai Dari{" "}
                        {item ? item.mobilTermurah : "loading"}
                      </span>
                      <div className="rating">
                        <span>{item ? item.penilaian : "loading"}</span>
                        <h3>Excelent</h3>
                      </div>
                    </div>
                  ))
                : "No data available"}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FeaturedPart;
