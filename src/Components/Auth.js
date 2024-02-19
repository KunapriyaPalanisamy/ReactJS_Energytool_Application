import axios from "axios";
import react,{ useEffect, useState } from "react";

const withAuth = (WrappedComponent) => {
  return function Auth(props)  {
    const [verified, setVerified] = useState(false);
   const [user,setUser]=useState("");

    useEffect( () => {
        
     
        axios
        .get(`${process.env.REACT_APP_HOST}/auth`,{headers:{"Authorization":localStorage.getItem("token")}})
        .then((res) => {
            console.log(res.data)
          if(res.data.isLoggedIn)
         {  
             setVerified(true); 
             setUser(res.data.userType)           
        }
          else
          {
            window.location.replace("/login")    
}
        })
        .catch((err) => {
            console.log(err.response.data)
            window.location.replace("/login")
        })

     
      
    },[]);
    if (verified) {
      return <WrappedComponent {...props} user={user} />;
    } 
    else{
       return "Loading..."
    }
  };
};

export default (withAuth);
