import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";
import useFetch from "../../hooks/useFetch";

const MobilUpdatePart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state.id;

  const { data, loading, error, reFetch } = useFetch(`/mobil/${id}`);
  const [updatedMobil, setUpdatedMobil] = useState({
    nama: "",
    harga: "",
    tipe: "",
    maksimalAngkutan: "",
    deskripsi: "",
    photo: "",
  });

  useEffect(() => {
    if (!loading && !error && data) {
      setUpdatedMobil({
        nama: data.nama,
        harga: data.harga,
        tipe: data.tipe,
        maksimalAngkutan: data.maksimalAngkutan,
        deskripsi: data.deskripsi,
        photo: data.photo,
      });
    }
  }, [loading, error, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMobil({ ...updatedMobil, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/mobil/update/${id}`, updatedMobil);
      Swal.fire({
        icon: "success",
        title: "Mobil updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/mobil");
      reFetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        footer: error.stack,
      });
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <div className="container-update">
        <div className="update">
          <form onSubmit={handleSubmit} className="grid-form">
            <div className="form-left">
              <div className="formm">
                <label htmlFor="nama">Nama</label>
                <input
                  type="text"
                  name="nama"
                  required={true}
                  placeholder="Nama Mobil"
                  value={updatedMobil.nama}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formm">
                <label htmlFor="harga">Harga</label>
                <input
                  type="number"
                  required={true}
                  name="harga"
                  placeholder="Harga"
                  value={updatedMobil.harga}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formm">
                <label htmlFor="tipe">Tipe</label>
                <input
                  type="text"
                  required={true}
                  name="tipe"
                  placeholder="Tipe"
                  value={updatedMobil.tipe}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formm">
                <label htmlFor="maksimalAngkutan">Maksimal Angkutan</label>
                <input
                  type="text"
                  name="maksimalAngkutan"
                  required={true}
                  placeholder="Maksimal Angkutan"
                  value={updatedMobil.maksimalAngkutan}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formm">
                <label htmlFor="deskripsi">Deskripsi</label>
                <input
                  type="text"
                  required={true}
                  name="deskripsi"
                  placeholder="Deskripsi"
                  value={updatedMobil.deskripsi}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-right">
              <div className="formm">
                <label htmlFor="photo">Photo</label>
                <input
                  type="text"
                  required={true}
                  name="photo"
                  placeholder="Photo"
                  value={updatedMobil.photo}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MobilUpdatePart;
