/* Author: Ryan Fisher
** Created: 07/17/2015
** Description: .less file for Money Memory page
** Associated Files: money_memory.html, money_memory.less, money_memory_logic.js
*/

//Function to render the spline chart
function moneymemorygraph() {
  var seriesOptions = [],
  seriesCounter = 0,
  //Placeholder data labels
  names = ['', 'AAPL', ''],

  //Chart options
  createChart = function () {
    $('#moneymemorygraph').highcharts({
      exporting:{
        enabled:false
      },

      credits:{
        enabled:false
      },

      chart:{
        width: 453,
        height: 125,

      },
      xAxis:{
        type:'datetime',
        labels: {
          format: '{value:%b}'
        },
        min: new Date('2009/09/10').getTime(),
        max: new Date('2010/03/10').getTime(),
        title: '',

      },

      tooltip: {
        pointFormat: "Value: ${point.y:.2f}"
      },

      yAxis: {
        title:'',
        tickInterval: 2,
        opposite: true,
        labels: {
          format: '{value:.2f}'
        },
      },
      scrollbar:{
        enabled:false
      },
      rangeSelector: {
        selected: 4,
        inputEnabled: false,
        buttonTheme: {
          visibility: 'hidden'
        },
      },
      title: {
        text: ''
      },
      spline: {
        lineWidth: 3,
        states: {
          hover: {
            lineWidth: 4
          }
        },
      },
      legend:{
        enabled:false
      },
      series:
      seriesOptions,
      marker: {
        enabled: true
      }
    });
  };

  //Populate chart with data
  $.each(names, function (i, name) {

    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?',    function (data) {
      seriesOptions[i] = {
        name: name,
        data: data,
        type:'spline',
        marker: {symbol: 'circle'}
      };

      // As we're loading the data asynchronously, we don't know what order it will arrive. So
      // we keep a counter and create the chart when all the data is loaded.
      seriesCounter += 1;

      if (seriesCounter === names.length) {
        createChart();
      }
    });
  });
}

Template.money_memory.rendered=function() {
  moneymemorygraph();
}

Template.money_memory.helpers({
  company: "Apple, Inc.",
  stck_prc: "109.34",
  stck_chng: "#ca1010",
  stck_nums: "-3.42 (-3.03%)",
  arrow: "arrow-down",
  earn_lose: "earned",
  pot_amount: "12,950.72",
  totl_inc: "+46.2",
  amount: "#22a922",
  chng: "risen",
  comp_bgn_date: "01/03/11",
  intl_invstmnt: "10,000",
  strt_date: "03/01/15",
  end_date: "03/19/15"
});
