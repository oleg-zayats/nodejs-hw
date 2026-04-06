// 4. Глобальний обробник помилок (500)
// Важливо: обробник помилок обов'язково повинен мати 4 аргументи
// src/middleware/errorHandler.js
// src/middleware/errorHandler.js
import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  // Перевірка, чи це помилка HttpError
  if (isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  // Для всіх інших помилок (500)
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
};
