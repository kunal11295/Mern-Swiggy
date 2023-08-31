import express from "express";
import { getCurrentUser, login, register } from "../Controller/user_Controller.js";



const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/getCurrentUser",getCurrentUser)





export default router;