/*Author: [Thanush Subramanian Elango]
Created: [07/15/2015]
Description: [daily_update]
Associated Files: [daily_update.less][daily_update.html]*/

Template.daily_update.onCreated(function(){
  this.autorun(function(){
    if(Session.get('IsLocation')){
      Meteor.call('GetAIContent2', Session.get('state_id'), Session.get('city_id'), function(err, data){
        if(err){
          console.log("error Call", err);
          return false;
        }else{
          var aiContent = createGenericString(false, data);
          console.log(data);
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


Template.daily_update.helpers({
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
});

///////Chart Creation ///////////
Template.daily_update.dailyupdategraphh =  function(){
  var graphdata = Session.get('daily_update');
  var ticker = Session.get('profile_header');
  var newDataArray = [];
  //JSON array is converted into usable code for Highcharts also does not push NULL values
  $.each(graphdata.stock_hist, function(i, val) {
    var yVal = parseFloat(val.sh_close);
    //makes sure any value passed is null
    if (!isNaN(yVal)) {
      newDataArray.push([val.sh_date * 1000, yVal]);
    }
  });

  var options = {
    exporting:{
      enabled:false
    },
    credits:{
      enabled:false
    },

    scrollbar:{
      enabled:false
    },

    rangeSelector: {
      enabled:false,
      buttonTheme: { // styles for the buttons
        fill: 'none',
        stroke: 'none',
        'stroke-width': 0,
        r: 8,
        style: {
          color: '#039',
          fontWeight: 'bold'
        },
        states: {
          hover: {
          },
          select: {
            fill: '#039',
            style: {
              color: 'white'
            }
          }
        }
      },
      inputBoxBorderColor: 'gray',
      inputBoxWidth: 120,
      inputBoxHeight: 18,
      inputStyle: {
        color: '#039',
        fontWeight: 'bold'
      },
      labelStyle: {
        color: 'silver',
        fontWeight: 'bold'
      },
      selected: 1,
    },
    chart:{
      width:400,
      height:110
    },
    title: {
      text: ''
    },
    yAxis:{
      min:0,
      opposite: true,
      title:'',
      labels:{
        format: '${value}',
      },
    },
    xAxis: {
      type:'datetime',
      labels: {
        enabled: false,
      },
    },
    series: [{
      name: ticker.c_ticker,
      data: newDataArray,
      type: 'spline',
      showInLegend: false,
    }],
  };
  return options;
};
