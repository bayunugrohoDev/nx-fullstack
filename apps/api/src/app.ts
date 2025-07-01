import express, { Request, Response, NextFunction } from 'express';
import routes from './routes'; // Import semua route Anda
import { handleServerError } from './utils/apiResponse';

const app = express();

app.use(express.json()); // Middleware untuk parsing body JSON

// Route utama API
app.use('/api', routes); // Semua route API Anda akan diawali dengan /api

// Contoh route dasar
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js API with Express, PostgreSQL, TypeScript, and Drizzle!');
});

// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Caught by global error handler:', err);
  handleServerError(res, err);
});

export default app;
