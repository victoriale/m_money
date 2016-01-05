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

  var windowURL = document.domain;
  console.log(windowURL);
  domain = windowURL;
  console.log("Grabbing data call");
  $.get("http://w1.synapsys.us/get-remote-addr/",function(r_data){
    city = r_data[0].city;
    state = r_data[0].state;

    $.get('http://apifin.synapsys.us/call_controller.php?action=widget&option=local_market_movers&param='+state, function(data){
      dataCall = data.local_market_movers;
      w_info = dataCall.top_list_list[0].top_list_info;
      list = dataCall.top_list_list[0].top_list_list;
      dataLength = list.length;
      graph = dataCall.top_list_graph_data;
      compData(offset, list);
    }, 'json')
  });



});

function compData(offset){
  var curItem = list[offset];
  $(".fgw-t2-title").html(curItem.c_ticker);
  $(".fgw-t2-loc").html(curItem.c_hq_city + ", " + curItem.c_hq_state);
  $(".fgw-image").css({"background-image":"url('http://apifin2.synapsys.us/images/"+curItem.c_logo+"')"});
  $(".fgw-content1").html(convert_num(Number(curItem.stock_percent).toFixed(2)));
  console.log(domain);

  if(domain == 'myinvestkit'){
    $(".fgw-link").attr('href',"http://www.myinvestkit.com/"+curItem.c_ticker+"/"+compUrlName(curItem.c_name)+"/company/"+curItem.c_id);
    $(".fgw-loc-link").attr('href',"http://www.myinvestkit.com/"+curItem.c_hq_state+"/location");
  }else{
    $(".fgw-link").attr('href',"http://www.investkit.com/"+curItem.c_ticker+"/"+compUrlName(curItem.c_name)+"/company/"+curItem.c_id);
    $(".fgw-loc-link").attr('href',"http://www.investkit.com/"+curItem.c_hq_state+"/location");
  }

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
