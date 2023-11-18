let rows=100;
let col=26;

let addressColCont=document.querySelector(".address-col-cont");
let addressRowCont=document.querySelector(".address-row-cont");
let cellscont=document.querySelector(".cells-cont");
let addressBar=document.querySelector(".address-bar")

for( let i=0;i<rows;i++){
    // need to create a div 
    let addressCol=document.createElement("div");
    addressCol.setAttribute("class","address-col");
    addressCol.innerText=i+1;
    addressColCont.appendChild(addressCol);

}

for(let i=0;i<col;i++){
    let addressRow=document.createElement("div");
    addressRow.setAttribute("class","address-row");
    addressRow.innerText=String.fromCharCode(i+65);
    addressRowCont.appendChild(addressRow);
}

for(let i=0;i<rows;i++){
    let rowCont=document.createElement("div");
    rowCont.setAttribute("class","row-cont");
    for(let j=0;j<col;j++){
        let cell=document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable","true")
        rowCont.appendChild(cell);
        addListnerForAddressBarDisplay(cell,i,j);
    }
    cellscont.appendChild(rowCont);

}

function addListnerForAddressBarDisplay(cell , i, j){
    cell.addEventListener("click", (e)=>{
        let colID =String.fromCharCode(j+65);
        addressBar.value=`${colID}${i+1}`;
    })
}