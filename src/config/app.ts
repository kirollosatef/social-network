import express from "express";
import connection from "../database/db.connection";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import routes from "../routes";

const app = express();
connection();

app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", routes); // 

export default app;
