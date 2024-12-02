//Used to retrieve data from the backend 
import axios from "axios";


const getData = async(table)=>{
    const url=process.env.REACT_APP_BACKEND_URL;
    const port=process.env.REACT_APP_BACKEND_PORT;

    const data = async()=>{
        try{
            //Get employee data
            if (table=="employees"){
                const response = await fetchData(url+':'+port+"/get/employees");
                return response;
            //Get role data
            }else if (table=="roles"){
                const response = await fetchData(url+':'+port+"/get/roles")
                return response;
            }
        }catch(error){
            console.log(error);
        }
    }

    const fetchData=async(command)=>{
        const dataResponse = await axios.get(command);
        return dataResponse.data;
    }
    
    return await data();
}

export default getData;