$(function(){
    $('#savegame').keyup(import_save);

    $('#idle_siya').change(idle_mathmagic);
    $('#idle_siya').keyup(idle_mathmagic);

    $('#hybrid_siya').change(hybrid_mathmagic);
    $('#hybrid_siya').keyup(hybrid_mathmagic);

    //new hybrid tab 2/16/16- show "new" until 3/16/16 then stop
    var untildate = new Date('2016-03-16'); 
    var now = new Date();
    if(now > untildate)
    {
        //It's after "end" date
        $('.hideafter').each(function(index,obj) { $(obj).hide(); });
    }
});


function idle_mathmagic() {
    var fsiya = parseFloat($('#idle_siya').val());
    
    $('#idle_morg').val(numeral(morg_calc(fsiya)).format('0,0'));
    
    $('#idle_gold').val(numeral(gold_calc(fsiya)).format('0,0'));
    
    $('#idle_solomon').val(numeral(solomon_calc(fsiya)).format('0,0'));

    $('#idle_iris').val(numeral(iris_calc(fsiya)).format('0,0'));
}

function hybrid_mathmagic() {
    var fsiya = parseFloat($('#hybrid_siya').val());
    
    $('#hybrid_morg').val(numeral(morg_calc(fsiya)).format('0,0'));
    
    $('#hybrid_gold').val(numeral(gold_calc(fsiya)).format('0,0'));
    
    $('#hybrid_solomon').val(numeral(solomon_calc(fsiya)).format('0,0'));

    $('#hybrid_iris').val(numeral(iris_calc(fsiya)).format('0,0'));
    
    $('#hybrid_click').val(numeral(click_calc(fsiya)).format('0,0'));
    
    $('#hybrid_jugg').val(numeral(jugg_calc(fsiya)).format('0,0'));
}

function mathmagic() {
    if( is_idle() )
        idle_mathmagic();
    else( is_hybrid() )
        hybrid_mathmagic();
}

function morg_calc(fsiya) {
// always assume morgulis because calc is valid.   See https://www.reddit.com/r/ClickerHeroes/comments/43yt7n/updated_simpler_rule_of_thumb_calculator/czmabq0
//    if(typeof fsiya == "undefined")
//        fsiya = parseFloat($('#idle_siya').val());

    if(fsiya==0)
        return 0;

    if(fsiya<100)
        result = Math.ceil(Math.pow((fsiya+1),2));
    else
        result = Math.ceil(Math.pow((fsiya+22),2));
    
    
    var formula;
    if( is_idle() )
    {
        formula = MathJax.Hub.getAllJax("idle_morg_formula")[0];
    }
    else if( is_hybrid() )
    {
        formula = MathJax.Hub.getAllJax("hybrid_morg_formula")[0];
    }
    
    if(formula)
    {
        if(fsiya<100)
            MathJax.Hub.Queue(["Text",formula,"Morgulis = (Siya+1)^2"]);
        else
            MathJax.Hub.Queue(["Text",formula,"Morgulis = (Siya+22)^2"]);
    }

    return !isNaN(result) ? result : '';
}

function gold_calc(fsiya) {
    result = Math.ceil(fsiya * 0.927);
    return !isNaN(result) ? result : '';
}

function solomon_calc(fsiya) {
    var idle_formula = MathJax.Hub.getAllJax("idle_solomon_formula")[0];
    var hybrid_formula = MathJax.Hub.getAllJax("hybrid_solomon_formula")[0];
    var formula; 
    if( is_idle() )
    {
        formula = idle_formula;
    }
    else if( is_hybrid() )
    {
        formula = hybrid_formula;
    }

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
        idle_mathmagic();
    } 
    else if( is_hybrid() )
    {
        var level = parseInt(hybrid_siya.value) || 0;
        level += add_levels;
        hybrid_siya.value = level;
        hybrid_mathmagic();
    } 
    else //active
    {
    }
}

function multiply_up(m) {
    if( is_idle() )
    {
        var level = parseFloat(idle_siya.value) || 0;
        level *= m;
        idle_siya.value = Math.ceil(level);
        idle_mathmagic();
    }
    else if( is_hybrid() )
    {
        var level = parseFloat(hybrid_siya.value) || 0;
        level *= m;
        hybrid_siya.value = Math.ceil(level);
        hybrid_mathmagic();
    }
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
    
    if(data.ancients.ancients.hasOwnProperty(5))    {
        // has Siyalatas
        idle_siya.value = data.ancients.ancients[5].level;
        idle_mathmagic();
        hybrid_siya.value = data.ancients.ancients[5].level;
        hybrid_mathmagic();
    }
    else if(data.ancients.ancients.hasOwnProperty(28))      {
        // has Argaiv
        idle_siya.value = data.ancients.ancients[28].level;
        idle_mathmagic();
        hybrid_siya.value = data.ancients.ancients[28].level;
        hybrid_mathmagic();
    }
}

function show_math() {

    if( is_idle() )
    {
        $('#idle_formulas').toggle();
        $('#idle_formula_button').html( $('#idle_formulas').is(':visible') ? "Hide Formulas" : "Show Formulas" );
    }
    else if( is_hybrid() )
    {
        $('#hybrid_formulas').toggle();
        $('#hybrid_formula_button').html( $('#hybrid_formulas').is(':visible') ? "Hide Formulas" : "Show Formulas" );
    }
}

