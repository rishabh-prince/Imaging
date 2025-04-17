import User from "../model/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import razorpay from "razorpay"
import Transaction from "../model/transaction.model.js";

export const signUp = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!email || !password || !name){
            return res.status(400).json({
                success:false, message:"Missing details"
            })
        }
        const isAlreadyPresent = await User.findOne({email});
        console.log(isAlreadyPresent);
        if(isAlreadyPresent){
            return res.status(400).json({
                success: false, message: "User already registered please login"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save();
        const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, {
                    expiresIn: "7d",
                });
        res.status(201).json({
            name:user.name,
            token,
            success:true
        })
    } catch (error) {
       console.log(error);
       res.status(400).json({success:false,message:error.message}) 
    }
}

export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.json({
                success:false,
                message:"invalid credentials"
            })
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if(!isCorrectPassword){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(201).json({
            name: user.name,
            token,
            success:true
        })
    } catch (error) {
        console.log("error in login controller",error);
        res.status(400).json({success:false,message:error.message});
    }
}

export const userCredits = async (req,res)=>{
    try {
        const {userId}=req;
        const user = await User.findById(userId);
        res.json({success:true,
            credits:user.creditBalance,
            name:user.name})
    } catch (error) {
        console.log("error in userCredit controller", error);
        res.status(400).json({ success: false, message: error.message });
    }
    }

const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
})

export const paymentRazorpay = async (req,res)=>{
    try {
        const {userId} = req;
        const {planId} = req.body
        if (!userId || !planId) {
            return res.json({ success: false, message: "Missing details" })
        }
        const user = await User.findById(userId)
          if(!user){
            return res.json({success:false,message:"please login for purchase"})
          }
        let credits,plan,amount,date

        switch(planId){
            case 'Basic':
                plan='Basic'
                credits= 10
                amount= 100
                break ;
            case 'Advanced':
                plan= 'Advanced'
                credits= 60
                amount= 500
                break;
            case 'Business':
                plan= 'Business'
                credits= 150
                amount= 1000
                break;
            
                default:
                    return res.json({success:false, message: 'plan not found'})
        }

        date = Date.now();
        const transactionData = {
            userId,plan,amount,credits
        }

        const newTransaction = await Transaction.create(transactionData)
         
        const options = {
            amount: amount*100,
            currency : process.env.CURRENCY,
            receipt : newTransaction._id,
        }

        await razorpayInstance.orders.create(options,(error,order)=>{
               if(error){
                console.log(error);
                return res.json({success:false,message:error})
               }
               res.json({success:true,order})
        })
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            const transactionData = await Transaction.findById(orderInfo.receipt)
             if(transactionData.payment){
                return res.json({success:false,message:"Payment failed"})
             }

             const userData = await User.findById(transactionData.userId)

             const creditBalance = userData.creditBalance + transactionData.credits

             await User.findByIdAndUpdate(userData._id,{creditBalance});

             await Transaction.findByIdAndUpdate(transactionData._id,{payment:true})
             res.json({success:true,message:"Credits added"})
        }else{
            res.json({success:false,message:"Payment failed"})
        }   
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}
