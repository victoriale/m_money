/*
Author: Kyle Toom
Date: 8/10/2015
Decription: A page for showing what has happened with a company over a period of time
Associated Files: co_fin_overview.html, co_fin_overview.less, co_fin_overview.js
*/

cfoTiles = [
    {
        left: {
            title: "P.E. - Price to Earnings",
            item: [
                {
                    text: "P.E. Ratio",
                    value: "277.78"
                }
            ]
        },
        right: {
            title: "E.P.S - Earnings Per Share",
            item: [
                {
                    text: "P.E. Ratio",
                    value: "277.78"
                }
            ]
        }
    },
    {
        left: {
            title: "Dividend Yield",
            item: [
                {
                    text: "Yield",
                    value: "0"
                }
            ]
        },
        right: {
            title: "Market Cap",
            item: [
                {
                    text: "Market Cap",
                    value: "8 Billion"
                }
            ]
        }
    },
    {
        left: {
            title: "Today's Volume vs Average",
            item: [
                {
                    text: "Today vs Average",
                    value: "7Mil vs 10Mil"
                }
            ]
        },
        right: {
            title: "Alpha & Beta",
            item: [
                {
                    text: "Alpha",
                    value: "N/A"
                },
                {
                    text: "Beta",
                    value: "N/A"
                }
            ]
        }
    }
];

cfoIsGrey = true;

cfoGraphObject = {
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
            labels: {
                format: '${value:.2f}'
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
        name: 'Facebook, Inc.',
        type: 'spline',
        showInLegend: false
    }]
};

Template.co_fin_overview.helpers(
    {
        getGraphObject: function()
        {
            var url =  "http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?";
            $.getJSON(url,  function(data) {
              cfoGraphObject.series[0].data = data;
              //set chart to initial position
              var ctime = cfoGraphObject.series[0].data[cfoGraphObject.series[0].data.length-1][0];
              cfoGraphObject.xAxis.min = ctime - 24*3600000;
              cfoGraphObject.xAxis.labels.format = "{value:%l%p}";
              new Highcharts.Chart(cfoGraphObject);
            });
            return cfoGraphObject;
        },
        btns: function()
        {
            var btns = [
                {text: "1D"},
                {text: "5D"},
                {text: "10D"},
                {text: "1M"},
                {text: "3M"},
                {text: "6M"},
                {text: "9M"},
                {text: "1Y"},
                {text: "3Y"},
                {text: "5Y"},
                {text: "10Y"}
            ];
            for(var i = 1; i <= 11; i++)
            {
                btns[i-1].num = i;
            }
            return btns;
        },

        isInitial: function(num)
        {
            if(num==1)
                return " cfo-btm-data-period-btn-a";
            else
                return "";
        },

        tiles: function()
        {
            for(var i = 0; i < cfoTiles.length; i++)
            {
                cfoTiles[i].left.num = i+1;
                cfoTiles[i].right.num = i+1;
            }
            return cfoTiles;
        },

        getTileColor: function()
        {
            if(cfoIsGrey)
            {
                cfoIsGrey = false;
                return "cfo-btm-data-tile-grey";
            } else {
                cfoIsGrey = true;
                return "cfo-btm-data-tile";
            }
        },

        company: function()
        {
            var c = {
                formalName: "Facebook, Inc.",
                informalName: "Facebook",
                ticker: "FB"
            };
            return c;
        }
    }
);

Template.co_fin_overview.onRendered(function(){
    for(var i = 1; i <= cfoTiles.length; i++)
    {
        var a = document.getElementById("cfoTileL"+i);
        var b = document.getElementById("cfoTileR"+i);
        if(b.clientHeight>a.clientHeight)
            a.style.height = b.clientHeight + "px";
    }
});

cfoBtns = function(num)
{
    var ctime = cfoGraphObject.series[0].data[cfoGraphObject.series[0].data.length-1][0];
    var day = 24*3600000;
    var month = 24*3600000*30;
    var year = 24*3600000*30*12;
    switch(num)
    {
    case 1:
        cfoGraphObject.xAxis.min = ctime - day;
        cfoGraphObject.xAxis.minTickInterval = day/4;
        cfoGraphObject.xAxis.labels.format = "{value:%l%p}";
        break;
    case 2:
        cfoGraphObject.xAxis.min = ctime - day*5;
        cfoGraphObject.xAxis.minTickInterval = day;
        cfoGraphObject.xAxis.labels.format = "{value:%a %l%p}";
        break;
    case 3:
        cfoGraphObject.xAxis.min = ctime - day*10;
        cfoGraphObject.xAxis.minTickInterval = day*2;
        cfoGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 4:
        cfoGraphObject.xAxis.min = ctime - month;
        cfoGraphObject.xAxis.minTickInterval = day*5;
        cfoGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 5:
        cfoGraphObject.xAxis.min = ctime - month*3;
        cfoGraphObject.xAxis.minTickInterval = day*15;
        cfoGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 6:
        cfoGraphObject.xAxis.min = ctime - month*6;
        cfoGraphObject.xAxis.minTickInterval = month;
        cfoGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 7:
        cfoGraphObject.xAxis.min = ctime - month*9;
        cfoGraphObject.xAxis.minTickInterval = month;
        cfoGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 8:
        cfoGraphObject.xAxis.min = ctime - year;
        cfoGraphObject.xAxis.minTickInterval = month*2;
        cfoGraphObject.xAxis.labels.format = "{value:%b %d %Y}";
        break;
    case 9:
        cfoGraphObject.xAxis.min = ctime - year*3;
        cfoGraphObject.xAxis.minTickInterval = month*6;
        cfoGraphObject.xAxis.labels.format = "{value:%b %d %Y}";
        break;
    case 10:
        cfoGraphObject.xAxis.min = ctime - year*5;
        cfoGraphObject.xAxis.minTickInterval = year;
        cfoGraphObject.xAxis.labels.format = "{value:%b %Y}";
        break;
    case 11:
        cfoGraphObject.xAxis.min = ctime - year*10;
        cfoGraphObject.xAxis.minTickInterval = year*2;
        cfoGraphObject.xAxis.labels.format = "{value:%b %Y}";
        break;
    }
    new Highcharts.Chart(cfoGraphObject);
    for(var i = 1; i <= 11; i++)
    {
        var a = document.getElementById("cfoBtn" + i);
        a.className = "cfo-btm-data-period-btn";
        if(i==num)
            a.className += " cfo-btm-data-period-btn-a";
    }
}
