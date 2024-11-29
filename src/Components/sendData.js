//Used to send data to the backend
import axios from 'axios';

const sendData = async(data, table) =>{
    const url="http://localhost";
    const port=5000;
    

    const sendData=async(command, data)=>{
        try{
        const dataResponse = await axios.post(command, data);
        return dataResponse.data;
        }catch (error){
            console.log('error sending data', error);
        }
    }

    if (table == "employees"){
        const response = await sendData(url+':'+port+"/api/employee/edit/submit", data);
        return response;
        
    }
}

export default sendData;