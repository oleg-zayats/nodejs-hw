// 4. Глобальний обробник помилок (500)
// Важливо: обробник помилок обов'язково повинен мати 4 аргументи
// src/middleware/errorHandler.js

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd
      ? "Something went wrong. Please try again later."
      : err.message,
  });
};
