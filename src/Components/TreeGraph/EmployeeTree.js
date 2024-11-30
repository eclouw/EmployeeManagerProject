import EmployeeTreeRootCreator from "./EmployeeTreeRootCreator";
import React from 'react';
import Tree from 'react-d3-tree';

function EmployeeTree({employees}){
    //Generate the TreeRoots
    const roots = EmployeeTreeRootCreator(employees);

    return(
        <>
        <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
            <Tree data={roots}/>
        </div>
        </>
    )
}

export default EmployeeTree;