let sheetDb=[];

for( let i=0;i<rows;i++){
    let sheetRow=[];
    for(let  j=0;j<col;j++){
        let cellProp={
            bold : false,
            italic : false,
            underline : false,
            alignment : "left",
            fontFamily : "monospace",
            fontSize : "14",
            fontColor : "#000000",
            bgColor : "#000000",
        }
        sheetRow.push(cellProp);
    }
    sheetDb.push(sheetRow);
}

// selectors for  cell properties 
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize=document.querySelector(".font-size-prop");
let fontFamily= document.querySelector(".font-family-prop");
let fontColor=document.querySelector(".font-color-prop");
let bgColor=document.querySelector(".Bg-color-prop");
let alignment=document.querySelectorAll(".alignment");
let leftAlign=alignment[0];
let centerAlign=alignment[1];
let rightAlign=alignment[2];



let activeColor="#d1d8e0"
let inactiveColor="#ecf0f1"
// Two way binding 
// attach  listners

bold.addEventListener("click", (e)=>{
    let address=addressBar.value;
    let [cell,cellPropDb]= activeCell(address);
    // now i have cell and the cellPropDb
    // we can chage there 
    cellPropDb.bold=!cellPropDb.bold;
    cell.style.fontWeight=cellPropDb.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellPropDb.bold ? activeColor :inactiveColor;

});

italic.addEventListener("click", (e)=>{
    let address=addressBar.value;
    let [cell,cellPropDb]= activeCell(address);
    // now i have cell and the cellPropDb
    // we can chage there 
    cellPropDb.italic=!cellPropDb.italic;
    cell.style.fontStyle=cellPropDb.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellPropDb.italic ? activeColor :inactiveColor;

});

underline.addEventListener("click", (e)=>{
    let address=addressBar.value;
    let [cell,cellPropDb]= activeCell(address);
    // now i have cell and the cellPropDb
    // we can chage there 
    cellPropDb.underline=!cellPropDb.underline;
    cell.style.textDecoration =cellPropDb.underline ? "underline" : "none";
    underline.style.backgroundColor = cellPropDb.underline ? activeColor :inactiveColor;

});

fontSize.addEventListener("change",()=>{
    let address=addressBar.value;
    let [cell,cellPropDb]= activeCell(address);
    cellPropDb.fontSize=fontSize.value;
    cell.style.fontSize=cellPropDb.fontSize+"px";
    fontSize.value=cellPropDb.fontSize;


});

fontFamily.addEventListener("change",()=>{
    let address=addressBar.value;
    let [cell,cellPropDb]= activeCell(address);
    cellPropDb.fontFamily=fontFamily.value;
    cell.style.fontFamily=cellPropDb.fontFamily;
    fontFamily.value=cellPropDb.fontFamily;
});


fontColor.addEventListener("change", (e)=>{
    let address=addressBar.value;
    let [cell,cellPropDb]= activeCell(address);
    cellPropDb.fontColor=fontColor.value;
    cell.style.color=cellPropDb.fontColor;
    fontColor.value=cellPropDb.fontColor;

});

bgColor.addEventListener("change", (e)=>{
    let address=addressBar.value;
    let [cell,cellPropDb]= activeCell(address);
    cellPropDb.bgColor=bgColor.value;
    cell.style.backgroundColor=cellPropDb.bgColor;
    bgColor.value=cellPropDb.bgColor;
});


alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e)=>{
        console.log("clicked");
        let address=addressBar.value;
        let [cell,cellPropDb]= activeCell(address);

        let alignValue=e.target.classList[0];
        cellPropDb.alignment=alignValue;
        cell.style.textAlign=cellPropDb.alignment;

        switch(alignValue){
            case("left"):
                leftAlign.style.backgroundColor=activeColor;
                centerAlign.style.backgroundColor=inactiveColor;
                rightAlign.style.backgroundColor=inactiveColor;
                break;
            case("right"):
                leftAlign.style.backgroundColor=inactiveColor;
                centerAlign.style.backgroundColor=inactiveColor;
                rightAlign.style.backgroundColor=activeColor;
                break;
            case("center"):
                leftAlign.style.backgroundColor=inactiveColor;
                centerAlign.style.backgroundColor=activeColor;
                rightAlign.style.backgroundColor=inactiveColor;
                break;
        }

    });
});


let allCells=document.querySelectorAll(".cell");

for(let i=0;i<allCells.length;i++){
    addListnerToAttachCellProperties(allCells[i]);
}

// function to modify the cell properties based on click 
function addListnerToAttachCellProperties(cell){
    cell.addEventListener("click", (e)=>{
        let address=addressBar.value;
        let [rid,cid]= decodeAddress(address);
        let cellProp=sheetDb[rid][cid];

        // apply all the properties of cell to the db
        cell.style.fontWeight=cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle=cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration =cellProp.underline ? "underline" : "none";
        cell.style.fontSize=cellProp.fontSize+"px";
        cell.style.fontFamily=cellProp.fontFamily;
        cell.style.color=cellProp.fontColor;
        cell.style.backgroundColor=cellProp.bgColor=="#000000" ? "transparent" :cellPropDb.bgColor ;
        cell.style.textAlign=cellProp.alignment;

        // now apply to the ui
        bold.style.backgroundColor = cellProp.bold ? activeColor :inactiveColor;
        italic.style.backgroundColor = cellProp.italic ? activeColor :inactiveColor;
        underline.style.backgroundColor = cellProp.underline ? activeColor :inactiveColor;
        fontSize.value=cellProp.fontSize;
        fontColor.value=cellProp.fontColor;
        fontFamily.value=cellProp.fontFamily;
        bgColor.value=cellProp.bgColor;
        switch(cellProp.alignValue){
            case("left"):
                leftAlign.style.backgroundColor=activeColor;
                centerAlign.style.backgroundColor=inactiveColor;
                rightAlign.style.backgroundColor=inactiveColor;
                break;
            case("right"):
                leftAlign.style.backgroundColor=inactiveColor;
                centerAlign.style.backgroundColor=inactiveColor;
                rightAlign.style.backgroundColor=activeColor;
                break;
            case("center"):
                leftAlign.style.backgroundColor=inactiveColor;
                centerAlign.style.backgroundColor=activeColor;
                rightAlign.style.backgroundColor=inactiveColor;
                break;
        }


    });

}



function activeCell(address){
    let[rid,cid]= decodeAddress(address);
    // accecc the cell
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellPropDb=sheetDb[rid][cid];
    return [cell,cellPropDb];
}

function decodeAddress(address){
    let rowID=Number(address.slice(1)-1);
    let colID=Number(address.charCodeAt(0)-65);
    return [rowID,colID];
}
