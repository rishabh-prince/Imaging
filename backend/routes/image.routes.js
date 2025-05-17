import express from "express";
import { imageGeneration,getImages, deleteImage } from "../controllers/image.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const imageRouter = express.Router();

imageRouter.post('/generate-image',protectRoute,imageGeneration)
imageRouter.get('/get-images', protectRoute,getImages)
imageRouter.delete('/delete-image/:id',protectRoute,deleteImage);

export default imageRouter