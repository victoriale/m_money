$(function(){
//create a search function to pass into graph
	$('.market_search_box').bind("enterKey",function(e){

		search = $('input').val();
		company(search);
	});//END OF FUNCTION

	//by pressing enter in this field it will activate
	$('.market_search_box').keyup(function(e){
			if(e.keyCode == 13){
		  $(this).trigger("enterKey");
		}
	});//END OF FUNCTION

	$('.market_search_iconbg').on('click', function(){
		search = $('input').val();
		company(search);
	})//END OF FUNCTION
//data call to gather info on exchange prices
	$.get('http://apifin.synapsys.us/call_controller.php?action=widget&option=sv150_markets_slim', function(data){
				console.log(data);
				//sets a number to allow different ID's to be called since data calls are different
				data_result = data.sv150_markets_slim;
				data_exchange = data_result.exchange_stock_data;
				data_gainer = data_result.sv150_list_gainer;
				var num = 1;
				var link = 'http://localhost:3000';
				//plug in data call for SV150
				var SV150_price = Number(data_result.sv150_comp_index).toFixed(2);
				var SV150_priceChange = Number(data_result.sv150_price_change).toFixed(2);
				var SV150_pctChange = Number(data_result.sv150_percent_change).toFixed(2);
				$('#SV').html(SV150_price);
				$('#SVchange').html(lossGainCheck(SV150_priceChange, num));
				$('#SVcent').html(lossGainCheck(SV150_pctChange, num)+'%');
				$(".link").attr("href",link+'/'+data_gainer.c_ticker+'/'+compUrlName(data_gainer.c_name)+'/company/'+data_gainer.c_id);
				num = 2;
				//plug in data call for Nasdaq
				var NQ_price = Number(data_exchange[0].csi_price).toFixed(2);
				var NQ_priceChange = Number(data_exchange[0].csi_price_change_since_last).toFixed(2);
				var NQ_pctChange = Number(data_exchange[0].csi_percent_change_since_last).toFixed(2);
				if(data_exchange[0].csi_price_last_operator == 0){
					NQ_priceChange *= -1;
					NQ_pctChange *= -1;
				}

				$('#nq').html(NQ_price);
				$('#Nqchange').html(lossGainCheck(NQ_priceChange, num));
				$('#Nqcent').html(lossGainCheck(NQ_pctChange, num)+"%");
				$('#Nqtxt').attr("href",link+'/Top-companies-on-NASDAQ-with-stock-percent-loss/'+data_exchange[0].c_id+'/list');
				num = 3;
				//plug in data call for AMEX
				var AMEX_price = Number(data_exchange[2].csi_price).toFixed(2);
				var AMEX_priceChange = Number(data_exchange[2].csi_price_change_since_last).toFixed(2);
				var AMEX_pctChange = Number(data_exchange[2].csi_percent_change_since_last).toFixed(2);
				if(data_exchange[2].csi_price_last_operator == 0){
					AMEX_priceChange *= -1;
					AMEX_pctChange *= -1;
				}
				$('#SP').html(AMEX_price);
				$('#SPchange').html(lossGainCheck(AMEX_priceChange, num));
				$('#SPcent').html(lossGainCheck(AMEX_pctChange, num)+"%");
				$("#SPtxt").attr("href",link+'/Top-companies-on-AMEX-with-stock-percent-loss/'+data_exchange[1].c_id+'/list');
				num = 4;
				//plug in data call for NYSE
				var NYSE_price = Number(data_exchange[1].csi_price).toFixed(2);
				var NYSE_priceChange = Number(data_exchange[1].csi_price_change_since_last).toFixed(2);
				var NYSE_pctChange = Number(data_exchange[1].csi_percent_change_since_last).toFixed(2);
				if(data_exchange[1].csi_price_last_operator == 0){
					NYSE_priceChange *= -1;
					NYSE_pctChange *= -1;
				}
				$('#ny').html(NYSE_price);
				$('#Nychange').html(lossGainCheck(NYSE_priceChange, num));
				$('#Nycent').html(lossGainCheck(NYSE_pctChange, num)+"%");
				$("#Nytxt").attr("href",link+'/Top-companies-on-NYSE-with-stock-percent-loss/'+data_exchange[2].c_id+'/list');
				//plug in data for the top sv150 company
				var SV150_topTck = data_gainer.c_ticker;
				var SV150_top_price = Number(data_gainer.csi_price).toFixed(2);
				var SV150_top_priceChange = Number(data_gainer.csi_price_change_since_last).toFixed(2);
				var SV150_top_pctChange = Number(data_gainer.csi_percent_change_since_last).toFixed(2);
				if(data_gainer.csi_price_last_operator == 0){
					SV150_top_priceChange *= -1;
					SV150_top_pctChange *= -1;
				}
			  //$('.sv_top_profile').attr("href",data_result[2][0].profileUrl);
				$('.sv_top_image').css('background','url(http://apifin2.synapsys.us/images/'+data_gainer.c_logo+') no-repeat');
				$('.sv-pd-name').html(SV150_topTck);
				$('.sv-pd-name').attr('title', SV150_topTck);
				$('.sv-pd-price').html('$'+SV150_top_price);
				$('.sv-pd-change').html(SV150_top_priceChange+'('+SV150_top_pctChange+'%)');
			}, 'json')
})

function company(search){
//data call for company api
var newWindow = window.open();
$.when($.post('http://quu.nu/services/',{

		service: "passfail",
		action:  "batchService",
		data: '[{"service":"passfail","data":{"service":"profiles.Card.get","params":["public",{"search":"'+search+' "}]}}]'
    })).done(function(result) {

	newWindow.location = result[0][0].profileUrl;
});
}

function lossGainCheck(change, count){
	//determines whether the price change is pos or neg and change colors accordingly
	if (!isNaN(change)){
		if(change > 0){
			$('#bottom_text'+count).css({"color":"#44b224"});
			$('.m'+count).replaceWith("<i class='fa-arrow-circle-o-up'></i>");
		}
		else{
			$('#bottom_text'+count).css({"color":"#ca1010"});
			$('.m'+count).replaceWith("<i class='fa-arrow-circle-o-down'></i>");
		}
	}
	else if(isNaN(change)){
		$('#bottom_text'+count).html("INVALID");
		$('.fa-arrow-circle-o-up').hide();
		$('.fa-arrow-circle-o-up').hide();
	}
	return change;
}
function compUrlName(company) {
  if ( typeof company == "undefined" || company == null ) {
    return '';
  }
  return company.replace(/(,|\.|&)/g,'').replace(/ /g,'-');
}
