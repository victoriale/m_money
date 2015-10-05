/* Author: Ryan Fisher
Created: 08/17/2015
Description: [daily_update]
Associated Files: [daily_update.less][daily_update.html]*/

var btncnt = 1;
Template.daily_update.helpers({
  team: 'Chicago Bears',

  btnCount: function () {
    return btncnt++;
  },
  city: 'Chicago',
  wins: 5,
  loss: 11,
  fullyear: 2014,
  updated: '4:00PM EST',
  offense: '5,233',
  defense: '6,033',
  points: 318,
  turnover: -5,
  circle:[
    {year: '07'},
    {year: '08'},
    {year: '09'},
    {year: '10'},
    {year: '11'},
    {year: '12'},
    {year: '13'},
    {year: '14'},
  ]
});

Template.daily_update.onRendered( function() {
  $('#btnid8').addClass('active');
});

teamChangeYear = function(e,year){

  var chart = $('#teamUpContainer').highcharts();
  if(year == '14'){
    console.log('14');
    chart.series[0].update({ data: [264, 234, 278, 376]});
    chart.series[1].update({ data: [311, 367, 443, 397]});
  }
  if(year == '13'){
    console.log('13');
    chart.series[0].update({ data: [274, 254, 288, 396]});
    chart.series[1].update({ data: [211, 347, 423, 377]});
  }
  if(year == '12'){
    console.log('12');
    chart.series[0].update({ data: [294, 244, 286, 306]});
    chart.series[1].update({ data: [211, 347, 323, 357]});
  }
  if(year == '11'){
    console.log('11');
    chart.series[0].update({ data: [274, 400, 288, 396]});
    chart.series[1].update({ data: [211, 347, 300, 377]});
  }
  if(year == '10'){
    console.log('10');
    chart.series[0].update({ data: [274, 254, 350, 396]});
    chart.series[1].update({ data: [211, 250, 423, 377]});
  }
  if(year == '09'){
    console.log('09');
    chart.series[0].update({ data: [275, 254, 288, 396]});
    chart.series[1].update({ data: [211, 347, 400, 377]});
  }
  if(year == '08'){
    console.log('08');
    chart.series[0].update({ data: [230, 254, 288, 396]});
    chart.series[1].update({ data: [211, 347, 423, 425]});
  }
  if(year == '07'){
    console.log('07');
    chart.series[0].update({ data: [274, 254, 288, 266]});
    chart.series[1].update({ data: [281, 347, 423, 377]});
  }
  $('.all_team_update_modules-graphbutton_circle1').removeClass('active');
  $('#'+e.id).addClass('active');
}

///////Chart Creation ///////////

Template.daily_update.dailyupdategraphh =  function(){
  var url = ''; //"http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?";
  $.getJSON(url,  function(data) {
    //options.series[0].data = data;
    var chart = new Highcharts.Chart(options);
  });
  var options = {
    chart: {
      width:400,
      height:120,
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
            '@ Min',
            'VS Det',
            'VS NO',
            'VS Dal'
        ],
        crosshair: true,
        labels: {
          style: {
            color: '#999'
          }
        }
    },
    yAxis: {
        min: 200,
        max: 500,
        tickInterval: 100,
        opposite: true,
        title: {
            text: ''
        },
        labels: {
          style: {
            color: '#999'
          }
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
                color: '#FFFFFF',
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
    series: [{
        pointWidth: 30,
        name: 'Chicago',
        data: [264, 234, 278, 376]

    }, {
        pointWidth: 30,
        name: 'Opponent',
        data: [311, 367, 443, 397]
    }]
  };
  return options;
};
