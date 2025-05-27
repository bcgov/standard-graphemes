import { Router } from "express";

import languagesRouter from "./languages/index.js";
import matchRouter from "./match/index.js";

const v1Router = Router();
v1Router.use("/languages", languagesRouter);
v1Router.use("/match", matchRouter);

export default v1Router;
