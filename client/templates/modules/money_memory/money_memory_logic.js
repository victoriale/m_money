/* Author: Ryan Fisher
** Created: 07/17/2015
** Description: .less file for Money Memory page
** Associated Files: money_memory.html, money_memory.less, money_memory_logic.js
*/

Template.money_memory.onCreated(function(){
  //Delete user input session variables on create. This is to ensure the user inputs match the data of the graph on load
  delete Session.keys.user_start_date;
  delete Session.keys.user_end_date;
  delete Session.keys.initial_investment;

  this.autorun(function(){

    var data = Session.get('money_memory');
    //If data exists and user input session variables do not match data, then set user input session variables
    if(typeof data !== 'undefined' && typeof Session.get('user_start_date') === 'undefined' && typeof Session.get('user_end_date') === 'undefined'){
    //if(typeof(data) !== 'undefined' && !Session.equals('user_start_date', convert_date_readableToUnix(data.furthest_close_date)) && !Session.equals('user_end_date', convert_date_readableToUnix(data.most_recent_close_date))){}
      Session.set('user_start_date', convert_date_readableToUnix(data.furthest_close_date));
      Session.set('user_end_date', convert_date_readableToUnix(data.most_recent_close_date));
      Session.set('user_initial_investment', data.investment_total - data.roi);
    }
  })
})

//Function get new money memory data
function recallMoneyMemory(){

  //Get dependencies
  var params = Router.current().getParams();
  var user_start_date = Session.get('user_start_date');
  var user_end_date = Session.get('user_end_date');
  var user_initial_investment = Session.get('user_initial_investment');

  Meteor.call('GetMoneyMemoryData', params.company_id, user_initial_investment, user_start_date, user_end_date, function(err, result){
    if(err){
      //Error code
    }else{
      //Success code
      Session.set('money_memory', result.money_memory);
      //moneymemorygraph();
    }
  })
}

Template.mm_start_date.onRendered(function(){
  //Initialize date picker with options
  var startDatePicker = $('#mm-start-date').datepicker({
    autoclose: true,
    container: '#start-date-container',
    orientation: 'bottom',
    endDate: '0d',
    todayHighlight: true,
    daysOfWeekDisabled: [0,6]
  });

  //Events when a date is selected
  startDatePicker.on('changeDate', function(e){
    var user_start_date = new Date(e.date).getTime() / 1000;

    var user_end_date = Session.get('user_end_date');

    //If start date is less than or equal to end date set start date to selected value, else set start date to end date
    //Note: must be less than or equal to or this will cause an infinite loop
    if(user_start_date <= user_end_date){
      Session.set('user_start_date', user_start_date);
    }else{
      Session.set('user_start_date', user_start_date);
      Session.set('user_end_date', user_start_date);
      //Change date on end datepicker to reflect new end date
      $('#mm-end-date').datepicker('setDate', e.date);
    }

    recallMoneyMemory();

  })
})

Template.mm_end_date.onRendered(function(){
  //Initialize date picker with options
  var endDatePicker = $('#mm-end-date').datepicker({
    autoclose: true,
    container: '#end-date-container',
    orientation: 'bottom',
    endDate: '0d',
    todayHighlight: true,
    daysOfWeekDisabled: [0,6]
  })

  //Events when a date is selected
  endDatePicker.on('changeDate', function(e){
    var user_end_date = new Date(e.date).getTime() / 1000;

    var user_start_date = Session.get('user_start_date');

    //If start date is less than or equal to end date set end date to seleted value, else set end date to start date
    //Note: must be less than or equal to or this will cause an infinite loop
    if(user_start_date <= user_end_date){
      Session.set('user_end_date', user_end_date);
    }else{
      Session.set('user_start_date', user_end_date);
      Session.set('user_end_date', user_end_date);
      //Change date on start datepicker ot reflect new start date
      $('#mm-start-date').datepicker('setDate', e.date);
    }

    recallMoneyMemory();

  })
})

Template.money_memory.helpers({
  //Helper to determine if result exists (Fix for if no stock data for time range). If results DNE, show error message
  ticker: function(){
    var params = Router.current().getParams();
    return params.ticker;
  },
  resultExists: function(){
    var data = Session.get('money_memory');

    return typeof data === 'undefined' ? false : true;
  },
  //Helper to determine URL to money memory page
  linkToMM: function(){
    var params = Router.current().getParams();

    return Router.pick_path('content.moneymemory', {
      ticker:params.ticker,
      name:params.name,
      company_id: params.company_id
    });
  },
  //Helper to determine URL to competitors page
  linkToCompetitors: function(){
    var params = Router.current().getParams();

    return Router.pick_path('content.competitor', {
      ticker:params.ticker,
      name:params.name,
      company_id: params.company_id
    });
  },
  //Helper to determine URL to competitors page
  linkToFinOverview: function(){
    var params = Router.current().getParams();

    return Router.pick_path('content.finoverview', {
      ticker:params.ticker,
      name:params.name,
      company_id: params.company_id
    });
  },
  //Helper to display initial investment
  user_initial_investment: function(){
    var data = Session.get('user_initial_investment');

    return typeof(data) !== 'undefined' ? commaSeparateNumber_decimal(Math.round(data * 100) / 100) : '';
  },
  //Helper to display start date
  user_start_date: function(){
    var data = Session.get('user_start_date');

    return typeof(data) !== 'undefined' ? get_full_date(data * 1000) : '';
  },
  //Helper to display end date
  user_end_date: function(){
    var data = Session.get('user_end_date');

    return typeof(data) !== 'undefined' ? get_full_date(data * 1000) : '';
  },
  //Helper to display company info
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
  //Helper to display money memory data
  mmInfo: function(){
    var data = Session.get('money_memory');
    //Return nothing if data does not exist
    if(typeof data == 'undefined'){
      return '';
    }
    //Determine rise or fall of investment and percent change
    if(data.roi >= 0){
      data.colorIndicator = '#44b224'
      data.earn_lose = 'earned';
    }else if(data.roi < 0){
      data.colorIndicator = '#ca1010'
      data.earn_lose = 'lost';
    }
    if(data.percent_change >= 0){
      data.chng = 'Gain';
    }else{
      data.chng = 'pct loss';
    }

    //Transform values for display
    data['furthest_close_date'] = data['furthest_close_date'].replace(/-/g,'/');
    data['sntfurthest'] =(new Date( data['furthest_close_date'])).toSNTForm();
    data['most_recent_close_date'] = data['most_recent_close_date'].replace(/-/g,'/');
    data['sntrecent'] =(new Date( data['most_recent_close_date'])).toSNTForm();
    data['investment_total'] = Number(data['investment_total']).toFixed(2);
    data['percent_change'] = Number(data['percent_change']).toFixed(2);

    //Set roi value to positive for display (You could have lost $10 instead of You could have lost $-10)
    data['roi'] = Math.abs(data['roi'])

    //If rounded absolute roi number is less than or equal to 6 characters in length add commas and fix to 2 decimal points, else shorten to shorthand form
    if(Math.round(data['roi']).toString().length <= 5){
      data['roi'] = commaSeparateNumber_decimal(Math.round(data['roi'] * 100) / 100);
    }else{
      data['roi'] = data['roi'] >= 0 ? nFormatter(Number(data['roi'])) : nFormatter_neg(Number(data['roi']));
    }
    console.log(data);
    return data;
  },
  //Helper to get graph data
  'getMMGraphObject': function(){
    var graphData = Session.get('money_memory');

    if(typeof(graphData) === 'undefined'){
      return '';
    }

    var stockData = graphData.stock_history;
    var companyData = Session.get('profile_header');

    // the following is the result of service call.
    // use the data to create highcharts
    newDataArray = [];
    $.each(stockData, function(i, val) {
      xyMerge = [val.sh_date *1000, parseFloat(val.sh_close)];
      newDataArray.push(xyMerge);
    });

    //Sort data array for highcharts (throws warning otherwise)
    newDataArray.sort(sortFunction);

    var mmGraphObject = {
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
    }

    return mmGraphObject;
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
    //Make input a positive number
    input = Math.abs(Number(input));
    //Check to determine if input is a number, if not default to 1000
    input = isNaN(input) ? 1000 : input;
    //Set session variable to input value
    Session.set('user_initial_investment', input);
    //Call money memory function to get new data
    recallMoneyMemory();
    //Reset value to null
    t.$('#investment-input').val('');
  },
  //Event which prevents investment box from closing when clicking input
  'click #investment-input': function(e, t){
    e.stopPropagation();
  }
})

//Function to sort graph data
function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}
