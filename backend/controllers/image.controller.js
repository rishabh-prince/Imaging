import User from "../model/user.model.js";
import FormData from "form-data";
import axios from "axios";


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
    res.json({success:true,message:'image generated successfully',creditBalance:user.creditBalance-1,resultImage})
   } catch (error) {
    console.log(error.message);
       res.status(400).json({ success: false, message: error.message });
   }
}