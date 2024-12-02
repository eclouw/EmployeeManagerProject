import { useEffect, useState } from "react";

function useToken(){
    const [token, setToken] = useState();

    //Check if there is a login token when the application loads
    useEffect(()=> {
        const tokenString = localStorage.getItem('token');
        if (tokenString){
            const userToken = JSON.parse(tokenString);
            if (userToken?.token){
                setToken(userToken.token);
            }
        }
    }, [])

    //Get token from storage
    const getToken = ()=> {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
      };

      //Save the token to storage
      const saveToken = (userToken)=> {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
      };

      return {
        setToken: saveToken,
        token
      }
}

export default useToken;