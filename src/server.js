import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Стандартні Middleware
app.use(cors());
app.use(express.json());

// 2. Middleware для логування (pino-http)
app.use(
  pino({
    transport: {
      target: 'pino-pretty', // Робить логи читабельними в консолі
    },
  })
);

// --- Маршрути ---

// GET /notes
app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

// GET /notes/:noteId
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

// GET /test-error (імітація помилки)
app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});

// --- Обробка помилок ---

// 3. Обробка неіснуючих маршрутів (404)
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// 4. Глобальний обробник помилок (500)
// Важливо: має бути 4 аргументи (err, req, res, next)
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
