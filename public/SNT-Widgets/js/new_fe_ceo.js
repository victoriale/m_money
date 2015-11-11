var offset = 0;
var dataLength;
var curData;
var domain = '';
var url = '';
$(function(){
  $('.fcw-rightnav').on('click', function() {
      if (offset < dataLength-1 && $(this).data('dir') === 'next') {
          dataCall(++offset);
      }else if(offset >= dataLength-1){
        offset = 0;
        dataCall(offset);
      }
  });
  $('.fcw-leftnav').on('click', function() {
      if (offset > 0 && $(this).data('dir') === 'prev') {
            dataCall(--offset);
      }else if(offset <= 0){
        offset = dataLength-1;
        dataCall(offset);
      }
  });

  url = document.domain;

	$.get('http://apifin.investkit.com/call_controller.php?action=widget&option=highest_paid_female_ceo', function(data){
    data_result = data.highest_paid_female_ceo;
    curData = data_result.list_data;
    dataLength = curData.length;
    dataCall(offset);
  }, 'json')
})//END OF FUNCTION
function dataCall(index){
  $('.fcw-t2-title').html(curData[index].c_ticker);
  $('.fcw-loc').html(curData[index].c_hq_city+' '+curData[index].c_hq_state);
  $('.fcw-content1').html(curData[index].o_first_name+' '+curData[index].o_last_name);
  $('#paid').html(nFormatter(curData[index].TotalComp));
  $('.fcw-image').css('background','url('+imageUrl(curData[index].o_pic)+') no-repeat');

  if(url == 'www.myinveskit.com'){
    var windowURL = document.referrer;
  	var URLLength = windowURL.length - 1;
  	for(var i=0;i<=URLLength;i++)
  	{
  		if(windowURL.charAt(URLLength-i) == '/')
  		{
  			var reqdString = windowURL.substring((URLLength-i)+1, URLLength+1);
  		}
  	}
    reqdString = reqdString.split('/');
    domain = reqdString[3];

    $('#title_link').attr('href',"http://www.myinvestkit.com/"+domain+"/"+compUrlName(curData[index].c_name)+"/"+curData[index].c_ticker+"/c/"+curData[index].c_id);
    $('.exec-link').attr('href',"http://www.myinvestkit.com/"+domain+"/"+curData[index].c_ticker+"/"+curData[index].o_last_name+"-"+curData[index].o_first_name+"/e/"+curData[index].o_id);
    $('.fcw-href').attr('href',"http://www.myinvestkit.com/"+domain+"/"+compUrlName(data_result.list_title)+"/female_ceo/list-executives/1");
    $('#loc_link').attr('href',"http://www.myinvestkit.com/"+domain+"/"+curData[index].c_hq_state+"/loc");

  }else{
    $('#title_link').attr('href',"http://www.investkit.com/"+curData[index].c_ticker+"/"+compUrlName(curData[index].c_name)+"/company/"+curData[index].c_id);
    $('.exec-link').attr('href',"http://www.investkit.com/"+curData[index].o_first_name+"-"+curData[index].o_last_name+"/"+curData[index].c_ticker+"/executive/"+curData[index].o_id);
    $('.fcw-href').attr('href',"http://www.investkit.com/"+compUrlName(data_result.list_title)+"/female_ceo/executive-list/1");
    $('#loc_link').attr('href',"http://www.investkit.com/"+curData[index].c_hq_state+"/location");

  }
}

function compUrlName(company) {
  if ( typeof company == "undefined" || company == null ) {
    return '';
  }
  return company.replace(/(,|\.|&)/g,'').replace(/ /g,'-').replace(/\//g,'_');
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
function imageUrl(path){
  if(typeof path == 'undefined' || path == null || path == '' || path == 'null'){
    return '/public/no_image.png';
  }
  return 'http://images.investkit.com/images/' + path;
}
