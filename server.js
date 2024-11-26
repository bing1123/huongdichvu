import { createServer } from 'http';
import next from 'next';
import express from 'express';
import cors from 'cors';
import apiRouter from './api.ts';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 5000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const expressApp = express();

// Middleware
expressApp.use(cors());
expressApp.use(express.json());

// API Routes
expressApp.use('/api/', apiRouter);

app.prepare().then(() => {
 const httpServer = createServer((req, res) => {
   // Kiểm tra nếu request là API thì chuyển sang Express
   if (req.url?.startsWith('/api')) {
     expressApp(req, res);
   } else {
     // Ngược lại, sử dụng Next.js handler
     handler(req, res);
   }
 });

 console.log('Server created');

 // Lắng nghe kết nối HTTP
 httpServer
   .once('error', (err) => {
     console.error(err);
     process.exit(1);
   })
   .listen(port, () => {
     console.log(`</> Ready on http://${hostname}:${port}`);
   });
});