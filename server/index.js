import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from './mongodb/connect.js'

import initPost from './routes/postRoutes.js'
import initDalle from './routes/dalleRoutes.js'
import initAuth from './routes/auth.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const startSever = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, console.log("Server is running!"));
  } catch (err) {
    console.log("Error: ", err)
  }
};

app.use('/api/v1', initDalle)
app.use('/api/v2', initPost)
app.use('/api/auth', initAuth)

startSever();

