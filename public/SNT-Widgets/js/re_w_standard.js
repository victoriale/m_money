var offset=0;
var domain = '';
var clickyId = 0;
var remnant = '';
var locName = '';
var city = '';
var state = '';
var loc = '';
var max = 10;
var bord = false;

$(function () {

  var temp = location.search;
  var query = {};

  if(temp != null){
  	query = JSON.parse(decodeURIComponent(temp.substr(1)));

  	//set the query data from database to global variable to use
  	domain = query.dom;

  	remnant = query.remn;

  	clickyId = query.c_id;

  	locName = query['loc']['loc_name'];

  	locName = locName.replace('+',' ');

  	city = query['loc']['loc_id']['city'];

  	state = query['loc']['loc_id']['state'];

    //returns string true or false
  	bord = query.bord;

  }

  if(bord == 'true'){
    $(".re_w_list").css({'border-right':'1px solid #ccc','border-bottom':'1px solid #ccc','border-left':'1px solid #ccc'});
  }

	var script_tag = document.createElement('script');
	script_tag.setAttribute('src','//static.getclicky.com/js');
	document.head.appendChild(script_tag);
	var clicks = $('<script>try{ clicky.init('+clickyId+'); }catch(e){}</script>');
	document.head.appendChild(clicks[0]);

  //make an inital api call to get lists of all the list for real estate
  $.get("http://apireal.synapsys.us/listhuv/?action=list_of_lists", function(lists){
    offset = Math.floor((Math.random() * 9) + 1);
    var method = lists['available_lists'];;
	  var name = method[offset]['name'];
    $("#title_text").html(name);
    resizetext();
    listCall(method, offset);
    $('.re_w_list-content-button').on('click', function() {
			//checks if the list has reach its max and restarts the list at 0
      offset++;
      if(offset == max){
        offset = 0;
      	listCall(method, offset);
      }else{
      	listCall(method, offset);
      }
    	});
  });
});

function listCall(method, count){
	offset = count;

  //determine if the site is a remnant or not
	if(remnant == 'true'){
    //even if remnant possibility of no city or state detected and will run get remote address.
    //should only happen if new partners and no city and/or state has been entered into collection
    if(remnant && (city == '' || city == null || state == '' || state == null)){
  		$.get("http://apireal.synapsys.us/listhuv/?action=get_remote_addr2",function(r_data){
        //will change the title text and resize using resizetext() function
        var name = method[offset]['name'];
				$("#title_text").html(name);
        resizetext();

        //remnant without a city or state provided
  			state = r_data[0]['state'];
  			city = r_data[0]['city'];
  			var r_locName = city + ', ' + state;
  			var r_link = method[offset]['method'];
        r_locName = r_locName.replace('+',' ');
  			$(".re_w_list-location-text").html(r_locName);
  			$(".re_w_list-listbutton-link").attr('href',"http://www.joyfulhome.com/list/"+r_link+"/"+state+"/"+city);
  			//go to location page for remnant site
  			$("#location_link").attr('href',"http://www.joyfulhome.com/location/"+city + "_" +state +"");
  			$(".re_w_list-listbutton-icon").css("background-image","url('http://www.myhousekit.com/public/myhousekit_house_clear.png')");
  			//displays information on the widget
  			$.get("http://apireal.synapsys.us/listhuv/?action="+method[count]['method']+"&locs="+city+','+state, function(r_data){
  				$(".re_w_list-content-textarea-t1").html(r_data[0]['total_count']);
  			});
  		});
    }else{
      //will change the title text and resize using resizetext() function
      var name = method[offset]['name'];
      $("#title_text").html(name);
      resizetext();

      //remnant stuff
      var r_state = state;
      var r_city = city;
      var r_locName = r_city + ', ' + r_state;
      var r_link = method[offset]['method'];
      r_locName = r_locName.replace('+',' ');
      $(".re_w_list-location-text").html(r_locName);
      $(".re_w_list-listbutton-link").attr('href',"http://www.joyfulhome.com/list/"+r_link+"/"+r_state+"/"+r_city);
      //go to location page for remnant site
      $("#location_link").attr('href',"http://www.joyfulhome.com/location/"+r_city + "_" +r_state +"");
      $(".re_w_list-listbutton-icon").css("background-image","url('http://www.myhousekit.com/public/myhousekit_house_clear.png')");
      //displays information on the widget
      $.get("http://apireal.synapsys.us/listhuv/?action="+method[count]['method']+"&locs="+r_city+','+r_state, function(r_data){
        $(".re_w_list-content-textarea-t1").html(r_data[0]['total_count']);
      });
    }//end if
	} else{
		$.get("http://apireal.synapsys.us/listhuv/?action="+method[count]['method']+"&partner_domain="+ domain, function(data){
		//checks if the list exist or has reach its max and restarts the list at 0
		if(typeof data[0] == 'undefined'){
			offset++;
			if(offset >= max){
				offset = 0;
				listCall(method, offset);
			}else{
				listCall(method, offset);
			}
		}else{
        //will change the title text and resize using resizetext() function
        var name = method[offset]['name'];
        $("#title_text").html(name);
        resizetext();
        var p_domain = domain+"/";

				var link = method[offset]['method'];
				//displays information on the widget
				$(".re_w_list-content-textarea-t1").html(data[0]['total_count']);
				var random = randomimage();
				$(".re_w_list-content-image").css("background-image","url('"+random[offset]+"')");
				//replace widget location name with name given name from database
				//some reason had to run below again
				locName = locName.replace('+',' ');
				$(".re_w_list-location-text").html(locName);
				$(".re_w_list-listbutton-icon").css("background-image","url('http://images.joyfulhome.com/joyfulhome_house_clear.png')");
				$(".re_w_list-listbutton-link").attr('href',"http://www.myhousekit.com/"+p_domain+"view_list/"+link);
				//go to location page go to myhousekit for partner non remnant
				$("#location_link").attr('href',"http://www.myhousekit.com/"+p_domain+"loc/");
		}
	});
	}
}

//add commas to numbers to look readable PROB DONT NEED THIS BUT KEEPING HERE JUST IN CASE
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

//random images to display list of lists
function randomimage(){
  var image_array = new Array();
  image_array['0'] = 'public/re_w_list_stock/Mosaic_Grid.png';
  image_array['1'] = 'public/re_w_list_stock/Mosaic_Grid2.png';
  image_array['2'] = 'public/re_w_list_stock/Mosaic_Grid3.png';
  image_array['3'] = 'public/re_w_list_stock/Mosaic_Grid4.png';
  image_array['4'] = 'public/re_w_list_stock/Mosaic_Grid5.png';
  image_array['5'] = 'public/re_w_list_stock/Mosaic_Grid6.png';
  image_array['6'] = 'public/re_w_list_stock/Mosaic_Grid7.png';
  image_array['7'] = 'public/re_w_list_stock/Mosaic_Grid8.png';
  image_array['8'] = 'public/re_w_list_stock/Mosaic_Grid9.png';
  image_array['9'] = 'public/re_w_list_stock/Mosaic_Grid10.png';
  return image_array;
}

//return ads PROB DONT NEED THIS BUT KEEPING HERE JUST IN CASE
function ad(){
  var ad_array = new Array();
  ad_array['0'] = 'public/re_w_list_stock/AudiAd.png';
  ad_array['1'] = 'public/re_w_list_stock/AudiAd#2.png';
  ad_array['2'] = 'public/re_w_list_stock/RolexAd.png';
  return ad_array;
}

//convert all state abbr to full  PROB DONT NEED THIS BUT KEEPING HERE JUST IN CASE
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
