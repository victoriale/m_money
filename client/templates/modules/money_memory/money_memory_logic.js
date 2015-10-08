/* Author: Ryan Fisher
** Created: 07/17/2015
** Description: .less file for Money Memory page
** Associated Files: money_memory.html, money_memory.less, money_memory_logic.js
*/

Template.money_memory.onRendered(function(){
  moneymemorygraph();
  this.autorun(function(){
  })
});

Template.money_memory.helpers({
  companyInfo: function(){
    var data = Session.get('daily_update');
    if(typeof data == 'undefined'){
      return '';
    }
    //data is being returned as string so convert to numbers and round to fit design
    data['csi_percent_change_since_last'] = Number(data['csi_percent_change_since_last']).toFixed(2);
    data['csi_price'] = Number(data['csi_price']).toFixed(2);
    data['csi_price_change_since_last'] = Number(data['csi_price_change_since_last']).toFixed(2);
    return data;
  },

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


//Function to render the spline chart
function moneymemorygraph() {
  var graphData = Session.get('money_memory');
  var companyData = Session.get('profile_header');
  var stockData = graphData.stock_history;

  var seriesOptions = [],
  seriesCounter = 0,
  //Placeholder data labels
  names = 'AAPL'

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
        pointFormat: companyData.c_ticker+": ${point.y:.2f}"
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
      stockData,
      marker: {
        enabled: true
      }
    });
  };

  //Populate chart with data

    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?',    function (data) {
      var seriesOptions = {
        name: name,
        data: data,
        type:'spline',
        marker: {symbol: 'circle'}
      };

      createChart();
    });

}
