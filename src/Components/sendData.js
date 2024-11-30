//Used to send data to the backend
import axios from 'axios';

//Status
//1 for updating, 2 for creation, 3 for deletion
const sendData = async(data, table, status) =>{
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
        if (status == 1){
            const response = await sendData(url+':'+port+"/api/employee/edit/submit", data);
            return response;
        }else if (status == 2){
            const response = await sendData(url+':'+port+'/api/employee/create/submit', data)
            return response;
        }else if (status == 3){
            const response = await sendData(url+ ':'+port+'/api/employee/delete', data)
            return response;
        }
        
        
    }
}

export default sendData;