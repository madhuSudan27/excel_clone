// const { Promise } = require("mongoose");


function colorPromise(){
    return new Promise( (resolve, resect) => {
        setTimeout(()=>{
            resolve();
        },1000)
    })
}


async function tracePath(graphStorageArray ,  cycleResponse ){
    // i need to create visited arrays to check for cycle 
    let [si,sj]= cycleResponse;
    let visited = [];
    let dfsVisited =[];

    for(let i=0;i<rows;i++){
        let rowVisited = [];
        let rowDfsVisited =[];
        for(let j=0;j<col;j++){
            rowVisited[j]=false;
            rowDfsVisited[j]=false;
            
        }
        visited.push(rowVisited);
        dfsVisited.push(rowDfsVisited);

    }

    // for(let i=0;i<rows;i++){
    //     for(let j=0;j<col;j++){
    //         if(visited[i][j] === false){
    //             let result=dfsCheckCycle(graphStorageArray, i, j, visited, dfsVisited);
    //             if(result === true) return true;
    //         }
    //     }
    // }

    let resonse =await dfsPathTrack(graphStorageArray, si, sj, visited, dfsVisited);
    if(resonse === true ){
        return Promise.resolve(true);
    }
    return Promise.resolve(false);

}




async function dfsPathTrack(graphStorageArray, i, j, visited, dfsVisited){
    visited[i][j]=true;
    dfsVisited[i][j]=true;

    let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

    cell.style.backgroundColor="lightblue";
    await colorPromise();

    for( let k=0;k<graphStorageArray[i][j].length;k++){

        let [ni,nj]=graphStorageArray[i][j][k];
        if(visited[ni][nj] === false){
            let response = await dfsPathTrack(graphStorageArray, ni, nj, visited, dfsVisited);
            if(response){
                cell.style.backgroundColor="transparent";
                await colorPromise();

                return Promise.resolve(true);
            }
        }
        else if( dfsVisited[ni][nj] === true){
            let cyclicCell=document.querySelector(`.cell[rid="${ni}"][cid="${nj}"]`);
            cyclicCell.style.backgroundColor="red";
            await colorPromise();
            
            cyclicCell.style.backgroundColor="transparent";
            await colorPromise();
            cell.style.backgroundColor="transparent";

            return Promise.resolve(true);
        }

    }
    // mark unvisited dfsVisited 
    dfsVisited[i][j]=false;
    return Promise.resolve(false);

}
