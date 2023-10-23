import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import React from "react";
import "./style.css";
import axios from "axios";
import Swal from "sweetalert2";

const MobilPart = () => {
  const { data, loading, error } = useFetch("/mobil");
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/mobil/create");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/mobil/delete/${id}`);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil menghapus rental',
        showConfirmButton: false,
        timer: 1500
      })
      navigator('/mobil');
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: e.message,
        footer: e.stack,
      });
    }
  };

  const handleEdit = (id) => {
    navigate("/mobil/update", {state: {id}});

  };

  if (loading) {
    return <h1>Loading..</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <div className="container-mobil">
        <div class="card">
          <div id="tableLain">
            <table class="styled-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Img</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Tipe</th>
                  <th>Rental</th>
                  <th>User</th>
                  <th>Maksimal Angkutan</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!data
                  ? "Loading..."
                  : data.map((item) => (
                      <>
                        <tr>
                          <td>{item.id}</td>
                          <td>
                            <img src={item.photo[0]} alt="" />
                          </td>
                          <td>{item.nama}</td>
                          <td>{item.harga}</td>
                          <td>{item.tipe}</td>
                          <td>{item.rentalId}</td>
                          <td>{item.userId}</td>
                          <td>{item.maksimalAngkutan}</td>
                          <td>
                            <button
                              class="edit"
                              onClick={() => handleEdit(item.id)}
                            >
                              Edit
                            </button>
                            <button
                              class="delete"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
              </tbody>
            </table>
          </div>
          <div class="add-link">
            <button class="add" onClick={() => handleCreate()}>
              + Add Rental
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobilPart;
