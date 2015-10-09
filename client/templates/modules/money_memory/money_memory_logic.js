/* Author: Ryan Fisher
** Created: 07/17/2015
** Description: .less file for Money Memory page
** Associated Files: money_memory.html, money_memory.less, money_memory_logic.js
*/

Template.money_memory.onRendered(function(){

  this.autorun(function(){

    moneymemorygraph();
  })
});

Template.mm_start_date.onRendered(function(){
  //Initialize date picker with options
  var startDatePicker = $('#mm-start-date').datepicker({
    autoclose: true,
    container: '#start-date-container',
    orientation: 'bottom'
  });

  //Events when a date is selected
  startDatePicker.on('changeDate', function(e){
    console.log('date selected', e, new Date(e.date).getTime() / 1000);

    Session.set('mm_start_date', new Date(e.date).getTime() / 1000);
  })
})

Template.mm_end_date.onRendered(function(){
  //Initialize date picker with options
  var endDatePicker = $('#mm-end-date').datepicker({
    autoclose: true,
    container: '#end-date-container',
    orientation: 'bottom'
  })

  //Events when a date is selected
  endDatePicker.on('changeDate', function(e){
    console.log('end date selected', e, new Date(e.date).getTime() / 1000);

    Session.set('mm_end_date', new Date(e.date).getTime() / 1000);
  })
})

Template.money_memory.helpers({
  companyInfo: function(){
    var data = Session.get('daily_update');
    if(typeof data == 'undefined'){
      return '';
    }
    //data is being returned as string so convert to numbers and round to fit design
    data['csi_percent_change_since_last'] = Number(data['csi_percent_change_since_last']).toFixed(2);
    data['csi_price'] = Number(data['csi_price']).toFixed(2);
    data['csi_price_change_since_last'] = Number(data['csi_price_change_since_last']).toFixed(2);
    return data;
  },
  mmInfo: function(){
    var data = Session.get('money_memory');
    if(typeof data == 'undefined'){
      return '';
    }
    data['furthest_close_date'] = data['furthest_close_date'].replace(/-/g,'/');
    data['most_recent_close_date'] = data['most_recent_close_date'].replace(/-/g,'/');
    data['investment_total'] = data['investment_total'].toFixed(2);
    data['percent_change'] = data['percent_change'].toFixed(2);
    data['roi'] = data['roi'].toFixed(2);
    console.log(data);
    return data;
  },
  company: "Apple, Inc.",
  stck_prc: "109.34",
  stck_chng: "#ca1010",
  stck_nums: "-3.42 (-3.03%)",
  arrow: "arrow-down",
  earn_lose: "earned",
  pot_amount: "12,950.72",
  totl_inc: "+46.2",
  amount: "#22a922",
  chng: "risen",
  comp_bgn_date: "01/03/11",
  intl_invstmnt: "10,000",
  strt_date: "03/01/15",
  end_date: "03/19/15"

});

Template.money_memory.events({
  'click .mon-mem_body_start-date': function(e, t){
    $('#mm-start-date').datepicker('show');
    $('.datepicker').css({top: '-252px', left: '-4px'});
  },
  'click .mon-mem_body_end-date': function(e, t){
    $('#mm-end-date').datepicker('show');
    $('.datepicker').css({top: '-252px', left: '-4px'});
  }
})


//Function to render the spline chart
function moneymemorygraph() {
  var graphData = Session.get('money_memory');

  if(typeof graphData == 'undefined'){
    return '';
  }

  var stockData = graphData.stock_history;
  var companyData = Session.get('profile_header');
  /*

  $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
    console.log(data);
  });
  */

  // the following is the result of service call.
  // use the data to create highcharts
  newDataArray = [];
  $.each(stockData, function(i, val) {
   xyMerge = [val.sh_date *1000, parseFloat(val.sh_close)];
   newDataArray.push(xyMerge);
 });
  console.log("Data into HighCharts:",newDataArray);
  //Chart options
  $('#moneymemorygraph').highcharts({
    exporting:{
      enabled:false
    },

    credits:{
      enabled:false
    },

    chart:{
      width: 453,
      height: 125,

    },
    xAxis:{
      type:'datetime',
      /*
      min: new Date('2009/09/10').getTime(),
      max: new Date('2010/03/10').getTime(),
      */
      title: '',

    },

    tooltip: {
      pointFormat: companyData.c_ticker+": ${point.y:.2f}"
    },

    yAxis: {
      title:'',
      tickInterval: 2,
      opposite: true,
      allowDecimals: true,
      labels: {
        formatter: function() {
          return '$' +this.value;
        }
      },
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
    },
    title: {
      text: ''
    },
    spline: {
      lineWidth: 3,
      states: {
        hover: {
          lineWidth: 4
        }
      },
    },
    legend:{
      enabled:false
    },
    series : [{
        name : companyData.c_ticker,
        data : newDataArray,
    }],
    marker: {
      enabled: true
    }
  });
}
