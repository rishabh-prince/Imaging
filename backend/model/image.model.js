import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    image:{
        type:String
    },
    prompt:{
        type:String
    }
},{
    timestamps:true
})

const Image = mongoose.model("image",imageSchema);
export default Image;
