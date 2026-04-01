import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Стандартні Middleware
app.use(cors()); // Дозволяє запити з інших доменів
app.use(express.json()); // Парсить JSON у тілі запиту (req.body)

// 2. Middleware для логування (pino-http)
app.use(
  pino({
    transport: {
      target: 'pino-pretty', // Робить логи в консолі красивими та читабельними
    },
  })
);

// --- Маршрути (Routes) ---

app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

// Тестовий маршрут для імітації помилки
app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});

// --- Обробка помилок (Мають бути ПІСЛЯ маршрутів) ---

// 3. Обробка неіснуючих маршрутів (404)
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// 4. Глобальний обробник помилок (500)
// Важливо: обробник помилок обов'язково повинен мати 4 аргументи
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
