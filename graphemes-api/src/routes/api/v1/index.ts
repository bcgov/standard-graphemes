import { Router } from "express";

import languagesRouter from "./languages/index.js";

const v1Router = Router();
v1Router.use("/languages", languagesRouter);

export default v1Router;
