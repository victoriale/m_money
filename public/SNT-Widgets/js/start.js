var offset=0;
$(function () {
  $.get("http://apireal.synapsys.us/listhuv/?action=list_of_lists", function(lists){

    var offset = Math.floor((Math.random() * 9) + 1);
    var method = lists['available_lists'][offset]['method'];
    var name = lists['available_lists'][offset]['name'];
    $("#title_text").html(name);
    resizetext()
    listCall(method, offset);
    $('.re_w_list-content-button').on('click', function() {
      offset++;
      if(offset == 10){
        offset = 0;
        var method = lists['available_lists'][offset]['method'];
        var name = lists['available_lists'][offset]['name'];
        $("#title_text").html(name);
        resizetext()
      	listCall(method, offset);
      }else{
        var method = lists['available_lists'][offset]['method'];
        var name = lists['available_lists'][offset]['name'];
        $("#title_text").html(name);
        resizetext()
      	listCall(method, offset);
      }
    	});
  });
});

function listCall(method, offset){
  $.get("http://apireal.synapsys.us/listhuv/?action="+method+"", function(data){

    var random = randomimage();
    $(".re_w_list-content-image").css("background-image","url('"+random[offset]+"')");
    $(".re_w_list-location-text").html(data[0]['city'] +", "+ fullstate(data[0]['state']));
    $(".re_w_list-content-textarea-t1").html(data[0]['total_count']);
    $(".re_w_list-listbutton-link").attr('href',"http://www.joyfulhome.com/list/"+method+"/"+data[0]['state']+"");
    $("#location_link").attr('href',"http://www.joyfulhome.com/location/"+data[0]['city'] + "_" +data[0]['state'] +"");
  });
}

//add commas to numbers to look readable
NumberToCommaNumber = function(Number) {
  return Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//makes all first letters of every word uppercase
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

//make sure title stays correct size to fit div
function resizetext(){
  $('#title_text').css('font-size', '24px');
  var maxsize= ($('.re_w_list-title').width());
  var currentsize= $('#title_text').width();
  while(currentsize > maxsize){
    //MUST HAVE BELOW otherwise infinite loops will happen
    currentsize= $('#title_text').width();
    var size = parseFloat($("#title_text").css("font-size"));
    size -= 1;
    $('#title_text').css('font-size', size + 'px');
  }
}

//random images
function randomimage(){
  var image_array = new Array();
  image_array['0'] = 'file:///C:/Users/Larry/Desktop/Widgets/css/public/re_w_list_stock/Mosaic_Grid.png';
  image_array['1'] = 'file:///C:/Users/Larry/Desktop/Widgets/css/public/re_w_list_stock/Mosaic_Grid2.png';
  image_array['2'] = 'file:///C:/Users/Larry/Desktop/Widgets/css/public/re_w_list_stock/Mosaic_Grid3.png';
  image_array['3'] = 'file:///C:/Users/Larry/Desktop/Widgets/css/public/re_w_list_stock/Mosaic_Grid4.png';
  image_array['4'] = 'file:///C:/Users/Larry/Desktop/Widgets/css/public/re_w_list_stock/Mosaic_Grid5.png';
  image_array['5'] = 'file:///C:/Users/Larry/Desktop/Widgets/css/public/re_w_list_stock/Mosaic_Grid6.png';
  image_array['6'] = 'file:///C:/Users/Larry/Desktop/Widgets/css/public/re_w_list_stock/Mosaic_Grid7.png';
  image_array['7'] = 'file:///C:/Users/Larry/Desktop/Widgets/css/public/re_w_list_stock/Mosaic_Grid8.png';
  image_array['8'] = 'file:///C:/Users/Larry/Desktop/Widgets/css/public/re_w_list_stock/Mosaic_Grid9.png';
  image_array['9'] = 'file:///C:/Users/Larry/Desktop/Widgets/css/public/re_w_list_stock/Mosaic_Grid10.png';
  return image_array;
}

//return ads
function ad(){
  var ad_array = new Array();
  ad_array['0'] = 'file:///C:/Users/Larry/Desktop/Widgets/css/public/re_w_list_stock/AudiAd.png';
  ad_array['1'] = 'file:///C:/Users/Larry/Desktop/Widgets/css/public/re_w_list_stock/AudiAd#2.png';
  ad_array['2'] = 'file:///C:/Users/Larry/Desktop/Widgets/css/public/re_w_list_stock/RolexAd.png';
  return ad_array;
}

//convert all state abbr to full
function fullstate(state){
  var stateName = {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DC: 'District of Columbia',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Lousiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    ON: 'Ontario',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    PR: 'Peurto Rico',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming'
  }
  return stateName[state];
}
