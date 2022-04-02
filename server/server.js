import express from "express";
import sessionRoutes from "../server/src/routes/session.js";
import pino from "pino";
import "dotenv/config";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});
const app = express();
const port = process.env.PORT;

app.use(express.json());

sessionRoutes({ app });

app.listen(port, () => logger.info(`🎉 Listening on :${process.env.port}`));
