import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import Swal from "sweetalert2";

const RentalCreatePart = () => {
  const [newRental, setNewRental] = useState({
    nama: null,
    kota: null,
    alamat: null,
    jarak: null,
    judul: null,
    deskripsi: null,
    photo: null,
    penilaian: null,
    mobilTermurah: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRental({ ...newRental, [name]: value });
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/rental/create",  newRental);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil menambahkan rental',
        showConfirmButton: false,
        timer: 1500
      })
      navigator('/rental');
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.message,
        footer: e.stack
      })
    }
  };

  return (
    <>
      <div className="container-create">
        <div className="create">
          <form onSubmit={handleSubmit} className="grid-form">
            <div className="form-left">
              <div className="formm">
                <label htmlFor="nama">Nama</label>
                <input
                  type="text"
                  name="nama"
                  required={true}
                  placeholder="Nama Rental"
                  value={newRental.nama}
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
                  value={newRental.kota}
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
                  value={newRental.alamat}
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
                  value={newRental.jarak}
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
                  value={newRental.judul}
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
                  value={newRental.deskripsi}
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
                  value={newRental.photo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formm">
                <label htmlFor="penilaian">Penilaian</label>
                <input
                  required={true}
                  type="text"
                  name="penilaian"
                  placeholder="Penilaian"
                  value={newRental.penilaian}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formm">
                <label htmlFor="mobilTermurah">Mobil Termurah</label>
                <input
                  required={true}
                  type="text"
                  name="mobilTermurah"
                  placeholder="Mobil Termurah"
                  value={newRental.mobilTermurah}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RentalCreatePart;
