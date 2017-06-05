alert('Yey! Let\'s play coffee memo!');

var usedImg = [];
var turn = 1;
var firstImg;
var result = 20;

// creating a board and game logic
function buildBoard(height, width) {
	var domTable = document.querySelector('#board');
	var domTbody = document.createElement('tbody');
	var x, y;
	for (y = 0; y < height; y++) {
		// building a table
		var domTR = document.createElement('tr');
		domTbody.appendChild(domTR);

		for(x = 0; x < width; x++) {
			var domTD = document.createElement('td');
			// assign id to table data and insert img
			domTD.id = 'pos' + x + 'x' + y;
			var domImg = document.createElement('img');
			document.querySelector('#result').innerHTML = result;
			
			// revealing img when clicked
			domTD.addEventListener('click', function(ev){
				
			var clickedImg = this.children[0];

				if (usedImg.indexOf(clickedImg.src)>-1) {
					return;
				}
				clickedImg.style.visibility = 'visible';

				// comparing imgs if the same
				if (turn == 1) {
					firstImg = clickedImg;
					turn = 2;
				} else {
					if (firstImg.src == clickedImg.src) {
						usedImg.push(firstImg.src);
						result = result + 10;
						document.querySelector('#result').innerHTML = result;
					} else {
						result = result - 2;
						document.querySelector('#result').innerHTML = result;
						setTimeout(function(){
						firstImg.style.visibility = 'hidden';
						clickedImg.style.visibility = 'hidden';
						}, 2000);
					}
					turn = 1;
				}

				// screening result
				if (usedImg.length == 4*4/2) {
					alert('You won! Your result: ' + result);
				}
			});
			// join the table
			domTD.appendChild(domImg);
			domTR.appendChild(domTD);
		}
	}
	domTable.appendChild(domTbody);
}

// choosing random images' pairs
function chooseImg() {
	var usedImg = [];
	var imgNum;

	var x, y, domImg;

	do {

		do {
		var imgNum = Math.floor((Math.random()*15) + 1);
		} while (usedImg.indexOf(imgNum) > -1);
		
		do {
			x = Math.floor((Math.random()*4));
			y = Math.floor((Math.random()*4));

			domImg = document.querySelector('td#pos' + x + 'x' + y + ' img');
		} while (domImg.src != '');
		
		domImg.src = 'img/img' + imgNum + '.jpg'

		do {
		x = Math.floor((Math.random()*4));
		y = Math.floor((Math.random()*4));

		domImg = document.querySelector('td#pos' + x + 'x' + y + ' img');
		} while (domImg.src != '');
		domImg.src = 'img/img' + imgNum + '.jpg'

		usedImg.push(imgNum);
	} while (usedImg.length < 4*4/2);
}

buildBoard(4, 4);
chooseImg();