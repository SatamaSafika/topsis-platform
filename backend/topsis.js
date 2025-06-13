// topsis.js

function hitungTopsis(data) {
  // Proses: transformasi data ke format kriteria
  const processed = data.map(item => {
    const pasokan = (item.stokDibutuhkan - item.stokSaatIni) / item.stokDibutuhkan * 100;
    return {
      name: item.name,
      criteria: [
        parseFloat(item.urgency),          // benefit
        parseFloat(pasokan),               // benefit (supply gap)
        parseFloat(item.waktuPengiriman),  // cost
        parseFloat(item.kelangkaan),       // cost
        parseFloat(item.harga),            // cost
        parseFloat(item.kualitas),         // benefit
        parseFloat(item.layanan)           // benefit
      ]
    };
  });

  const weights = [0.3, 0.25, 0.2, 0.1, 0.05, 0.06, 0.04];
  const criteriaType = ['benefit', 'benefit', 'cost', 'cost', 'cost', 'benefit', 'benefit'];

  // Normalisasi matriks
  function normalizeMatrix(matrix) {
    const numCriteria = matrix[0].length;
    const normMatrix = matrix.map(row => [...row]);

    for (let j = 0; j < numCriteria; j++) {
      let sumSquares = matrix.reduce((sum, row) => sum + row[j] ** 2, 0);
      let denom = Math.sqrt(sumSquares);
      for (let i = 0; i < matrix.length; i++) {
        normMatrix[i][j] /= denom;
      }
    }
    return normMatrix;
  }

  // Kalkulasi bobot
  function weightMatrix(norm, weights) {
    return norm.map(row => row.map((val, j) => val * weights[j]));
  }

  // Ideal solution
  function getIdeal(weighted, criteriaType) {
    const idealPos = [], idealNeg = [];
    for (let j = 0; j < weighted[0].length; j++) {
      const col = weighted.map(row => row[j]);
      if (criteriaType[j] === 'benefit') {
        idealPos.push(Math.max(...col));
        idealNeg.push(Math.min(...col));
      } else {
        idealPos.push(Math.min(...col));
        idealNeg.push(Math.max(...col));
      }
    }
    return { idealPos, idealNeg };
  }

  // Jarak solusi
  function distance(weighted, ideal) {
    return weighted.map(row => Math.sqrt(row.reduce((sum, val, j) => sum + (val - ideal[j]) ** 2, 0)));
  }

  // Eksekusi perhitungan
  const matrix = processed.map(item => item.criteria);
  const normalized = normalizeMatrix(matrix);
  const weighted = weightMatrix(normalized, weights);
  const { idealPos, idealNeg } = getIdeal(weighted, criteriaType);
  const dPos = distance(weighted, idealPos);
  const dNeg = distance(weighted, idealNeg);
  const scores = dNeg.map((val, i) => val / (val + dPos[i]));

  // Output hasil ranking
  const result = processed.map((item, i) => ({
    name: item.name,
    score: scores[i]
  })).sort((a, b) => b.score - a.score);

  return result;
}

module.exports = { hitungTopsis };
