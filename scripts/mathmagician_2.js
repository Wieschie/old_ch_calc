$('#siya').change(function(){
	mathmagic();
});
$('#siya').keyup(function(){
	mathmagic();
});	

$('#morg_owned').change(function(){
	morg_calc();
}); 

$('#savegame').keyup(import_save);


function mathmagic(fsiya) {
	if(typeof fsiya == "undefined")
		fsiya = parseFloat($('#siya').val());
	
	morg_calc(fsiya);

	result = gold_calc(fsiya);
	$('#gold').val(!isNaN(result) ? result : '');
	
	result = solo_calc(fsiya);
	$('#solo').val(!isNaN(result) ? result : '');
	
	result = iris_calc(fsiya);
	$('#iris').val(!isNaN(result) ? result : '');
	
	result = click_calc(fsiya);
	$('#click').val(!isNaN(result) ? result : '');
	
	result = jugg_calc(fsiya);
	$('#jugg').val(!isNaN(result) ? result : '');
}

// sets the proper title and calculates values dependent on the user owning Morg
function morg_calc(fsiya) {
	if(typeof fsiya == "undefined")
		fsiya = parseFloat($('#siya').val());
	
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
	$('#morg').val(!isNaN(result) ? result : '');
	
}

function gold_calc(fsiya) {
	return Math.ceil(fsiya * 0.93);
}

function solo_calc(fsiya) {
	if(fsiya<=693)
		return Math.ceil(fsiya*.9);
	
	else
		// https://www.reddit.com/r/ClickerHeroes/comments/3823wt/mathematical_analysis_of_lategame_for_most_idle/
		return Math.ceil(1.15*Math.pow(Math.log(3.25*Math.pow(fsiya,2)),.4)*Math.pow(fsiya,.8));
}

function iris_calc(fsiya) {
	var iris = Math.ceil((371 * Math.log(fsiya)) - 2075);
	return Math.max(5*Math.round(iris/5) - 2,0);
}

function click_calc(fsiya) {
	return Math.ceil(fsiya * 0.5);
}

function jugg_calc(fsiya) {
	return Math.ceil(fsiya * 0.1);
}

function level_siya(add_levels) {
	var level = parseInt(siya.value);
	level += add_levels;
	siya.value = level;
	mathmagic();
}

function mult_siya(m) {
	var level = parseFloat(siya.value);
	level *= m;
	siya.value = Math.ceil(level);
	mathmagic();
}


//decodes the savegame, and sets checkbox based on status of Morg.  Also sets argaiv/siyalatas, but I might remove that.
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
		morg_calc(parseFloat($('#siya').val()));

 
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
}
