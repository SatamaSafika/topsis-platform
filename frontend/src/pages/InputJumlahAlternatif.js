import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      // Simpan ke localStorage atau state management
      localStorage.setItem('jumlahAlternatif', num);
      navigate('/input-kriteria');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Sistem Pengambilan Keputusan - TOPSIS</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <label className="block text-lg mb-2">Masukkan jumlah alternatif:</label>
        <input 
          type="number" 
          value={jumlah}
          onChange={e => setJumlah(e.target.value)}
          className="border border-gray-300 rounded p-2 w-64"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button 
          onClick={handleNext}
          className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InputJumlahAlternatif;
