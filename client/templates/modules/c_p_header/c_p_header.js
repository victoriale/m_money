/*   Author: David Wibowo
**** Created: [09/30/2015]
**** Description: Exec profile header
**** Associated Files: c-p_header.html, c-p_header.less, c-p_header_logic.js
*/
Template.cp_head.onRendered(function(){
  /*
  **make sure title stays correct size to fit div
  **max div is the max width before text needs to resizetext
  **cur div is the container containing the text-align
  **cursize is the cur font-size of the container that needs to decrease
  */
  this.autorun(function(){
    resizetext(".p-head-top-name", ".p-head-top-name-txt", "44px");
  })
})

Template.cp_body.onCreated(function(){
  this.autorun(function(){
    //actual time of data coming in which is 5 hours and 15 mins
    var data = Session.get('daily_update');
    //date comparison
    if(typeof data != 'undefined'){
      lastUpdated = (new Date(data['csi_price_last_updated'])).toSNTFormTime();
    }
  })
})


Template.cp_head.helpers({
  topInfo: function(){
    var data = Session.get('profile_header');
    var getDate = Session.get('daily_update');
    if(typeof data == 'undefined'){
      return '';
    }
    data['c_tr_last_updated'] = (new Date(getDate['csi_price_last_updated'])).toSNTFormTime();
    return data;
  },
  text: function(){
    var data = Session.get('bio_location');
    var aidata = Session.get('AI_daily_update');
    if(typeof data == 'undefined' && typeof aidata == "undefined" ){
      return '';
    }
    if ( typeof aidata == "undefined" ) {
      return data.c_desc;
    }
    return aidata;
  },
  locationURL: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return Router.pick_path('content.locationprofile',{
      loc_id:data.c_hq_state,
      city:data.c_hq_city
    });
  },

});

Template.cp_body.helpers({

  bodyInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data;
  },

  stockInfo: function(){
    var data = Session.get('daily_update');
    if(typeof data == 'undefined'){
      return '';
    }
    //data is being returned as string so convert to numbers and round to fit design
    data['csi_percent_change_since_last'] = Number(data['csi_percent_change_since_last']).toFixed(2);
    data['csi_price'] = Number(data['csi_price']).toFixed(2);
    data['csi_price_change_since_last'] = Number(data['csi_price_change_since_last']).toFixed(2);
    data['lastUpdated'] = lastUpdated;
    Session.set('daily_update',data);
    return data;
  },

});

Template.cp_rdr.helpers({
  rdrInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data;
  },
});

Template.c_p_graph.helpers({
  buttons: function(){
    var match = Session.get('c_p_range');
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
    for ( var i = 0; i < buttons.length; i++ ) {
      if ( buttons[i].data == match ) {
        buttons[i].class = "active";
      }
    }
    return buttons;
  },

  //Helper to determine chart
  getGraph: function(){
    var data = Session.get('graph_data');
    var c_p_range = Session.get('c_p_range');

    //If data does not exists exit helper
    if(typeof data === 'undefined'){
      return '';
    }

    //Get dependencies to find date range
    var dataLength = data.highchartsData.length;
    var latestDate = moment(data.highchartsData[dataLength - 1][0]);
    //Get range value based on option selected

    //GRAPH MUST BE ASC order from [0] - [max] where max is the latest date in unix
    //if above is correct the below will work
    switch(c_p_range){
      case '1D':
        var range = 1;
        //Old Method: Pulled 24 hour period. So when stock is closed, on graph straight line was shown
        //var min = latestDate.subtract(1, 'days').format('X') * 1000;
        //var min = moment().utc().hour(8).format('X') * 1000;
        var min = new Date().setUTCHours(8);
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

Template.c_p_graph.events({
  'click .c_p_graph-buttons-circle': function(e, t){
    Session.set('c_p_range', e.currentTarget.id);
  },
})

Template.c_p_graph.onCreated(function(){
  Session.set('c_p_range', '1D');
  this.autorun(function(){
    var data = Session.get('daily_update');
    var highchartsData = [];
    if(typeof data == 'undefined'){
      return '';
    }
    data.stock_hist.forEach(function(item, index){
      //Transform date
      var date = item.sh_date * 1000;
      //Build point array
      var point = [date, Number(item.sh_close)]
      //Push point array to data set
      highchartsData.push(point);
    })

    //GRAPH MUST BE ASC order from [0] - [max] where max is the latest date in unix
    highchartsData.reverse();
    data.highchartsData = highchartsData;

    Session.set('graph_data', data);
  })
})
