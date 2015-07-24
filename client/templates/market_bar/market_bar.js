//Name :[Ramakrishna Vaibhav Kasibhatla]
//  Date: 7/24/2015
//files:[market_bar.js, market_bar.less]

//each function to runt the data
Template.market_bar.helpers({
  date:"Tue, Feb 17, 2015, 10:46pm EST - US Markets are closed",
  market:[
    {name:"Dow",value: "18,047.58", high:"+28.23 (0.16%)",graphID:"graph"},
    {name:"Nasdaq",value: "4,899.27", high:"+5.43 (0.11%)",graphID:"graph2"},
    {name:"S&P 500",value: "2,100.34", high:"+3.34 (0.16%)",graphID:"graph3"}
  ],
});
//each function to run the graphs
Template.market_bar.helpers({
  graph: function () {
    return graph
  }
});
//funtion for graph
function graph() {
  //graph 1
  $('#graph').highcharts({
    grid:{
      enabled:false
    },
    title: {
      text: '',
    },
    chart:{
      type:'spline',
      height:60,
      width:100
    },
    colors: ["rgb(68, 178, 36)"],
    xAxis: {
      grid: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'green',
        gridLineWidth: 0,
        tickLength: 0,
        tickWidth: 0,
        gridLineColor: 'green',
      },
      labels: {
        enabled: false,
      },
      minorTickLength: 0,
      tickLength: 0
    },
    yAxis: {
      grid:{
        enabled:false
      },
      labels: {
        enabled: false,
      },
      minorTickLength: 0,
      tickLength: 0,
      title: {
        text: ''
      },
    },
    credits:{
      enabled:false
    },
    tooltip: {
      enabled:false
    },
    legend: {
      enabled:false
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false
        }
      }
    },
    series: [{
      name: '',
      data: [4.0,9.0,6.0,6.2,3.0,5,6]
    }]
  });
  //graph2
  $('#graph2').highcharts({
    grid:{
      enabled:false
    },
    title: {
      text: '',
    },
    chart:{
      type:'spline',
      height:60,
      width:100
    },
    colors: ["rgb(68, 178, 36)"],
    xAxis: {
      grid: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        gridLineColor: 'transparent',
      },
      labels: {
        enabled: false,
      },
      minorTickLength: 0,
      tickLength: 0
    },
    yAxis: {
      grid:{
        enabled:false
      },
      labels: {
        enabled: false,
      },
      minorTickLength: 0,
      tickLength: 0,
      title: {
        text: ''
      },
    },
    credits:{
      enabled:false
    },
    tooltip: {
      enabled:false
    },
    legend: {
      enabled:false
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false
        }
      }
    },
    series: [{
      name: '',
      data: [4.0,9.0,6.0,6.2,3.0,5,6]
    }]
  });
  //graph3
  $('#graph3').highcharts({
    grid:{
      enabled:false
    },
    title: {
      text: '',
    },
    chart:{
      type:'spline',
      height:60,
      width:100,
      borderWidth: 0
    },
colors: ["rgb(68, 178, 36)"],
    xAxis: {

      gridLineWidth: 0,
      minorGridLineWidth: 0,
      tickWidth: 0,
      lineWidth: 0,

      labels: {
        enabled: false,
      },
      minorTickLength: 0,
      tickLength: 0
    },
    yAxis: {
      grid:{
        enabled:false
      },
      labels: {
        enabled: false,
      },
      minorTickLength: 0,
      tickLength: 0,
      title: {
        text: ''
      },
    },
    credits:{
      enabled:false
    },
    tooltip: {
      enabled:false
    },
    legend: {
      enabled:false
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false
        }
      }
    },
    series: [{
      name: '',
      data: [4.0,9.0,6.0,6.2,3.0,5,6]
    }]
  });
};
//to render function
Template.market_bar.rendered=function() {
  graph();

}
