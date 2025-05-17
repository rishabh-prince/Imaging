import User from "../model/user.model.js";
import FormData from "form-data";
import axios from "axios";
import Image from "../model/image.model.js"


export const imageGeneration = async (req,res)=>{
   try {
    const {userId} = req;
    const {prompt}=req.body;
    const user = await User.findById(userId)
    if(!user || !prompt){
        return res.json({success:false,message:"missing details"})
    }
    if(user.creditBalance<=0){
        return res.json({success:false,message:"No credit Balance to generate image", creditBalance:user.creditBalance});
    }

    const formdata = new FormData()
    formdata.append('prompt', prompt)

       const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',
        formdata, {
        headers: {
           'x-api-key': process.env.CLIPDROP_API,
       },
       responseType: 'arraybuffer'
    })
    const base64Image = Buffer.from(data,'binary').toString('base64')
    
    const resultImage =`data:image/png;base64,${base64Image}`
    
    await User.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})
       const newImage = new Image({
           userId,
           image: resultImage,
           prompt
       })
      await newImage.save();
    res.json({success:true,message:'image generated successfully',creditBalance:user.creditBalance-1,resultImage})
   } catch (error) {
       res.status(400).json({ success: false, message: error.message });
   }
}
export const getImages = async (req,res)=>{
    try {
        const {userId} = req;
        const  images = await Image.find({ userId });
        if(!images){
            return res.status(404).json({success:false,message:"Internal server error"})
        }
        res.status(201).json({success:true,images})

    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

export const deleteImage = async (req,res)=>{
    try{
       const {userId} = req;
       const {id}=req.params;
       const deletedImage = await Image.findByIdAndDelete(id);
       if(!deleteImage){
        return res.json({success:false,message:"Image not found"})
       }
       return res.json({success:true,message:"Image deleted successfully"});
    }catch(error){
       return res.json({ success: false, message: error.message });
    }
}