import mongoose  from "mongoose";
import { Schema } from "mongoose";

const swiggy = new Schema({
    name :{ type:String, required:true},
    email : {type:String , required: true, unique : true},
    password :{type:String , required: true},
})

export default mongoose.model("Nswiggy",swiggy);