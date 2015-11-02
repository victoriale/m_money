$(function () {
  $("#sgw-graph").highcharts({
    chart: {
      width:250,
      height:80,
      type: 'column'
    },
    title:{
        text: ''
    },
    legend:{
        enabled: false
    },
    xAxis: {
        categories: [
            'VS Min',
            'VS Det',
            'VS NO',
        ],
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        crosshair: true,
        minorTickLength: 0,
        tickLength: 0,
        labels:{
          style:{
            fontSize:'10px'
          }
        },
    },
    yAxis: {
        min: 0,
        max: 10,
        tickInterval: 5,
        opposite: true,
        title: {
            text: ''
        }
    },
    plotOptions: {
        column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0.15,
            dataLabels: {
                enabled: true,
                inside: true,
                color: '#ffffff',
                allowOverlap: true,
                style:{"fontWeight": "normal" }
            },
            enableMouseTracking: false
        },
        series: {
            //pointWidth: 30
        }
    },
    colors: [
        '#0b162a',
        '#f26f26'
    ],
    credits: {
      enabled:false
    },
    series: [{
        pointWidth: 30,
        name: 'Targets',
        data: [5, 3, 9]

    }, {
        pointWidth: 30,
        name: 'Catches',
        data: [2, 6, 4]
    }]
  });
});
