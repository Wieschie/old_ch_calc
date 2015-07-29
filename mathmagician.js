var siya = document.getElementById('siya'),
bank = document.getElementById('bank'),
morg = document.getElementById('morg'),
gold = document.getElementById('gold'),
solo = document.getElementById('solo');

var constantNumber = 2;

siya.onkeyup = mathmagic

function mathmagic() {
	var fsiya = parseFloat(siya.value);
		var solo_mult=.75;
	
		var result = Math.ceil(Math.pow((fsiya+22),2) * 1.1);
		bank.value = !isNaN(result) ? result : '';
	
		result = Math.ceil(Math.pow((fsiya+22),2));
		morg.value = !isNaN(result) ? result : '';
	
		result = Math.ceil(fsiya * 0.93)
		gold.value = !isNaN(result) ? result : '';
	
		result=Math.ceil(fsiya*solo_mult);
		solo.value = !isNaN(result) ? result : '';
};

function level_siya(add_levels) {
	var level = parseInt(siya.value);
	level += add_levels;
	siya.value = level;
	mathmagic();
};

function mult_siya(m) {
	var level = parseFloat(siya.value);
	level *= m;
	siya.value = Math.ceil(level);
	mathmagic();
};