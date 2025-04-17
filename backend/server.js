import express from "express";
import cors from "cors"
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import router from "./routes/auth.routes.js"
import imageRouter from "./routes/image.routes.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.use("/api/user",router);
app.use("/api/image", imageRouter)
app.get("/",(req,res)=>{
    res.status(200).send("api working");
})
app.listen(PORT,()=>{
    connectDB();
    console.log("server is running at port no. ",PORT)
}
)

// GJFuUKgL5S3se6Pp