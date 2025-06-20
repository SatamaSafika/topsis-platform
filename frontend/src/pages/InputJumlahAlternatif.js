import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const InputJumlahAlternatif = () => {
  const [jumlah, setJumlah] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    const num = parseInt(jumlah);
    if (isNaN(num) || num <= 0) {
      setError('Masukkan bilangan bulat positif.');
    } else {
      setError('');
      localStorage.setItem('jumlahAlternatif', num);
      navigate('/input-kriteria');
    }
  };

  return (
    <div className="jumlah-container flex">
      {/* Bagian Kiri: Form */}
      <div className="form-section">
        <h1 className="jumlah-title">Sistem Pengambilan Keputusan - TOPSIS</h1>

        <div className="jumlah-card">
  <label className="jumlah-label">Berapa alternatif kamu?</label>
  
          {/* Tambahkan container untuk input dan tombol */}
          <div className="input-button-group">
            <input
              type="number"
              value={jumlah}
              onChange={e => setJumlah(e.target.value)}
              className="jumlah-input"
              placeholder="Masukkan jumlah alternatif"
            />

            <button onClick={handleNext} className="jumlah-button flex items-center justify-center">
              <img src="/cari.png" alt="Icon" className="button-icon" />
              <span>Tambahkan</span>
            </button>
          </div>

  {error && <p className="jumlah-error">{error}</p>}
</div>

      </div>

      {/* Bagian Kanan: Gambar */}
      <div className="image-section">
        <img src="/hosp.png" alt="Hospital" className="jumlah-image" />
      </div>
    </div>
  );
};

export default InputJumlahAlternatif;
