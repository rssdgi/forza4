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
        var id=-1;
        for (j=0;j<this.sizeRows;j++){
            //console.log("Appending row");
            $("<tr></tr>").appendTo($(table));
            for(i=0;i<this.sizeCols;i++){
                id++;
                //console.log("Appending col with id"+id);
                var tr=$("tr:last");
                $(this.buttonHtml).appendTo(tr);
                $("button:last").attr({
                    id: (id),
                    row: (j),
                    col: (i),
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
        console.log("clicked on row "+$(this).attr('row')+" col "+$(this).attr('col')+" id "+$(this).attr('id'));
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
        this.checkDiagonal();
    },
    checkHorizontal(){
        // check if on any row there are 4 subsequent colors
        // for each row get buttons
        for(var row=0;row<this.sizeRows;row++){
            // checkSequence ritorna red|yellow se trova 4 pedine  in squenza 
            winningColor=this.baseColor;
            var buttonsInRow=$("[row="+row+"]");
            for (var col=0;col<this.sizeCols-4+1;col++){
                if (buttonsInRow[col].style.backgroundColor==this.baseColor){
                    continue;
                } else {
                    // there is a color. Check se 4 pedine seguenti sono dello stesso colore
                    if (buttonsInRow[col].style.backgroundColor==buttonsInRow[col+1].style.backgroundColor &&
                    buttonsInRow[col+1].style.backgroundColor==buttonsInRow[col+2].style.backgroundColor &&
                    buttonsInRow[col+2].style.backgroundColor==buttonsInRow[col+3].style.backgroundColor ) {
                        winningColor= buttonsInRow[col].style.backgroundColor;
                }
            }
        }
        if (winningColor=="red" || winningColor=="yellow") {
                players.evidenceWinner(winningColor);
                break;
            }
        }
    },
   
    checkVertical(){
        // trova corrispondenza sull colonne verticali di 4 pedina seguenti dello stesso colore
        for (var col=0;col<this.sizeCols;col++){
            // checkSequence ritorna red|yellow se trova 4 pedine  in swquenza verticale
            winningColor=this.baseColor;
            var buttonsInCol=$("[col="+col+"]");
            for (var i=0;i<this.sizeRows-4+1;i++){
                if (buttonsInCol[i].style.backgroundColor==this.baseColor){
                    continue;
                } else {
                    if (buttonsInCol[i].style.backgroundColor==buttonsInCol[i+1].style.backgroundColor &&
                    buttonsInCol[i+1].style.backgroundColor==buttonsInCol[i+2].style.backgroundColor &&
                    buttonsInCol[i+2].style.backgroundColor==buttonsInCol[i+3].style.backgroundColor ) {
                        winningColor= buttonsInCol[i].style.backgroundColor;
                    }
                }
            }
            if (winningColor=="red" || winningColor=="yellow") {
                players.evidenceWinner(winningColor);
                break;
            }
        }
    },
    checkDiagonal(){
        // check if there is a sequence in each diagonal
        winningColor=this.baseColor;
        for (var i=0;i<this.sizeCols*this.sizeRows;i++){
            var startingButton=$("[id="+i+"]");
            var row=startingButton.attr("row");
            var col=startingButton.attr("col");
            if (row<=this.sizeRows-4 && col<=this.sizeCols-4){
                //console.log("call checkDownRight with param "+row+" "+col);
                winningColor=this.checkDownRight(row,col);
            }
            if (row<=this.sizeRows-4 && col>=this.sizeCols-4){
                winningColor=this.checkDownLeft(row,col);
            }
            /*
            if (row>this.sizeRows-4 && col>=this.sizeCols-4){
                winningColor=this.checkUpLeft(row,col);
            }
            
            if (row>this.sizeRows-4 && col<=this.sizeCols-4){
                winningColor=checkUpRight(row,col);
            }*/
            if (winningColor=="red" || winningColor=="yellow") {
                players.evidenceWinner(winningColor);
                break;
            }
        }
    },
    checkDownRight(row,col){
        var id=parseInt(row)*this.sizeCols+parseInt(col);
        var step=this.sizeCols+1;
        //console.log("check down right row "+row+" col "+col+"#id "+id );
        if (this.buttons[id].style.backgroundColor==this.baseColor){
            return this.baseColor;
        } else {
            if (this.buttons[id].style.backgroundColor==this.buttons[id+step].style.backgroundColor &&
                this.buttons[id+step].style.backgroundColor==this.buttons[id+step*2].style.backgroundColor &&
                this.buttons[id+step*2].style.backgroundColor==this.buttons[id+step*3].style.backgroundColor){
                    console.log(" inside check diagonale id finale "+id);
                    return this.buttons[id].style.backgroundColor;
                }
            }
            return this.baseColor;
    },
    checkDownLeft(row,col){
        var id=parseInt(row)*this.sizeCols+parseInt(col);
        var step=this.sizeCols-1;
        //console.log("check down left row "+row+" col "+col+"#id "+id );
        if (this.buttons[id].style.backgroundColor==this.baseColor){
            return this.baseColor;
        } else {
            if (this.buttons[id].style.backgroundColor==this.buttons[id+step].style.backgroundColor &&
                this.buttons[id+step].style.backgroundColor==this.buttons[id+step*2].style.backgroundColor &&
                this.buttons[id+step*2].style.backgroundColor==this.buttons[id+step*3].style.backgroundColor){
                    console.log(" inside check diagonale id finale "+id);
                    return this.buttons[id].style.backgroundColor;
                }
            }
            return this.baseColor;
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
        $("h1:last").text(colore+" is the WINNER !!");
        // remove all events
        var buttons=$("button");
        buttons.off('click');
    }
}

$(document).ready(function() {
    console.log("Starting");
    board.initBoard();
});

