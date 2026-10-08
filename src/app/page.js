"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [newID, setNewID] = useState("");
  const [newNim, setNewNim] = useState("");
  const [newNama, setNewNama] = useState("");

  const fetchData = async () => {
    const res = await fetch("/api/mahasiswa");
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addData = async (e) => {
    e.preventDefault();
    if (!newNim || !newNama || !newID) return;

    const res = await fetch("/api/mahasiswa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: newID, nim: newNim, nama: newNama }),
    });

    if (res.ok) {
      setNewID("");
      setNewNim("");
      setNewNama("");
      fetchData();
    }
  };

  const deleteData = async (type, id) => {
    await fetch("/api/mahasiswa", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  const updateData = async (type, id_lama, id, nim, nama) => {
    const res = await fetch("/api/mahasiswa", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_lama, id, nim, nama }),
    });

    if (res.ok) {
      fetchData();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", margin: "0 auto" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>NIM</th>
            <th>Nama</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i) => (
            <tr key={i.ID}>
              <td style={{ padding: "10px" }}>{i.ID}</td>

              <td style={{ padding: "10px" }}>
                <input
                  type="text"
                  value={i.NIM || ""}
                  onChange={(e) => {
                    const nilaiBaru = e.target.value;
                    setData((prevData) =>
                      prevData.map((item) =>
                        item.ID === i.ID ? { ...item, NIM: nilaiBaru } : item
                      )
                    );
                  }}
                />
              </td>

              <td style={{ padding: "10px" }}>
                <input
                  type="text"
                  value={i.Nama || ""}
                  onChange={(e) => {
                    const nilaiBaru = e.target.value;
                    setData((prevData) =>
                      prevData.map((item) =>
                        item.ID === i.ID ? { ...item, Nama: nilaiBaru } : item
                      )
                    );
                  }}
                />
              </td>

              <td style={{ padding: "10px" }}>
                <button
                  type="button"
                  onClick={() => updateData("mahasiswa", i.ID, i.ID, i.NIM, i.Nama)}
                  style={{backgroundColor: "darkgoldenrod", marginLeft: "10px"}}
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => deleteData("mahasiswa", i.ID)}
                  style={{backgroundColor: "red", marginLeft: "10px"}}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          </tbody>
          </table>
          <form onSubmit={addData} style={{marginTop: "20px", marginBottom: "20px", display: "flex", gap: "10px" }}>
          <table>
          <tbody>  
          <tr>
              <td>
                <input
                type="text"
                placeholder="ID"
                value={newID}
                onChange={(e) => setNewID(e.target.value)}
                />
              </td>
              <td>
                <input
                type="text"
                placeholder="NIM Baru"
                value={newNim}
                onChange={(e) => setNewNim(e.target.value)}
                />
              </td>
              <td>
              <input
                type="text"
                placeholder="Nama Baru"
                value={newNama}
                onChange={(e) => setNewNama(e.target.value)}
                />
              </td>
              <td>
                <button type="submit" style={{columnSpan:2,backgroundColor:"darkgreen"}}>Tambah Mahasiswa</button>
              </td>
            </tr>
        </tbody>
      </table>
      </form>
      
    </div>
  );
}
