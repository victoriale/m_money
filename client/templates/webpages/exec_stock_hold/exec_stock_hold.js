/*
Author: Kyle Toom
Date: 8/12/2015
Decription: A page for showing what has happened with a company over a period of time
Associated Files: exec_stock_hold.html, exec_stock_hold.less, exec_stock_hold.js
*/

eshTiles = [ //data for the tiles at the bottom of the page
    {
        left: {
            title: "Share Held",
            item: [
                {
                    text: "Shares",
                    value: "38 Million"
                }
            ],
        },
        right: {
            title: "Market Value",
            item: [
                {
                    text: "Today's Value",
                    value: "$3.64 Billion"
                }
            ],
        }
    },
    {
        left: {
            title: "Annual Salary",
            item: [
                {
                    text: "2014",
                    value: "$1",
                    itemClass: '-u' //only need this field for underlined items
                },
                {
                    text: "2013",
                    value: "$1",
                    itemClass: '-u'
                },
                {
                    text: "2012",
                    value: "$503,205",
                    itemClass: '-u'
                }
            ],
            itemClass: '-u' //underlined version
        },
        right: {
            title: "How Much of FB Does He Own?",
            item: [
                {
                    text: "Share Ownership",
                    value: "28%",
                    itemClass: '-u'
                },
                {
                    graph: true, //gives the weird bar graph thing
                    value: "28%" //make sure this is in a percent
                }
            ],
        }
    }
];

eshIsGrey = false; //used to determine if the tile at the bottom of the page is grey or white

eshGraphObject = {
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

Template.exec_stock_hold.helpers(
    {
        getGraphObject: function()
        {
            //retrieve chart data here
            var url =  "http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?";
            $.getJSON(url,  function(data) {
              eshGraphObject.series[0].data = data;
              //set chart to initial position
              var ctime = eshGraphObject.series[0].data[eshGraphObject.series[0].data.length-1][0];
              eshGraphObject.xAxis.min = ctime - 24*3600000;
              eshGraphObject.xAxis.labels.format = "{value:%l%p}";
              new Highcharts.Chart(eshGraphObject);
            });
            return eshGraphObject;
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

        isInitial: function(num) //used to automatically select the first button
        {
            if(num==1)
                return " esh-btm-data-period-btn-a";
            else
                return "";
        },

        tiles: function()
        {
            for(var i = 0; i < eshTiles.length; i++)
            {
                //add number fields so that they can be referenced
                eshTiles[i].left.num = i+1;
                eshTiles[i].right.num = i+1;
            }
            return eshTiles;
        },

        getTileColor: function()
        {
            if(eshIsGrey)
            {
                eshIsGrey = false;
                return "esh-btm-data-tile-grey";
            } else {
                eshIsGrey = true;
                return "esh-btm-data-tile";
            }
        },

        executive: function() //returns object for executive data used throughout the html
        {
            var c = {
                name: "Mark Zuckerberg",
                company: "Facebook, Inc.",
                ticker: "FB"
            };
            return c;
        },

        exceptableForLargeBar: function(value) //makes sure it's safe to display the "100%" in the box
        {
            if(parseInt(value)<=80)
                return true;
            else
                return false;
        },

        exceptableForSmallBar: function(value) //makes sure it's safe to display the value in the inner box in the graph
        {
            if(parseInt(value)>=20)
                return true;
            else
                return false;
        }
    }
);

Template.exec_stock_hold.onRendered(function(){
    for(var i = 1; i <= eshTiles.length; i++)
    {
        var a = document.getElementById("eshTileL"+i);
        var b = document.getElementById("eshTileR"+i);
        if(b.clientHeight>a.clientHeight)
        {
            //makes it so the dividing line grows if the tiles do
            a.style.borderRightStyle = "solid";
            a.style.height = b.clientHeight + "px";
        }
    }
});

eshBtns = function(num)
{
    var ctime = eshGraphObject.series[0].data[eshGraphObject.series[0].data.length-1][0]; //the most recent piece of data
    var day = 24*3600000;
    var month = 24*3600000*30;
    var year = 24*3600000*30*12;
    //switch between scales depending on which button is pressed
    switch(num)
    {
    case 1:
        eshGraphObject.xAxis.min = ctime - day;
        eshGraphObject.xAxis.minTickInterval = day/4;
        eshGraphObject.xAxis.labels.format = "{value:%l%p}";
        break;
    case 2:
        eshGraphObject.xAxis.min = ctime - day*5;
        eshGraphObject.xAxis.minTickInterval = day;
        eshGraphObject.xAxis.labels.format = "{value:%a %l%p}";
        break;
    case 3:
        eshGraphObject.xAxis.min = ctime - day*10;
        eshGraphObject.xAxis.minTickInterval = day*2;
        eshGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 4:
        eshGraphObject.xAxis.min = ctime - month;
        eshGraphObject.xAxis.minTickInterval = day*5;
        eshGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 5:
        eshGraphObject.xAxis.min = ctime - month*3;
        eshGraphObject.xAxis.minTickInterval = day*15;
        eshGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 6:
        eshGraphObject.xAxis.min = ctime - month*6;
        eshGraphObject.xAxis.minTickInterval = month;
        eshGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 7:
        eshGraphObject.xAxis.min = ctime - month*9;
        eshGraphObject.xAxis.minTickInterval = month;
        eshGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 8:
        eshGraphObject.xAxis.min = ctime - year;
        eshGraphObject.xAxis.minTickInterval = month*2;
        eshGraphObject.xAxis.labels.format = "{value:%b %d %Y}";
        break;
    case 9:
        eshGraphObject.xAxis.min = ctime - year*3;
        eshGraphObject.xAxis.minTickInterval = month*6;
        eshGraphObject.xAxis.labels.format = "{value:%b %d %Y}";
        break;
    case 10:
        eshGraphObject.xAxis.min = ctime - year*5;
        eshGraphObject.xAxis.minTickInterval = year;
        eshGraphObject.xAxis.labels.format = "{value:%b %Y}";
        break;
    case 11:
        eshGraphObject.xAxis.min = ctime - year*10;
        eshGraphObject.xAxis.minTickInterval = year*2;
        eshGraphObject.xAxis.labels.format = "{value:%b %Y}";
        break;
    }
    new Highcharts.Chart(eshGraphObject);
    for(var i = 1; i <= 11; i++)
    {
        var a = document.getElementById("eshBtn" + i);
        a.className = "esh-btm-data-period-btn";
        if(i==num)
            a.className += " esh-btm-data-period-btn-a";
    }
}
