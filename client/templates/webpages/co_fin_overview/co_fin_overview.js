/*
Author: Kyle Toom
Date: 8/10/2015
Decription: A page for showing what has happened with a company over a period of time
Associated Files: co_fin_overview.html, co_fin_overview.less, co_fin_overview.js
*/

Template.co_fin_overview.onCreated(function(){
  //Default value for graph range
  Session.set('fo_range', 'cfoBtn0');

  this.autorun(function(){
    var data = Session.get("fin_overview");

    //If data does exist reformat data
    if(typeof data !== 'undefined'){
      Meteor.call('GetAIContent', data.company_data.c_id, function(err, data){
        if(err){
          console.log("error Call", err);
          return false;
        }else{
          var aiContent = createGenericString(false, data);
          Session.set('AI_daily_update',aiContent);
        }
      })

      reformatFinancialOverviewData();
    }
  })
})

Template.co_fin_overview.helpers({
  //Helper to get ai Content
  AIcontent: function(){
    var data = Session.get('AI_daily_update');

    if(typeof data === 'undefined'){
      return '';
    }

    return data;
  },
  //Helper to determine chart
  getGraphObject: function(){
    var data = Session.get('new_fin_overview');
    var fo_range = Session.get('fo_range');
    //If data does not exists exit helper
    if(typeof data === 'undefined'){
      return ''
    }

    var dataLength = data.highchartsData.length;

    //Set default values for highcharts obj
    var max = null;
    var tickPositions = undefined;

    //Get dependencies to find date range
    var latestDate = moment(data.highchartsData[0][0]);
    data.highchartsData.reverse();
    //Get range value based on option selected
    switch(fo_range){
      case 'cfoBtn0':
        var graphData = data.highchartsData

        //Set min and max of graphs to latest day available (9:00am EST - 4:00pm EST)
        var min = moment.utc(data.highchartsData[dataLength - 1][0]).subtract(5, 'hours').hour(14).minute(0).second(0).format('X') * 1000;
        var max = moment.utc(data.highchartsData[dataLength - 1][0]).subtract(5, 'hours').hour(21).minute(0).second(0).format('X') * 1000;
        //Set static tick positions based on minimum value (9:00am)
        var tickPositions = [min + ((1800) * 1000), min + ((2 * 3600) * 1000), min + ((3 * 3600) * 1000), min + ((4 * 3600) * 1000), min + ((5 * 3600) * 1000), min + ((6 * 3600) * 1000), min + ((7 * 3600) * 1000)];

        var xAxis_format = '%l:%M %P';
        var tooltip_format = '%l:%M %P EST';
      break;
      case 'cfoBtn1':
        var min = latestDate.subtract(5, 'days').format('X') * 1000;
        var xAxis_format = '%a, %b %e %Y';
        var tooltip_format = '%a, %b %e';
      break;
      case 'cfoBtn2':
        var min = latestDate.subtract(10, 'days').format('X') * 1000;
        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%a, %b %e';
      break;
      case 'cfoBtn3':
        var min = latestDate.subtract(1, 'months').format('X') * 1000;
        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%a, %b %e';
      break;
      case 'cfoBtn4':
        var min = latestDate.subtract(3, 'months').format('X') * 1000;
        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%a, %b %e';
      break;
      case 'cfoBtn5':
        var min = latestDate.subtract(6, 'months').format('X') * 1000;
        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%a, %b %e';
      break;
      case 'cfoBtn6':
        var min = latestDate.subtract(9, 'months').format('X') * 1000;
        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%b %e %Y';
      break;
      case 'cfoBtn7':
        var min = latestDate.subtract(1, 'years').format('X') * 1000;
        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%b %e %Y';
      break;
      case 'cfoBtn8':
        var min = latestDate.subtract(3, 'years').format('X') * 1000;
        var xAxis_format = '%b %Y';
        var tooltip_format = '%b %e %Y';
      break;
      case 'cfoBtn9':
        var min = latestDate.subtract(5, 'years').format('X') * 1000;
        var xAxis_format = '%b %Y';
        var tooltip_format = '%b %e %Y';
      break;
      case 'cfoBtn10':
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

    var cfoGraphObject = {
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

                if(this.isFirst && fo_range === 'cfoBtn0'){
                  return Highcharts.dateFormat(xAxis_format, this.value) + '<br>(Open EST)';
                }
                if(this.isLast && fo_range == 'cfoBtn0'){
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
          opposite: true,
          tickAmount: 4
      },
      tooltip: {
      	formatter: function(){
          return Highcharts.dateFormat(tooltip_format, this.x) + '<br />' + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
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
          data: data.highchartsData
      }]
    }

    return cfoGraphObject;
  },
  //Helper to determine which range button is selected
  isRangeSelected: function(val){
    var mm_range = Session.get('fo_range');

    return val === mm_range ? 'cfo-btm-data-period-btn-a' : '';
  },
  //Helper to return to company profile page
  backToComp: function(){
    var params = Router.current().getParams();
    var data = Session.get('new_fin_overview');

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
    //convert high and low to two decimal
    company_data['lcsi_52week_high'] = Number(company_data['lcsi_52week_high']).toFixed(2);
    company_data['lcsi_52week_low'] = Number(company_data['lcsi_52week_low']).toFixed(2);
    //console.log('company data', company_data);

    //Get beginning of 52 week range (Esitmated 250 open stock market days)
    if(data.stock_history.length >= 250){
      var start_val = data.stock_history[250].sh_close;
      company_data.start_range = Math.round(Number(start_val) * 100) / 100;
      //Find percentage change since a year ago
      var pResult = findPercentage(Number(company_data.lcsi_price), company_data.start_range);
      //Set value for percent change
      company_data.percent_year_value = pResult.value;
      //Set text to be displayed before value
      if(pResult.type === 'increase'){
        company_data.percent_year_type = 'up';
        company_data.percent_year_text = 'increase';
        company_data.amount_year_value = commaSeparateNumber_decimal(Math.round((Number(company_data.lcsi_price) - company_data.start_range) * 100 ) / 100);
      }else{
        company_data.percent_year_type = 'down';
        company_data.percent_year_text = 'decrease';
        company_data.amount_year_value = commaSeparateNumber_decimal(Math.round((company_data.start_range - Number(company_data.lcsi_price)) * 100) / 100);
      }

      company_data.start_range = commaSeparateNumber_decimal(company_data.start_range );
    }else{
      company_data.start_range = 'N/A';
      company_data.percent_year_value = 'N/A';
    }

    //Format values
    company_data.c_hq_city = toTitleCase(company_data.c_hq_city);
    company_data.lcsi_trading_vol = nFormatter(Number(company_data.lcsi_trading_vol));
    company_data.avg_volume = nFormatter(Math.round(company_data.avg_volume));

    company_data.min_range = commaSeparateNumber_decimal((Math.min(Number(company_data.lcsi_opening_price).toFixed(2), Number(company_data.lcsi_closing_price).toFixed(2), Number(company_data.lcsi_price).toFixed(2)) * 100) / 100);
    company_data.max_range = commaSeparateNumber_decimal((Math.max(Number(company_data.lcsi_opening_price).toFixed(2), Number(company_data.lcsi_closing_price).toFixed(2), Number(company_data.lcsi_price).toFixed(2)) * 100) / 100);

    company_data.lcsi_low = Number(company_data.lcsi_low).toFixed(2);
    company_data.lcsi_high = Number(company_data.lcsi_high).toFixed(2);

    company_data.lcsi_price = commaSeparateNumber_decimal(Number(company_data.lcsi_price).toFixed(2));
    company_data.lcsi_closing_price = commaSeparateNumber_decimal(Number(company_data.lcsi_closing_price).toFixed(2));
    company_data.lcsi_opening_price = commaSeparateNumber_decimal(Number(company_data.lcsi_opening_price).toFixed(2));
    company_data.lcsi_price_change_since_last = commaSeparateNumber_decimal(Math.round(Number(company_data.lcsi_price_change_since_last) * 100) / 100);
    company_data.lcsi_percent_change_since_last = commaSeparateNumber_decimal(Math.round(Number(company_data.lcsi_percent_change_since_last) * 100) / 100);
    company_data.lcsi_market_cap = nFormatter(Number(company_data.lcsi_market_cap).toFixed(0));
    company_data.lcsi_earnings_per_share = Math.round(company_data.lcsi_earnings_per_share * 100) / 100;

    company_data.lcsi_pe_ratio = (Number(company_data.lcsi_pe_ratio)).toFixed(2);

    //Transform dates
    company_data.lcsi_price_last_updated = (new Date(company_data.lcsi_price_last_updated)).toSNTFormTime();
    company_data.lcsi_price_last_updated = (new Date(company_data.lcsi_price_last_updated)).toSNTForm();

    company_data.share_company_url =  "https://www.facebook.com/sharer/sharer.php?u=" + Router.pick_path('content.companyprofile', {company_id: company_data.c_id, name: company_data.c_name, ticker: company_data.c_ticker});
    company_data.share_company_fin_overview_url = "https://www.facebook.com/sharer/sharer.php?u=" + Router.pick_path('content.finoverview', {company_id: company_data.c_id, name: company_data.c_name, ticker: company_data.c_ticker});

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
  }
});

Template.co_fin_overview.events({
  //Event to close tooltip
  'click .cfo-btm-what-top-x': function(e, t){
    t.$('.cfo-btm-what').hide();
  },
  //Event set range session variable
  'click .cfo-btm-data-period-btn': function(e, t){
    Session.set('fo_range', e.currentTarget.id);
  }
})

function reformatFinancialOverviewData(){
  var data = Session.get('fin_overview');

  var highchartsData = [];

  data.stock_history.forEach(function(item, index){
    //Transform date
    var date = item.sh_date * 1000;
    //Build point array
    if(!isNaN(date)){
      var point = [date, Number(item.sh_close)]
      //Push point array to data set
      highchartsData.push(point);
    }
  })
  data.highchartsData = highchartsData;

  Session.set('new_fin_overview', data);
}

//Finds percentage increase or decrease (ex. increase from val 2 to val 1)
 function findPercentage(val1, val2){
  //If recent value is greater than or equal to old value
  if(val1 >= val2){
    var percent = ((((val1 / val2) - 1) * 100)).toFixed(1);
    return {
      value: percent,
      type: 'increase'
    }
  //Else if recent value is less than old value
  }else if(val1 < val2){
    var percent = (((1 - (val1 / val2)) * 100)).toFixed(1);
    //Return decrease object
    return {
      value: percent,
      type: 'decrease'
    }
  }
}
