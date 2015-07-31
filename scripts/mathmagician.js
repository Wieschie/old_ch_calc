var siya = document.getElementById('siya'),
morg = document.getElementById('morg'),
gold = document.getElementById('gold'),
solo = document.getElementById('solo'),
click = document.getElementById('click'),
jugg = document.getElementById('jugg');

siya.onchange = mathmagic;
siya.onkeyup = mathmagic;
$('body').on('change', '#morg_owned', morg_calc);
$('#savegame').keyup(import_save);

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
		
		result = Math.ceil((371 * Math.log(fsiya)) - 2075);
		result = Math.max(5*Math.floor(result/5+.5) - 2,0);
		$('#iris').val(!isNaN(result) ? result : '');
		
		result = Math.ceil(fsiya * 0.5);
		click.value = !isNaN(result) ? result : '';
		
		result = Math.ceil(fsiya * 0.1);
		jugg.value = !isNaN(result) ? result : '';
};

// sets the proper title and calculates values dependent on the user owning Morg
function morg_calc() {

	
	var fsiya = parseFloat(siya.value);
	if(fsiya<100)
		result = Math.ceil(Math.pow((fsiya+1),2));
	else
		result = Math.ceil(Math.pow((fsiya+22),2));
	
	
	var math = MathJax.Hub.getAllJax("morg_formula")[0];

	if ($('#morg_owned').is(':checked')) {
		$('#soul_label').html('Morgulis:');
		if(fsiya<100)
			MathJax.Hub.Queue(["Text",math,"Morgulis = (Siya+1)^2"]);
		else
			MathJax.Hub.Queue(["Text",math,"Morgulis = (Siya+22)^2"]);
	} else {
		$('#soul_label').html('Souls banked:');
		if(fsiya<100)
			MathJax.Hub.Queue(["Text",math,"Morgulis = (Siya+1)^2 * 1.1"]);
		else
			MathJax.Hub.Queue(["Text",math,"Morgulis = (Siya+22)^2 * 1.1"]);
		
		result=Math.ceil(result*1.1);
	}
	
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"morg_formula"]);
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

const ANTI_CHEAT_CODE = "Fe12NAfA3R6z4k0z";
const SALT = "af0ik392jrmt0nsfdghy0";
function import_save() {
        var txt = $('#savegame').val();
 
        if (txt.search(ANTI_CHEAT_CODE) != -1) {
                var result = txt.split(ANTI_CHEAT_CODE);
                txt = "";
                for (var i = 0; i < result[0].length; i += 2) {
                        txt += result[0][i];
                }
                if (CryptoJS.MD5(txt + SALT) != result[1]) {
                        // alert("This is not a valid Clicker Heroes savegame!");
                        return;
                }
        }
        var data = $.parseJSON(atob(txt));
 
        // If Morgulis owned, box is checked
		$('#morg_owned').prop('checked', data.ancients.ancients.hasOwnProperty(16));
		morg_calc();

 
        if(data.ancients.ancients.hasOwnProperty(5))    {
                // has Siyalatas
                siya.value = data.ancients.ancients[5].level;
				$('#base_label').html('Siyalatas:');
                mathmagic();
        }
        else if(data.ancients.ancients.hasOwnProperty(28))      {
                // has Argaiv
                siya.value = data.ancients.ancients[28].level;
				$('#base_label').html('Argaiv:');
                mathmagic();
        }
}

function show_math() {
	$('#formulas').toggle();
};

MathJax.Hub.Config({       
    "HTML-CSS": { scale: 150}    
  }); 