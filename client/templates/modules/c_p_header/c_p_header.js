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
      if(lastUpdated == false || lastUpdated == 'false'){
        lastUpdated = data['csi_price_last_updated'].split(' ')[0];
      }else{
        lastUpdated = lastUpdated;
      }
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
    //console.log(SNTtime(getDate['csi_price_last_updated']));
    //dateChance should return false if undefined or actual new date format
    var dateChange = (new Date(getDate['csi_price_last_updated'])).toSNTFormTime();
    if(dateChange == false || dateChange == 'false' || dateChange == ''){
      data['c_tr_last_updated'] = getDate['csi_price_last_updated'].split(' ')[0];
    }else{
      data['c_tr_last_updated'] = dateChange;
    }
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

    //Get dependencies to find date range
    var dataLength = data.highchartsData.length;
    var latestDate = moment(data.highchartsData[dataLength - 1][0]);
    //Get range value based on option selected

    //GRAPH MUST BE ASC order from [0] - [max] where max is the latest date in unix
    //if above is correct the below will work
    switch(c_p_range){
      case '1D':
        //Set graphData to get minimum
        var graphData = data.highchartsData;

        var condition = false;
        //Get last point of graph
        var count = dataLength - 1;
        //Find the most current day in the list
        var current_month_hour = moment(graphData[count][0]).format('MMDD');
        //Loop through the array to find the beginning of the latest day available
        while(condition === false){
          //get the month and date of the data point
          var time = moment(graphData[count - 1][0]).format('MMDD');
          //If the month and date of the current point dont match the latest day avaiable. Set the previous point to the beggining of the graph
          if(time !== current_month_hour){
            var min = graphData[count][0];
            //Set condition to true to exit while loop
            condition = true;
          }
          //Decrement count to continue loop iteration
          count--;
        }

        var xAxis = function(){
          return Highcharts.dateFormat('%l:%M %P', this.value);
          //var time = new Date(this.value);
          //return moment(this.value, 'America/North_Dakota/Center').tz('America/New_York').format('hh:mm a');
        }

        var tooltip = function(){
          return Highcharts.dateFormat('%l:%M %P CST', this.x) + '<br />' + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
        }

      break;
      case '5D':
        var min = latestDate.subtract(5, 'days').format('X') * 1000;

        var xAxis = function(){
          return Highcharts.dateFormat('%a, %b %e', this.value);
        }

        var tooltip = function(){
          return Highcharts.dateFormat('%a, %b %e', this.x) + '<br />' + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
        }
      break;
      case '10D':
        var min = latestDate.subtract(10, 'days').format('X') * 1000;

        var xAxis = function(){
          return Highcharts.dateFormat('%a, %b %e', this.value);
        }

        var tooltip = function(){
          return Highcharts.dateFormat('%a, %b %e', this.x) + '<br />' + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
        }
      break;
      case '1M':
        var min = latestDate.subtract(1, 'months').format('X') * 1000;

        var xAxis = function(){
          return Highcharts.dateFormat('%a, %b %e', this.value);
        }

        var tooltip = function(){
          return Highcharts.dateFormat('%a, %b %e', this.x) + '<br />' + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
        }
      break;
      case '3M':
        var min = latestDate.subtract(3, 'months').format('X') * 1000;

        var xAxis = function(){
          return Highcharts.dateFormat('%b %e', this.value);
        }

        var tooltip = function(){
          return Highcharts.dateFormat('%a, %b %e', this.x) + '<br />' + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
        }
      break;
      case '6M':
        var min = latestDate.subtract(6, 'months').format('X') * 1000;

        var xAxis = function(){
          return Highcharts.dateFormat('%b %e', this.value);
        }

        var tooltip = function(){
          return Highcharts.dateFormat('%a, %b %e', this.x) + '<br />' + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
        }
      break;
      case '9M':
        var min = latestDate.subtract(9, 'months').format('X') * 1000;

        var xAxis = function(){
          return Highcharts.dateFormat('%b %e', this.value);
        }

        var tooltip = function(){
          return Highcharts.dateFormat('%b %e %Y', this.x) + '<br />' + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
        }
      break;
      case '1Y':
        var min = latestDate.subtract(1, 'years').format('X') * 1000;

        var xAxis = function(){
          return Highcharts.dateFormat('%b %e %Y', this.value);
        }

        var tooltip = function(){
          return Highcharts.dateFormat('%b %e %Y', this.x) + '<br />' + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
        }
      break;
      case '3Y':
        var min = latestDate.subtract(3, 'years').format('X') * 1000;

        var xAxis = function(){
          return Highcharts.dateFormat('%b %Y', this.value);
        }

        var tooltip = function(){
          return Highcharts.dateFormat('%b %e %Y', this.x) + '<br />' + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
        }
      break;
      case '5Y':
        var min = latestDate.subtract(5, 'years').format('X') * 1000;

        var xAxis = function(){
          return Highcharts.dateFormat('%Y', this.value);
        }

        var tooltip = function(){
          return Highcharts.dateFormat('%b %e %Y', this.x) + '<br />' + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
        }
      break;
      case '10Y':
        var min = latestDate.subtract(10, 'years').format('X') * 1000;

        var xAxis = function(){
          return Highcharts.dateFormat('%Y', this.value);
        }

        var tooltip = function(){
          return Highcharts.dateFormat('%b %e %Y', this.x) + '<br />' + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
        }
      break;
      default:

      break;
    }

    //Get oldest date available to check if data range is possible
    var oldestDate = moment(data.highchartsData[0][0]).format('X') * 1000;
    //If min is less than oldest data available, set min to oldest date
    if(min <= oldestDate){
      min = oldestDate;
    }

    var cfoGraphObject = {
      /*global:{
        timezoneOffset: -6 * 60
      },*/
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
              overflow: 'justify',
              formatter: xAxis
          },
          min: min
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
        formatter: tooltip
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
              //pointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
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
