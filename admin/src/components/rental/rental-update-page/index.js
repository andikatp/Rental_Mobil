import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";
import useFetch from "../../../hooks/useFetch";

const RentalUpdatePart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state.id;

  const { data, loading, error, reFetch } = useFetch(`/rental/${id}`);
  const [updatedRental, setUpdatedRental] = useState({
    nama: "",
    kota: "",
    alamat: "",
    jarak: "",
    judul: "",
    deskripsi: "",
    photo: "",
    penilaian: "",
    mobilTermurah: "",
  });

  useEffect(() => {
    if (!loading && !error && data) {
      setUpdatedRental({
        nama: data.nama,
        kota: data.kota,
        alamat: data.alamat,
        jarak: data.jarak,
        judul: data.judul,
        photo: data.photo,
        penilaian: data.penilaian,
        mobilTermurah: data.mobilTermurah,
      });
    }
  }, [loading, error, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRental({ ...updatedRental, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/rental/update/${id}`, updatedRental);
      Swal.fire({
        icon: "success",
        title: "Rental updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/rental");
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
                  placeholder="Nama Rental"
                  value={updatedRental.nama}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formm">
                <label htmlFor="kota">Kota</label>
                <input
                  type="text"
                  required={true}
                  name="kota"
                  placeholder="Kota"
                  value={updatedRental.kota}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formm">
                <label htmlFor="alamat">Alamat</label>
                <input
                  type="text"
                  required={true}
                  name="alamat"
                  placeholder="Alamat"
                  value={updatedRental.alamat}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formm">
                <label htmlFor="jarak">Jarak</label>
                <input
                  type="text"
                  name="jarak"
                  required={true}
                  placeholder="Jarak"
                  value={updatedRental.jarak}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formm">
                <label htmlFor="judul">Judul</label>
                <input
                  type="text"
                  required={true}
                  name="judul"
                  placeholder="Judul"
                  value={updatedRental.judul}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-right">
              <div className="formm">
                <label htmlFor="deskripsi">Deskripsi</label>
                <input
                  type="text"
                  required={true}
                  name="deskripsi"
                  placeholder="Deskripsi"
                  value={updatedRental.deskripsi}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formm">
                <label htmlFor="photo">Photo</label>
                <input
                  type="text"
                  required={true}
                  name="photo"
                  placeholder="Photo"
                  value={updatedRental.photo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formm">
                <label htmlFor="penilaian">Penilaian</label>
                <input
                  type="text"
                  required={true}
                  name="penilaian"
                  placeholder="Penilaian"
                  value={updatedRental.penilaian}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formm">
                <label htmlFor="mobilTermurah">Mobil Termurah</label>
                <input
                  type="text"
                  required={true}
                  name="mobilTermurah"
                  placeholder="Mobil Termurah"
                  value={updatedRental.mobilTermurah}
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

export default RentalUpdatePart;
