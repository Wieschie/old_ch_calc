var siya = document.getElementById('siya'),
morg = document.getElementById('morg'),
gold = document.getElementById('gold'),
solo = document.getElementById('solo'),
click = document.getElementById('click'),
jugg = document.getElementById('jugg');

siya.onkeyup = mathmagic;

$('body').on('change', '#morg_owned', function(){ 
  if ($(this).is(':checked')) {
    $('#soul_label').html('Morgulis:');
  } else {
	  $('#soul_label').html('Souls banked:');
  }
  morg_calc();
});

function mathmagic() {
	var fsiya = parseFloat(siya.value);
		
		morg_calc();
	
		result = Math.ceil(fsiya * 0.93)
		gold.value = !isNaN(result) ? result : '';
		
		if(fsiya<=693)
			result=Math.ceil(fsiya*.9);
		else
			// https://www.reddit.com/r/ClickerHeroes/comments/3823wt/mathematical_analysis_of_lategame_for_most_idle/
			result=Math.ceil(1.15*Math.pow(Math.log(3.25*Math.pow(fsiya,2)),.4)*Math.pow(fsiya,.8));
		solo.value = !isNaN(result) ? result : '';
		
		result = Math.ceil(fsiya * 0.5)
		click.value = !isNaN(result) ? result : '';
		
		result = Math.ceil(fsiya * 0.1)
		jugg.value = !isNaN(result) ? result : '';
};

function morg_calc() {
	var fsiya = parseFloat(siya.value);
	if(fsiya<100)
			result = Math.ceil(Math.pow((fsiya+1),2));
		else
			result = Math.ceil(Math.pow((fsiya+22),2));
		if($('#morg_owned').is(':checked'))
			void(0);
		else
			result=Math.ceil(result*1.1);
		morg.value = !isNaN(result) ? result : '';
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

