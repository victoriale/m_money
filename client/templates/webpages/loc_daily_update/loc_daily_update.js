/*
Author: Kyle Toom
Date: 8/13/2015
Decription: A page for showing what's happening in a city or area
Associated Files: loc_daily_update.html, loc_daily_update.less, loc_daily_update.js
*/

lduGraphObject = {
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

Template.loc_daily_update.helpers(
    {
        getGraphObject: function()
        {
            //get data for chart here
            var url =  "http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?";
            $.getJSON(url,  function(data) {
              lduGraphObject.series[0].data = data;
              //set chart to initial position
              var ctime = lduGraphObject.series[0].data[lduGraphObject.series[0].data.length-1][0];
              lduGraphObject.xAxis.min = ctime - 24*3600000;
              lduGraphObject.xAxis.labels.format = "{value:%l%p}";
              new Highcharts.Chart(lduGraphObject);
            });
            return lduGraphObject;
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
                return " ldu-btm-data-period-btn-a";
            else
                return "";
        },

        location: function()
        {
            //object used throughout the html
            var c = {
                longName: "San Fransisco Bay Area Composite",
                shortName: "Composite",
                abbreviatedName: "San Fransisco Bay Area Comp."
            };
            return c;
        }
    }
);

Template.loc_daily_update.onRendered(function(){
    for(var i = 1; i <= lduTiles.length; i++)
    {
        var a = document.getElementById("lduTileL"+i);
        var b = document.getElementById("lduTileR"+i);
        //makes the divide between tile elements longer if needed
        if(b.clientHeight>a.clientHeight)
            a.style.height = b.clientHeight + "px";
    }
});

lduBtns = function(num)
{
    var ctime = lduGraphObject.series[0].data[lduGraphObject.series[0].data.length-1][0]; //the most recent time in the data
    var day = 24*3600000; //length of a day in milliseconds
    var month = 24*3600000*30;
    var year = 24*3600000*30*12;
    //switches between different scales depending on which button is pressed
    switch(num)
    {
    case 1:
        lduGraphObject.xAxis.min = ctime - day;
        lduGraphObject.xAxis.minTickInterval = day/4;
        lduGraphObject.xAxis.labels.format = "{value:%l%p}";
        break;
    case 2:
        lduGraphObject.xAxis.min = ctime - day*5;
        lduGraphObject.xAxis.minTickInterval = day;
        lduGraphObject.xAxis.labels.format = "{value:%a %l%p}";
        break;
    case 3:
        lduGraphObject.xAxis.min = ctime - day*10;
        lduGraphObject.xAxis.minTickInterval = day*2;
        lduGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 4:
        lduGraphObject.xAxis.min = ctime - month;
        lduGraphObject.xAxis.minTickInterval = day*5;
        lduGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 5:
        lduGraphObject.xAxis.min = ctime - month*3;
        lduGraphObject.xAxis.minTickInterval = day*15;
        lduGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 6:
        lduGraphObject.xAxis.min = ctime - month*6;
        lduGraphObject.xAxis.minTickInterval = month;
        lduGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 7:
        lduGraphObject.xAxis.min = ctime - month*9;
        lduGraphObject.xAxis.minTickInterval = month;
        lduGraphObject.xAxis.labels.format = "{value:%b %d}";
        break;
    case 8:
        lduGraphObject.xAxis.min = ctime - year;
        lduGraphObject.xAxis.minTickInterval = month*2;
        lduGraphObject.xAxis.labels.format = "{value:%b %d %Y}";
        break;
    case 9:
        lduGraphObject.xAxis.min = ctime - year*3;
        lduGraphObject.xAxis.minTickInterval = month*6;
        lduGraphObject.xAxis.labels.format = "{value:%b %d %Y}";
        break;
    case 10:
        lduGraphObject.xAxis.min = ctime - year*5;
        lduGraphObject.xAxis.minTickInterval = year;
        lduGraphObject.xAxis.labels.format = "{value:%b %Y}";
        break;
    case 11:
        lduGraphObject.xAxis.min = ctime - year*10;
        lduGraphObject.xAxis.minTickInterval = year*2;
        lduGraphObject.xAxis.labels.format = "{value:%b %Y}";
        break;
    }
    new Highcharts.Chart(lduGraphObject); //necessary to redraw the graph
    for(var i = 1; i <= 11; i++)
    {
        var a = document.getElementById("lduBtn" + i);
        a.className = "ldu-btm-data-period-btn";
        if(i==num)
            a.className += " ldu-btm-data-period-btn-a";
    }
}
