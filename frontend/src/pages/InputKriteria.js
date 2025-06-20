import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

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
      const response = await axios.post('http://localhost:5000/api/topsis', alternatif);
      console.log(response.data);
      localStorage.setItem('topsisResult', JSON.stringify(response.data));
      navigate('/hasil-keputusan');
    } catch (err) {
      console.error(err);
      alert('Gagal memproses data!');
    }
  };

  return (
    <div className="input-container">
      <h1 className="input-title">Input Data Alternatif</h1>

      {alternatif.map((item, index) => (
        <div key={index} className="alternatif-card flex">
          {/* Bagian Kiri */}
          <div className="alternatif-left">
            <h2 className="alternatif-title">Alternatif {index + 1}</h2>
            <input
              type="text"
              value={item.name}
              onChange={e => handleChange(index, 'name', e.target.value)}
              className="input-field"
              placeholder="Masukkan nama alternatif"
            />
            <img src="/alat.jpg" alt="Alternatif Icon" className="alternatif-icon" />
          </div>

          {/* Bagian Tengah */}
          <div className="alternatif-middle center-content">
            <label>
              Stok Saat Ini
              <span className="caption">Jumlah stok yang tersedia saat ini</span>
              <input
                type="number"
                value={item.stokSaatIni}
                onChange={e => handleChange(index, 'stokSaatIni', e.target.value)}
                className="input-field"
              />
            </label>

            <label>
              Waktu Pengiriman
              <span className="caption">Perkiraan waktu pengiriman (hari)</span>
              <input
                type="number"
                value={item.waktuPengiriman}
                onChange={e => handleChange(index, 'waktuPengiriman', e.target.value)}
                className="input-field"
              />
            </label>

            <label>
              Harga
              <span className="caption">Harga per unit barang</span>
              <input
                type="number"
                value={item.harga}
                onChange={e => handleChange(index, 'harga', e.target.value)}
                className="input-field"
              />
            </label>

            <label>
              Layanan
              <span className="caption">Penilaian kualitas layanan pemasok</span>
              <input
                type="number"
                value={item.layanan}
                onChange={e => handleChange(index, 'layanan', e.target.value)}
                className="input-field"
              />
            </label>
          </div>

          {/* Bagian Kanan */}
          <div className="alternatif-right center-content">
            <label>
              Urgency
              <span className="caption">Tingkat urgensi kebutuhan</span>
              <input
                type="number"
                value={item.urgency}
                onChange={e => handleChange(index, 'urgency', e.target.value)}
                className="input-field"
              />
            </label>

            <label>
              Stok Dibutuhkan
              <span className="caption">Jumlah stok yang dibutuhkan</span>
              <input
                type="number"
                value={item.stokDibutuhkan}
                onChange={e => handleChange(index, 'stokDibutuhkan', e.target.value)}
                className="input-field"
              />
            </label>

            <label>
              Kelangkaan
              <span className="caption">Tingkat kelangkaan barang di pasar</span>
              <input
                type="number"
                value={item.kelangkaan}
                onChange={e => handleChange(index, 'kelangkaan', e.target.value)}
                className="input-field"
              />
            </label>

            <label>
              Kualitas
              <span className="caption">Penilaian kualitas produk</span>
              <input
                type="number"
                value={item.kualitas}
                onChange={e => handleChange(index, 'kualitas', e.target.value)}
                className="input-field"
              />
            </label>
          </div>
        </div>
      ))}

      <h1 className="input-subtitle">Input Data Alternatif (Jumlah: {jumlah})</h1>

      <button onClick={handleSubmit} className="submit-button">
        Proses
      </button>
    </div>
  );
};

export default InputKriteria;
