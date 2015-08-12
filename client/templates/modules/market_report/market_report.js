/* Author: meghana yerramilli
** Created: 08/12/2015
** Description: .js file for market_report page
** Associated Files: market_report.html, market_report.less
*/

mreportTabChange = function(t) {
  for(var i = 1; i <= 4; i++)
  {
    if(i==t)
    {
      document.getElementById("mreport_tab" + i).className = "mreport-mtabs mreport-active_tab";
      document.getElementById("mreport_tab" + i + "_i").className = "mreport-underline";
    } else {
      document.getElementById("mreport_tab" + i).className = "mreport-mtabs mreport-inactive_tab";
      document.getElementById("mreport_tab" + i + "_i").className = "";
    }
  }
}

Template.market_report.onRendered( function() {
  Session.set("how_are_markets");
});

Template.market_report.helpers({                   //helper class for adding data to template dictionary
  mreport_tiles:[
    {open_page:'OPEN PAGE',tile_name:'NASDAQ Companies',class_name:'mreport-c1_tile'},
    {open_page:'OPEN PAGE',tile_name:'NYSE Companies',class_name:'mreport-c2_tile'},
    {open_page:'OPEN PAGE',tile_name:'AMEX Companies',class_name:'mreport-c3_tile'}
  ],

  title:function() {
    var data = Session.get("how_are_markets");
    return ["how are the markets doing today"];
  },

  subtitle:function() {
    var data = Session.get("how_are_markets");
    return ["market report"];
  },
  index_name:function() {
    var data = Session.get("how_are_markets");
    return ["Dow Jones Index"];
  },
  stock_price:function() {
    var data = Session.get("how_are_markets");
    return ["16,405.84"];
  }
  ,
  stock_price_number:function() {
    var data = Session.get("how_are_markets");
    return ["37.50"];
  },
  stock_price_percent:function() {
    var data = Session.get("how_are_markets");
    return ["1.80%"];
  },
  number_down:function() {
    var data = Session.get("how_are_markets");
    return ["30"];
  },
  stock_name:function() {
    var data = Session.get("how_are_markets");
    return ["dow"];
  },
  company_name:function() {
    var data = Session.get("how_are_markets");
    return ["Disney Corporation"];
  },
  counter_number:function() {
    var data = Session.get("how_are_markets");
    return ["1"];
  },
  lost_percent:function() {
    var data = Session.get("how_are_markets");
    return ["Lost 18.14%"];
  },
  national_market:function() {
    var data = Session.get("how_are_markets");
    return ["national market"];
  },

});

//Function to render the spline chart
function mreportgraph() {
  var seriesOptions = [],
  seriesCounter = 0,
  //Placeholder data labels
  names = ['', 'AAPL', 'GOOG'],

  //Chart options
  createChart = function () {
    $('#markreportid').highcharts({
      exporting:{
        enabled:false
      },

      credits:{
        enabled:false
      },

      chart:{
        type:'spline',
        width:453,
        height:125,

      },

      xAxis:{
        type:'datetime',
        tickPositioner: function () {
          var positions = [],
          tick = Math.floor(this.dataMin),
          increment = Math.ceil((this.dataMax - this.dataMin) / 6);

          for (tick; tick - increment <= this.dataMax; tick += increment) {
            positions.push(tick);
          }
          return positions * 1000;
        },
        tickPixelInterval: 60,
        title: '',
        labels:{
          autoRotation:false,
          step: 1
        },
      },

      yAxis:{
        opposite:true,
        title:'',
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
        labelStyle: {
          visibility: 'hidden'
        }
      },
      title: {
        text: ''
      },
      legend:{
        enabled:false
      },
      series: seriesOptions
    });
  };

  //Populate chart with data
  $.each(names, function (i, name) {

    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?',    function (data) {

      seriesOptions[i] = {
        name: name,
        data: data,
        type:'spline'
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

Template.market_report.rendered=function() {
  mreportgraph();
}
