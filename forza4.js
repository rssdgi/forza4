// jQuery methods go here...
// init board
var board={
    sizeCols:7,
    sizeRows:6,
    buttonHtml:"<td><button type='button'></button></td>",
    baseColor:"",
    playersColor:["red","yellow"],
    initBoard(){
        // draw the board with size predefined
        var table=$("#tableID");
        var j,i,id=0;
        for (j=0;j<this.sizeRows;j++){
            //console.log("Appending row");
            $("<tr></tr>").appendTo($(table));
            for(i=0;i<this.sizeCols;i++){
                id++;
                //console.log("Appending col with id"+id);
                var tr=$("tr:last");
                $(this.buttonHtml).appendTo(tr);
                $("button:last").attr({
                    id: id.toString(),
                    col: (i+1),
                });
            }
        }
        // create Buttons objs
        this.initButtons();
    },
    initButtons(){
        // return buttons objs after initBoard
        this.buttons=$("button");
        this.buttons.on('click', this.playGame);
    },
    playGame(){
        //do something
        var selectedCol=$(this).attr('col');
        console.log("clicked on row "+$(this).attr('id')+" col "+selectedCol);
        // get all elements of the clicked column $("[col=4]").length
        board.putDisk(selectedCol);
    },
    putDisk(selectedCol){
        // input is the array of buttons with col=clicked col
        var colButtons=$("[col="+selectedCol+"]"); 
        var colFull=true;
        for (var i=colButtons.length-1;i>=0;i--){
            //console.log("Selected col elements #id "+colButtons[i].getAttribute('id'));
            // colButtons.get(0).style.backgroundColor="red"
            if(colButtons[i].style.backgroundColor==this.baseColor){
                colButtons[i].style.backgroundColor=this.playersColor[players.whoPlays];
                if (i!=0){
                    colFull=false;
                }
                break;
             }
        }
        if (colFull){
            // disable col events
            colButtons.off("click");
        }
        players.whoPlays=(players.whoPlays==0) ? 1:0;
        this.checkHorizontal();
        this.checkVertical();
    },
    checkHorizontal(){
        // check if on any row there are 4 subsequent colors
        // get board
        var localBoard=$('button');
        var id=-1;
        // if any of these variable reaches 4 means there is a winner
        var howManyColored=[0,0]; 
        var lookForColor,colore=0;// 0=red 1=yellow - start luking for red
        var winnerfound=false;
        for(var row=0;row<this.sizeRows;row++){
            for(var col=0;col<this.sizeCols;col++){
                id++;
                // if button is grey then next loop
                //console.log("Checking horizontal on id "+id);
                if(localBoard[id].style.backgroundColor==this.baseColor){
                    howManyColored=[0,0];
                    //console.log("Empy fish with id "+id);
                    continue;
                } 
                // di che colore è la pedina
                colore=this.colorePedina(localBoard[id].style.backgroundColor);
                // se il colore della pedina è quello che sto già cercando
                // incrementa il contatore del colore ed azzera il contatore dell'altro colore
                if (colore==lookForColor){
                    howManyColored[lookForColor]++;
                    howManyColored[((lookForColor==0) ? 1:0)]=0;
                    //console.log("looking for colore "+lookForColor+" at row "+row+" col "+col+" pedine trovate "+howManyColored[lookForColor]);
                } else{
                    // il colore è diverso da quello che sto cercando
                    // comincio a cercare il nuovo colore 
                    lookForColor=colore;
                    // aumento il contatore di questo colore
                    howManyColored[lookForColor]++;
                    // azzero il contatore dell'altro colore
                    howManyColored[((lookForColor==0) ? 1:0)]=0;
                    //console.log("looking for colore "+lookForColor+" at row "+row+" col "+col+" pedine trovate "+howManyColored[lookForColor]);
                }
                // check if winner
                if (howManyColored[0]>3 || howManyColored[1]>3){
                    winnerfound=true;
                    break;
                }
            }
            if (winnerfound) {
                players.evidenceWinner(lookForColor);
                break;
            } else {
                howManyColored=[0,0];
            }
        }
    },
    checkVertical(){
        // trova corrispondenza sull colonne verticali di 4 pedina seguenti dello stesso colore
        var localBoard=$('button');
        var id=0;
        var howManyColored=[0,0]; 
        var lookForColor,colore=0;// 0=red 1=yellow - start luking for red
        var winnerfound=false;
        for(var col=0;col<board.sizeCols;col++){
            //console.log("Scanning column "+col);
            for (var row=0;row<localBoard.length;row=row+board.sizeCols){
                id=col+row;
                //console.log("id pedine "+id);
                // if button is grey then next loop
                if(localBoard[id].style.backgroundColor==this.baseColor){
                    howManyColored=[0,0];
                    //console.log("Empy fish with id "+id);
                    continue;
                }
                // di che colore è la pedina
                colore=this.colorePedina(localBoard[id].style.backgroundColor);
                // se il colore della pedina è quello che sto già cercando
                // incrementa il contatore del colore ed azzera il contatore dell'altro colore
                if (colore==lookForColor){
                    howManyColored[lookForColor]++;
                    howManyColored[((lookForColor==0) ? 1:0)]=0;
                    //console.log("looking for colore "+lookForColor+" at row "+row+" col "+col+" pedine trovate "+howManyColored[lookForColor]);
                } else{
                    // il colore è diverso da quello che sto cercando
                    // comincio a cercare il nuovo colore 
                    lookForColor=colore;
                    // aumento il contatore di questo colore
                    howManyColored[lookForColor]++;
                    // azzero il contatore dell'altro colore
                    howManyColored[((lookForColor==0) ? 1:0)]=0;
                    //console.log("looking for colore "+lookForColor+" at row "+row+" col "+col+" pedine trovate "+howManyColored[lookForColor]);
                } 
                 // check if winner
                 if (howManyColored[0]>3 || howManyColored[1]>3){
                    winnerfound=true;
                    break;
                }
            }
            id=0;
            if (winnerfound) {
                players.evidenceWinner(lookForColor);
                break;
            } else {
                howManyColored=[0,0];
            }
        }
    },
    colorePedina(colore){
        // ritorna 0 se il colore della pedina è rossa
        // 1 se gialla
        if (colore==this.playersColor[0]){
            return 0;
        } else {
            return 1;
        }
    }
};    

var players={
    name:[],
    whoPlays:0,
    evidenceWinner(colore){
        $("h1:last").text(board.playersColor[colore]+" is the WINNER !!");
        // remove all events
        var buttons=$("button");
        buttons.off('click');
    }
}

$(document).ready(function() {
    console.log("Starting");
    board.initBoard();
});

