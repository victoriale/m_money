/*
Author: Kyle Toom
Date: 8/13/2015
Decription: A page for showing what's happening in a business
Associated Files: daily_update_page.html, daily_update_page.less, daily_update_page.js
*/

dupGraphObject = {
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

Template.daily_update_page.helpers(
    {
        getGraphObject: function()
        {
            //get data for chart here
            var url =  "http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?";
            $.getJSON(url,  function(data) {
              dupGraphObject.series[0].data = data;
              //set chart to initial position
              var ctime = dupGraphObject.series[0].data[dupGraphObject.series[0].data.length-1][0];
              dupGraphObject.xAxis.min = ctime - 24*3600000;
              dupGraphObject.xAxis.labels.format = "{value:%l%p}";
              new Highcharts.Chart(dupGraphObject);
            });
            return dupGraphObject;
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
            //checks to see if the button is the first one so it can set it to active
            if(num==1)
                return " dup-btm-data-period-btn-a";
            else
                return "";
        },

        company: function()
        {
            //object used throughout the html
            var c = {
                name: "Facebook Inc.",
                ticker: "FB"
            };
            return c;
        }
    }
);

Template.daily_update_page.onRendered(function(){
    for(var i = 1; i <= dupTiles.length; i++)
    {
        var a = document.getElementById("dupTileL"+i);
        var b = document.getElementById("dupTileR"+i);
        //makes the divide between tile elements longer if needed
        if(b.clientHeight>a.clientHeight)
            a.style.height = b.clientHeight + "px";
    }
});

dupBtns = function(num)
{
    var ctime = dupGraphObject.series[0].data[dupGraphObject.series[0].data.length-1][0]; //the most recent time in the data
    var day = 24*3600000; //length of a day in milliseconds
    var month = 24*3600000*30;
    var year = 24*3600000*30*12;
    //switches between different scales depending on which button is pressed
    switch(num)
    {
    case 1:
        dupGraphObject.xAxis.min = ctime - day;
        dupGraphObject.xAxis.minTickInterval = day/4;
        dupGraphObject.xAxis.labels.format = "{value:%l%p}";
        break;
    case 2:
        dupGraphObject.xAxis.min = ctime - day*5;
        dupGraphObject.xAxis.minTickInterval = day;
        dupGraphObject.xAxis.labels.format = "{value:%a %l%p}";
        break;
    case 3:
        dupGraphObject.xAxis.min = ctime - day*10;
        dupGraphObject.xAxis.minTickInterval = day*2;
        dupGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 4:
        dupGraphObject.xAxis.min = ctime - month;
        dupGraphObject.xAxis.minTickInterval = day*5;
        dupGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 5:
        dupGraphObject.xAxis.min = ctime - month*3;
        dupGraphObject.xAxis.minTickInterval = day*15;
        dupGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 6:
        dupGraphObject.xAxis.min = ctime - month*6;
        dupGraphObject.xAxis.minTickInterval = month;
        dupGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 7:
        dupGraphObject.xAxis.min = ctime - month*9;
        dupGraphObject.xAxis.minTickInterval = month;
        dupGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 8:
        dupGraphObject.xAxis.min = ctime - year;
        dupGraphObject.xAxis.minTickInterval = month*2;
        dupGraphObject.xAxis.labels.format = "{value:%b %d %Y}";
        break;
    case 9:
        dupGraphObject.xAxis.min = ctime - year*3;
        dupGraphObject.xAxis.minTickInterval = month*6;
        dupGraphObject.xAxis.labels.format = "{value:%b %d %Y}";
        break;
    case 10:
        dupGraphObject.xAxis.min = ctime - year*5;
        dupGraphObject.xAxis.minTickInterval = year;
        dupGraphObject.xAxis.labels.format = "{value:%b %Y}";
        break;
    case 11:
        dupGraphObject.xAxis.min = ctime - year*10;
        dupGraphObject.xAxis.minTickInterval = year*2;
        dupGraphObject.xAxis.labels.format = "{value:%b %Y}";
        break;
    }
    new Highcharts.Chart(dupGraphObject); //necessary to redraw the graph
    for(var i = 1; i <= 11; i++)
    {
        var a = document.getElementById("dupBtn" + i);
        a.className = "dup-btm-data-period-btn";
        if(i==num)
            a.className += " dup-btm-data-period-btn-a";
    }
}
