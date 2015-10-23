/*Author: [Thanush Subramanian Elango]
Created: [07/15/2015]
Description: [daily_update]
Associated Files: [daily_update.less][daily_update.html]*/

Template.daily_update.onCreated(function(){
  this.autorun(function(){
    if(Session.get('IsLocation')){
      //Set initial range
      Session.set('d_u_range', '5Y');

      Meteor.call('GetAIContent2', Session.get('state_id'), Session.get('city_id'), function(err, data){
        if(err){
          console.log("error Call", err);
          return false;
        }else{
          var aiContent = createGenericString(false, data);
          Session.set('AI_daily_update',aiContent);
        }
      })

      transformLocationDailyUpdate();
    }
  })
  this.autorun(function(){
    if(Session.get('IsCompany')){
      var companyid =  Session.get('profile_header');
      if(typeof companyid != 'undefined'){
        Meteor.call('GetAIContent', companyid.c_id, function(err, data){
          if(err){
            console.log("error Call", err);
            return false;
          }else{
            var aiContent = createGenericString(false, data);
            Session.set('AI_daily_update',aiContent);
          }
        })
      }
    }
  })
})

//Function to transform location data to form useable my already existing helpers
function transformLocationDailyUpdate(){
  var data = Session.get('location_daily_update');
  //If data is undefined exit function
  if(typeof data === 'undefined'){
    return '';
  }

  var highchartsData = [];
  var daily_update = {};

  data.composite_history.forEach(function(item, index){
    //Transform date
    var date = moment(item.date).format('X') * 1000;
    //Build point array
    var point = [date, Number(item.price)]
    //Push point array to data set
    highchartsData.push(point);
  })

  //GRAPH MUST BE ASC order from [0] - [max] where max is the latest date in unix
  highchartsData.reverse();
  data.highchartsData = highchartsData;

  Session.set('graph_data', data);

  daily_update.csi_price = data.composite_summary.current_price;
  daily_update.csi_percent_change_since_last = data.composite_summary.percent_change;
  daily_update.csi_price_change_since_last = data.composite_summary.price_change;
  daily_update.lastUpdated = moment(data.composite_summary.last_updated).tz('America/New_York').format('dddd MM/DD/YYYY hh:mma') + ' EST';
  daily_update.todays_high = data.composite_summary.todays_high;
  daily_update.todays_low = data.composite_summary.todays_low;
  daily_update.previous_close = data.composite_summary.previous_close;
  daily_update.total_companies = data.composite_summary.total_companies;


  Session.set('daily_update', daily_update);
}

Template.daily_update.onRendered(function(){
  this.autorun(function(){
    /*
    **make sure title stays correct size to fit div
    **max div is the max width before text needs to resizetext
    **cur div is the container containing the text-align
    **cursize is the cur font-size of the container that needs to decrease
    */
    resizetext(".all_daily_update_modules-regiontext", ".all_daily_update_modules-regiontext-txt", "18px");
  })
})

Template.daily_update.events({
  'click .daily_update-buttons-circle': function(e, t){
    Session.set('d_u_range', e.currentTarget.id);
  },
})

Template.daily_update.helpers({
  buttons: function(){
    var buttons = [
      {data:"1D"},
      {data:"5D"},
      {data:"10D"},
      {data:"1M"},
      {data:"3M"},
      {data:"6M"},
      {data:"9M"},
      {data:"1Y"},
      {data:"3Y"},
      {data:"5Y"},
    ];
    return buttons;
  },
  aiInfo: function(){
      var data = Session.get('AI_daily_update');
      var content = {};
      if(typeof data == 'undefined' || data == false){
        return '';
      }
      content['content'] = data;
      return content;
  },

  lastUpdated: function(){
    var data = Session.get('daily_update');
    if(typeof data == 'undefined'){
      return '';
    }
    return data.lastUpdated;
  },

  lbInfo: function(){
    var data = Session.get('daily_update');
    if(typeof data == 'undefined'){
      return {new:"stuff"};
    }

    var currentRoute = Router.current().route.getName();

    switch(currentRoute){
      case 'content.locationprofile':
        data.text1 = 'Todays Low';
        data.text2 = 'Todays High';
        data.text3 = 'Previous Close';
        data.text4 = 'Total Companies';

        data.value1 = data.todays_low;
        data.value2 = data.todays_high;
        data.value3 = commaSeparateNumber_decimal(Number(data.previous_close));
        data.value4 = data.total_companies;
      break;
      case 'content.companyprofile':
        data.text1 = 'Market Cap';
        data.text2 = 'PE Ratio';
        data.text3 = 'Total Shares';
        data.text4 = 'Average Volume';

        data.value1 = nFormatter(Number(data['csi_market_cap']));;
        data.value2 = Number(data['csi_pe_ratio']).toFixed(2);
        data.value3 = nFormatter(Number(data['csi_total_shares']));
        data.value4 = nFormatter(Number(data['csi_trading_vol']));
      break;
    }

    //data is being returned as string so convert to numbers and round to fit design
    data['csi_percent_change_since_last'] = Number(data['csi_percent_change_since_last']).toFixed(2);
    data['csi_price'] = commaSeparateNumber_decimal(Math.round(data['csi_price'] * 100) / 100);
    data['csi_price_change_since_last'] = Number(data['csi_price_change_since_last']).toFixed(2);

    console.log('adfDATA', data);

    return data;
  },

  //Helper to determine chart
  getGraph: function(){
    var data = Session.get('graph_data');
    var d_u_range = Session.get('d_u_range');

    //If data does not exists exit helper
    if(typeof data === 'undefined'){
      return ''
    }

    //Get dependencies to find date range
    var dataLength = data.highchartsData.length;
    var latestDate = moment(data.highchartsData[dataLength - 1][0]);
    //Get range value based on option selected

    //GRAPH MUST BE ASC order from [0] - [max] where max is the latest date in unix
    //if above is correct the below will work
    switch(d_u_range){
      case '1D':
        var min = latestDate.subtract(1, 'days').format('X') * 1000;
      break;
      case '5D':
        var min = latestDate.subtract(5, 'days').format('X') * 1000;
      break;
      case '10D':
        var min = latestDate.subtract(10, 'days').format('X') * 1000;
      break;
      case '1M':
        var min = latestDate.subtract(1, 'months').format('X') * 1000;
      break;
      case '3M':
        var min = latestDate.subtract(3, 'months').format('X') * 1000;
      break;
      case '6M':
        var min = latestDate.subtract(6, 'months').format('X') * 1000;
      break;
      case '9M':
        var min = latestDate.subtract(9, 'months').format('X') * 1000;
      break;
      case '1Y':
        var min = latestDate.subtract(1, 'years').format('X') * 1000;
      break;
      case '3Y':
        var min = latestDate.subtract(3, 'years').format('X') * 1000;
      break;
      case '5Y':
        var min = latestDate.subtract(5, 'years').format('X') * 1000;
      break;
      case '10Y':
        var min = latestDate.subtract(10, 'years').format('X') * 1000;
      break;
      default:
        var min = latestDate.subtract(5, 'years').format('X') * 1000;
      break;
    }
    //Get oldest date available to check if data range is possible
    var oldestDate = moment(data.highchartsData[0][0]).format('X') * 1000;
    //If min is less than oldest data available, set min to oldest date
    if(min <= oldestDate){
      min = oldestDate;
    }
    var cfoGraphObject = {
      title: {
          text: ''
      },
      chart: {
          height:120,
          type: 'spline',
          events: {
              redraw: function() {}
          }
      },
      xAxis: {
          type: 'datetime',
          labels: {
              overflow: 'justify'
          },
          min: min
      },
      yAxis: {
          title: '',
          floor: 0,
          opposite:true,
          gridLineDashStyle: 'longdash',
          tickPixelInterval:25,
          minTickInterval: 5,
          plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
          }],
          labels: {
              formatter: function() {
                  return '$' + commaSeparateNumber_decimal(this.value)
              }
          },
      },
      tooltip: {
        //pointFormat: "Value: ${point.y:.2f}",
        formatter: function(){
          return moment(this.x).format('dddd MM/DD/YYYY') + '<br />Value: $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
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
          name: data.c_name,
          data: data.highchartsData
      }]
    }

    return cfoGraphObject;
  },
});
