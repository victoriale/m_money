/*
Author: Kyle Toom
Date: 8/12/2015
Decription: A page for showing what has happened with a company over a period of time
Associated Files: exec_stock_hold.html, exec_stock_hold.less, exec_stock_hold.js
*/

eshGraphObject = {
    chart: { type: 'line',
        events: { redraw: function() { } }
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
                format: '<b>${value:.2f}</b>'
            },
            opposite: true,
            gridLineDashStyle: "Dash"
    },
    xAxis: {
        type: 'datetime',
        categories: ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '<b>NOW</b>'],
        tickLength: 0,
        labels: {
            format: "<b>{value:%l%p}</b>",
        },
        minTickInterval: 3600000*6
    },
    series:
       [{ name: "facebook", type: 'spline', showInLegend: false}]

};


Template.exec_stock_hold.helpers({
  execInf: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    data['o_last_updated'] = data['o_last_updated'];
    data['Name'] = data.o_first_name + " " + data.o_middle_initial + " " + data.o_last_name;
    data['company']= data.c_name;
    data['tick']= data.c_ticker;
    data['o_pic']= data.o_pic;
    Session.set('profile_header', data);
    return data;
  },

  Title:"Stock Holdings",
  Profile: function(){
/*
if(Session.get('IsCompany')) {
   return Session.get("profile_header").c_name;
} else if(Session.get('IsExec')){
  data = Session.get('profile_header');
  return data['o_first_name'] + " " + data['o_last_name'];
} else if(Session.get('IsLocation')){
  return "San Francisco";
} */
    return "[profile]";
  },
//  Name:  function(){
//    return Session.get("profile_header").o_first_name+" "+ Session.get("profile_header").o_last_name;
//  },
  Country: "The United States of America",
  Update: "old 06/24/2015,8:00 AM EST",
  back_url: function(){
    return "#";
  },
  ownShare: function(){
    return 28;
  },
  value:"3.64 Billion USD",
  price:"$94.31",
  updn:"up",
  color:"#44b224;",
  change: "+0.22",
  percent:"+0.23",
  getGraphObject: function() {
    //retrieve chart data here
    var url =  "http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?";
    $.getJSON(url,  function(data) {
      eshGraphObject.series[0].data = data;
      //set chart to initial position
      var ctime = eshGraphObject.series[0].data[eshGraphObject.series[0].data.length-1][0];
      eshGraphObject.xAxis.min = ctime - 24*3600000;
      eshGraphObject.xAxis.labels.format = "<b>{value:%l%p}</b>";
      new Highcharts.Chart(eshGraphObject);
    });
    return eshGraphObject;
  },

  btns: function() {
    var btns = [ {text: "1D"}, {text: "5D"}, {text: "10D"}, {text: "1M"},
                {text: "3M"}, {text: "6M"}, {text: "9M"}, {text: "1Y"},
                {text: "3Y"}, {text: "5Y"}, {text: "10Y"} ];
    for (var i = 1; i <= 11; i++) {
      btns[i-1].num = i;
    }
    return btns;
  },

  isInitial: function(num) { //used to automatically select the first button
    if(num==1) return " exsh-cE-cb-btn-a"; else return "";
  },

});

Template.exec_stock_hold.onRendered(function(){
  this.autorun(function(){

    var Stock_o = 28;
    // This will prevent Share own bar cart label floating outside box
    if (Stock_o < 22)  {   // 22 is chosen aroximately location item should reside
      $("#grphlbl").css({"float": "left", "margin-left":"20px" });
    }
    eshGraphObject.series[0].name = Session.get('profile_header').c_name;
  })
});

eshBtns = function(num) {
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
        eshGraphObject.xAxis.labels.format = "<b>{value:%l%p}</b>";
        break;
    case 2:
        eshGraphObject.xAxis.min = ctime - day*5;
        eshGraphObject.xAxis.minTickInterval = day;
        eshGraphObject.xAxis.labels.format = "<b>{value:%a %l%p}</b>";
        break;
    case 3:
        eshGraphObject.xAxis.min = ctime - day*10;
        eshGraphObject.xAxis.minTickInterval = day*2;
        eshGraphObject.xAxis.labels.format = "<b>{value:%b %d}</b>";
        break;
    case 4:
        eshGraphObject.xAxis.min = ctime - month;
        eshGraphObject.xAxis.minTickInterval = day*5;
        eshGraphObject.xAxis.labels.format = "<b>{value:%b %d}</b>";
        break;
    case 5:
        eshGraphObject.xAxis.min = ctime - month*3;
        eshGraphObject.xAxis.minTickInterval = day*15;
        eshGraphObject.xAxis.labels.format = "<b>{value:%b %d}</b>";
        break;
    case 6:
        eshGraphObject.xAxis.min = ctime - month*6;
        eshGraphObject.xAxis.minTickInterval = month;
        eshGraphObject.xAxis.labels.format = "<b>{value:%b %d}</b>";
        break;
    case 7:
        eshGraphObject.xAxis.min = ctime - month*9;
        eshGraphObject.xAxis.minTickInterval = month;
        eshGraphObject.xAxis.labels.format = "<b>{value:%b %d}</b>";
        break;
    case 8:
        eshGraphObject.xAxis.min = ctime - year;
        eshGraphObject.xAxis.minTickInterval = month*2;
        eshGraphObject.xAxis.labels.format = "<b>{value:%b %d %Y}</b>";
        break;
    case 9:
        eshGraphObject.xAxis.min = ctime - year*3;
        eshGraphObject.xAxis.minTickInterval = month*6;
        eshGraphObject.xAxis.labels.format = "<b>{value:%b %d %Y}</b>";
        break;
    case 10:
        eshGraphObject.xAxis.min = ctime - year*5;
        eshGraphObject.xAxis.minTickInterval = year;
        eshGraphObject.xAxis.labels.format = "<b>{value:%b %Y}</b>";
        break;
    case 11:
        eshGraphObject.xAxis.min = ctime - year*10;
        eshGraphObject.xAxis.minTickInterval = year*2;
        eshGraphObject.xAxis.labels.format = "<b>{value:%b %Y}</b>";
        break;
    }
    new Highcharts.Chart(eshGraphObject);
    for(var i = 1; i <= 11; i++)
    {
        var a = document.getElementById("eshBtn" + i);
        a.className = "exsh-cE-cb-btn";
        if(i==num)
            a.className += " exsh-cE-cb-btn-a";
    }
}
