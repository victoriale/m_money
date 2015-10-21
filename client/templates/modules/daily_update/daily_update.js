/*Author: [Thanush Subramanian Elango]
Created: [07/15/2015]
Description: [daily_update]
Associated Files: [daily_update.less][daily_update.html]*/

Template.daily_update.onCreated(function(){
  this.autorun(function(){
    console.log(Session.get('state_id'),Session.get('city_id'));
    if(Session.get('IsLocation')){
      Meteor.call('GetAIContent2', Session.get('state_id'), Session.get('city_id'), function(err, data){
        if(err){
          console.log("error Call", err);
          return false;
        }else{
          var aiContent = createGenericString(false, data);
          Session.set('AI_daily_update',aiContent);
        }
      })
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
    //data is being returned as string so convert to numbers and round to fit design
    data['csi_closing_price'] = Number(data['csi_closing_price']).toFixed(2);
    data['csi_market_cap'] = nFormatter(Number(data['csi_market_cap']));
    data['csi_pe_ratio'] = Number(data['csi_pe_ratio']).toFixed(2);
    data['csi_percent_change_since_last'] = Number(data['csi_percent_change_since_last']).toFixed(2);
    data['csi_price'] = Number(data['csi_price']).toFixed(2);
    data['csi_price_change_since_last'] = Number(data['csi_price_change_since_last']).toFixed(2);
    data['csi_total_shares'] = nFormatter(Number(data['csi_total_shares']));
    data['csi_trading_vol'] = nFormatter(Number(data['csi_trading_vol']));

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
        var range = 1;
        var min = latestDate.subtract(1, 'days').format('X') * 1000;
      break;
      case '5D':
        var range = 5;
        var min = latestDate.subtract(5, 'days').format('X') * 1000;
      break;
      case '10D':
        var range = 10;
        var min = latestDate.subtract(10, 'days').format('X') * 1000;
      break;
      case '1M':
        var range = 30;
        var min = latestDate.subtract(1, 'months').format('X') * 1000;
      break;
      case '3M':
        var range = 90;
        var min = latestDate.subtract(3, 'months').format('X') * 1000;
      break;
      case '6M':
        var range = 180;
        var min = latestDate.subtract(6, 'months').format('X') * 1000;
      break;
      case '9M':
        var range = 270;
        var min = latestDate.subtract(9, 'months').format('X') * 1000;
      break;
      case '1Y':
        var range = 365;
        var min = latestDate.subtract(1, 'years').format('X') * 1000;
      break;
      case '3Y':
        var range = 1095;
        var min = latestDate.subtract(3, 'years').format('X') * 1000;
      break;
      case '5Y':
        var range = 1825;
        var min = latestDate.subtract(5, 'years').format('X') * 1000;
      break;
      case '10Y':
        var range = 3650;
        var min = latestDate.subtract(10, 'years').format('X') * 1000;
      break;
      default:
        var range = 3650;
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
                  return '$' + this.value
              }
          },
      },
      tooltip: {
        pointFormat: "Value: ${point.y:.2f}"
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
