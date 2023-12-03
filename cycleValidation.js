// Graph storage <- 2D array 
let graphStorageArray=[];

for(let i=0;i<rows;i++){
    let graphRow=[];
    for(let j=0;j<col;j++){
        // each graphRow will have an array 
        graphRow.push([]);
    }
    graphStorageArray.push(graphRow);
}

// will check cycle in graph 
function isCyclePresent(graphStorageArray){
    // i need to create visited arrays to check for cycle 
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

    for(let i=0;i<rows;i++){
        for(let j=0;j<col;j++){
            if(visited[i][j] === false){
                let result=dfsCheckCycle(graphStorageArray, i, j, visited, dfsVisited);
                if(result === true) return true;
            }
        }
    }

    return false;

}

function dfsCheckCycle(graphStorageArray, i, j, visited, dfsVisited){
    visited[i][j]=true;
    dfsVisited[i][j]=true;

    for( let k=0;k<graphStorageArray[i][j].length;k++){

        let [ni,nj]=graphStorageArray[i][j][k];
        if(visited[ni][nj] === false){
            if( dfsCheckCycle(graphStorageArray, ni, nj, visited, dfsVisited)) return true;
        }
        else if( dfsVisited[ni][nj] === true){
            return true;
        }

    }
    // mark unvisited dfsVisited 
    dfsVisited[i][j]=false;
    return false;

}
