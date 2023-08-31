import Nswiggy from "../Modal/userModal.js"
import jwt from "jsonwebtoken";

export const register = async (req,res) =>
    {
    try{

        const {name,email,password,confirmpassword} = req.body;
        if(!name) return res.status(404).json({success:false,message:"User Name is Required"})
        if(!email) return res.status(404).json({success:false,message:"User Email is Required"})
        if(!password) return res.status(404).json({success:false,message:"User Password is Required"})
        if(!confirmpassword) return res.status(404).json({success:false,message:"User confrimpassword is Required"})

        if(password <=8)
        {
            return res.status(404).json({success:false,message:"User Password Length is less than 8"})
        }
        if(password !== confirmpassword)     
        {
            return res.status(404).json({success:false,message:"User Passswod and confrimpassword Not match"})
        }
        const response = await Nswiggy.findOne({email:email}).exec();
        
        if(response) return res.status(404).json({success:false,message:"Email is already registered"})
        
        const newswiggy = new Nswiggy
        ({
            name,
            email,
            password:password
        });
        await newswiggy.save();
        return res.status(200).json({success:true,message:"Registration Successful"})
    }
    catch(error)
    {
       return res.status(500).json({success:false,message:error})
    }
}


export const login = async (req,res) =>
{
    try{
        
        const {email,password} = req.body;
        if(!email) return res.status(404).json({success:false,message:"User Email is Required"})
        if(!password) return res.status(404).json({success:false,message:"User Password is Required"})
       
        const response = await Nswiggy.findOne({email}).exec()
        console.log(response);
       
        if(!response) return res.status(404).json({success:false,message:"Email not found"});
        
         const token = jwt.sign({ userId: response._id }, process.env.JWT_SECRET)
           
       if(response.password !== password) return res.status(404).json({ success: false, message: "Wrong password." })

        return res.status(200).json({ success: true, message: "Login Successfull.",user:response,token:token})

    }
    catch(error)
    {
       return res.status(500).json({success:false,message:error})
    }
}


export const  getCurrentUser = async (req,res) => 
{

    try{

        const {token} = req.body
        if(!token) res.status(404).json({success:false,message:"token is Required"})
        
        const decodedData = jwt.verify(token,process.env.JWT_SECRET)
        
        if(!decodedData) res.status(404).json({success:false,message:"token is not Valid "})

        const userId = decodedData.userId;

        const user = await Nswiggy.findById(userId)
        if(user)
        {
          const userObject = {name:user.name,picture:user.picture,email:user.email,userId:user._id}
          return res.status(200).json({success:true,user:userObject})
        } res.status(404).json({success:false,message:"User Not Found "})
        

    }catch(error)
    {
        return res.status(500).json({success:false,message:error})
    }
}