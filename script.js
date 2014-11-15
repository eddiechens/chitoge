$(function(){
	//init background
	$('body').css('background','url("src/background.png")');

	//init the framwork	
	var image_width = 240, image_height = 135;
	var num_row = 4;
	var num_col = num_row;
	var img_elements = [];
	var run_check = false;
	var first_card = 0;
	var click_addr = 0;
	var click_valid = 1;
	var $card1 = null;
	var $card2 = null;
	var $choose1 = null;
	var $choose2 = null;
	var card_state = new Array(num_row*num_col);
	var score = 0;
	var count = 0;

	//debug button
	$('#debug').click(function(){
		alert(img_elements+ "run="+run_check);
		});

	//initialize click method
	function initializeImage($img, row, col) {
		$img.click(function() {
				var offset = row * num_col;
				if(click_valid && (card_state[offset+col]==0)){
				$(this).addClass('element_click');
				$(this).attr('src' , 'src/image'+img_elements[offset+col]+'.jpg');

				if(first_card){
				secondCardClick(offset+col,$(this));

				}else{ 
				firstCardClick(offset+col,$(this));
				}
				}
				});
		$img.width(image_width).height(image_height);
	}

	//function announce
	function answer_wrong(index){
		count++;
		setTimeout(function(){
				first_card = 0;
				click_valid = 1;
				card_state[index]=1;
				},200);
	}
	function answer_correct(index){
			setTimeout(function() {
					first_card = 0;
					click_valid = 1;
					$card1.removeClass('element_click').addClass('element');
					$card1.attr('src','');
					$card2.removeClass('element_click').addClass('element');
					$card2.attr('src','');
					card_state[index]=0;
					card_state[click_addr]=0;
					}, 1000);
	}
	function check_result(index){
		if($choose1 != $choose2){
			answer_correct(index);
		}else{
			answer_wrong(index);
		}
		if(count >= (num_row*num_col)/2){check_end();}	
	}
	function secondCardClick(index,$img){
		$choose2 = img_elements[index];
		$card2 = $img;
		click_valid = 0;
		score++;
		$('#count').text(score);
		//check result//
		check_result(index);
	}

	function firstCardClick(index,$img){
		$choose1 = img_elements[index];
		$card1 = $img;
		setTimeout(function(){
				first_card = 1;
				card_state[index]=1;
				click_addr = index;
				},200);
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function createRandomArray(size){
		for(var i=0;i<size/2;i++){
			img_elements.push(i);
			img_elements.push(i);
		}
		for(var j=0;j<size;j++){
			var tmp = 0;	
			var target = getRandomInt(j,size-1);
			tmp = img_elements[target];
			img_elements[target] = img_elements[j];
			img_elements[j] = tmp;
		}
	}

	function initCardState(){
		for(var x =0;x<card_state.length;x++){card_state[x]=0;}	
	}

	function check_end(){
		if(count == score){
			$('#rank').text('你的分數是 : SS');
		}else if(score <= count+num_col){
			$('#rank').text('你的分數是 : S');
		}else if(score <= count+num_col*3){
			$('#rank').text('你的分數是 : A');
		}else if(score <= count+num_col*5){
			$('#rank').text('你的分數是 : B');
		}else{
			$('#rank').text('你的分數是 : C');
		}
	}


	//initialize image location
	createRandomArray(num_row*num_col);
	initCardState();
	$('#count').text(score);

	//put the card table
	var $container = $('#container');
	for(var row=0;row<num_row;row++){
		for(var col=0;col<num_col;col++){
			var $img = $('<img class="element"></img>');

			//record image location from row and col
			initializeImage($img, row, col);

			$container.append($img);
		}
	}
	$container.width(image_width * num_col).height(image_height * num_row);

	//listening click
	$('.button').click(function(){
			$('.element_click').attr('src','');
			$('.element_click').removeClass('element_click').add('element');;	
			createRandomArray(num_row*num_col);
			initCardState();
			score = 0;
			count = 0;
			first_card=0;
			$('#count').text(score);
			$('#rank').text('');
			});

	function enlarge($img){
		$img.animate({
width: '+=10px',
height: '+=10px'
},800,function(){unlarge($img)});
}
function unlarge($img){
	$img.animate({
width: '-=10px',
height: '-=10px'
},800,function(){enlarge($img)});
}
setTimeout(function(){
		enlarge($('.button'));
		},1000);
});

