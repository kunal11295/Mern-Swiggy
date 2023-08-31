import "./Css/Register.css"
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {toast}  from "react-hot-toast";

const Register = () =>
{
    {
        const [userData,setuserData] = useState({name:"",email:"",password:"",confirmpassword:""});
        const router = useNavigate()
        console.log(userData,"userData");
    
        const handleChange = (event) =>
        {
            setuserData({...userData,[event.target.name]:event.target.value})
        }
    
        const handleSubmit = async (event) =>
        {
            event.preventDefault();
            if(userData.name && userData.email && userData.password && userData.confirmpassword)
            {
                    try{
                        const response = await axios.post("http://localhost:2000/api/v1/register",{
                        name:userData.name, 
                        email:userData.email,
                        password:userData.password,
                        confirmpassword:userData.confirmpassword
                        })
                        if(response.data.success)
                        {
                            toast.success(response.data.message)
                            router('/login')
                        }
                    }catch(error)
                    {
                        if(!error.response.data.success)
                        toast.error(error.response.data.message)
                    }
            }else{
                toast.error("All field are mandatory")
            }
        }
    
    return(
        <div className="Sign-up">
            <div className="register">
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="name">
                        <input type="text" name="name" placeholder="Enter the Name" onChange={handleChange}/>
                    </div>
                    <div className="email">
                        <input type="email" name="email" placeholder="Enter the Email"  onChange={handleChange}/>
                    </div>
                    <div className="password">
                        <input type="password" name="password" placeholder="Enter the password" onChange={handleChange}/>
                    </div>
                    <div className="Confirmpassword">
                        <input type="password" name="confirmpassword" placeholder="Enter the confirmpassword" onChange={handleChange}/>
                    </div>
                    <div className="Submit">
                        <input type="submit" value="Register"/>
                    </div>
                    <div className="line">
                        <p>By clicking on Login I accept the terms & Condition Privacy Policy</p>
                    </div>
                </form>
            </div>
        </div>


    )


}
}
export default Register