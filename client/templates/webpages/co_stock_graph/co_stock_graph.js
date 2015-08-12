/*
Author: Kyle Toom
Date: 8/12/2015
Decription: A page for showing what has happened with a company over a period of time
Associated Files: co_stock_graph.html, co_stock_graph.less, co_stock_graph.js
*/

csgTiles = [ //each of the data tiles at the bottom of the page
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

csgIsGrey = true; //used to determine whether or not a data tile is grey or white

csgGraphObject = {
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

Template.co_stock_graph.helpers(
    {
        getGraphObject: function()
        {
            //get data for chart here
            var url =  "http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?";
            $.getJSON(url,  function(data) {
              csgGraphObject.series[0].data = data;
              //set chart to initial position
              var ctime = csgGraphObject.series[0].data[csgGraphObject.series[0].data.length-1][0];
              csgGraphObject.xAxis.min = ctime - 24*3600000;
              csgGraphObject.xAxis.labels.format = "{value:%l%p}";
              new Highcharts.Chart(csgGraphObject);
            });
            return csgGraphObject;
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
            //used to determine if this is the first button
            if(num==1)
                return " csg-btm-data-period-btn-a";
            else
                return "";
        },

        tiles: function()
        {
            for(var i = 0; i < csgTiles.length; i++)
            {
                //added so that the tiles can be found
                csgTiles[i].left.num = i+1;
                csgTiles[i].right.num = i+1;
            }
            return csgTiles;
        },

        getTileColor: function()
        {
            //used to make a tile grey or white
            if(csgIsGrey)
            {
                csgIsGrey = false;
                return "csg-btm-data-tile-grey";
            } else {
                csgIsGrey = true;
                return "csg-btm-data-tile";
            }
        },

        company: function()
        {
            //object that is used throughout the html
            var c = {
                formalName: "Facebook, Inc.",
                informalName: "Facebook",
                ticker: "FB"
            };
            return c;
        }
    }
);

Template.co_stock_graph.onRendered(function(){
    for(var i = 1; i <= csgTiles.length; i++)
    {
        var a = document.getElementById("csgTileL"+i);
        var b = document.getElementById("csgTileR"+i);
        //expands the divide between tile elements if needed
        if(b.clientHeight>a.clientHeight)
            a.style.height = b.clientHeight + "px";
    }
});

csgBtns = function(num)
{
    var ctime = csgGraphObject.series[0].data[csgGraphObject.series[0].data.length-1][0]; //the most recent time
    var day = 24*3600000; //the time of a day in milliseconds
    var month = 24*3600000*30;
    var year = 24*3600000*30*12;
    //switches between difference scales depending on which button was pressed
    switch(num)
    {
    case 1:
        csgGraphObject.xAxis.min = ctime - day;
        csgGraphObject.xAxis.minTickInterval = day/4;
        csgGraphObject.xAxis.labels.format = "{value:%l%p}";
        break;
    case 2:
        csgGraphObject.xAxis.min = ctime - day*5;
        csgGraphObject.xAxis.minTickInterval = day;
        csgGraphObject.xAxis.labels.format = "{value:%a %l%p}";
        break;
    case 3:
        csgGraphObject.xAxis.min = ctime - day*10;
        csgGraphObject.xAxis.minTickInterval = day*2;
        csgGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 4:
        csgGraphObject.xAxis.min = ctime - month;
        csgGraphObject.xAxis.minTickInterval = day*5;
        csgGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 5:
        csgGraphObject.xAxis.min = ctime - month*3;
        csgGraphObject.xAxis.minTickInterval = day*15;
        csgGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 6:
        csgGraphObject.xAxis.min = ctime - month*6;
        csgGraphObject.xAxis.minTickInterval = month;
        csgGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 7:
        csgGraphObject.xAxis.min = ctime - month*9;
        csgGraphObject.xAxis.minTickInterval = month;
        csgGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 8:
        csgGraphObject.xAxis.min = ctime - year;
        csgGraphObject.xAxis.minTickInterval = month*2;
        csgGraphObject.xAxis.labels.format = "{value:%b %d %Y}";
        break;
    case 9:
        csgGraphObject.xAxis.min = ctime - year*3;
        csgGraphObject.xAxis.minTickInterval = month*6;
        csgGraphObject.xAxis.labels.format = "{value:%b %d %Y}";
        break;
    case 10:
        csgGraphObject.xAxis.min = ctime - year*5;
        csgGraphObject.xAxis.minTickInterval = year;
        csgGraphObject.xAxis.labels.format = "{value:%b %Y}";
        break;
    case 11:
        csgGraphObject.xAxis.min = ctime - year*10;
        csgGraphObject.xAxis.minTickInterval = year*2;
        csgGraphObject.xAxis.labels.format = "{value:%b %Y}";
        break;
    }
    new Highcharts.Chart(csgGraphObject); //need to do this to refresh the graph
    for(var i = 1; i <= 11; i++)
    {
        var a = document.getElementById("csgBtn" + i);
        a.className = "csg-btm-data-period-btn";
        if(i==num)
            a.className += " csg-btm-data-period-btn-a";
    }
}
