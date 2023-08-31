import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext}  from "../Context/Authcontext"
import axios from 'axios';
import {toast} from "react-hot-toast";
import { useState } from 'react';
import "./Css/Login.css";

const Login = ()=> {

    const router = useNavigate();

    const {state,dispatch} = useContext(AuthContext)
    console.log(state, "state from context into login componnt")

    const [userData, setUserData] = useState({ email: "", password: "" });

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.email && userData.password) {
            try {
                const response = await axios.post('http://localhost:2000/api/v1/login', { 
                email:userData.email,
                password:userData.password
                })
                if (response.data.success) {
                    dispatch({
                        type: "Login",
                        payload: response.data.user
                    })
                    localStorage.setItem("batch2Token", JSON.stringify(response.data.token))
                    setUserData({ email: "", password: "" })
                    router('/homepage')
                   toast.success(response.data.message)
                }
            } catch (error) {
                if(!error.response.data.success)
                toast.error(error.response.data.message)
            }
        } else {
            toast.error("All fields are mandtory.")
        }
    }

  return (
    <div className="Main">
    <div className="login">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
            <div className="em">
                <input type="email" name="email" placeholder="Enter the Email"  onChange={handleChange}/>
            </div>
            <div className="pass">
                <input type="password" name="password" placeholder="Enter the password" onChange={handleChange}/>
            </div>
            <div className="Sub">
                <input type="submit" value="Login"/>
            </div>
            <div className="li">
                <p>By clicking on Login I accept the terms & Condition Privacy Policy</p>
            </div>
        </form>
    </div>
</div>
    )
}

export default Login
