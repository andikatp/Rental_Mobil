import React from "react";
import "./style.css";
import useFetch from "../../../hooks/useFetch";

const CityPart = () => {
  const { data, loading, error } = useFetch(
    "/rental/countByCity?kota=aceh,bali,pekalongan"
  );

  return (
    <>
      <div className="container-city">
        { loading ? "Loading Data...." :
          <>
            <div className="city-item">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Meuseujid_Raya_Baiturrahman%2C_Aceh.jpg/1280px-Meuseujid_Raya_Baiturrahman%2C_Aceh.jpg"
                alt="Banda Aceh"
              />
              <h1>Banda Aceh</h1>
              <h2>{data ? `${data[0]} Kendaraan` : "Loading..."}</h2>
            </div>
            <div className="city-item">
              <img
                src="https://images.unsplash.com/photo-1604999333679-b86d54738315?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80"
                alt="Bali"
              />
              <h1>Bali</h1>
              <h2>{data ? `${data[1]} Kendaraan` : "Loading..."}</h2>
            </div>
            <div className="city-item">
              <img
                src="https://assets.kompasiana.com/items/album/2020/04/16/tempat-wisata-di-pekalongan-2-5e97d5cbd541df3ee8770172.jpg?t=o&v=770"
                alt="Pekalongan"
              />
              <h1>Pekalongan</h1>
              <h2>{data ? `${data[2]} Kendaraan` : "Loading..."}</h2>
            </div>
          </>
        }
      </div>
    </>
  );
};

export default CityPart;
