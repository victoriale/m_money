/*Author: [Thanush Subramanian Elango]
Created: [07/15/2015]
Description: [daily_update]
Associated Files: [daily_update.less][daily_update.html]*/


///////Chart Creation ///////////
Template.daily_update.dailyupdategraphh =  function(){
  var url =  "http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?";
  $.getJSON(url,  function(data) {
    options.series[0].data = data;
    var chart = new Highcharts.Chart(options);
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
      name: 'National',
      data:'data',
      type: 'spline',
      showInLegend: false,
    },
    {
      name:'Chicago',
      type:'spline',
      showInLegend:false,

    }]
  };
  return options;
};
