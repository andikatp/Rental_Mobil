import React from "react";
import "./style.css";
import useFetch from "../../../hooks/useFetch.js";

const TipePart = () => {
  const { data, loading, error } = useFetch("/mobil/countByType");

  const photos = [
    "https://images.unsplash.com/photo-1516423485787-e433022a4801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    "https://images.unsplash.com/photo-1528262504524-55405ebf4e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1606128031531-52ae98c9707a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    "https://images.unsplash.com/photo-1505774795070-927187ca7995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
    "https://images.unsplash.com/photo-1615829386703-e2bb66a7cb7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
  ];

  return (
    <>
      <div className="container-tipe">
        {loading ? (
          "Loading..."
        ) : (
          <>
            <h1>Cari Berdasarkan Tipe Kendaraan</h1>
            <div className="tipe-list">
              {data && data.length > 0 &&
                photos.map((photo, index) => (
                  <div className="list-item" key={index}>
                    <img src={photo} alt="" />
                    <h1>{data ? data[index].tipe : "Loading..."}</h1>
                    <h2>
                      {data ? data[index].jumlah : "Loading..."}{" "}
                      {data ? data[index].tipe : "Loading..."}
                    </h2>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TipePart;
