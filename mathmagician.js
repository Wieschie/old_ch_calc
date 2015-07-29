var siya = document.getElementById('siya'),
bank = document.getElementById('bank'),
morg = document.getElementById('morg'),
gold = document.getElementById('gold'),
solo = document.getElementById('solo');

siya.onkeyup = mathmagic

function mathmagic() {
	var fsiya = parseFloat(siya.value);
	
		var result = Math.ceil(Math.pow((fsiya+1),2) * 1.1);
		bank.value = !isNaN(result) ? result : '';
	
		result = Math.ceil(Math.pow((fsiya+1),2));
		morg.value = !isNaN(result) ? result : '';
	
		result = Math.ceil(fsiya * 0.93)
		gold.value = !isNaN(result) ? result : '';
		if(fsiya<=693)
			result=fsiya*.9;
		else
			// https://www.reddit.com/r/ClickerHeroes/comments/3823wt/mathematical_analysis_of_lategame_for_most_idle/
			result=Math.ceil(1.15*Math.pow(Math.log(3.25*Math.pow(fsiya,2)),.4)*Math.pow(fsiya,.8));
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