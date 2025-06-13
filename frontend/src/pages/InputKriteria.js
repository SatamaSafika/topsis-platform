import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InputKriteria = () => {
  const navigate = useNavigate();
  const [jumlah, setJumlah] = useState(0);
  const [alternatif, setAlternatif] = useState([]);

  useEffect(() => {
  const storedJumlah = parseInt(localStorage.getItem('jumlahAlternatif'));
  if (!storedJumlah || storedJumlah <= 0) {
    navigate('/');
  } else {
    setJumlah(storedJumlah);
    const initialData = Array.from({ length: storedJumlah }, () => ({
      name: '',
      urgency: '',
      stokSaatIni: '',
      stokDibutuhkan: '',
      waktuPengiriman: '',
      kelangkaan: '',
      harga: '',
      kualitas: '',
      layanan: ''
    }));
    setAlternatif(initialData);
  }
}, [navigate]);


  const handleChange = (index, field, value) => {
    const updated = [...alternatif];
    updated[index][field] = value;
    setAlternatif(updated);
  };

  const handleSubmit = async () => {
    try {
      // kirim ke backend
      const response = await axios.post('http://localhost:5000/api/topsis', alternatif);
      console.log(response.data);
      // simpan hasil sementara ke localstorage utk hasil nanti
      localStorage.setItem('topsisResult', JSON.stringify(response.data));
      navigate('/hasil-keputusan');
    } catch (err) {
      console.error(err);
      alert('Gagal memproses data!');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Input Data Alternatif</h1>

      {alternatif.map((item, index) => (
        <div key={index} className="bg-white p-4 mb-4 rounded shadow">
          <h2 className="font-semibold mb-2">Alternatif #{index + 1}</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Nama</label>
              <input
                type="text"
                value={item.name}
                onChange={e => handleChange(index, 'name', e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label>Urgency</label>
              <input
                type="number"
                value={item.urgency}
                onChange={e => handleChange(index, 'urgency', e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label>Stok Saat Ini</label>
              <input
                type="number"
                value={item.stokSaatIni}
                onChange={e => handleChange(index, 'stokSaatIni', e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label>Stok Dibutuhkan</label>
              <input
                type="number"
                value={item.stokDibutuhkan}
                onChange={e => handleChange(index, 'stokDibutuhkan', e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label>Waktu Pengiriman</label>
              <input
                type="number"
                value={item.waktuPengiriman}
                onChange={e => handleChange(index, 'waktuPengiriman', e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label>Kelangkaan</label>
              <input
                type="number"
                value={item.kelangkaan}
                onChange={e => handleChange(index, 'kelangkaan', e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label>Harga</label>
              <input
                type="number"
                value={item.harga}
                onChange={e => handleChange(index, 'harga', e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label>Kualitas</label>
              <input
                type="number"
                value={item.kualitas}
                onChange={e => handleChange(index, 'kualitas', e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label>Layanan</label>
              <input
                type="number"
                value={item.layanan}
                onChange={e => handleChange(index, 'layanan', e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
      >
        Proses
      </button>
    </div>
  );
};

export default InputKriteria;
