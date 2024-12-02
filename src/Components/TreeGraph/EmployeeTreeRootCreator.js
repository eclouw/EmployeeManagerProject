function EmployeeTreeRootCreator(employees){
    console.log('from tree creator',employees);
    const root = [];
    const mappedData = employees.map((employee)=>({
        ...employee,
        children: [],
        name: employee.first_name + ' ' + employee.last_name,
        attributes:{
            role: employee.role_name
        }
    }))

    //Create an array that is compatible with d3 tree
    mappedData.forEach(employee => {
        if (employee.line_manager == null && employee.emp_number > 0){
            root.push(employee);
        }else{
            const manager = mappedData.find(e=> e.emp_number == employee.line_manager);
            if (manager){
                manager.children.push(employee);
            }
        }
    });

    return{
        name: "Organisation",
        children: root,
    }

}

export default EmployeeTreeRootCreator;