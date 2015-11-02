var offset = 0;
var dataLength;
var curData;
$(function(){
  $('.cds-rightnav').on('click', function() {
      if (offset < dataLength-1 && $(this).data('dir') === 'next') {
          dataCall(++offset);
      }else if(offset >= dataLength-1){
        offset = 0;
        dataCall(offset);
      }
  });
  $('.cds-leftnav').on('click', function() {
      if (offset > 0 && $(this).data('dir') === 'prev') {
            dataCall(--offset);
      }else if(offset <= 0){
        offset = dataLength-1;
        dataCall(offset);
      }
  });

	$.get('http://apifin.synapsys.us/call_controller.php?action=widget&option=ceo_make_one_dollar', function(data){
		console.log(data);
    data_result = data.ceo_make_one_dollar;
    curData = data_result.list_data;
    dataLength = curData.length;
    dataCall(offset);
  }, 'json')
})//END OF FUNCTION
function dataCall(index){
  $('.cds-t2-title').html(curData[index].c_name);
  $('.cds-content1').html(curData[index].o_first_name+' '+curData[index].o_last_name);
  $('#paid').html(nFormatter(curData[index].TotalComp));
  $('.cds-image').css('background','url(http://apifin2.synapsys.us/images/'+curData[index].o_pic+') no-repeat');
  $('#exec-link').attr('href',"http://www.investkit.com/"+curData[index].o_first_name+'-'+curData[index].o_last_name+"/"+curData[index].c_ticker+"/executive/"+curData[index].o_id);
  $('.cds-href').attr('href', "http://www.investkit.com/"+compUrlName(data_result.list_title)+"/dollar_ceo/executive-list");//'/:loc_id?/:l_name/:list_id/list',
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
