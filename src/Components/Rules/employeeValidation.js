
//Handles employee validation as well as outputting a popup to the user explaining what is wrong if popup is set to true
//TODO: IMPLEMENT POPUP
const employeeValidation = (employee, popup) =>{

    //Ensure that the name is a string with length greater than 0 and less than 50 and does not contain numbers
    //Validation rules are the same for first and last name
    function validName(name){
        if (typeof name === "string" && name.length > 0 && name.length <= 50 && (containsNumber(name) == false)){
            return true;
            
        }else{
            if (popup){
                window.alert("Ensure that the employee name contains text and is less than or equal to 50 characters and does not contain any numbers");
            }
            return false;
        }
    }

    //Ensure the email length is less than or equal to 50
    function validEmail(email){
        if (typeof email == "string" && email.length > 0 && email.length <= 50){
            return true;
        }else{
            window.alert("Ensure that the email is less than or equal to 50 characters");
            return false;
        }
    }

    //Ensure that the salary is a number
    function validSalary(salary){
        if (isNumber(salary)){
            
            return true;
        }else{
            window.alert("Ensure that the salary is a number");
            return false;
        }
    }

    function validManager(manager, role){
        if (role.has_superior){
            if (manager){
                return true;
            }else{
                window.alert("The selected role requires a line manager");
                return false;
                
            }
        }else{
            return true;
        }
    }

    function isNumber(string){
        const number = parseFloat(string);
        return Number.isNaN(number) ? false : true;
    }

    //Check if a string contains numbers
    function containsNumber(string){
        return /\d/.test(string);
    }

    

    return (validName(employee.first_name) && validName(employee.last_name) && validEmail(employee.email) && validSalary(employee.salary) && validManager(employee.line_manager, employee.raw_role));
}

export default employeeValidation;