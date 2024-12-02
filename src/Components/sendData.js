//Used to send data to the backend
import axios from 'axios';

//Status
//1 for updating, 2 for creation, 3 for deletion
const sendData = async(data, table, status) =>{
    const url=process.env.REACT_APP_BACKEND_URL;
    const port=process.env.REACT_APP_BACKEND_PORT;
    

    const sendData=async(command, data)=>{
        try{
        const dataResponse = await axios.post(command, data);
        return dataResponse.data;
        }catch (error){
            console.log('error sending data', error);
        }
    }

    if (table == "employees"){
        //Update employee
        if (status == 1){
            const response = await sendData(url+':'+port+"/api/employee/edit/submit", data);
            return response;
        //Create employee
        }else if (status == 2){
            const response = await sendData(url+':'+port+'/api/employee/create/submit', data)
            return response;
        //Delete employee
        }else if (status == 3){
            const response = await sendData(url+ ':'+port+'/api/employee/delete', data)
            return response;
        }
        
        
    }else if (table == "roles"){
        //Update role
        if (status == 1){
            const response = await sendData(url+ ':'+port+"/api/role/edit/submit", data);
            return response;
        //Create role
        }else if (status == 2){
            const response = await sendData(url+':'+port+"/api/role/create/submit", data);
            return response;
        //Delete role
        }else if (status == 3){
            const response = await sendData(url+':'+port+"/api/role/delete/submit", data);
            return response;

        }
    }
}

export default sendData;