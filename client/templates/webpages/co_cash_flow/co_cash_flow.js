/*
Author: Tanner Storment
Date: [08/13/2015]
Description: Logic for the Company Cash Flow Page
Related Files:
- /client/templates/webpages/co_cash_flow.html
- /client/stylesheets/webpages/co_cash_flow.less
*/

Template.co_cash_flow.onRendered ( function() {
  Session.set("co_cash_flow", {
    companies: [
      {
        name: "Facebook, Inc.",
        last_updated: "07/29/2015",
        key_metrics: [
          {
            year: 2013,
            free_cash_flow: 84000000,
            operating_cash_flow: 102000000
          },
          {
            year: 2012,
            free_cash_flow: -9000000,
            operating_cash_flow: 8000000
          }
        ],
        growth_metrics: {
          oneYear: [
            {
              year: 2013,
              free_cash_flow: 0.87,
              operating_cash_flow: 0.84
            },
            {
              year:2012,
              free_cash_flow: 1.25,
              operating_cash_flow: 0.38
            }
          ],
          threeYear: [
            {
              year:2011,
              free_cash_flow: 0.07
            },
            {
              year:2010,
              free_cash_flow: 0.1
            }
          ]
        },
        chartInfo: [0.01, 0.25, 0.8, 0.15, 0.59]
      }
    ],
  });
});

var growthType = "oneYear";
var chartInfoIndex = 0;
Template.co_cash_flow.helpers({
  getMainCompany: function() {
    try {
      var data=Session.get("co_cash_flow");
      return data.companies[0];
    } catch (ccf)
    {
      console.log(ccf);
    }
  },  //Gets a list of the free cash flows produced by whatever the main company is
  getFreeCashFlows: function () {
    var data = this;
    var retArr = [];
    for (var i = 0; i < data.length; i++)
    {
      retArr.push({year:data[i].year, num:data[i].free_cash_flow});
    }
    return retArr;

  },
  //Gets a list of the operating cashFlows produced by whatever the main company is
  getOperatingCashFlows: function () {
    var data = this;
    var retArr = [];
    for (var i = 0; i < data.length; i++)
    {
      retArr.push({year:data[i].year, num:data[i].operating_cash_flow});
    }
    return retArr;
  },
  //Finds the list of revenue growths
  getCashFlowGrowths: function () {

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
      retArr.push({year:data[i].year, num:data[i].free_cash_flow});
    }
    return retArr;

  },
  //Finds the list of operating income growths
  getOperatingCashFlowGrowths: function () {
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
      retArr.push({year:data[i].year, num:data[i].operating_cash_flow});
    }
    return retArr;
  },

});

Template.ccf_tile_cnt.helpers ({
  //Determins whether a set of datas has anything in them
  isEmpty: function(datas) {
    console.log(datas);
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
    } catch (ccf)
    {
      //mmmmmmmmmmmmm
    }
    return empty;
  }

});
Template.ccf_tile_lines.helpers ({
  //Draws the lines in the small tiles
  genLines: function(datas) {
    var str = "";
    for (var i = 0; i < datas.length; i++)
    {
      if (datas[i].num != undefined)
      {
        if (i === 0)
        {
          str += "<div class=\"ccf-metrics-tile-line\">";
          str += "<span class=\"ccf-metrics-tile-line-txt\">" + datas[i].year + "</span>";
          str += "<span class=\"ccf-metrics-tile-line-bold\">" + formatNumber(datas[i].num) + "</span>";
          str += "</div>";
        } else if ( i === datas.length - 1)
        {
          str += "<div class=\"ccf-metrics-tile-line ccf-metrics-tile-line-bottom\">";
          str += "<span class=\"ccf-metrics-tile-line-txt\">" + datas[i].year + "</span>";
          str += "<span class=\"ccf-metrics-tile-line-bold\">" + formatNumber(datas[i].num) + "</span>";
          str += "</div>";
        } else {
          str += "<div class=\"ccf-metrics-tile-line\">";
          str += "<span class=\"ccf-metrics-tile-line-txt\">" + datas[i].year + "</span>";
          str += "<span class=\"ccf-metrics-tile-line-bold\">" + formatNumber(datas[i].num) + "</span>";
          str += "</div>";
        }
      }
    }
    return str;
  },

});
Template.ccf_tile_chart.helpers({
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
    } catch (ccf)
    {
      console.log(ccf.message);
    }
  },
  //Returns code for the red/blue part of the charts
  drawChart: function() {
    var curChartValue = this.chartInfo[chartInfoIndex++];
    console.log("curChartValue: " + curChartValue);
    var str = "";
    var colour = "red";
    var extra="";
    var width = 0;
    try {
      if (curChartValue != undefined)
      {
        if (curChartValue >= 0.5)
        {
          colour="blue";
        } else {
          colour="red";
        }

        if (curChartValue <= 0.1)
        {
          extra = "ccf-metrics-tile-chartcont-chart-toosml";
        }
        width = parseFloat(Math.round(curChartValue * 100));
        if (width < 10)
        {
          width = 10;
        }
        var str = '<span style="width:' + width + '%;" class="ccf-metrics-tile-chartcont-chart-' + colour + ' ' + extra + '"><span class="ccf-metrics-tile-chartcont-chart-innertext">' + parseFloat(curChartValue * 100) + '%</span></span>';
      }
    } catch (ccf)
    {
      console.log(ccf.message);
    }
    return str;
  }

});
Template.ccf_tile_err.helpers({
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






//Formats a number to be human readable.
function formatNumber(num){
  if (typeof num == "number"){
    var postFix = "";
    var preFix = "$"
    if ( Math.abs(num) < Math.pow(10,3))
    {
      num *= 100;
      preFix = "";
      postFix = "%";
    } else if (Math.abs(num) < Math.pow(10,6))
    {
      num /= Math.pow(10,3);
      postFix = " Thousand"

    } else if (Math.abs(num) < Math.pow(10,9))
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
