import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import activate_route_middleware from './middlewares/route.mdw.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const HOST = '0.0.0.0';
app.use(express.static('public'));

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('API is running...');
});


activate_route_middleware(app);

app.listen(port,HOST, () => console.log(`App is running at http://localhost:${port}`));
