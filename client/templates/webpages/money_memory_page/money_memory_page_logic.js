/* Author: Ryan Fisher
** Created: 09/09/2015
** Description: .js file for Company Executive Page - Money Memory
** Associated Files: money_memory_page.html, money_memory_page.less, money_memory_page_logic.js
*/

Template.money_memory_page.onCreated(function(){
  //Set default values
  var default_end = moment().format('X');
  var default_start = moment().add(-30, 'days').format('X');

  //Set default values
  Session.set('user_initial_investment', 1000);
  Session.set('user_start_date', Number(default_start));
  Session.set('user_end_date', Number(default_end));
  //Default value for graph range
  Session.set('mm_range', 'mmbbl-0');

  recallMoneyMemory_page();

  this.autorun(function(){
    var data = Session.get("fin_overview");

    //If data does exist reformat data
    if(typeof data !== 'undefined'){
      reformatMoneyMemoryData();
    }
  })
})

Template.mm_page_start_date.onRendered(function(){
  //Initialize date picker with options
  var startDatePicker = $('#mm-page-start-date').datepicker({
    autoclose: true,
    container: '#mm_page_start_div',
    orientation: 'top right',
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
      $('#mm-page-end-date').datepicker('setDate', e.date);
    }

  })
})

Template.mm_page_end_date.onRendered(function(){
  //Initialize date picker with options
  var endDatePicker = $('#mm-page-end-date').datepicker({
    autoclose: true,
    container: '#mm_page_end_div',
    orientation: 'top right',
    endDate: '0d',
    todayHighlight: true,
    daysOfWeekDisabled: [0,6]
  });

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
      $('#mm-page-start-date').datepicker('setDate', e.date);
    }

  })
})

Template.money_memory_page.helpers({
  //Helper to determine if result exists (Fix for if no stock data for time range). If results DNE, show error message
  resultExists: function(){
    var data = Session.get('money_memory');

    return typeof data === 'undefined' ? false : true;
  },
  //Helper to determine which range button is selected
  isRangeSelected: function(val){
    var mm_range = Session.get('mm_range');

    return val === mm_range ? 'mmpg-stock-sort-bbl-selected' : '';
  },
  //Helper to display graph date
  graphDate: function(){
    var mm_range = Session.get('mm_range');

    if(mm_range === 'mmbbl-0'){
      var data = Session.get('new_one_day_daily_update');
      return ' ' + moment.utc(data[0][0]).subtract(5, 'hours').format('dddd MMM Do, YYYY');
    }

    return '';
  },
  //Helper to determine chart
  getMonMemChart: function(){
    var data = Session.get('new_fin_overview');
    var mm_range = Session.get('mm_range');

    //If data does not exists exit helper
    if(typeof data === 'undefined'){
      return '';
    }

    var dataLength = data.highchartsData.length;
    //Set default values for highcharts obj
    var max = null;
    var tickPositions = undefined;

    var graphData = data.highchartsData;

    //Get dependencies to find date range
    var latestDate = moment(data.highchartsData[0][0]);
    data.highchartsData.reverse();
    //Get range value based on option selected
    switch(mm_range){
      case 'mmbbl-0':
        var graphData = Session.get('new_one_day_daily_update');
        var dataLength = graphData.length;

        //Set min and max of graphs to latest day available (9:00am EST - 4:00pm EST)
        var min = moment.utc(graphData[dataLength - 1][0]).subtract(5, 'hours').hour(14).minute(0).second(0).format('X') * 1000;
        var max = moment.utc(graphData[dataLength - 1][0]).subtract(5, 'hours').hour(21).minute(10).second(0).format('X') * 1000;

        var tickPositions = [min + ((1800) * 1000), min + ((2 * 3600) * 1000), min + ((3 * 3600) * 1000), min + ((4 * 3600) * 1000), min + ((5 * 3600) * 1000), min + ((6 * 3600) * 1000), min + ((7 * 3600) * 1000)];

        var xAxis_format = '%l:%M %P';
        var tooltip_format = '%l:%M %P EST';
      break;
      case 'mmbbl-1':
        var min = latestDate.subtract(5, 'days').format('X') * 1000;
        var xAxis_format = '%a, %b %e %Y';
        var tooltip_format = '%a, %b %e';
      break;
      case 'mmbbl-2':
        var min = latestDate.subtract(10, 'days').format('X') * 1000;
        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%a, %b %e';
      break;
      case 'mmbbl-3':
        var min = latestDate.subtract(1, 'months').format('X') * 1000;
        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%a, %b %e';
      break;
      case 'mmbbl-4':
        var min = latestDate.subtract(3, 'months').format('X') * 1000;
        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%a, %b %e';
      break;
      case 'mmbbl-5':
        var min = latestDate.subtract(6, 'months').format('X') * 1000;
        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%a, %b %e';
      break;
      case 'mmbbl-6':
        var min = latestDate.subtract(9, 'months').format('X') * 1000;
        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%b %e %Y';
      break;
      case 'mmbbl-7':
        var min = latestDate.subtract(1, 'years').format('X') * 1000;
        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%b %e %Y';
      break;
      case 'mmbbl-8':
        var min = latestDate.subtract(3, 'years').format('X') * 1000;
        var xAxis_format = '%b %Y';
        var tooltip_format = '%b %e %Y';
      break;
      case 'mmbbl-9':
        var min = latestDate.subtract(5, 'years').format('X') * 1000;
        var xAxis_format = '%b %Y';
        var tooltip_format = '%b %e %Y';
      break;
      case 'mmbbl-10':
        var min = latestDate.subtract(10, 'years').format('X') * 1000;
        var xAxis_format = '%b %Y';
        var tooltip_format = '%b %e %Y';
      break;
      default:
        var min = latestDate.subtract(10, 'years').format('X') * 1000;
        var xAxis_format = '%b %Y';
        var tooltip_format = '%b %e %Y';
      break;
    }

    //Get oldest date available to check if data range is possible
    var oldestDate = moment.utc(data.highchartsData[0][0]).subtract(5, 'hours').format('X') * 1000;
    //If min is less than oldest data available, set min to oldest date
    if(min <= oldestDate){
      min = oldestDate;
    }

    //console.log('DATA', data, min);

    var monmemGraphObject = {
      title: {
          text: ''
      },
      chart: {
          type: 'spline'
      },
      xAxis: {
          type: 'datetime',
          labels: {
              overflow: 'justify',
              formatter: function(){

                if(this.isFirst && mm_range === 'mmbbl-0'){
                  return Highcharts.dateFormat(xAxis_format, this.value) + '<br>(Open EST)';
                }
                if(this.isLast && mm_range == 'mmbbl-0'){
                  return Highcharts.dateFormat(xAxis_format, this.value) + '<br>(Close EST)';
                }

                return Highcharts.dateFormat(xAxis_format, this.value);

              }
          },
          tickPositions: tickPositions,
          min: min,
          max: max
      },
      yAxis: {
          title: '',
          floor: 0,
          gridLineDashStyle: 'longdash',
          tickAmount: 4,
          plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
          }],
          labels: {
              formatter: function() {
                  return '$' + this.value
              }
          },
          opposite: true
      },
      tooltip: {
        formatter: function(){
          if(this.x === min && mm_range === 'mmbbl-0'){
            //This text gets attached to the point that matches the minimum for the 1D graph
            return "Yesterday's Closing Price<br />" + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
          }else if(this.point.index === (this.point.series.data.length - 1) && mm_range === 'mmbbl-0'){
            //This text gets attached to the last point in the data for 1D graph
            return "Today's Closing Price<br />" + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
          }else{
            return Highcharts.dateFormat(tooltip_format, this.x) + '<br />' + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
          }
        }
      },
      plotOptions: {
          spline: {
              lineWidth: 2,
              states: {
                  hover: {
                      lineWidth: 3
                  }
              },
              marker: {
                  enabled: false
              }
          }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
          name: data.company_data.c_name,
          data: graphData
      }]
    }

    return monmemGraphObject;
  },
  //Helper to return to company profile page
  backToComp: function(){
    var params = Router.current().getParams();
    var data = Session.get('fin_overview');

    if(typeof data === 'undefined'){
      return '#';
    }

    var company = compUrlName(data.company_data.c_name);
    var ticker = data.company_data.c_ticker;

    return Router.pick_path('content.companyprofile', {company_id: params.company_id, name: company, ticker: ticker});
  },
  //Helper to get company data
  companyData: function(){
    var data = Session.get('new_fin_overview');

    //If data is undefined exit helper
    if(typeof(data) === 'undefined'){
      return ''
    }

    var company_data = data.company_data;

    //Format values
    company_data.lcsi_price_last_updated = (new Date(company_data.lcsi_price_last_updated)).toSNTForm();
    company_data.c_hq_city = toTitleCase(company_data.c_hq_city);
    company_data.csi_trading_vol = nFormatter(Number(company_data.lcsi_trading_vol));
    company_data.avg_volume = nFormatter(Math.round(company_data.avg_volume));

    company_data.min_range = commaSeparateNumber_decimal(Number(company_data.lcsi_52week_low));
    company_data.max_range = commaSeparateNumber_decimal(Number(company_data.lcsi_52week_high));

    company_data.csi_low = Number(company_data.lcsi_low).toFixed(2);
    company_data.csi_high = Number(company_data.lcsi_high).toFixed(2);

    company_data.csi_price = commaSeparateNumber_decimal(Number(company_data.lcsi_price));
    company_data.csi_closing_price = commaSeparateNumber_decimal(Number(company_data.lcsi_closing_price));
    company_data.csi_opening_price = commaSeparateNumber_decimal(Number(company_data.lcsi_opening_price));
    company_data.csi_price_change_since_last = commaSeparateNumber_decimal(Math.round(Number(company_data.lcsi_price_change_since_last) * 100) / 100);
    company_data.csi_percent_change_since_last = commaSeparateNumber_decimal(Math.round(Number(company_data.lcsi_percent_change_since_last) * 100) / 100);


    //Transform dates
    company_data.csi_price_last_updated = moment(company_data.csi_price_last_updated).format('dddd MM/DD/YYYY');
    company_data.c_tr_last_updated = moment(company_data.c_tr_last_updated).format('MM/DD/YYYY');

    //Get beginning of 52 week range (Esitmated 250 open stock market days)
    /*if(data.stock_history.length >= 250){
      var start_val = data.stock_history[250].sh_close;
      company_data.start_range = commaSeparateNumber_decimal(Math.round(Number(start_val) * 100) / 100);
    }else{
      company_data.start_range = 'N/A';
    }*/

    //Determine icon to be displayed
    if(company_data.csi_price_change_since_last > 0){
      company_data.icon = 'fa-arrow-up';
      company_data.change_color = '#44b224';
    }else if(company_data.csi_price_change_since_last < 0){
      company_data.icon = 'fa-arrow-down';
      company_data.change_color = '#ca1010';
    }else{
      company_data.icon = '';
      company_data.change_color = '';
    }

    //Build location string
    if(company_data.c_hq_city !== '' && company_data.c_hq_state !== ''){
      company_data.location = company_data.c_hq_city + ', ' + company_data.c_hq_state;
    }else if(company_data.c_hq_city === '' && company_data.c_hq_state !== ''){
      company_data.location = company_data.c_hq_state;
    }else if(company_data.c_hq_city !== '' && company_data.c_hq_state === ''){
      company_data.location = company_data.c_hq_city;
    }else{
      company_data.location = '';
    }

    company_data.locurl = Router.pick_path('content.locationprofile',{
      loc_id:company_data.c_hq_state,
      city:company_data.c_hq_city,
    })

    return company_data;
  },
  //Helper to display start date
  startDateDisplay: function(){
    var user_start_date = Session.get('user_start_date');

    return typeof(user_start_date) !== 'undefined' ? moment(user_start_date * 1000).format('MM/DD/YYYY') : '';
  },
  //Helper to display end date
  endDateDisplay: function(){
    var user_end_date = Session.get('user_end_date');

    return typeof(user_end_date) !== 'undefined' ? moment(user_end_date * 1000).format('MM/DD/YYYY') : '';
  },
  //Helper to display initial investment
  initialInvestmentDisplay: function(){
    var user_initial_investment = Session.get('user_initial_investment');

    return typeof(user_initial_investment) !== 'undefined' ? commaSeparateNumber_decimal(user_initial_investment) : '';
  },
  //Helper to display money memory result
  moneyMemoryResult: function(){
    var data = Session.get('money_memory');

    if(typeof(data) === 'undefined'){
      return '';
    }

    var obj = {}

    //Determine rise or fall of investment and percent change
    if(data.roi >= 0){
      obj.colorIndicator = '#44b224'
      obj.earn_lose = 'earned';
    }else if(data.roi < 0){
      obj.colorIndicator = '#ca1010'
      obj.earn_lose = 'lost';
    }

    //If rounded absolute roi number is less than or equal to 6 characters in length add commas and fix to 2 decimal points, else shorten to shorthand form
    if(Math.abs(Math.round(data['roi'])).toString().length <= 5){
      obj.roi = commaSeparateNumber_decimal(Math.abs(Math.round(data['roi'] * 100) / 100));
    }else{
      obj.roi = nFormatter(Math.abs(Number(data['roi'])));
    }

    return obj;
  }
})

Template.money_memory_page.events({
  //Event to close tooltip
  'click .mmpg-about-hdr-icon': function(e, t){
    t.$('.mmpg-about').hide();
  },
  //Event to display start date picker
  'click #mm_page_start_div': function(e, t){
    $('#mm-page-start-date').datepicker('show');
    $('.datepicker').css({top: '35px', left: '-28px'});
  },
  //Event to display end date picker
  'click #mm_page_end_div': function(e, t){
    $('#mm-page-end-date').datepicker('show');
    $('.datepicker').css({top: '35px', left: '-28px'});
  },
  //Event to submit money memory tool
  'submit #investment-form': function(e, t){
    e.preventDefault();

    var input = t.$('.mmpg-monmem-amt').val();
    //Remove commas
    input = input.replace(/\,/g, '');
    //Make input a positive number
    input = Math.abs(Number(input));
    //Check to determine if input is a number, if not default to 1000
    if(isNaN(input)){
      input = 1000;
      //Sets input to defaul value of 1000. This is needed because if session variable is previously 1000 and NaN is entered, the helper will not refire since the session variable technically does not change.
      t.$('.mmpg-monmem-amt').val('1,000');
    }
    input = isNaN(input) ? 1000 : input;
    //Set session variable to input value
    Session.set('user_initial_investment', input);

    recallMoneyMemory_page();
  },
  //Event set range session variable
  'click .mmpg-stock-sort-bbl': function(e, t){

    Session.set('mm_range', e.currentTarget.id);
  }
})

function recallMoneyMemory_page(){
  //Get dependencies
  var params = Router.current().getParams();
  var user_start_date = Session.get('user_start_date');
  var user_end_date = Session.get('user_end_date');
  var user_initial_investment = Session.get('user_initial_investment');

  Meteor.call('GetMoneyMemoryData', params.company_id, user_initial_investment, user_start_date, user_end_date, function(err, result){
    if(err){
      //Error code
    }else{
      //console.log('Money Memory Result', result);
      //Success code
      Session.set('money_memory', result.money_memory);
    }
  })
}

function reformatMoneyMemoryData(){
  var data = Session.get('fin_overview');


  var highchartsData = [];

  data.stock_history.forEach(function(item, index){
    //Transform date
    var date = item.sh_date * 1000;
    //Build point array
    var point = [date, Number(item.sh_close)]
    //Push point array to data set
    highchartsData.push(point);
  })

  data.highchartsData = highchartsData;

  var highchartsData2 = [];

  data.daily_update.forEach(function(item, index){
    var date = (item.sh_date - 20 * 60) * 1000;

    var point = [date, Number(item.sh_close)];

    highchartsData2.push(point);
  })

  Session.set('new_one_day_daily_update', highchartsData2);
  Session.set('new_fin_overview', data);
}
