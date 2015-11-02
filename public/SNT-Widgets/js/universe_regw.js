$(function(){
  var seriesOptions = [];
  seriesCounter = 0;
  //Placeholder data labels
  names = ['AAPL'];

  //Populate chart with data
  $.each(names, function (i, name) {

    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?', function (data) {
      console.log(data);
      //set data and name into graph
      seriesOptions[i] = {
        name: name,
        data: data,
        type:'line'
      };

      // As we're loading the data asynchronously, we don't know what order it will arrive. So
      // we keep a counter and create the chart when all the data is loaded.
      seriesCounter += 1;

      if (seriesCounter === names.length) {
        //renders data gathered into a simple chart
        $('#regw-graph').highcharts({
          exporting:{
            enabled:false
          },

          credits:{
            enabled:false
          },

          chart:{
            width:250,
            height:85,
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
      }
    });
  });
});
