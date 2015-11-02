$(function(){
	$('.sv-tabs').mousedown(function(){ return false; });
//create a search function to pass into graph
	$('.rc_search_input').bind("enterKey",function(e){
		search = $('input').val();
		company(search);
	});//END OF FUNCTION

	//by pressing enter in this field it will activate
	$('.rc_search_input').keyup(function(e){
		if(e.keyCode == 13){
		  $(this).trigger("enterKey");
		}
	});//END OF FUNCTION

	$('.rc_pillbtn').on('click', function(){
		search = $('input').val();
		console.log(search);
		company(search);
	})//END OF FUNCTION

	$('.so_exit').on('click',function(){
		$('.rc_today_container').css("display","block");
		$('.so_header').css("display","none");
		$('.so_widget-wrapper').css("display","none");
		$('.rc_search_input').val("");
	});
	//data call for exchange and lists

})

function company(search){
//data call for company api
$.get('http://apifin.synapsys.us/call_controller.php?action=widget&option=stock_overview&param=3330', function(data){
		dataCall = data.stock_overview;
		console.log(dataCall);
		stockData= dataCall.stock_data[0];
		exeData = dataCall.executive_data[0];
		var price = '$'+Number(stockData.csi_price).toFixed(2);
		var priceChange = Number(stockData.csi_price_change_since_last).toFixed(2);
		var pctChange = Number(stockData.csi_percent_change_since_last).toFixed(2);
		if(stockData.csi_price_last_operator == 0){
			priceChange *= -1;
			pctChange *= -1;
		}
		var last_year = Number(stockData.stock_hist[365].sh_close).toFixed(2);
		var today = Number(stockData.stock_hist[0].sh_close).toFixed(2);
		$('.rc_today_container').css("display","none");
		$('.so_header').css("display","block");
		$('.so_widget-wrapper').css("display","block");
		//graph data put data_result name and id of company needed to graph data.
		//graph_data(result[0][0].name, result[0][0].id);

		$('.header-company_text').html(stockData.c_name);
		$('.header-company_text').attr("href", '/'+exeData[0].c_ticker+'/'+compUrlName(stockData.c_name)+'/company/'+stockData.c_id);
		$('.tp_company-text').html(result[0][0].name);

		//Get financial and exec links
		getLinkDetails(result[0][0].profileUrl);
		$("#Day").css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
		$('.header-company_location').html(result[0][0].location);
		$('.tp_company-price').html('$'+result[0][0].price);

		$('.tp_company-change').html(lossGainCheck(result[0][0].change)+'('+result[0][0].percentChange+'%)');

		$('#company').css("background-image","url(https:"+result[0][0].image+")");
		$('#company-profile').attr("href",result[0][0].profileUrl)

		//6 data points
		$('#marketcap').html(nFormatter(result[0][0].marketCap));
		$('#peratio').html(result[0][0].peRatio);
		$('#totalshares').html(nFormatter(result[0][0].sharesOutstanding));
		$('#averagevolume').html(nFormatter(result[0][0].avgVolumeYearly));
		$('#52weeks').html(result[0][0].range52WeekLow+' - '+result[0][0].range52WeekHigh);
		$('#open').html(result[0][0].open);
		}, 'json')
}
$(function top(id){
	$.get('http://apifin.synapsys.us/call_controller.php?action=widget&option=sv150_report_card', function(data){
				console.log(data);
				data_result = data.sv150_report_card;
				data_exchange = data_result.exchange_stock_data;
				data_gainer = data_result.sv150_list_gainers;
				data_loser = data_result.sv150_list_losers;

				var SV150_price = Number(data_result.sv150_comp_index).toFixed(2);
				var SV150_priceChange = Number(data_result.sv150_price_change).toFixed(2);
				var SV150_pctChange = Number(data_result.sv150_percent_change).toFixed(2);

				$('#SV').html(SV150_price);
				$('#svchange').html(lossGainCheck(SV150_priceChange));
				$('#svpct').html(lossGainCheck(SV150_pctChange)+'%');
				$(".link").attr("href", "list-companies?investmentTypeId=EQ&marketId=8&order=sp-pct-desc&today=1");

				var NQ_price = Number(data_exchange[0].csi_price).toFixed(2);
				var NQ_priceChange = Number(data_exchange[0].csi_price_change_since_last).toFixed(2);
				var NQ_pctChange = Number(data_exchange[0].csi_percent_change_since_last).toFixed(2);
				if(data_exchange[0].csi_price_last_operator == 0){
					NQ_priceChange *= -1;
					NQ_pctChange *= -1;
				}
				$('#nq').html(NQ_price);
				$('#nqchange').html(lossGainCheck(NQ_priceChange));
				$('#napct').html(lossGainCheck(NQ_pctChange)+"%");
				$(".link").attr("href", "list-companies?investmentTypeId=EQ&exchange=nasdaq&order=sp-pct-desc&today=1");
				//plug in data call for AMEX
				var AMEX_price = Number(data_exchange[2].csi_price).toFixed(2);
				var AMEX_priceChange = Number(data_exchange[2].csi_price_change_since_last).toFixed(2);
				var AMEX_pctChange = Number(data_exchange[2].csi_percent_change_since_last).toFixed(2);
				if(data_exchange[2].csi_price_last_operator == 0){
					AMEX_priceChange *= -1;
					AMEX_pctChange *= -1;
				}
				$('#SP').html(AMEX_price);
				$('#spchange').html(lossGainCheck(AMEX_priceChange));
				$('#sppct').html(lossGainCheck(AMEX_pctChange)+"%");
				$(".link").attr("href", "list-companies?investmentTypeId=EQ&marketId=5&order=sp-pct-desc&today=1");

				//plug in data call for NYSE
				var NYSE_price = Number(data_exchange[1].csi_price).toFixed(2);
				var NYSE_priceChange = Number(data_exchange[1].csi_price_change_since_last).toFixed(2);
				var NYSE_pctChange = Number(data_exchange[1].csi_percent_change_since_last).toFixed(2);
				if(data_exchange[1].csi_price_last_operator == 0){
					NYSE_priceChange *= -1;
					NYSE_pctChange *= -1;
				}
				$('#ny').html(NYSE_price);
				$('#nychange').html(lossGainCheck(NYSE_priceChange));
				$('#nypct').html(lossGainCheck(NYSE_pctChange)+"%");
				$(".link").attr("href", "list-companies?investmentTypeId=EQ&exchange=nyse&order=sp-pct-desc&today=1");

				var link = 'http://localhost:3000';
				//$('#sv_link').attr("href",link+'/Top-companies-on-NYSE-with-stock-percent-loss/'+data1.c_id+'/list');
				$('#nq_link').attr("href",link+'/Top-companies-on-NASDAQ-with-stock-percent-loss/'+data_exchange[0].c_id+'/list');
				$('#amex_link').attr("href",link+'/Top-companies-on-AMEX-with-stock-percent-loss/'+data_exchange[1].c_id+'/list');
				$('#nyse_link').attr("href",link+'/Top-companies-on-NYSE-with-stock-percent-loss/'+data_exchange[2].c_id+'/list');

				$('#rc_gain1').css('background','url(http://apifin2.synapsys.us/images/'+data_gainer[0].c_logo+') no-repeat');
				$('#rc_gain2').css('background','url(http://apifin2.synapsys.us/images/'+data_gainer[1].c_logo+') no-repeat');
				$('#rc_gain3').css('background','url(http://apifin2.synapsys.us/images/'+data_gainer[2].c_logo+') no-repeat');
				$('#rc_lose1').css('background','url(http://apifin2.synapsys.us/images/'+data_loser[0].c_logo+') no-repeat');
				$('#rc_lose2').css('background','url(http://apifin2.synapsys.us/images/'+data_loser[1].c_logo+') no-repeat');
				$('#rc_lose3').css('background','url(http://apifin2.synapsys.us/images/'+data_loser[2].c_logo+') no-repeat');
				//var link =' http://localhost:3000';
				$('#gain_profile1').attr("href",link+'/'+data_gainer[0].c_ticker+'/'+compUrlName(data_gainer[0].c_name)+'/company/'+data_gainer[0].c_id);
				$('#gain_profile2').attr("href",link+'/'+data_gainer[1].c_ticker+'/'+compUrlName(data_gainer[1].c_name)+'/company/'+data_gainer[1].c_id);
				$('#gain_profile3').attr("href",link+'/'+data_gainer[2].c_ticker+'/'+compUrlName(data_gainer[2].c_name)+'/company/'+data_gainer[2].c_id);
				$('#lose_profile1').attr("href",link+'/'+data_loser[0].c_ticker+'/'+compUrlName(data_loser[0].c_name)+'/company/'+data_gainer[0].c_id);
				$('#lose_profile2').attr("href",link+'/'+data_loser[1].c_ticker+'/'+compUrlName(data_loser[1].c_name)+'/company/'+data_loser[1].c_id);
				$('#lose_profile3').attr("href",link+'/'+data_loser[2].c_ticker+'/'+compUrlName(data_loser[2].c_name)+'/company/'+data_loser[2].c_id);

				$('#gain_name1').html(data_gainer[0].c_ticker);
				$('#gain_name2').html(data_gainer[1].c_ticker);
				$('#gain_name3').html(data_gainer[2].c_ticker);
				$('#lose_name1').html(data_loser[0].c_ticker);
				$('#lose_name2').html(data_loser[1].c_ticker);
				$('#lose_name3').html(data_loser[2].c_ticker);

				$('#gain_price1').html('$'+Number(data_gainer[0].csi_price).toFixed(2));
				$('#gain_price2').html('$'+Number(data_gainer[1].csi_price).toFixed(2));
				$('#gain_price3').html('$'+Number(data_gainer[2].csi_price).toFixed(2));
				$('#lose_price1').html('$'+Number(data_loser[0].csi_price).toFixed(2));
				$('#lose_price2').html('$'+Number(data_loser[1].csi_price).toFixed(2));
				$('#lose_price3').html('$'+Number(data_loser[2].csi_price).toFixed(2));

				$('#gain_change1').html((Number(data_gainer[0].csi_price_change_since_last).toFixed(2))+'('+(Number(data_gainer[0].csi_percent_change_since_last).toFixed(2))+'%)');
				$('#gain_change2').html((Number(data_gainer[1].csi_price_change_since_last).toFixed(2))+'('+(Number(data_gainer[1].csi_percent_change_since_last).toFixed(2))+'%)');
				$('#gain_change3').html((Number(data_gainer[2].csi_price_change_since_last).toFixed(2))+'('+(Number(data_gainer[2].csi_percent_change_since_last).toFixed(2))+'%)');
				$('#lose_change1').html((Number(data_loser[0].csi_price_change_since_last).toFixed(2))+'('+(Number(data_loser[0].csi_percent_change_since_last).toFixed(2))+'%)');
				$('#lose_change2').html((Number(data_loser[1].csi_price_change_since_last).toFixed(2))+'('+(Number(data_loser[1].csi_percent_change_since_last).toFixed(2))+'%)');
				$('#lose_change3').html((Number(data_loser[2].csi_price_change_since_last).toFixed(2))+'('+(Number(data_loser[2].csi_percent_change_since_last).toFixed(2))+'%)');

			}, 'json')
})
/*NEED MODIFICATION
function company(search){
//data call for company api
	$.get('http://apifin.synapsys.us/call_controller.php?action=widget&option=stock_overview&param=3330', function(result){
			$('.rc_today_container').css("display","none");
			$('.so_header').css("display","block");
			$('.so_widget-wrapper').css("display","block");
		//graph data put data_result name and id of company needed to graph data.
		graph_data(result[0][0].name, result[0][0].id);

		$('.header-company_text').html(result[0][0].name);
		$('.header-company_text').attr("href",result[0][0].profileUrl);
		$('.tp_company-text').html(result[0][0].name);

		//Get financial and exec links
		getLinkDetails(result[0][0].profileUrl);
		$("#Day").css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
		$('.header-company_location').html(result[0][0].location);
		$('.tp_company-price').html('$'+result[0][0].price);

		$('.tp_company-change').html(lossGainCheck(result[0][0].change)+'('+result[0][0].percentChange+'%)');

		$('#company').css("background-image","url(https:"+result[0][0].image+")");
		$('#company-profile').attr("href",result[0][0].profileUrl)

		//6 data points
		$('#marketcap').html(nFormatter(result[0][0].marketCap));
		$('#peratio').html(result[0][0].peRatio);
		$('#totalshares').html(nFormatter(result[0][0].sharesOutstanding));
		$('#averagevolume').html(nFormatter(result[0][0].avgVolumeYearly));
		$('#52weeks').html(result[0][0].range52WeekLow+' - '+result[0][0].range52WeekHigh);
		$('#open').html(result[0][0].open);
  }, 'json')

}
*/
function lossGainCheck(change)
{
	//determines whether the price change is pos or neg and change colors accordingly
	if (!isNaN(change)){
		if(change > 0){
			$('.tp_company-color').css({"color":"#44b224"});
			$('.fa-arrow-circle-o-up').show();
			$('.fa-arrow-circle-o-down').hide();
		}
		else{
			$('.tp_company-color').css({"color":"#ca1010"});
			$('.fa-arrow-circle-o-down').show();
			$('.fa-arrow-circle-o-up').hide();
		}
	}
	else if(isNaN(change)){
		$('.tp_company-color').html("INVALID");
		$('.fa-arrow-circle-o-down').hide();
		$('.fa-arrow-circle-o-up').hide();
	}
	return change;
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

function compUrlName(company) {
  if ( typeof company == "undefined" || company == null ) {
    return '';
  }
  return company.replace(/(,|\.|&)/g,'').replace(/ /g,'-');
}
