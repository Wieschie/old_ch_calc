$('#idle_siya').change(function(){
    mathmagic();
});

$('#idle_siya').keyup(function(){
    mathmagic();
});    

$('#savegame').keyup(import_save);


function mathmagic(fsiya) {
    if(typeof fsiya == "undefined")
        fsiya = parseFloat($('#idle_siya').val());
    
    $('#idle_morg').val(numeral(morg_calc(fsiya)).format('0,0'));
    
    $('#idle_gold').val(numeral(gold_calc(fsiya)).format('0,0'));
    
    $('#idle_solomon').val(numeral(solomon_calc(fsiya)).format('0,0'));

    $('#idle_iris').val(numeral(iris_calc(fsiya)).format('0,0'));
    
    $('#idle_click').val(numeral(click_calc(fsiya)).format('0,0'));
    
    $('#idle_jugg').val(numeral(jugg_calc(fsiya)).format('0,0'));
}

function morg_calc(fsiya) {
// always assume morgulis because calc is valid.   See https://www.reddit.com/r/ClickerHeroes/comments/43yt7n/updated_simpler_rule_of_thumb_calculator/czmabq0
    if(typeof fsiya == "undefined")
        fsiya = parseFloat($('#idle_siya').val());

    if(fsiya==0)
        return 0;

    if(fsiya<100)
        result = Math.ceil(Math.pow((fsiya+1),2));
    else
        result = Math.ceil(Math.pow((fsiya+22),2));
    
    
    var math = MathJax.Hub.getAllJax("morg_formula")[0];

    if(fsiya<100)
        MathJax.Hub.Queue(["Text",math,"Morgulis = (Siya+1)^2"]);
    else
        MathJax.Hub.Queue(["Text",math,"Morgulis = (Siya+22)^2"]);

    return !isNaN(result) ? result : '';
}

function gold_calc(fsiya) {
    result = Math.ceil(fsiya * 0.927);
    return !isNaN(result) ? result : '';
}

function solomon_calc(fsiya) {
    var formula = MathJax.Hub.getAllJax("solomon_formula")[0];


    calcSolomon = Math.ceil(1.15*Math.pow(Math.log(3.25*Math.pow(fsiya,2)),.4)*Math.pow(fsiya,.8));

    if(fsiya<calcSolomon) {
        result = Math.ceil(fsiya);
        MathJax.Hub.Queue(["Text",formula,"Solomon = Siyalatas"])
    }
    else {
        result = calcSolomon;
        MathJax.Hub.Queue(["Text",formula,"Solomon = 1.15 * \ln{(3.25 * Siya^2)}^{0.4} * Siya^{0.8}"]);
    }
    
    return !isNaN(result) ? result : '';
}

function iris_calc(fsiya) {
    result = Math.ceil((371 * Math.log(fsiya)) - 2075);
    result = Math.max(5*Math.round(result/5) - 2,0);
    result = result >=98 ? result : 0;
    return !isNaN(result) ? result : '';
}

function click_calc(fsiya) {
    result = Math.ceil(fsiya * 0.5);
    return !isNaN(result) ? result : '';
}

function jugg_calc(fsiya) {
    result = Math.ceil(Math.pow(fsiya * 0.5, 0.8));
    return !isNaN(result) ? result : '';
}

function is_idle() {
    var accordion_visible_index =  $( "#accordion" ).accordion( "option", "active" );
    return accordion_visible_index == 0;
}

function is_hybrid() {
    var accordion_visible_index =  $( "#accordion" ).accordion( "option", "active" );
    return accordion_visible_index == 1;
}

function is_active() {
    var accordion_visible_index =  $( "#accordion" ).accordion( "option", "active" );
    return accordion_visible_index == 2;
}

function level_up(add_levels) {
    if( is_idle() )
    {
        var level = parseInt(idle_siya.value) || 0;
        level += add_levels;
        idle_siya.value = level;
        mathmagic();
    } 
    else if( is_hybrid() )
    {
    } 
    else //active
    {
    }
}

function multiply_up(m) {
    var level = parseFloat(siya.value) || 0;
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
 
    $('#morg').val(morg_calc());

 
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

    $('#idle_formulas').toggle();
    $('#formula_button').html( $('#idle_formulas').is(':visible') ? "Hide Formulas" : "Show Formulas" );
}

