function EmployeeTreeRootCreator(employees){
    
    const root = [];
    const mappedData = employees.map((employee)=>({
        ...employee,
        children: [],
        name: employee.first_name + ' ' + employee.last_name,
    }))

    //Create an array that is compatible with d3 tree
    mappedData.forEach(employee => {
        if (employee.line_manager == null){
            root.push(employee);
        }else{
            const manager = mappedData.find(e=> e.emp_number == employee.line_manager);
            if (manager){
                manager.children.push(employee);
            }
        }
    });

    if (root.length > 1){
        return{
            name: "Oraganisation",
            children: root,
        }
    }

    return root;
}

export default EmployeeTreeRootCreator;