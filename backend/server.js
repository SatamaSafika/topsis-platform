const express = require('express');
const cors = require('cors');
const { hitungTopsis } = require('./topsis');

const app = express();
app.use(cors());
app.use(express.json());

// API endpoint
app.post('/api/topsis', (req, res) => {
  try {
    const dataAlternatif = req.body;

    if (!Array.isArray(dataAlternatif) || dataAlternatif.length === 0) {
      return res.status(400).json({ message: 'Data input tidak valid!' });
    }

    const hasil = hitungTopsis(dataAlternatif);
    return res.json(hasil);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat memproses TOPSIS' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend berjalan di http://localhost:${PORT}`);
});
