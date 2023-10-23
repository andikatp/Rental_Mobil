import React from "react";
import useFetch from "../../../hooks/useFetch";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const RentalPart = () => {
  const { data, loading, error } = useFetch("/rental");

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/rental/update`, {state: {id}});
  };

  const handleCreate = () => {
    navigate(`/rental/create`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/rental/delete/${id}`);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: err.response.data.name,
        text: err.response.data.message,
        footer: err.stack
      })
    }
  };

  if (loading) {
    return <h1>Loading..</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }


  return (
    <>
      <div className="container-rental">
        <div class="card">
          <div id="tableLain">
            <table class="styled-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Img</th>
                  <th>Nama</th>
                  <th>Kota</th>
                  <th>Alamat</th>
                  <th>Judul</th>
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
                            <img src={item.photo} alt="" />
                          </td>
                          <td>{item.nama}</td>
                          <td>{item.kota}</td>
                          <td>{item.alamat}</td>
                          <td>{item.judul}</td>
                          <td>
                            <button
                              class="edit"
                              onClick={() => handleEdit(item.id)}
                            >
                              Edit
                            </button>
                            <button
                              class="delete"
                              onClick={() => handleDelete()}
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

export default RentalPart;
