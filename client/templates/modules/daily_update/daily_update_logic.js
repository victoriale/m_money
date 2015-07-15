/*Author: [Thanush Subramanian Elango]
Created: [06/23/2015]
Description: [Daily_Update]
Associated Files: [Daily_Update.less][Daily_Update.html]*/


Template.daily_update.helpers({
  daily_updatecity: function(){
    var data = Session.get("ProfileData");
    return data['residential']['items'][0]['Address'].City;
  },

  daily_updatestate: function(){
    var data = Session.get("ProfileData");
  return data['residential']['items'][0]['Address'].StateOrProvince;
},
daily_updatetime: function(){
  var data = Session.get("ProfileData");
return data['residential']['items'][0]['ListingDate'].sec/1000000000;
}
})

///////Chart Creation ///////////


function dailyupdategraph() {
  var seriesOptions = [],
  seriesCounter = 0,
  names = ['', 'AAPL', 'GOOG'],
  createChart = function () {
    $('#dailyupdategraph').highcharts({
      exporting:{
        enabled:false
      },

      credits:{
        enabled:false
      },

      chart:{
        width:400,
        height:120,

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
Template.daily_update.rendered=function() {
  dailyupdategraph();
}
