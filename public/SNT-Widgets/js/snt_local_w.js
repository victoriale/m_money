//embedd code localized variables
var domain = '';
var clickyId = 0;
var remnant = '';
var locName = '';
var city = '';
var state = '';
var loc = '';
var max = 10;
var bord = false;

var offset=0;
var dataCall = {};
var list = {};
var graph = {};
var w_info = {};
var dataLength;
$(function(){
/*
  var temp = location.search;
  var query = {};

  if(temp != null){
  	query = JSON.parse(decodeURIComponent(temp.substr(1)));

  	//set the query data from database to global variable to use
  	domain = query.dom;

  	remnant = query.remn;

  	clickyId = query.c_id;

  	locName = query['loc']['location_name'];

  	city = query['loc']['loc_id']['city'];

  	state = query['loc']['loc_id']['state'];

    if(query['loc']['location']['DMA'].length == 0){
      location = query['loc']['location']['state'];
    }else{
      for(var i = 0; i < query['loc']['location']['DMA'].length-1; i++){
        location += query['loc']['location']['DMA'][i]+" ";
      }
      location = location.replace(/ /g, ",");
      location = removeLastComma(location);
      console.log(location);
    }
    //returns string true or false
  	bord = query.bord;
  }
*/
  var script_tag = document.createElement('script');
  script_tag.setAttribute('src','//static.getclicky.com/js');
  document.head.appendChild(script_tag);
  var clicks = $('<script>try{ clicky.init('+clickyId+'); }catch(e){}</script>');
  document.head.appendChild(clicks[0]);


  $('.fgw-rightnav').on('click', function() {
		if (offset < dataLength-1 && $(this).data('dir') === 'next') {
			compData(++offset);
		}else if(offset >= dataLength-1){
      offset = 0;
      compData(offset);
    }
	});
	$('.fgw-leftnav').on('click', function() {
		if (offset > 0 && $(this).data('dir') === 'prev') {
			compData(--offset);
		}else if(offset <= 0){
      offset = dataLength-1;
      compData(offset);
    }
	});

  console.log("Grabbing data call");

  $.get('http://apifin.synapsys.us/call_controller.php?action=widget&option=local_market_movers&param=807', function(data){
    console.log(data);
    dataCall = data.local_market_movers;
    w_info = dataCall.top_list_list[0].top_list_info;
    list = dataCall.top_list_list[0].top_list_list;
    dataLength = list.length;
    graph = dataCall.top_list_graph_data;
    compData(offset, list);

  }, 'json')



});

function compData(offset){
  var curItem = list[offset];
  console.log(curItem);
  $(".fgw-t2-title").html(curItem.c_ticker);
  $(".fgw-t2-loc").html(curItem.c_hq_city + ", " + curItem.c_hq_state);
  $(".fgw-image").css({"background-image":"url('http://apifin2.synapsys.us/images/"+curItem.c_logo+"')"});
  $(".fgw-content1").html(convert_num(Number(curItem.stock_percent).toFixed(2)));
  $(".fgw-link").attr('href',"http://www.investkit.com/"+curItem.c_ticker+"/"+compUrlName(curItem.c_name)+"/company/"+curItem.c_id);
  stockGraph(curItem.c_id, graph, curItem.c_ticker);
  $(".fgw-loc-link").attr('href',"http://www.investkit.com/"+curItem.c_hq_state+"/location");
  stockGraph(curItem.c_id, graph, curItem.c_ticker);
}

function stockGraph(comp_id, graph, ticker){
  var seriesOptions = [];

  $.each(graph[comp_id], function(i, val) {
		var yVal = parseFloat(val.sh_open);

		if (!isNaN(yVal)) {
			seriesOptions.push([val.sh_date * 1000, yVal]);
		}
	});
  seriesOptions.reverse();


  //renders data gathered into a simple chart
  $('#fgw-graph').highcharts({
    exporting:{
      enabled:false
    },

    credits:{
      enabled:false
    },

    chart:{
      width:250,
      height:85,
    },

    xAxis:{
      type:'datetime',
      tickPositioner: function () {
        var positions = [],
        tick = Math.floor(this.dataMin),
        increment = Math.ceil((this.dataMax - this.dataMin) / 6);

        for (tick; tick - increment <= this.dataMax; tick += increment) {
          positions.push(tick);
        }
        return positions * 1000;
      },
      tickPixelInterval: 70,
      endOnTick:true,
      title: '',
      labels:{
        autoRotation:false,
        step: 1
      },
    },

    yAxis:{
      opposite:true,
      title:'',
    },
    scrollbar:{
      enabled:false
    },
    rangeSelector: {
      selected: 4,
      inputEnabled: false,
      buttonTheme: {
        visibility: 'hidden'
      },
      labelStyle: {
        visibility: 'hidden'
      }
    },
    title: {
      text: ''
    },
    legend:{
      enabled:false
    },
    series: [{
      name: ticker,
      data: seriesOptions,
      type:'spline'
    }]
  });

}

function compUrlName(company) {
  if ( typeof company == "undefined" || company == null ) {
    return '';
  }
  return company.replace(/(,|\.|&)/g,'').replace(/ /g,'-').replace(/\//g,'_');
}

function convert_num(change_num){
	if (change_num > 0){
		$('.fgw-content1').css({"color":"#44b224"});
		$('.fgw-content1').html(change_num+'%');
	}
	else{
		$('.fgw-content1').css({"color":"#ca1010"});
		$('.fgw-content1').html(change_num+'%');
	}
}//END OF FUNCTION
