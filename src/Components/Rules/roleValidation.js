const roleValidation = (role_name, role_description, currentRoleData, role_id, popup) =>{

    //Ensure that the role name is less than 50
    function validRole(role_name){
        if (typeof role_name === 'string' && role_name.length > 0 && role_name.length <=50){
            //Check to ensure that there is not already a role with that name
            if (currentRoleData.find((role)=> role.role_name.toLowerCase() === role_name.toLowerCase() && role.id !== role_id)){
                if (popup){
                    window.alert("There is already a role with that name");
                }
                
                return false;
            }else{
                return true;
            }
        }else{
            if (popup){
                window.alert("Ensure that the role name has text and is less than 50 characters long");
            }
            
            return false;
        }
    }

    //Ensure that the role description is not empty
    function validDescription(role_description){
        if (typeof role_description === 'string' && role_description.length > 0){
            return true;
        }else{
            if (popup){
                window.alert("Ensure that the role description has text");
            }
            
            return false;
            
        }
    }

    return (validRole(role_name) && validDescription(role_description));
}

export default roleValidation;