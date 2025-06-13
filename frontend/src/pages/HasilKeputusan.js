import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HasilKeputusan = () => {
  const [hasil, setHasil] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResult = localStorage.getItem('topsisResult');
    if (!storedResult) {
      navigate('/');
    } else {
      setHasil(JSON.parse(storedResult));
    }
  }, [navigate]);

  if (hasil.length === 0) {
    return <div className="p-6">Memuat hasil keputusan...</div>;
  }

  const pemenang = hasil[0]; // karena hasil sudah di-sort dari backend

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Hasil Keputusan TOPSIS</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold">Alternatif Terbaik:</h2>
        <p className="text-green-600 text-2xl font-bold">{pemenang.name}</p>
        <p className="text-gray-700">Skor: {pemenang.score.toFixed(4)}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Ranking Lengkap:</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Nama Alternatif</th>
              <th className="border px-4 py-2">Skor</th>
            </tr>
          </thead>
          <tbody>
            {hasil.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.score.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HasilKeputusan;
