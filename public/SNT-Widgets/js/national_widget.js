var CUR_OFFSET = 0;
var cur_exchange = 'NASDAQ';
var dataCall = {};
var curData;

//run js code onn startup
$(function(){
	//script to allow widgets to change to next item on list(same as 'see the whole list' button link)
	$('.national_widget-content-buttonright').on('click', function() {
		//when clicking on right button will change offset of data call and pull correct data based off of SEE THE WHOLE LIST
		if ($(this).data('dir') === 'next') {
			//console.log(curData);
			mr_center_piece(++CUR_OFFSET, curData);
		}
		//makes sure arrow on left appear if offset is greater than 0
		if(CUR_OFFSET > 0){
		$('.national_widget-content-buttonleft').css("opacity","1");
		$('.national_widget-content-buttonleft').hover(function(){
			$('.national_widget-content-buttonleft').css("cursor","pointer");
		})
	}
	else{
		//change left arrow css to disappear
		$('.national_widget-content-buttonleft').css("opacity","0");
		$('.national_widget-content-buttonleft').css("cursor","default");
	}
	});// END OF FUNCTION

	//change left arrow css to disappear if offset is 0
	$('.national_widget-content-buttonleft').on('click', function() {
		if (CUR_OFFSET > 0 && $(this).data('dir') === 'prev') {
			mr_center_piece(--CUR_OFFSET, curData);
		}
		if (CUR_OFFSET == 0){
			$('.national_widget-content-buttonleft').css("opacity","0");
			$('.national_widget-content-buttonleft').css("cursor","default");
		}
	});//END OF FUNCTION

	//by clicking on each tab it will return correct data and reinitialize a new data api call
	$('.mtabs').on('click', function(){
		//reset the css background
		$('.mtabs').css({"background-color":"#f2f2f2","border-bottom":"1px solid #cccccc"});

		//switch statement to swap out tabs and recall data api depending on which tab/exchange is chosen
		//change title as well
		switch($(this).data('dir')){
			  case 'NASDAQ':
					CUR_OFFSET = 0;
					cur_exchange = 'NASDAQ';
					curData = exList[0].top_list_list;
					console.log(exList[0]);
					$(this).css({"background-color":"#fff","border-bottom":"0"});
					$('.national_widget_wrapper').css({"display":"block"});
					$('.searchtab').css({"display":"none"});
					$('.national_widget-title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
					$(".nwlink").attr("href", "http://www.investkit.com/Top-companies-on-NASDAQ-with-stock-percent-loss/5420/list");
					mr_center_piece(CUR_OFFSET, curData);
					stock_data(cur_exchange, dataCall);
					stock_graph(dataCall.exchange_stock_data[0].graph_data, cur_exchange);
					break;
				case 'AMEX':
					CUR_OFFSET = 0;
					curData = exList[1].top_list_list;
					cur_exchange = 'AMEX';
					$(this).css({"background-color":"#fff","border-bottom":"0"});
					$('.national_widget_wrapper').css({"display":"block"});
					$('.searchtab').css({"display":"none"});
					$('.national_widget-title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
					$(".nwlink").attr("href", "http://www.investkit.com/Top-companies-on-AMEX-with-stock-percent-loss/5421/list");
					mr_center_piece(CUR_OFFSET, curData);
					stock_data(cur_exchange, dataCall);
					stock_graph(dataCall.exchange_stock_data[1].graph_data, cur_exchange);
					break;
				case 'NYSE':
					CUR_OFFSET = 0;
					cur_exchange = 'NYSE';
					curData = exList[2].top_list_list;
					$(this).css({"background-color":"#fff","border-bottom":"0"});
					$('.national_widget_wrapper').css({"display":"block"});
					$('.searchtab').css({"display":"none"});
					$('.national_widget-title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
					$(".nwlink").attr('href',"http://www.investkit.com/Top-companies-on-NYSE-with-stock-percent-loss/5422/list");
					mr_center_piece(CUR_OFFSET, curData);
					stock_data(cur_exchange, dataCall);
					stock_graph(dataCall.exchange_stock_data[2].graph_data, cur_exchange);
					break;
				case 'find':
					$('.searchtab').css({"display":"block"});
					$('.national_widget_wrapper').css({"display":"none"});
					$(this).css({"background-color":"#fff","border-bottom":"0"});
					break;
				default:
					$('.national_widget_wrapper').css({"display":"block"});
					$('.searchtab').css({"display":"none"});
			}
	})//END OF FUNCTION

	//double clicking will not highlight buttons
	$('.mrwidget_right-button').mousedown(function(){ return false; });
	$('.mrwidget_left-button').mousedown(function(){ return false; });
	$('.mtabs').mousedown(function(){ return false; });

	//run function  initial calls incase nothing else runs this will be default call on page load

	$.get('http://apifin.synapsys.us/call_controller.php?action=widget&option=national_market_movers', function(data){
		dataCall = data.national_market_movers;
		exList = dataCall.exchange_list;
		curData = exList[0].top_list_list;
		mr_center_piece(CUR_OFFSET, curData);
		stock_data($('.mtabs').data('dir'), dataCall);
		stock_graph(dataCall.exchange_stock_data[0].graph_data, cur_exchange);
	}, 'json')

})//END OF FUNCTION

//data api call for list
function mr_center_piece(offset, data){
	//service called time to set div classes to given results
	$('.national_widget-content-textarea-t1').html(data[offset].c_name);
	$('.national_widget-content-image').css('background','url(http://apifin2.synapsys.us/images/'+data[offset].c_logo+') no-repeat');
	$(".nwprofile-link").attr("href", "http://www.investkit.com/"+data[offset].c_ticker+"/"+compUrlName(data[offset].c_name)+"/company/"+data[offset].c_id);
}//END OF FUNCTION

// data api returned based on which exchange is selected
function stock_data(cur_exch, stockData){
	//console.log(stockData);
	switch(cur_exch){
		case 'NASDAQ':
			var price = stockData.exchange_stock_data[0].csi_price;
			var priceChng = stockData.exchange_stock_data[0].graph_data.price_change;
			var pctChng = stockData.exchange_stock_data[0].graph_data.percent_change;
			$('.price').html(Number(price).toFixed(2));
			convert_num(Number(priceChng).toFixed(2),Number(pctChng).toFixed(2));
			break;
		case 'AMEX':
			var price = stockData.exchange_stock_data[1].csi_price;
			var priceChng = stockData.exchange_stock_data[1].graph_data.price_change;
			var pctChng = stockData.exchange_stock_data[1].graph_data.percent_change;
			$('.price').html(Number(price).toFixed(2));
			convert_num(Number(priceChng).toFixed(2),Number(pctChng).toFixed(2));
			break;
		case 'NYSE':
			var price = stockData.exchange_stock_data[2].csi_price;
			var priceChng = stockData.exchange_stock_data[2].graph_data.price_change;
			var pctChng = stockData.exchange_stock_data[2].graph_data.percent_change;
			$('.price').html(Number(price).toFixed(2));
			convert_num(Number(priceChng).toFixed(2),Number(pctChng).toFixed(2));
			break;
		default:
			break;
	}//END OF FUNCTION
}//END OF FUNCTION


function stock_graph(dataArray, exchange){

	newDataArray = [];

	//JSON array is converted into usable code for Highcharts also does not push NULL values
	$.each(dataArray.graph_data, function(i, val) {
		var yVal = parseFloat(val.sh_open);

		if (!isNaN(yVal)) {
			newDataArray.push([val.sh_date * 1000, yVal]);
		}
	});

	//renders data gathered into a simple chart
	$('#stockchart').highcharts({
		chart: {
			defaultSeriesType: 'line',
			zoomType: 'x',
			resetZoomButton: {
				theme: {
				display: 'none'
				}
			}
		},
		tooltip: {
			positioner: function () {
				return { x: -5, y: 38 };32.
			},
			style:{

				fontSize:'8px'
			},
			shadow: false,
			borderWidth: 0,
			backgroundColor: 'rgba(255,255,255,0.8)'
		},
		title : {
			text : null
		},
		xAxis:{
			title: {
				text:'',
			},
			type: 'datetime',
			showLastLabel: true,
			endOnTick: true,
			dateTimeLabelFormats: {
				day: '%e'
			},
			tickPixelInterval: 60,
			//max tick for x axix is calculated and dynamically set
			tickPositioner: function () {
				var positions = [],
				tick = Math.floor(this.dataMin),
				increment = Math.ceil((this.dataMax - this.dataMin) / 6);

				for (tick; tick - increment <= this.dataMax; tick += increment) {
					positions.push(tick);
				}
				return positions * 1000;
			},
			labels:{
				autoRotation:false,
				step: 1
			},
		},
		yAxis:{
			opposite:true,
			title: {
				text:null
			},
			allowDecimals: true,
			labels: {
				formatter: function() {
					return this.value;
				}
			},
			tickPixelInterval: 25,
			//max tick for y axix is calculated and dynamically set
			tickPositioner: function () {
				var positions = [],
				tick = Math.floor(this.dataMin),
				increment = Math.ceil((this.dataMax - this.dataMin) / 6);

				for (tick; tick - increment <= this.dataMax; tick += increment) {
					positions.push(tick);
				}
				return positions * 1000;
			},
		},
		credits: {
			enabled: false
		},
		series : [{
			showInLegend: false,
			name : exchange,
			data : newDataArray,
			lineWidth: 2,
			connectNulls: true,
		}]
	});//END OF HIGHCHARTS FUNCTION
}

function compUrlName(company) {
  if ( typeof company == "undefined" || company == null ) {
    return '';
  }
  return company.replace(/(,|\.|&)/g,'').replace(/ /g,'-').replace(/\//g,'_');
}


//convert value into decimal and decide if change is up or down
function convert_num(change_num, changePercent_num){
	if (change_num > 0){
		$('.change').css({"color":"#44b224"});
		$('.change').html(change_num+'('+changePercent_num+'%)');
	}
	else{
		$('.change').css({"color":"#ca1010"});
		$('.change').html(change_num+'('+changePercent_num+'%)');
	}
	if (changePercent_num > 0){
		$('.change').css({"color":"#44b224"});
		$('.change').html(change_num+'('+changePercent_num+'%)');
	}
	else{
		$('.change').css({"color":"#ca1010"});
		$('.change').html(change_num+'('+changePercent_num+'%)');
	}
}//END OF FUNCTION
