import axios from "axios";
import { createContext, useEffect, useState} from "react";
import { toast } from "react-toastify"
import { useNavigate} from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props)=>{
    const [user, setUser] = useState(false);
    const [showAuth,setShowAuth] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [credit,setCredit] = useState(false)
    const navigate = useNavigate();

    const backend_url = import.meta.env.VITE_BACKEND_URL

    const logout = ()=>{
       localStorage.removeItem('token');
       setToken("")
       setUser(null)
    }

    const getCredits = async ()=>{
        try {
            const {data} = await axios.get(backend_url + "/api/user/credits", {
                headers :{token}
            })
            if(data.success){
                setCredit(data.credits)
                setUser(data.name);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log("in get credit" + error.message)
            toast.error(error.message)
        }
    }

    const generateImage = async (prompt) =>{
        try {
           const {data} = await axios.post(backend_url+ "/api/image/generate-image", {prompt},{
                headers:{token}
            })
            getCredits();
            if(data.success){
                toast.success(data.message);
                 return data.resultImage
            }else{
                toast.error(data.message);
                if(data.creditBalance <= 0){
                    navigate("/buycredit");
                }
            }
        } catch (error) {
             toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(token){
            getCredits();
        }
    },[token])
    const value ={
        user,setUser,showAuth,setShowAuth,backend_url,token,setToken,credit,setCredit,getCredits,logout,generateImage
    }
    return (
        <AppContext.Provider value={value}>
          {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider