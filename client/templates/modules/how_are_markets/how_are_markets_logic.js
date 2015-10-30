/* Author: harishkumar muddasani
** Created: [07/28/2015]
** Description: .js file for how_are_markets page
** Associated Files: how_are_markets.html, how_are_markets.less
*/

hamarkTabChange = function(t) {
  for(var i = 1; i <= 4; i++)
  {
    if(i==t)
    {
      document.getElementById("hamark_tab" + i).className = "hamark-mtabs hamark-active_tab";
      document.getElementById("hamark_tab" + i + "_i").className = "hamark-underline";
    } else {
      document.getElementById("hamark_tab" + i).className = "hamark-mtabs hamark-inactive_tab";
      document.getElementById("hamark_tab" + i + "_i").className = "";
    }
  }
}

Template.how_are_markets.onRendered( function() {
  Session.set("how_are_markets");
});

Template.how_are_markets.helpers({                   //helper class for adding data to template dictionary
  hamark_tiles:[
    {open_page:'OPEN PAGE',tile_name:'NASDAQ Companies',class_name:'hamark-c1_tile'},
    {open_page:'OPEN PAGE',tile_name:'NYSE Companies',class_name:'hamark-c2_tile'},
    {open_page:'OPEN PAGE',tile_name:'AMEX Companies',class_name:'hamark-c3_tile'}
  ],

  title:function() {
   var data = Session.get("how_are_markets");
   return ["How Are The Markets Doing Today"];
  },

   subtitle:function() {
    var data = Session.get("how_are_markets");
    return ["market report"];
  },

});

//Function to render the spline chart
function hamarkgraph() {
  var seriesOptions = [],
  seriesCounter = 0,
  //Placeholder data labels
  names = ['GOOG'],

  //Chart options
  createChart = function () {
    $('#hamarkGraphId').highcharts({
      exporting:{
        enabled:false
      },

      credits:{
        enabled:false
      },

      chart:{
        width:453,
        height:125,

      },
      xAxis: {
             type: 'datetime',
             min: Date.UTC(2011, 10, 31),
             max: Date.UTC(2012, 10, 6),
             labels: {
                 step: 1,
                 style: {
                     fontSize: '13px',
                     fontFamily: 'HN-L',
                     color:'#999999'
                 }
             },
             dateTimeLabelFormats: { // don't display the dummy year
                 month: '%b',
                 year: '%Y'
             },
             buttonTheme: {
               visibility: 'hidden'
             },
             labelStyle: {
               visibility: 'hidden'
             }
         },
      yAxis:{

        opposite:true,
        title:'',
        labels:{
          style: {
            fontSize: '13px',
            fontFamily: 'HN-L',
            color:'#999999'
          }
        }
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

Template.how_are_markets.rendered=function() {
  hamarkgraph();
}
