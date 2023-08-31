import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
// import { toast } from "react-hot-toast";


export const AuthContext = createContext()

const initialState = { user:null};


const reducer = (state,action) => {
    switch(action.type)
    {
        case "Login":
            return{...state,user:action.payload}

        case "Logout":
            localStorage.removeItem("batch2Token")
            alert("Logout Successfully Done")
            return{...state,user:null}
    
        default:
            return state;
    }
}

const HandleAuthContext = ({children}) => {
    const[state,dispatch] = useReducer(reducer,initialState)

    useEffect(() =>{
        async function getCurrentUser()
        {
            const token = JSON.parse(localStorage.getItem("batch2Token"))
            if(token)
            {
                const response = await axios.post('http://localhost:4000/api/v1/getCurrentUser', {token})  
                if(response){
                    dispatch({
                        type:"Login",
                        payload:response.data.user
                    })
                }     
            }
        }
        getCurrentUser()
        
    },[])


    return (
        <AuthContext.Provider value={{dispatch,state}}>
            {children}
        </AuthContext.Provider>
    )
}

export default HandleAuthContext;