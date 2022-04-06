import express from "express";
import sessionRoutes from "./src/session.js";
import cors from "cors";
import pino from "pino";
import "dotenv/config";
import morgan from "morgan";

const app = express();
const port = process.env.PORT;

app.options(
  "*",
  cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 })
);

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use(morgan("dev"));
app.use(express.json());

sessionRoutes({ app });

app.listen(port, () => console.log(`🎉 Listening on :${port}`));
