import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputJumlahAlternatif from './pages/InputJumlahAlternatif';
import InputKriteria from './pages/InputKriteria';
import HasilKeputusan from './pages/HasilKeputusan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputJumlahAlternatif />} />
        <Route path="/input-kriteria" element={<InputKriteria />} />
        <Route path="/hasil-keputusan" element={<HasilKeputusan />} />
      </Routes>
    </Router>
  );
}

export default App;
