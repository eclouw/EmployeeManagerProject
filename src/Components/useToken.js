import { useEffect, useState } from "react";

function useToken(){
    const [token, setToken] = useState();

    useEffect(()=> {
        const tokenString = localStorage.getItem('token');
        if (tokenString){
            const userToken = JSON.parse(tokenString);
            if (userToken?.token){
                setToken(userToken.token);
            }
        }
    }, [])

    const getToken = ()=> {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
      };

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