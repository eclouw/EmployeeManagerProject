//Used to retrieve data from the backend 
import axios from "axios";


const getData = async(table)=>{
    const url=process.env.REACT_APP_BACKEND_URL;
    const port=process.env.REACT_APP_BACKEND_PORT;

    const data = async()=>{
        if (table=="employees"){
            const response = await fetchData(url+':'+port+"/get/employees");
            return response;
        }else if (table=="roles"){
            const response = await fetchData(url+':'+port+"/get/roles")
            return response;
        }
    }

    const fetchData=async(command)=>{
        const dataResponse = await axios.get(command);
        return dataResponse.data;
    }
    
    return await data();
}

export default getData;