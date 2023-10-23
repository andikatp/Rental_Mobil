import React, {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";


const MobilCreatePart = () => {
    const [newMobil, setNewMobil] = useState({
        nama: null,
        harga: null,
        tipe: null,
        maksimalAngkutan: null,
        deskripsi: null,
        photo: null,
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMobil({ ...newMobil, [name]: value });
       
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("/mobil/create",  newMobil);
          Swal.fire({
            icon: 'success',
            title: 'Berhasil menambahkan mobil',
            showConfirmButton: false,
            timer: 1500
          })
          navigator('/mobil');
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
                  placeholder="Nama Mobil"
                  value={newMobil.nama}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formm">
                <label htmlFor="harga">Harga</label>
                <input
                  type="number"
                  required={true}
                  name="harga"
                  placeholder="Kota"
                  value={newMobil.harga}
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
                  value={newMobil.tipe}
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
                  value={newMobil.maksimalAngkutan}
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
                  value={newMobil.deskripsi}
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
                  value={newMobil.photo}
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

export default MobilCreatePart;
