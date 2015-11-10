//js to call api data for Who is Gaining Today? Top 100 Most Actively Traded Public Stocks in US today.
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

var CUR_OFFSET=0;
$(function () {
/*
	var temp = location.search;
  var query = {};
  if(temp != null){
	query = JSON.parse(decodeURIComponent(temp.substr(1)));

	//set the query data from database to global variable to use
	domain = query.dom;

	//returns string true or false
	remnant = query.remn;

	clickyId = query.c_id;

	locName = query['loc']['loc_name'];

	locName = locName.replace('+',' ');

	city = query['loc']['loc_id']['city'];

	state = query['loc']['loc_id']['state'];

	//returns string true or false
	bord = query.bord;
	}
	*/

	pf_center_piece(CUR_OFFSET);
	id = __PF.widget.locationId;

	//detects whether a button is click on and if so then change offset to ++ or -- to change the currently viewed data
	$('.high_p_female-content-buttonright').on('click', function() {
		if ($(this).data('dir') === 'next') {
			pf_center_piece(++CUR_OFFSET);
		}
	});
	$('.high_p_female-content-buttonleft').on('click', function() {
		if (CUR_OFFSET > 0 && $(this).data('dir') === 'prev') {
			pf_center_piece(--CUR_OFFSET);
		}
	});
	//$('.pfwidget_wrapper').css("display","block");
	var windowURL = document.referrer.split('/')[2];

	if(windowURL == 'www.businessinsider.com'){
		$(".high_p_female").css({'border-right':'1px solid #ccc','border-bottom':'1px solid #ccc','border-left':'1px solid #ccc'});
	}

	/*
	$.get("http://apis.quu.nu/lovebrigpf-execs/?domain="+windowURL+"", function(domain){
		var str = domain["link"].replace(/\?order=compensation\-desc/, '');
		$('.hpflink').attr("href", str +"?id="+id+"&gender=F&title=ceo&order=compensation-desc");
	});
	*/
	$('.hpflink').attr("href", "/what-executives-are-found-in-united-states/locale/usa/usa-236.htm?id=236&gender=F&title=ceo&order=compensation-desc");
});

function pf_center_piece(offset) {
	id = __PF.widget.locationId;
	if(offset==0)
		$('.high_p_female-content-buttonleft').hide();
	else
		$('.high_p_female-content-buttonleft').show();
	$.ajax({
	 	url: 'http://apifin.investkit.com/call_controller.php?action=top_list&option=female_ceo',
	  	success: function(data) {
				$('.high_p_female-content-textarea-t1').html(data[0]['name']);
				$('.high_p_female-content-textarea-t2').html(data[0]['companyName']);
				$('.high_p_female-total-price').html("$"+nFormatter(data[0]['totalCompensation']));
				$('.high_p_female-content-image').css("background-image","url("+data[0]['image']+")");
				$('.high_p_female-content-subimage').css("background-image","url("+data[0]['companyImage']+")");
				$(".hpfprofile-link").attr("href", data[0].profileUrl);
				$(".hpfcompany-link").attr("href", data[0].companyProfileUrl);
				$(".ceo_d_salary-content-subimage").attr("href", data[0].companyProfileUrl);
    	}
	});
}

//number converter to decimal with correct format
function nFormatter(num) {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' B';
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' M';
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' K';
	}
	return num;
}
