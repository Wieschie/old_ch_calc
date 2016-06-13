
function idle_or_hybrid_morg_calc(fsiya) {
// always assume morgulis because calc is valid.   See https://www.reddit.com/r/ClickerHeroes/comments/43yt7n/updated_simpler_rule_of_thumb_calculator/czmabq0
//    if(typeof fsiya == "undefined")
//        fsiya = parseFloat($('#idle_siya').val());

    if(fsiya==0)
        return 0;

    result = Math.ceil(Math.pow(fsiya,2));

    return !isNaN(result) ? result : '';
}

function active_morg_calc(ffrags) {
    if(ffrags==0)
        return 0;

    if(ffrags<100)
        result = Math.ceil(Math.pow((ffrags+1),2));
    else
        result = Math.ceil(Math.pow((ffrags+13),2));


    return !isNaN(result) ? result : '';
}

//idle = Libertas, Mammon, Mimzee
//hybrid = Libertas, Mammon, Mimzee
//active = Mammon, Mimzee, Pluto
function gold_calc(fsiya) {
    result = Math.ceil(fsiya * 0.926);
    return !isNaN(result) ? result : '';
}

function idle_solomon_calc(fsiya,ftp) {

    var hpscale = 1.145; //first level
    var alpha = 1.4067 * Math.log(1+ftp) / Math.log(hpscale);
    var calcSolomon = Math.ceil(Math.pow(fsiya,0.8) * Math.pow(alpha,0.4));

    var result = calcSolomon;
    if(result == 0)
    {
        //USING 0.26 FORMULA
        calcSolomon = Math.ceil(1.15*Math.pow(Math.log(3.25*Math.pow(fsiya,2)),.4)*Math.pow(fsiya,.8));
        if(fsiya<calcSolomon) 
            result = Math.ceil(fsiya);
        else
            result = calcSolomon;
    }

    return !isNaN(result) ? result : '';
}

function hybrid_solomon_calc(fsiya) {
    //see https://www.reddit.com/r/ClickerHeroes/comments/3h5al8/extending_mathematical_analysis_to_hybrid_and/
    calcSolomon = Math.ceil(1.32*Math.pow(Math.log(4.65*Math.pow(fsiya,2)),.4)*Math.pow(fsiya,.8));

    return !isNaN(calcSolomon) ? calcSolomon : '';
}

function active_solomon_calc(ffrags) {

    calcSolomon = Math.ceil(1.21*Math.pow(Math.log(3.73*Math.pow(ffrags,2)),.4)*Math.pow(ffrags,.8));

    if(ffrags<calcSolomon) 
        result = Math.ceil(ffrags);
    else 
        result = calcSolomon;

    return !isNaN(result) ? result : '';
}

function active_bhaal_calc(ffrags) {
    if(ffrags < 1000)
        result=ffrags;
    else
        result=ffrags-90;

    return !isNaN(result) ? result : '';
}

function iris_calc(fsiya,flevels) {
    result = Math.ceil((371 * Math.log(fsiya)) - 1075 - flevels);
    result = Math.max(5*Math.round(result/5) - 2,0);
    result = result >=98 ? result : 0;
    return !isNaN(result) ? result : '';
}

//hybrid bhaal, frag, pluto
function hybrid_click_calc(fsiya) {
    result = Math.ceil(fsiya * 0.5);
    return !isNaN(result) ? result : '';
}

function hybrid_jugg_calc(fsiya) {
    result = Math.ceil(Math.pow(fsiya * 0.5, 0.8));
    return !isNaN(result) ? result : '';
}

function active_jugg_calc(ffrags) {
    result = Math.ceil(Math.pow(ffrags, 0.8));
    return !isNaN(result) ? result : '';
}

