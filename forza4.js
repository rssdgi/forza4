// jQuery methods go here...
// init board
var board={
    sizeCols:7,
    sizeRows:6,
    buttonHtml:"<td><button type='button'></button></td>",
    initBoard(){
        // draw the board with size predefined
        var table=$("#tableID");
        var j,i,id=0;
        for (j=0;j<this.sizeRows;j++){
            console.log("Appending row");
            $("<tr></tr>").appendTo($(table));
            for(i=0;i<this.sizeCols;i++){
                id++;
                console.log("Appending col with id"+id);
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
        console.log("obj color is "+board.rgb2hex($(this).css('background-color')));
        // get all elements of the clicked column $("[col=4]").length
        board.colButtons=$("[col="+selectedCol+"]"); 
        board.putDisk(board.colButtons);
    },
    rgb2hex(rgb) {
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*\d+\.*\d+)?\)$/);
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    },
    putDisk(colButtons){
        // input is the array of buttons with col=clicked col
        for (var i=0;i<colButtons.length;i++){
            console.log("Selected col elements #id "+colButtons[i].getAttribute('id'));
        }
    }

};    
$(document).ready(function() {
    console.log("Starting");
    board.initBoard();
});

