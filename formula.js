
for( let i=0;i<rows;i++){
    for(let j=0;j<col;j++){
        let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur",(e)=>{
            let address=addressBar.value;
            let [cell,cellProp]=activeCell(address);
            let enteredData=cell.innerText;
            if(enteredData === cellProp.value) return; // do nothing 

            cellProp.value=enteredData;
            // console.log(cellProp);
            // remove the the parent values , remove formula , update its children 
            removeChildrenFromParent(cellProp.formula);
            cellProp.formula="";
            updateChildren(address);
        })
    }
}


let formulaBar=document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown",(e)=>{
    let inputFormula=formulaBar.value;
    if(e.key === "Enter" && inputFormula){

        // if formula changed then we need to remove it first 
        let address=addressBar.value;
        let [cell , cellProp]=activeCell(address);
        if(inputFormula !== cellProp.formula){ 
            // console.log("from formula check");
            removeChildrenFromParent(cellProp.formula);
        }

        // stablish graph matrix relation with 
        addChildrenToGraphArray(address,inputFormula);

        let checkCycle=isCyclePresent(graphStorageArray);

        if(checkCycle === true){
            alert("A cycle is Found please enter other formula");
            removeChildrenFromGraphArray(address,inputFormula);
            return;
        }

        // evaluate the formula 
        let evaluatedValue=evalueteFormula(inputFormula);
        // set the formula to UI and DB
        setCellUiAndCellProp(evaluatedValue,inputFormula,address);
        //  parent child relationship 
        addChildrenToParent(inputFormula);
        updateChildren(address);
        // console.log(sheetDb);
    }
});


//
function addChildrenToGraphArray(childAddress, formula){
    // now i need to push this value(index) in the parent array

    let [childRow, childCol]=decodeAddress(childAddress);
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            // then  get the parent address
            let [parentRow, parentCol] = decodeAddress(encodedFormula[i]);
            graphStorageArray[parentRow][parentCol].push([childRow,childCol]);
        }
    }

}

function removeChildrenFromGraphArray(childAddress, formula){
    // let [childRow, childCol]=decodeAddress(childAddress);
    let encodedFormula=formula.split(" ");
    // not proper implementation <- but will work fine
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            // then  get the parent address
            let [parentRow, parentCol] = decodeAddress(encodedFormula[i]);
            graphStorageArray[parentRow][parentCol].pop();
        }
    }
}


function addChildrenToParent(formula){
    let childAddess=addressBar.value;
    let encodedFormula=formula.split(" ");// will retuen an arr string 
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let[parentCell , parentCellProp]=activeCell(encodedFormula[i]);
            parentCellProp.children.push(childAddess);
        }

    }

}

// to remove children from parent 
function removeChildrenFromParent(formula){
    let childAddess=addressBar.value;
    let encodedFormula=formula.split(" ");// will retuen an arr string 
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let[parentCell , parentCellProp]=activeCell(encodedFormula[i]);
            let index=parentCellProp.children.indexOf(childAddess);
            parentCellProp.children.splice(index,1);
        }

    }

}

// need to chnage the value of children if parent changes 

function updateChildren(parentAddreess){
    let [childrenCell,childrenCellProp]=activeCell(parentAddreess);
    let children=childrenCellProp.children;

    for(let i=0;i<children.length;i++){
        let childrenAddress=children[i];
        // now need to perform operation on children 
        let [childrenCell, childrenCellProp]=activeCell(childrenAddress);
        let childrenFormula=childrenCellProp.formula;
        let evaluatedValue=evalueteFormula(childrenFormula);
        setCellUiAndCellProp(evaluatedValue,childrenFormula,childrenAddress);
        // now call for all childrens 
        updateChildren(childrenAddress);

    }

}



// Evaluate
function evalueteFormula(formula){
    let encodedFormula= formula.split(" ");
    for( let i=0;i<encodedFormula.length;i++){
        let asciiValue=encodedFormula[i].charCodeAt(0);
        // console.log(encodedFormula[i]);
        if(asciiValue>=65 && asciiValue<=90){
            // console.log("called");
            let [cell, cellProp] = activeCell(encodedFormula[i]);
            encodedFormula[i]=cellProp.value;
        }
    }
    let decodedFormula=encodedFormula.join(" ");
    return eval(decodedFormula);
}

// set The formula 
function setCellUiAndCellProp(evaluatedValue,inputFormula, address){
    let [cell,cellProp]=activeCell(address);
    cellProp.value=evaluatedValue;
    cell.innerText=cellProp.value;
    cellProp.formula=inputFormula;
}