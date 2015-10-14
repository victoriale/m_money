/* Author: Ryan Fisher
** Created: 07/17/2015
** Description: .less file for Money Memory page
** Associated Files: money_memory.html, money_memory.less, money_memory_logic.js
*/

Template.money_memory.onCreated(function(){

  this.autorun(function(){

    var data = Session.get('money_memory');
    //If data exists set start and end dates
    if(typeof(data) !== 'undefined' && typeof(Session.get('mm_start_date')) === 'undefined' && typeof(Session.get('mm_end_date') === 'undefined')){

      Session.set('mm_start_date', convert_date_readableToUnix(data.furthest_close_date));
      Session.set('mm_end_date', convert_date_readableToUnix(data.most_recent_close_date));
      Session.set('initial_investment', data.investment_total);
    }
  })
})


Template.money_memory.onRendered(function(){

  moneymemorygraph();

  this.autorun(function(){
    var params = Router.current().getParams();
    var mm_start_date = Session.get('mm_start_date');
    var mm_end_date = Session.get('mm_end_date');
    var initial_investment = Session.get('initial_investment');

    Meteor.call('GetMoneyMemoryData', params.company_id, initial_investment, mm_start_date, mm_end_date, function(err, result){
      if(err){
        //Error code
      }else{
        //Success code
        Session.set('money_memory', result.money_memory);
        moneymemorygraph();
      }
    })

  })
});

Template.mm_start_date.onRendered(function(){
  //Initialize date picker with options
  var startDatePicker = $('#mm-start-date').datepicker({
    autoclose: true,
    container: '#start-date-container',
    orientation: 'bottom',
    endDate: '0d',
    todayHighlight: true
  });

  //Events when a date is selected
  startDatePicker.on('changeDate', function(e){

    var mm_start_date = new Date(e.date).getTime() / 1000;

    var mm_end_date = Session.get('mm_end_date');

    //If start date is less than end date set start date to selected value, else set start date to end date - 1 day
    if(mm_start_date < mm_end_date){
      Session.set('mm_start_date', mm_start_date);
    }else{
      Session.set('mm_start_date', mm_end_date);
    }

  })
})

Template.mm_end_date.onRendered(function(){
  //Initialize date picker with options
  var endDatePicker = $('#mm-end-date').datepicker({
    autoclose: true,
    container: '#end-date-container',
    orientation: 'bottom',
    endDate: '0d',
    todayHighlight: true
  })

  //Events when a date is selected
  endDatePicker.on('changeDate', function(e){

    var mm_end_date = new Date(e.date).getTime() / 1000;

    var mm_start_date = Session.get('mm_start_date');

    //If start date is less than end date set end date to seleted value, else set end date to start date + 1 day
    if(mm_start_date < mm_end_date){
      Session.set('mm_end_date', mm_end_date);
    }else{
      Session.set('mm_end_date', mm_start_date);
      //$('#mm-end-date').datepicker('setUTCDate', new Date(mm_start_date));
    }

  })
})

Template.money_memory.helpers({
  companyInfo: function(){
    var data = Session.get('daily_update');
    if(typeof data == 'undefined'){
      return '';
    }
    if(data.csi_price_change_since_last >= 0){
      data.arrow = 'arrow-up';
      data.stck_chng = '#44b224';
    }else{
      data.arrow = 'arrow-down';
      data.stck_chng = '#ca1010';
    }
    //data is being returned as string so convert to numbers and round to fit design
    data['csi_percent_change_since_last'] = Number(data['csi_percent_change_since_last']).toFixed(2);
    data['csi_price'] = Number(data['csi_price']).toFixed(2);
    data['csi_price_change_since_last'] = Number(data['csi_price_change_since_last']).toFixed(2);
    return data;
  },
  mmInfo: function(){
    var data = Session.get('money_memory');
    //Return nothing if data does not exist
    if(typeof data == 'undefined'){
      return '';
    }
    //Determine rise or fall of investment and percent change
    if(data.roi >= 0){
      data.colorIndicator = '#44b224'
      data.earn_lose = 'gained';
    }else if(data.roi < 0){
      data.colorIndicator = '#ca1010'
      data.earn_lose = 'lost';
    }
    if(data.percent_change >= 0){
      data.chng = 'risen';
    }else{
      data.chng = 'fallen';
    }
    //Transform values for display
    data['furthest_close_date'] = data['furthest_close_date'].replace(/-/g,'/');
    data['most_recent_close_date'] = data['most_recent_close_date'].replace(/-/g,'/');
    data['investment_total'] = data['investment_total'].toFixed(2);
    data['percent_change'] = data['percent_change'].toFixed(2);
    data['roi'] = data['roi'].toFixed(2);
    data['initial_investment'] = commaSeparateNumber_decimal(Number((data.investment_total - data.roi).toFixed(2)));
    
    return data;
  }
});

Template.money_memory.events({
  //Event to display start date datepicker
  'click .mon-mem_body_start-date': function(e, t){
    $('#mm-start-date').datepicker('show');
    $('.datepicker').css({top: '-252px', left: '-4px'});
  },
  //Event to display end date datepicker
  'click .mon-mem_body_end-date': function(e, t){
    $('#mm-end-date').datepicker('show');
    $('.datepicker').css({top: '-252px', left: '-4px'});
  },
  //Event to show/hide initial investment box
  'click .mon-mem_body_investment': function(e, t){
    t.$('.mon-mem_body_investment_input').toggle();
    t.$('#investment-input').focus();
  },
  //Event to submit initial investment
  'submit #investment-form': function(e, t){
    e.preventDefault();

    var input = t.$('#investment-input').val();
    //Remove commas
    input = input.replace(/\,/g, '');
    //Make input a number
    input = Number(input);
    //Check to determine if input is a number, if not default to 1000
    input = isNaN(input) ? 1000 : input;
    //Set session variable to input value
    Session.set('initial_investment', input);

    t.$('#investment-input').val('');
  },
  //Event which prevents investment box from closing when clicking input
  'click #investment-input': function(e, t){
    e.stopPropagation();
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
