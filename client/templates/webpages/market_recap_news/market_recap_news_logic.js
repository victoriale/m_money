/* Author: Navya Eetaram
Created: [09/25/2015]
Description: FIN - Company Location Page - Market Recap
<Associated Files: market_recap_news.html, market_recap_news.js, market_recap_news.less, comments.less, commentserver.js*/
POST4 = new Mongo.Collection('post4');
REPLY4 = new Mongo.Collection('reply4');

if(Meteor.isClient){

  Meteor.subscribe('post4');
  Meteor.subscribe('reply4');

  //Helper class
  var cnt4;
  var isGrey = true;
  Template.market_recap_news.helpers({
    back_link: "#",
    date1: "06/24/2015, 8:00 AM EST",
    date2: "07/29/2015",
    date3: "Oct 24th, 2015",
    time1: "5:00PM",
    loc: "Menlo Park, CA",
    company: "Facebook, Inc.",
    percent: "up 10%",
    year: "2014",
    price_change: "$20 increase",
    stock_price: "$94.01",
    actual_price: "$94.31",
    inc: "+0.22 (+0.23%)",
    auth: "InvestKit",
    arrow: "fa fa-arrow-up",
    clockn: "15 sec ago",
    post4: function () {

      return POST4.find().fetch().reverse();
    },
    isGreyfn : function(){
      if(isGrey)
      {
        isGrey = false;
        return "com-grey"
      }
      else {
        isGrey = true;
        return "com-not-grey"
      }

    },
    cnt4:function(){
      cnt4 = POST4.find().fetch().length;
      return cnt4;
    },
    reply4: function () {
      var id = String(this.cmtid);
      var reply4 = REPLY4.find({replyid: id});
      return reply4;
    },

    rpycnt: function () {
      var id = String(this.cmtid);
      var rpycnt = REPLY4.find({replyid: id}).fetch().length;
      return rpycnt;
    },

    getstocksg: function()
    {
      //get data for chart here
      var url =  "";
      $.getJSON(url,  function(data) {

        new Highcharts.Chart(tgrph);
      });
      return tgrph;
    }
  })

  tgrph = {
    title: {
      text: ''
    },
    chart: {
      type: 'spline',
      events: {
        redraw: function() {}
      }
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify'
      }
    },
    yAxis: {
      title: '',
      floor: 0,
      gridLineDashStyle: 'longdash',
      minTickInterval: 0,
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }],
      labels: {
        formatter: function() {
          return '$' + this.value
        }
      }
    },
    tooltip: {
      pointFormat: "Value: ${point.y:.1f}"
    },
    plotOptions: {
      spline: {
        lineWidth: 3,
        states: {
          hover: {
            lineWidth: 4
          }
        },
        marker: {
          enabled: false
        },
        pointInterval: 3600000, // one hour
        pointStart: Date.UTC(2015, 8, 25)
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'Facebook, Inc.',
      data: [9, 9.4, 10, 10.5, 10.1, 9.7, 9.3, 8.7, 8.5, 8.6,8.8,10, 10.5, 10.1, 9.7,9, 9.5, 10, 10.5, 10.1]
    }]
  }

  tabselct = function(index){

    for(var i = 0; i < 4; i++)
    {
      var e = document.getElementById('tab-' + i);
      if(i == index)
      {
        e.className = "mr-gph-gs-ts-1t mr-gph-gs-ts-1t-sel";
      } else {
        e.className = "mr-gph-gs-ts-1t";
      }
    }

    var chart = $('#stockgraph-n').highcharts();
    switch(index)
    {
      case 0:
      chart.series[0].update({ pointStart: Date.UTC(2015, 8, 25), pointInterval: 3600000, data: [9, 9.4, 10, 10.5, 10.1, 9.7, 9.3, 8.7, 8.5, 8.6,8.8,10, 10.5, 10.1, 9.7,9, 9.5, 10, 10.5, 10.1]});
      break;
      case 1:
      chart.series[0].update({  pointInterval: 86400 * 1000, pointStart:Date.UTC(2015, 8, 20), data: [9, 9.4, 10, 10.5, 10.1, 9.7]});
      break;
      case 2:
      chart.series[0].update({ pointInterval: 86400 * 1000 * 4, pointStart:Date.UTC(2015, 8, 1), data: [8.6,8.8,10, 10.5, 10.1, 9.7,9, 9.5, 10.1, 9.7,9, 9.5]});
      break;
      case 3:
      chart.series[0].update({pointInterval: 86400 * 1000 * 4 * 12 , pointStart:Date.UTC(2015, 3, 20),data: [9, 9.4, 10, 10.5, 10.1, 9.7, 9.3, 8.6,8.8,10]});
      break;
    }
  }

  Template.market_recap_news.events({
    'click .u_input_share_button': function(e) {
      e.preventDefault();
      var id = POST4.find().fetch().length;
      if($('.u_input_text').val()!=""){
        POST4.insert({
          inserted: $('.u_input_text').val(),
          cmtid: id
        });
      }
      $('.u_input_text').val("");
    },
    'click .reply_button': function(e) {
      e.preventDefault();
      if($('.r-box_' + String(this.cmtid)).val()!=""){
        REPLY4.insert({
          replyy: $('.r-box_' + String(this.cmtid)).val(),
          replyid: String(this.cmtid)
        });
      }
      $('.r-box_' + String(this.cmtid)).val("");
    },
    'click #sortingo': function(e) {
      if(cnt4!=0){
        $('.dropdown-menu').slideToggle();
      }
    },
    'click #tc': function(e) {
      $('.result-sort').html("Top Comments");
      $('.dropdown-menu').hide();
    },

    'click #mr': function(e) {
      $('.result-sort').html("Most Recent");
      $('.dropdown-menu').hide();
    }
  });
}
