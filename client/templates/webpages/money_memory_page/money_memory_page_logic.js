/* Author: Ryan Fisher
** Created: 09/09/2015
** Description: .js file for Company Executive Page - Money Memory
** Associated Files: money_memory_page.html, money_memory_page.less, money_memory_page_logic.js
*/

Template.money_memory_page.helpers({
  company: 'Facebook, Inc.',
  updated: '08/03/2015 at 4PM EST',
  current: '94.31',
  open: '93.53',
  close: '95.21',
  icon: 'fa-arrow-up',
  changeamt: '+0.52',
  changepct: '+0.57%',
  rangebot: '93.53',
  rangetop: '95.21',
  range52bot: '99.24',
  range52top: '70.32',
  vol: '4M',
  avg: '10M',

  getMonMemChart: function()
  {
      //get data for chart here
      var url =  "";
      $.getJSON(url,  function(data) {
        // dupGraphObject.series[0].data = data;
        // //set chart to initial position
        // var ctime = dupGraphObject.series[0].data[dupGraphObject.series[0].data.length-1][0];
        // dupGraphObject.xAxis.min = ctime - 24*3600000;
        // dupGraphObject.xAxis.labels.format = "{value:%l%p}";
        new Highcharts.Chart(monmemGraphObject);
      });
      return monmemGraphObject;
  }
})

monmemGraphObject = {
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
          overflow: 'justify'
      }
  },
  yAxis: {
      title: '',
      floor: 0,
      gridLineDashStyle: 'longdash',
      minTickInterval: 5,
      plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
      }],
      labels: {
          formatter: function() {
              return '$' + this.value
          }
      }
  },
  tooltip: {
  	pointFormat: "Value: ${point.y:.2f}"
  },
  plotOptions: {
      spline: {
          lineWidth: 4,
          states: {
              hover: {
                  lineWidth: 5
              }
          },
          marker: {
              enabled: false
          },
          pointInterval: 3600000, // one hour
          pointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
      }
  },
  legend: {
      enabled: false
  },
  series: [{
      name: 'Facebook, Inc.',
      data: [40.20, 40.80, 50.80, 40.80, 41.00, 41.30, 41.50, 42.90, 41.90, 42.60, 41.60, 43.00, 44.00, 43.60, 44.50, 44.20, 44.50, 44.50, 44.00, 43.10, 42.70, 44.00, 42.70, 42.30, 42.30, 44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]
  }]
}

monmemChangeSort = function(index){

  for(var i = 0; i < 11; i++)
  {
    var e = document.getElementById('mmbbl-' + i);
    if(i == index)
    {
      e.className = "mmpg-stock-sort-bbl mmpg-stock-sort-bbl-selected";
    } else {
      e.className = "mmpg-stock-sort-bbl";
    }
  }

  var chart = $('#monmemChart').highcharts();
  switch(index)
  {
    case 0:
      chart.series[0].update({ data: [40.20, 40.80, 50.80, 40.80, 41.00, 41.30, 41.50, 42.90, 41.90, 42.60, 41.60, 43.00, 44.00, 43.60, 44.50, 44.20, 44.50, 44.50, 44.00, 43.10, 42.70, 44.00, 42.70, 42.30, 42.30, 44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 1:
      chart.series[0].update({ data: [44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 2:
      chart.series[0].update({ data: [40.20, 40.80, 50.80, 40.80, 41.00, 41.30, 41.50, 42.90, 41.90, 42.60, 41.60, 43.00, 44.00, 43.60, 44.50, 44.20, 44.50, 44.50, 44.00, 43.10, 42.70, 44.00, 42.70, 42.30, 42.30, 44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 3:
      chart.series[0].update({ data: [44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 4:
      chart.series[0].update({ data: [40.20, 40.80, 50.80, 40.80, 41.00, 41.30, 41.50, 42.90, 41.90, 42.60, 41.60, 43.00, 44.00, 43.60, 44.50, 44.20, 44.50, 44.50, 44.00, 43.10, 42.70, 44.00, 42.70, 42.30, 42.30, 44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 5:
      chart.series[0].update({ data: [44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 6:
      chart.series[0].update({ data: [40.20, 40.80, 50.80, 40.80, 41.00, 41.30, 41.50, 42.90, 41.90, 42.60, 41.60, 43.00, 44.00, 43.60, 44.50, 44.20, 44.50, 44.50, 44.00, 43.10, 42.70, 44.00, 42.70, 42.30, 42.30, 44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 7:
      chart.series[0].update({ data: [44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 8:
      chart.series[0].update({ data: [40.20, 40.80, 50.80, 40.80, 41.00, 41.30, 41.50, 42.90, 41.90, 42.60, 41.60, 43.00, 44.00, 43.60, 44.50, 44.20, 44.50, 44.50, 44.00, 43.10, 42.70, 44.00, 42.70, 42.30, 42.30, 44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 9:
      chart.series[0].update({ data: [44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
    case 10:
      chart.series[0].update({ data: [40.20, 40.80, 50.80, 40.80, 41.00, 41.30, 41.50, 42.90, 41.90, 42.60, 41.60, 43.00, 44.00, 43.60, 44.50, 44.20, 44.50, 44.50, 44.00, 43.10, 42.70, 44.00, 42.70, 42.30, 42.30, 44.10, 47.70, 47.10, 45.60, 46.10, 45.80, 48.60, 47.20, 49.00, 50.90, 51.50, 51.60, 51.10, 52.00, 52.30, 50.70, 49.40, 49.80, 49.60, 49.80, 49.50, 48.50, 47.40, 47.60]});
      break;
  }
}
