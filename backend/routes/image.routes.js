import express from "express";
import { imageGeneration } from "../controllers/image.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const imageRouter = express.Router();

imageRouter.post('/generate-image',protectRoute,imageGeneration)

export default imageRouter