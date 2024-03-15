import express, {Application, Request, Response} from "express";
import cors from "cors";
import morgan from "morgan";
import {userRoutes} from "./app/modules/User/user.routes";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(morgan("tiny"));
app.use("/api/v1/user", userRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "PH Health Care Server..",
  });
});

export default app;
