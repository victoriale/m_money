/*
Author: Tanner Storment
Date: 08/10/2015
Description: Javascript Logic for displaying income info about various companies
Related Files:
- /client/stylesheets/webpages/co_income_statement.less
- /client/templates/webpages/co_income_statement.html
*/

cisIsGrey = true; //used to determine whether or not a data tile is grey or white

cisGraphObject = {
  chart: {
    type: 'line',
    events: {
      redraw: function() {
      }
    }
  },
  title: {
    text: ''
  },
  credits: {
    enabled: false
  },
  yAxis: {
    title: '',
    opposite:true,
    labels: {
      formatter: function() {
        var num = this.value;
        var postFix = "";
        if (Math.abs(num) < Math.pow(10,3)){

        } else if (Math.abs(num) < Math.pow(10,6)){
          num /= Math.pow(10,3);
          postFix = "K";
        } else if (Math.abs(num) < Math.pow(10,9)){
          num /= Math.pow(10,6);
          postFix = "M";
        } else if (Math.abs(num) < Math.pow(10,12)) {
          num /= Math.pow(10,9);
          postFix = "B";
        } else {
          num /= Math.pow(10,12);
          postFix = "T";
        }
        return Math.round(num) + postFix;
      }
    },
    gridLineDashStyle: "Dash"
  },
  xAxis: {
    type: 'datetime',
    categories: ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '<b>NOW</b>'],
    tickLength: 0,
    labels: {
      format: "{value:%l%p}",
    },
    minTickInterval: 3600000*6
  },
  series: [{
    name: 'Operating Income',
    type: 'spline',
    showInLegend: false,
    color:'#3098ff'
  },{
    name: 'Revenue',
    type: 'spline',
    showInLegend: false,
    color:'#f7701d',
  },{
    name: 'Net Income',
    type: 'spline',
    showInLegend: false,
    color: '#ca1010'
  }]
};

Template.co_income_statement.onRendered ( function() {
  Session.set("co_income_statement", {
    companies: [
      {
        name: "Facebook, Inc.",
        last_updated: "07/29/2015",
        bigGraphData: { //specs give random data.
          operating_income: 4990000,
          revenue: 12460000,
          net_income:2940000
        },
        keyMetrics: [
          {
            year: 2013,
            revenue: 986000000,
            operating_income: 99000000,
            net_income: 61000000,
            EBITDA: 109000000,
          },
          {
            year: 2012,
            revenue: 526000000,
            operating_income: 54000000,
            net_income: 32000000,
            EBITDA: 58000000,
          },
          {
            year: 2011,
            revenue: 576000000,
            operating_income: 126000000,
            net_income: 50000000,
            EBITDA: 106000000,
          },
          {
            year: 2010,
            revenue: 543000000,
            operating_income: 138000000,
            net_income: 107000000,
            EBITDA: 166000000,
          }
        ],
        growthAverages: {
          oneYear: [
            {
              year:2013,
              revenue: 0.87,
              operating_income: 0.84,
              net_income: 0.88,
              EBITDA: -0.9
            },
            {
              year:2012,
              revenue: 1.25,
              operating_income: 0.38,
              net_income: 0.31
            }
          ],
          threeYear: [
            {
              year:2013,
              EBITDA: 91000000
            },
            {
              year: 2011,
              revenue: 0.07
            },
            {
              year:2010,
              revenue:0.10
            }
          ]
        },
        chartInfo: [0.25, 0.15, 0.67, 0.35, 0.8, 0.15, 0.59,  0.9, 0.45, undefined, 0.57, 0.83, 0.81, 3.87, 0.16, 0.42, 0.46, 0.94],
        comparisonMetricsGrowth: [0.87, 0.84, 0.88, -0.9],
        comparisonMetricsSector: [0.57, 0.83, 0.81, 3.87],
        comparisonMetricsIndustry: [0.16, 0.42, 0.46, 0.94]
        /*{
        keyMetrics: [0.25, 0.15,0.67, 0.35],
        growthMetrics: [0.8, 0.15, 0.59, undefined, 0.9, undefined, 0.45, undefined],
        comparisionMetricsSector: [0.57, 0.83, 0.81, 3.87],
        comparisonMetricsIndustry: [0.16, 0.42, 0.46, 0.94]
      }*/
    }
  ],
});
});

var growthType = "oneYear";
var chartInfoIndex = 0;
var comparisonMetricsIndex = 0;
Template.co_income_statement.helpers ( {
  //Returns the main company from co_income_statement
  getMainCompany: function() {
    try {
      var data=Session.get("co_income_statement");
      return data.companies[0];
    } catch (err)
    {
      console.log(err);
    }
  },
  //Gets a list of the revenues produced by whatever the main company is
  getRevenues: function () {

    //var data = Session.get("co_income_statement").companies[0].key_metrics;
    var data = this;
    var retArr = [];
    for (var i = 0; i < data.length; i++)
    {
      retArr.push({year:data[i].year, num:data[i].revenue});
    }
    return retArr;

  },
  //Gets a list of the operating incomes produced by whatever the main company is
  getOperatingIncomes: function () {
    //var data = Session.get("co_income_statement").companies[0].key_metrics;
    var data = this;
    var retArr = [];
    for (var i = 0; i < data.length; i++)
    {
      retArr.push({year:data[i].year, num:data[i].operating_income});
    }
    return retArr;
  },
  //Gets a list of the net incomes produced by whatever the main company is
  getNetIncomes: function () {
    //var data = Session.get("co_income_statement").companies[0].key_metrics;
    var data = this;
    var retArr = [];
    for (var i = 0; i < data.length; i++)
    {
      retArr.push({year:data[i].year, num:data[i].net_income});
    }
    return retArr;
  },
  //Fetches a list of EBITDAs produced by whatever the main company is
  getEBITDAs: function () {
    //var data = Session.get("co_income_statement").companies[0].key_metrics;
    var data = this;
    var retArr = [];
    for (var i = 0; i < data.length; i++)
    {
      retArr.push({year:data[i].year, num:data[i].EBITDA});
    }
    return retArr;
  },
  //Finds the list of revenue growths
  getRevenueGrowths: function () {

    //var data = Session.get("co_income_statement").companies[0].key_metrics;
    var data;
    if (growthType == "oneYear")
    {
      data = this.oneYear;
      growthType = "threeYear";
    } else
    {
      data = this.threeYear;
      growthType = "oneYear";
    }
    var retArr = [];
    for (var i = 0; i < data.length; i++)
    {
      retArr.push({year:data[i].year, num:data[i].revenue});
    }
    return retArr;

  },
  //Finds the list of operating income growths
  getOperatingIncomeGrowths: function () {
    //var data = Session.get("co_income_statement").companies[0].key_metrics;
    var data;
    if (growthType == "oneYear")
    {
      data = this.oneYear;
      growthType = "threeYear";
    } else
    {
      data = this.threeYear;
      growthType = "oneYear";
    }
    var retArr = [];
    for (var i = 0; i < data.length; i++)
    {
      retArr.push({year:data[i].year, num:data[i].operating_income});
    }
    return retArr;
  },
  //Finds the list of net income growths
  getNetIncomeGrowths: function () {
    //var data = Session.get("co_income_statement").companies[0].key_metrics;
    var data;
    if (growthType == "oneYear")
    {
      data = this.oneYear;
      growthType = "threeYear";
    } else
    {
      data = this.threeYear;
      growthType = "oneYear";
    }
    var retArr = [];
    for (var i = 0; i < data.length; i++)
    {
      retArr.push({year:data[i].year, num:data[i].net_income});
    }
    return retArr;
  },
  //Finds the list of EBITDA growths
  getEBITDAGrowths: function () {
    //var data = Session.get("co_income_statement").companies[0].key_metrics;
    var data;
    if (growthType == "oneYear")
    {
      data = this.oneYear;
      growthType = "threeYear";
    } else
    {
      data = this.threeYear;
      growthType = "oneYear";
    }
    var retArr = [];
    for (var i = 0; i < data.length; i++)
    {
      retArr.push({year:data[i].year, num:data[i].EBITDA});
    }
    return retArr;
  },
});
Template.co_income_statement_big_chart.helpers( {
  //Returns an object to be drawn by highcharts. This is the big graph in the center of the page.
  getGraphObject: function()
  {
    var url =  "http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?";
    $.getJSON(url,  function(data) {
      var fakeData1 = [];
      var fakeData2 = [];

      for (var i = 0; i < data.length; i++)
      {
        data[i][1] = Math.random()*10000000;
        fakeData1.push([data[i][0], Math.random()*10000000]);
        fakeData2.push([data[i][0], Math.random()*10000000]);
      }
      console.log(data);
      console.log(fakeData1);
      console.log(fakeData2);
      cisGraphObject.series[0].data = data;
      cisGraphObject.series[1].data = fakeData1;
      cisGraphObject.series[2].data = fakeData2;
      //set chart to initial position
      var ctime = cisGraphObject.series[0].data[cisGraphObject.series[0].data.length-1][0];
      cisGraphObject.xAxis.min = ctime - 24*3600000;
      cisGraphObject.xAxis.labels.format = "{value:%l%p}";
      new Highcharts.Chart(cisGraphObject);
    });
    return cisGraphObject;
  },
  //Sets info about the buttons below the main chart
  btns: function()
  {
    var btns = [
      {text: "1D"},
      {text: "5D"},
      {text: "10D"},
      {text: "1M"},
      {text: "3M"},
      {text: "6M"},
      {text: "1Y"},
      {text: "3Y"},
      {text: "5Y"},
      {text: "10Y"}
    ];
    for(var i = 1; i <= 10; i++)
    {
      btns[i-1].num = i;
    }
    return btns;
  },
  //Determisn whether the button is the first button in the list
  isInitial: function(num)
  {
    console.log("isInitial: " + num);
    if(num==1)
    {return " co-inc-stmt-metrics-graph-period-btn-a";}
    else
    {return "";}
  },


  //The following four functions do exactly what it sounds like.
  //They'll get their info from the co_income_statement session variable.
  getOperatingIncome: function() {
    return this.bigGraphData.operating_income;
  },
  getRevenue: function() {
    return this.bigGraphData.revenue;
  },
  getNetIncome: function() {
    return this.bigGraphData.net_income;
  },
  getEBITDA: function() {
    return this.bigGraphData.ebitda;
  }
});
Template.co_income_statement_tile_cnt.helpers({
  //Determins whether a set of datas has anything in them
  isEmpty: function(datas) {

    var empty = true;
    try
    {
      for (var i = 0; i < datas.length; i++)
      {

        if (datas[i].num != undefined)
        {
          empty = false;
        }
      }
    } catch (err)
    {
      //mmmmmmmmmmmmm
    }
    return empty;
  }
})
Template.co_income_statement_tile_lines.helpers ({
  //Draws the lines in the small tiles
  genLines: function(datas) {
    var str = "";
    for (var i = 0; i < datas.length; i++)
    {
      if (datas[i].num != undefined)
      {
        if (i === 0)
        {
          str += "<div class=\"co-inc-stmt-metrics-tile-line\">";
          str += "<span class=\"co-inc-stmt-metrics-tile-line-txt\">" + datas[i].year + "</span>";
          str += "<span class=\"co-inc-stmt-metrics-tile-line-bold\">" + formatNumber(datas[i].num) + "</span>";
          str += "</div>";
        } else if ( i === datas.length - 1)
        {
          str += "<div class=\"co-inc-stmt-metrics-tile-line co-inc-stmt-metrics-tile-line-bottom\">";
          str += "<span class=\"co-inc-stmt-metrics-tile-line-txt\">" + datas[i].year + "</span>";
          str += "<span class=\"co-inc-stmt-metrics-tile-line-bold\">" + formatNumber(datas[i].num) + "</span>";
          str += "</div>";
        } else {
          str += "<div class=\"co-inc-stmt-metrics-tile-line\">";
          str += "<span class=\"co-inc-stmt-metrics-tile-line-txt\">" + datas[i].year + "</span>";
          str += "<span class=\"co-inc-stmt-metrics-tile-line-bold\">" + formatNumber(datas[i].num) + "</span>";
          str += "</div>";
        }
      }
    }
    return str;
  },

});
Template.co_income_statement_tile_err.helpers({
  //Generates an array of fake data to be used by the missing tile template
  fakeData: function() {
    var retArr = [];
    for (var i = 0; i < 3; i++)
    {
      retArr.push({year:"2015", num:"N/A"});
    }
    return retArr;
  }
})
Template.co_income_statement_tile_chart.helpers ({
  //Determins whether the red/blue charts should be red
  isRed: function(chartSize) {
    if (chartSize >= 50)
    {
      return false;
    } else
    {
      return true;
    }
  },
  //Determins whether or not we should even draw the chart
  chartInfoDefined: function() {
    try {
      if (this.chartInfo[chartInfoIndex] == undefined) {
        return false;
      } else {
        return true;
      }
    } catch (err)
    {
      console.log(err.message);
    }
  },
  //Returns code for the red/blue part of the charts
  drawChart: function() {
    var curChartValue = this.chartInfo[chartInfoIndex++];
    console.log("curChartValue: " + curChartValue);
    var str = "";
    var colour = "red";
    var width = 0;
    try {
      if (curChartValue != undefined)
      {
        var extra = "";
        if (curChartValue >= 0.5)
        {
          colour="blue";
        } else {
          colour="red";
        }
        if (curChartValue <= 0.1)
        {
          extra = "co-inc-stmt-metrics-tile-chartcont-chart-toosml";
        }
        width = parseFloat(Math.round(curChartValue * 100));
        if (width < 10)
        {
          width = 10;
        }
        var str = '<span style="width:' + width + '%;" class="co-inc-stmt-metrics-tile-chartcont-chart-' + colour + ' ' + extra + '"><span class="co-inc-stmt-metrics-tile-chartcont-chart-innertext">' + parseFloat(curChartValue * 100) + '%</span></span>';
      }
    } catch (err)
    {
      console.log(err.message);
    }
    return str;
  }
});
Template.co_income_statement_growth_chart_tile.helpers ({
  //The following three functions do exactly what is sounds like.
  //They pull data from the sesion variable co_income_statement.
  getGrowthAvg: function () {
    return this.comparisonMetricsGrowth[comparisonMetricsIndex] * 100;
  },
  getSectorAvg: function () {
    return this.comparisonMetricsSector[comparisonMetricsIndex] * 100;
  },
  getIndustryAvg: function () {
    return this.comparisonMetricsIndustry[comparisonMetricsIndex++] * 100;
  },

  //Returns a graph object for one of the small graphs on the bottom of the page
  compGraph: function() {
    try {
      //console.log("compGraph: ");
      //console.log(this);
      var growthAvg = this.comparisonMetricsGrowth[comparisonMetricsIndex] * 100;
      var sectorAvg = this.comparisonMetricsSector[comparisonMetricsIndex] * 100;
      var industryAvg = this.comparisonMetricsIndustry[comparisonMetricsIndex] * 100;
      var datas = [
        {data: [growthAvg], showInLegend:false, color:"#3193ff", name:this.name},
        {data: [sectorAvg], showInLegend:false, color:"#ffc600", name:"Sector"},
        {data: [industryAvg], showInLegend:false, color:"#ff3131", name:"Industry"}];
        var yAxisMin = function() {
          var smallestNum = 0;
          for (var i = 0; i < datas.length; i++)
          {
            if (datas[i].data[0] < smallestNum)
            {
              smallestNum = datas[i].data[0];
            }
          }
          if (smallestNum < 0) {
            return Math.floor(smallestNum / 100)*100;
          } else {
            return 0;
          }
        }();
        var yAxisMax = function () {
          var largestNum = 0;
          for (var i = 0; i < datas.length; i++) {
            if (datas[i].data[0] > largestNum) {
              largestNum = datas[i].data[0];
            }
          }
          if (largestNum > 100) {
            return Math.ceil(largestNum / 100)*100;
          } else {
            return 100;
          }
        }();
        return {
          chart: {
            type: 'column',
            backgroundColor: null
          },
          title: {
            text: ''
          },
          credits: {enabled:false},
          subtitle: {
            text: ''
          },
          xAxis: {
            categories: ['2013'],
            crosshair: true
          },
          yAxis: {
            min: yAxisMin,
            max: yAxisMax,
            tickInterval: function() { if (yAxisMax > 100) {return 100;} else {return 20;}}(),
            title: {
              text: ''
            },
            labels: {
              formatter: function () {
                var pcnt = (this.value / 100) * 100;
                return Highcharts.numberFormat(pcnt, 0, ',') + '%';
              }
            }

          },
          tooltip: {
            //headerFormat: '',
            //pointFormat: '',
            //footerFormat: '',
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0,
              groupPadding: 0.19
            },
            series: {
              //borderRadius: 0,
              //stacking: 'normal',
              pointWidth:60
            }
          },
          series: datas,
        };
      } catch (err)
      {
        console.log(err.message);
      }
    },
    idGraph: function() {
      var id = "co-inc-stmt-graph" + Math.random().toString().replace(".","");
      console.log(id);
      return id;
    },

  })

  //Formats a number to be human readable.
  function formatNumber(num){
    if (typeof num == "number"){
      var postFix = "";
      var preFix = "$"
      if ( num <= Math.pow(10,3))
      {
        num *= 100;
        preFix = "";
        postFix = "%";
      } else if (num <= Math.pow(10,6))
      {
        num /= Math.pow(10,3);
        postFix = " Thousand"

      } else if (num <= Math.pow(10,9))
      {
        num /= Math.pow(10,6);
        postFix = " Million"
      } else
      {
        num /= Math.pow(10,9);
        postFix = " Billion"
      }
      return preFix + Math.round(num * 100) / 100 + postFix;
    }
    else {
      return num;
    }
  }

  //Modifies the big chart based on which button is selected
  cisBtns = function(num)
  {
      var ctime = cisGraphObject.series[0].data[cisGraphObject.series[0].data.length-1][0]; //the most recent time
      var day = 24*3600000; //the time of a day in milliseconds
      var month = 24*3600000*30;
      var year = 24*3600000*30*12;
      //switches between difference scales depending on which button was pressed
      switch(num)
      {
      case 1:
          cisGraphObject.xAxis.min = ctime - day;
          cisGraphObject.xAxis.minTickInterval = day/4;
          cisGraphObject.xAxis.labels.format = "{value:%l%p}";
          break;
      case 2:
          cisGraphObject.xAxis.min = ctime - day*5;
          cisGraphObject.xAxis.minTickInterval = day;
          cisGraphObject.xAxis.labels.format = "{value:%a %l%p}";
          break;
      case 3:
          cisGraphObject.xAxis.min = ctime - day*10;
          cisGraphObject.xAxis.minTickInterval = day*2;
          cisGraphObject.xAxis.labels.format = "{value:%b %d}";
          break;
      case 4:
          cisGraphObject.xAxis.min = ctime - month;
          cisGraphObject.xAxis.minTickInterval = day*5;
          cisGraphObject.xAxis.labels.format = "{value:%b %d}";
          break;
      case 5:
          cisGraphObject.xAxis.min = ctime - month*3;
          cisGraphObject.xAxis.minTickInterval = day*15;
          cisGraphObject.xAxis.labels.format = "{value:%b %d}";
          break;
      case 6:
          cisGraphObject.xAxis.min = ctime - month*6;
          cisGraphObject.xAxis.minTickInterval = month;
          cisGraphObject.xAxis.labels.format = "{value:%b %d}";
          break;
      case 7:
          cisGraphObject.xAxis.min = ctime - year;
          cisGraphObject.xAxis.minTickInterval = month*2;
          cisGraphObject.xAxis.labels.format = "{value:%b %d %Y}";
          break;
      case 8:
          cisGraphObject.xAxis.min = ctime - year*3;
          cisGraphObject.xAxis.minTickInterval = month*6;
          cisGraphObject.xAxis.labels.format = "{value:%b %d %Y}";
          break;
      case 9:
          cisGraphObject.xAxis.min = ctime - year*5;
          cisGraphObject.xAxis.minTickInterval = year;
          cisGraphObject.xAxis.labels.format = "{value:%b %Y}";
          break;
      case 10:
          cisGraphObject.xAxis.min = ctime - year*10;
          cisGraphObject.xAxis.minTickInterval = year*2;
          cisGraphObject.xAxis.labels.format = "{value:%b %Y}";
          break;
      }
      new Highcharts.Chart(cisGraphObject); //need to do this to refresh the graph
      for(var i = 1; i <= 10; i++)
      {
          var a = document.getElementById("cisBtn" + i);
          a.className = "co-inc-stmt-metrics-graph-period-btn";
          if(i==num)
              a.className += " co-inc-stmt-metrics-graph-period-btn-a";
      }
  }
Template.co_income_statement_growth_chart_tile_line.helpers ({
  //Formats a number as a percent with no decimals
  formatPercent: function(num)
  {
    return (Math.round(num)) + "%";
  },
})
Template.co_income_statement_big_chart_label.helpers({
  //Returns a human readable formatted nunmber.
  formatNum: function(num) {
    return formatNumber(parseFloat(num));
  }

})
