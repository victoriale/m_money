Template.re_location_stats.onRendered(function(){
  Tracker.autorun(function(){
    initializeMap();
  })
})

//Global Function to initialize the map
initializeMap = function() {
  //Map options
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(41.8369, -87.6847),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  mainmap = new google.maps.Map(
    document.getElementById('mainmap'),
    mapOptions
  );
  housingmap = new google.maps.Map(
    document.getElementById('housingmap'),
    mapOptions
  )
}

//Function to render the Market trends spline chart
function markettrendsgraph() {
  var seriesOptions = [],
  seriesCounter = 0,
  //Placeholder data labels
  names = ['', 'AAPL', 'GOOG'],

  //Chart options
  createChart = function () {
    $('#markettrendsgraph').highcharts({
      exporting:{
        enabled:false
      },

      credits:{
        enabled:false
      },

      chart:{
        width:650,
        height:235,

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
Template.re_location_stats.rendered=function() {
  markettrendsgraph();
}

//Function to render the Household Income bar chart
Template.re_location_stats.householdGraph =  function () {
  var url =  "http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?";
  $.getJSON(url,  function(data) {
    //Placeholder data
    options.series[0].data = [38625,46590];
    var chart = new Highcharts.Chart(options);
  });
  //Chart options
  var options = {
    chart: {
      type: 'column'
    },
    title: {
      text: null
    },

    xAxis: {
      categories: ['Median', 'State Avg'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 36000,
      max: 48000,
      title: {
        text: null
      },
      gridLineDashStyle: 'longdash',
      tickInterval: 2000
    },

    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: '${y:.0f}'
        }
      }
    },
    legend: {
      enabled: false
    },
    chart:{
      width: 310,
      height: 140
    },
    tooltip: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      type: 'column',
      colorByPoint: true,
      data: '[38645, 46590]'
    }]
  };
  return options;
};

//Function to render the Family Income bar chart
Template.re_location_stats.familyGraph =  function () {
  var url =  "http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?";
  $.getJSON(url,  function(data) {
    //Placeholder data
    options.series[0].data = [42724,55545];
    var chart = new Highcharts.Chart(options);
  });
  //Chart options
  var options = {
    chart: {
      type: 'column'
    },
    title: {
      text: null
    },

    xAxis: {
      categories: ['Median', 'State Avg'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      max: 100000,
      title: {
        text: null
      },
      gridLineDashStyle: 'longdash',
      tickInterval: 20000
    },

    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: '${y:.0f}'
        }
      }
    },
    legend: {
      enabled: false
    },
    chart:{
      width: 310,
      height: 140
    },
    tooltip: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      type: 'column',
      colorByPoint: true,
      data: '[38645, 46590]'
    }]
  };
  return options;
};
