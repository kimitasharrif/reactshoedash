import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckSession = () => {
    const navigate = useNavigate()
    // check from local storage if the following variables are available 
    const username = localStorage.getItem("username")
    const admin_id = localStorage.getItem("admin_id")
    const access_token= localStorage.getItem("access_token")

    // if they are not present , redirect user to signin
    useEffect( ()=>{
       //    check if they are empty 
      if(!username && !admin_id && !access_token){
    // claer the local storage 
         localStorage.clear()
         return navigate("/signin") //got to signin
        }
    },[username, admin_id, access_token, navigate])

    //return your variables
    return{username, admin_id, access_token};
    

};
export default CheckSession