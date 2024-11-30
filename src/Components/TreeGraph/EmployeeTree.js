import EmployeeTreeRootCreator from "./EmployeeTreeRootCreator";
import React from 'react';
import Tree from 'react-d3-tree';

function EmployeeTree({employees}){
    //Generate the TreeRoots
    const roots = EmployeeTreeRootCreator(employees);

    return(
        <>
        
            <Tree data={roots} orientation="vertical" separation={{ siblings: 2, nonSiblings: 2 }}/>
        
        </>
    )
}

export default EmployeeTree;