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

  const pemenang = hasil[0];

  return (
    <div className="hasil-page-container">
      <h1 className="hasil-page-title">Hasil Keputusan</h1>

      {/* Card Alternatif Terbaik */}
      <div className="hasil-card-horizontal">
        <div className="hasil-card-text">
          <div className="hasil-winner-name">{pemenang.name}</div>
          <div className="hasil-winner-score">Skor: {pemenang.score.toFixed(4)}</div>
          <div className="hasil-caption">Alternatif dengan skor tertinggi berdasarkan metode TOPSIS.</div>
        </div>

        <img src="/rank1.png" alt="Pemenang" className="hasil-card-image" />
      </div>

      {/* Card Ranking Lengkap */}
      <div className="hasil-ranking-card">
        <div className="hasil-ranking-title">Ranking Lengkap</div>

        <table className="hasil-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Alternatif</th>
              <th>Skor</th>
            </tr>
          </thead>
          <tbody>
            {hasil.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.score.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HasilKeputusan;
