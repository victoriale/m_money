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
    var textStuff = Session.get('cp_head_textStuff');
    if ( textStuff.length > 0 ) {
      addCustomScroller('p-head-bottom-text');
    }
    
    resizetext(".p-head-top-name", ".p-head-top-name-txt", "44px");
  });
});

Template.cp_body.onCreated(function(){
  this.autorun(function(){
    //actual time of data coming in which is 5 hours and 15 mins
    var data = Session.get('daily_update');
    //date comparison
    if(typeof data != 'undefined'){
      lastUpdated = (new Date(data['csi_price_last_updated'])).toSNTFormTime();
      if(lastUpdated == false || lastUpdated == 'false'){
        lastUpdated = data['csi_price_last_updated'].split(' ')[0];
      }else{
        lastUpdated = lastUpdated;
      }
    }
  })
})

Template.c_p_header.helpers({
  graphTitle: function(){
    var c_p_range = Session.get('c_p_range');
    if(c_p_range === '1D'){
      var data = Session.get('new_header_one_day_daily_update');
      if(typeof data == 'undefined'){
        return '';
      }
      return ' - ' + moment.utc(data[0][0]).subtract(5, 'hours').format('dddd MMM Do, YYYY');
    }

    return '';

  }
});

Template.cp_head.helpers({
  topInfo: function(){
    var data = Session.get('profile_header');
    var getDate = Session.get('daily_update');
    if(typeof data == 'undefined'){
      return '';
    }
    //console.log(SNTtime(getDate['csi_price_last_updated']));
    //dateChance should return false if undefined or actual new date format
    var dateChange = (new Date(getDate['csi_price_last_updated'])).toSNTFormTime();
    if(dateChange == false || dateChange == 'false' || dateChange == ''){
      data['c_tr_last_updated'] = getDate['csi_price_last_updated'].split(' ')[0];
    }else{
      data['c_tr_last_updated'] = dateChange;
    }
    data.mrURL = globalUrl(data.c_exchange);
    return data;
  },
  text: function(){
    var data = Session.get('bio_location');
    var aidata = Session.get('AI_daily_update');
    var textStuff = '';
    
    if(typeof data == 'undefined' && typeof aidata == "undefined" ){
      textStuff = '';
    }
    else if ( typeof aidata == "undefined" || aidata == 'false' || aidata == false || aidata == '' ) {
      textStuff = data.c_desc;
    }
    else {
      textStuff = aidata;
    }
    Session.set('cp_head_textStuff', textStuff);
    return textStuff;
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
    data.sect_url = Router.pick_path('content.sector',{page_num: 1, loc_id: data.c_hq_state, sector_id: compUrlName(data.c_sector)});
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
    data['lastUpdated'] = "as of "+ lastUpdated;
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

    var graphData = data.highchartsData;

    //Set default values for highcharts obj
    var max = null;
    var tickPositions = undefined;
    var offset = getHourOffset();
    //13 if DST, else 14
    var minHour = offset === 4 ? 13 : 14;
    //20 if DST, else 21
    var maxHour = minHour + 7;

    //Get dependencies to find date range
    var dataLength = data.highchartsData.length;
    var latestDate = moment(data.highchartsData[dataLength - 1][0]);
    //Get range value based on option selected

    switch(c_p_range){
      case '1D':
        //Set graphData to get minimum
        var graphData = Session.get('new_header_one_day_daily_update');
        var dataLength = graphData.length;

        //Set min and max of graphs to latest day available (9:00am EST/EDT - 4:00pm EST/EDT)
        var min = moment.utc(graphData[dataLength - 1][0]).subtract(offset, 'hours').hour(minHour).minute(0).second(0).format('X') * 1000;
        var max = moment.utc(graphData[dataLength - 1][0]).subtract(offset, 'hours').hour(maxHour).minute(5).second(0).format('X') * 1000;

        var tickPositions = [min + ((1800) * 1000), min + ((2 * 3600) * 1000), min + ((3 * 3600) * 1000), min + ((4 * 3600) * 1000), min + ((5 * 3600) * 1000), min + ((6 * 3600) * 1000), min + ((7 * 3600) * 1000)];

        var xAxis_format = '%l:%M %P';
        var tooltip_format = '%l:%M %P ' + getTimezone();

      break;
      case '5D':
        var min = latestDate.subtract(5, 'days').format('X') * 1000;

        var xAxis_format = '%a, %b %e';
        var tooltip_format = '%a, %b %e';
      break;
      case '10D':
        var min = latestDate.subtract(10, 'days').format('X') * 1000;

        var xAxis_format = '%a, %b %e';
        var tooltip_format = '%a, %b %e';
      break;
      case '1M':
        var min = latestDate.subtract(1, 'months').format('X') * 1000;

        var xAxis_format = '%a, %b %e';
        var tooltip_format = '%a, %b %e';
      break;
      case '3M':
        var min = latestDate.subtract(3, 'months').format('X') * 1000;

        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%a, %b %e';
      break;
      case '6M':
        var min = latestDate.subtract(6, 'months').format('X') * 1000;

        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%a, %b %e';
      break;
      case '9M':
        var min = latestDate.subtract(9, 'months').format('X') * 1000;

        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%b %e %Y';
      break;
      case '1Y':
        var min = latestDate.subtract(1, 'years').format('X') * 1000;

        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%b %e %Y';
      break;
      case '3Y':
        var min = latestDate.subtract(3, 'years').format('X') * 1000;

        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%b %e %Y';
      break;
      case '5Y':
        var min = latestDate.subtract(5, 'years').format('X') * 1000;

        var xAxis_format = '%b %Y';
        var tooltip_format = '%b %e %Y';
      break;
      case '10Y':
        var min = latestDate.subtract(10, 'years').format('X') * 1000;

        var xAxis_format = '&b %Y';
        var tooltip_format = '%b %e %Y';
      break;
      default:

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
            formatter: function(){

              if(this.isFirst && c_p_range === '1D'){
                return Highcharts.dateFormat(xAxis_format, this.value) + '<br>(Open ' + getTimezone() + ')';
              }
              if(this.isLast && c_p_range == '1D'){
                return Highcharts.dateFormat(xAxis_format, this.value) + '<br>(Close ' + getTimezone() + ')';
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
          opposite:true,
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
      },
      tooltip: {
        formatter: function(){

          if(this.x === min && c_p_range === '1D'){
            //This text gets attached to the point that matches the minimum for the 1D graph]
            return "Yesterday's Closing Price<br />" + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
          }else if(this.x >= max - (5 * 60 * 1000) && this.x <= max && c_p_range === '1D'){
            //This text gets attached to the last point in the data for 1D graph, if the point is greater than 5 minutes of the max value
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
          name: data.c_name,
          data: graphData
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
    var data2 = Session.get('one_day_daily_update');
    if(typeof data == 'undefined'){
      return '';
    }
    if(typeof data2 == 'undefined'){
      return '';
    }
    var highchartsData = [];
    data.stock_hist.forEach(function(item, index){
      //Transform date
      var date = item.sh_date * 1000;
      //Build point array
      var point = [date, Number(item.sh_close)]
      //Push point array to data set
      highchartsData.push(point);
    })

    var highchartsData2 = [];

    data2.stock_hist.forEach(function(item, index){
      var date = (item.sh_date - 20 * 60) * 1000;

      var point = [date, Number(item.sh_close)];
      highchartsData2.push(point);
    })

    //GRAPH MUST BE ASC order from [0] - [max] where max is the latest date in unix
    highchartsData.sort().reverse();
    data.highchartsData = highchartsData;
    Session.set('graph_data', data);
    Session.set('new_header_one_day_daily_update', highchartsData2);
  })
})
