/* Author: Ryan Fisher
** Created: 09/09/2015
** Description: .js file for Company Executive Page - Money Memory
** Associated Files: money_memory_page.html, money_memory_page.less, money_memory_page_logic.js
*/
Template.money_memory_page.onCreated(function(){
  //Set default values
  var default_end = moment().format('X');
  var default_start = moment().add(-30, 'days').format('X');

  Session.set('user_initial_investment', 1000);
  Session.set('user_start_date', Number(default_start));
  Session.set('user_end_date', Number(default_end));

  recallMoneyMemory_page();
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
  getMonMemChart: function(){
      //get data for chart here
      var url =  "";
      $.getJSON(url,  function(data) {
        // dupGraphObject.series[0].data = data;
        // //set chart to initial position
        // var ctime = dupGraphObject.series[0].data[dupGraphObject.series[0].data.length-1][0];
        // dupGraphObject.xAxis.min = ctime - 24*3600000;
        // dupGraphObject.xAxis.labels.format = "{value:%l%p}";
        new Highcharts.Chart(monmemGraphObject);
      });
      return monmemGraphObject;
  },
  //Helper to return to company profile page
  backToComp: function(){
    var params = Router.current().getParams();

    return Router.path('content.companyprofile', {company_id: params.company_id});
  },
  //Helper to get company data
  companyData: function(){
    var data = Session.get('fin_overview');

    //If data is undefined exit helper
    if(typeof(data) === 'undefined'){
      return ''
    }

    var company_data = data.company_data;

    //Format values
    company_data.c_hq_city = toTitleCase(company_data.c_hq_city);
    company_data.csi_trading_vol = nFormatter(Number(company_data.csi_trading_vol));
    company_data.avg_volume = nFormatter(Math.round(company_data.avg_volume));
    company_data.csi_price = commaSeparateNumber_decimal(Number(company_data.csi_price));
    company_data.csi_closing_price = commaSeparateNumber_decimal(Number(company_data.csi_closing_price));
    company_data.csi_opening_price = commaSeparateNumber_decimal(Number(company_data.csi_opening_price));
    company_data.csi_price_change_since_last = commaSeparateNumber_decimal(Math.round(Number(company_data.csi_price_change_since_last) * 100) / 100);
    company_data.csi_percent_change_since_last = commaSeparateNumber_decimal(Math.round(Number(company_data.csi_percent_change_since_last) * 100) / 100);

    //Transform dates
    company_data.csi_price_last_updated = moment(company_data.csi_price_last_updated).tz('America/New_York').format('dddd MM/DD/YYYY hh:mm A') + ' EST';
    company_data.c_tr_last_updated = moment(company_data.c_tr_last_updated).tz('America/New_York').format('MM/DD/YYYY');

    //Get beginning of 52 week range (Esitmated 250 open stock market days)
    if(data.stock_history.length >= 250){
      var sh_length = data.stock_history.length;
      var start_val = data.stock_history[sh_length - 250].sh_close;
      company_data.start_range = commaSeparateNumber_decimal(Math.round(Number(start_val) * 100) / 100);
    }else{
      company_data.start_range = 'N/A';
    }

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

monmemGraphObject = {
  title: {
      text: ''
  },
  chart: {
      type: 'spline',
      events: {
          redraw: function() {}
      }
  },
  xAxis: {
      type: 'datetime',
      labels: {
          overflow: 'justify'
      }
  },
  yAxis: {
      title: '',
      floor: 0,
      gridLineDashStyle: 'longdash',
      minTickInterval: 5,
      plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
      }],
      labels: {
          formatter: function() {
              return '$' + this.value
          }
      }
  },
  tooltip: {
  	pointFormat: "Value: ${point.y:.2f}"
  },
  plotOptions: {
      spline: {
          lineWidth: 4,
          states: {
              hover: {
                  lineWidth: 5
              }
          },
          marker: {
              enabled: false
          },
          pointInterval: 3600000, // one hour
          pointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
      }
  },
  legend: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  series: [{
      name: 'Facebook, Inc.',
      data: [40.20, 40.80, 50.80, 40.80, 41.00, 41.30, 41.50, 42.90, 41.90, 42.60, 41.60, 43.00, 44.00, 43.60, 44.50, 44.20, 44.50, 44.50, 44.00, 43.10, 42.70, 44.00, 42.70, 42.30, 42.30, 44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]
  }]
}

monmemChangeSort = function(index){

  for(var i = 0; i < 11; i++)
  {
    var e = document.getElementById('mmbbl-' + i);
    if(i == index)
    {
      e.className = "mmpg-stock-sort-bbl mmpg-stock-sort-bbl-selected";
    } else {
      e.className = "mmpg-stock-sort-bbl";
    }
  }

  var chart = $('#monmemChart').highcharts();
  switch(index)
  {
    case 0:
      chart.series[0].update({ data: [40.20, 40.80, 50.80, 40.80, 41.00, 41.30, 41.50, 42.90, 41.90, 42.60, 41.60, 43.00, 44.00, 43.60, 44.50, 44.20, 44.50, 44.50, 44.00, 43.10, 42.70, 44.00, 42.70, 42.30, 42.30, 44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 1:
      chart.series[0].update({ data: [44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 2:
      chart.series[0].update({ data: [40.20, 40.80, 50.80, 40.80, 41.00, 41.30, 41.50, 42.90, 41.90, 42.60, 41.60, 43.00, 44.00, 43.60, 44.50, 44.20, 44.50, 44.50, 44.00, 43.10, 42.70, 44.00, 42.70, 42.30, 42.30, 44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 3:
      chart.series[0].update({ data: [44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 4:
      chart.series[0].update({ data: [40.20, 40.80, 50.80, 40.80, 41.00, 41.30, 41.50, 42.90, 41.90, 42.60, 41.60, 43.00, 44.00, 43.60, 44.50, 44.20, 44.50, 44.50, 44.00, 43.10, 42.70, 44.00, 42.70, 42.30, 42.30, 44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 5:
      chart.series[0].update({ data: [44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 6:
      chart.series[0].update({ data: [40.20, 40.80, 50.80, 40.80, 41.00, 41.30, 41.50, 42.90, 41.90, 42.60, 41.60, 43.00, 44.00, 43.60, 44.50, 44.20, 44.50, 44.50, 44.00, 43.10, 42.70, 44.00, 42.70, 42.30, 42.30, 44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 7:
      chart.series[0].update({ data: [44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 8:
      chart.series[0].update({ data: [40.20, 40.80, 50.80, 40.80, 41.00, 41.30, 41.50, 42.90, 41.90, 42.60, 41.60, 43.00, 44.00, 43.60, 44.50, 44.20, 44.50, 44.50, 44.00, 43.10, 42.70, 44.00, 42.70, 42.30, 42.30, 44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 9:
      chart.series[0].update({ data: [44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 10:
      chart.series[0].update({ data: [40.20, 40.80, 50.80, 40.80, 41.00, 41.30, 41.50, 42.90, 41.90, 42.60, 41.60, 43.00, 44.00, 43.60, 44.50, 44.20, 44.50, 44.50, 44.00, 43.10, 42.70, 44.00, 42.70, 42.30, 42.30, 44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
  }
}

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
