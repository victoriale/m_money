Template.annual_ECF.onCreated(function(){
  Meteor.http.get('http://apifin.synapsys.us/call_controller.php?action=company_page&option=cash_flow&param=3330',
    function(error, data) {
        Session.set("annual_ECF",data);
    }
  );
})

Template.annual_ECF.onRendered(function() {
  annualECFgraph();
});

Template.annual_ECF.helpers({
  company: "Facebook, Inc",
  upd: "10/24/2014, 12:36PM EDT",
  loc: "The United States Of America",
  year: "2014",
  money1: "4.99 Million",
  money2: "12.46 Million",
  money3: "2.94 Million",

  data: function(){
    var data = Session.get('annual_ECF');
    var borderArray = ["d","d","d","d","d","s","d","d","s","d","d","d","d","s","d","s","d","d","d"];
    var cashflowdata = data['data']['cash_flow']['cash_flow_data'];
    returnArray = [];
    for(var i = 0; i < Object.keys(cashflowdata).length; i++){
      returnArray[i] = {};
      returnArray[i]['metric'] = Object.keys(cashflowdata)[i];
      //Set initial styles
      returnArray[i]['style1'] = "font-family:HN-B;";
      returnArray[i]['style2'] = "";
      returnArray[i]['style3'] = "";
      returnArray[i]['style4'] = "";

      //Set amounts
      returnArray[i]['amnt1'] = cashflowdata[Object.keys(cashflowdata)[i]]['2014'];
      //If no amount, set it to -
      if(returnArray[i]['amnt1'] == undefined){
        returnArray[i]['amnt1'] = "-";
      }
      //If amount is negative, color it red
      else if(parseInt(returnArray[i]['amnt1']) != NaN){
        if(parseInt(returnArray[i]['amnt1']) < 0){
          returnArray[i]['style1'] += "color:#ca1010;";
        }
      }
      returnArray[i]['amnt2'] = cashflowdata[Object.keys(cashflowdata)[i]]['2013'];
      if(returnArray[i]['amnt2'] == undefined){
        returnArray[i]['amnt2'] = "-";
      }
      else if(parseInt(returnArray[i]['amnt2']) != NaN){
        if(parseInt(returnArray[i]['amnt2']) < 0){
          returnArray[i]['style2'] += "color:#ca1010;";
        }
      }
      returnArray[i]['amnt3'] = cashflowdata[Object.keys(cashflowdata)[i]]['2012'];
      if(returnArray[i]['amnt3'] == undefined){
        returnArray[i]['amnt3'] = "-";
      }
      else if(parseInt(returnArray[i]['amnt3']) != NaN){
        if(parseInt(returnArray[i]['amnt3']) < 0){
          returnArray[i]['style3'] += "color:#ca1010;";
        }
      }
      returnArray[i]['amnt4'] = cashflowdata[Object.keys(cashflowdata)[i]]['2011'];
      if(returnArray[i]['amnt4'] == undefined){
        returnArray[i]['amnt4'] = "-";
      }
      else if(parseInt(returnArray[i]['amnt4']) != NaN){
        if(parseInt(returnArray[i]['amnt4']) < 0){
          returnArray[i]['style4'] += "color:#ca1010;";
        }
      }

      //Determine bottom border
      switch(borderArray[i]){
        case 'd':
          returnArray[i]['border'] = "dashed";
          break;
        case 's':
          returnArray[i]['border'] = "solid";
          break;
        case 'e':
          returnArray[i]['border'] = "end";
          break;
      }

      //determine background color
      if(i%2 == 0){
        returnArray[i]['color'] = 'white';
      }
      else{
        returnArray[i]['color'] = 'grey';
      }
    }

    return returnArray;
  }
});

function annualECFgraph() {
  $('#annualECFgraph').highcharts({
    chart: {
      type: 'spline',
      width: 676,
      height: 345
    },

    credits: {
      enabled: false
    },

    exporting: {
      enabled: false
    },

    title: {
      text: ''
    },

    xAxis: {
      type: 'datetime',
      tickInterval: 31536000000,
      min: new Date('2006/01/01').getTime(),
      max: new Date('2015/08/01').getTime(),
      labels: {
        x: 30
      },
      startOnTick: true,
    },

    yAxis: {
      max: 14000000,
      tickInterval: 3000000,
      opposite: true,
      min: -3000000,
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },

    scrollbar: {
      enabled:false
    },

    legend: {
      enabled: 'false'
    },

    plotOptions: {
      spline: {
        lineWidth: 3,
        states: {
          hover: {
            lineWidth: 4
          }
        },
        pointInterval: 5184000000 /* 2 Months */,
        pointStart: Date.UTC(2006, 1, 1, 0, 0, 0),
        marker: {
          enabled: false
        }
      },
    },

    marker: {
      enabled: false
    },

    series: [{
      name: 'Operating Income',
      data: [11200000, 11000000, 11350000, 11000000, 11500000, 11000000, 11200000, 11000000, 11500000,
             11500000, 11500000, 11460000, 11500000, 11600000, 12100000, 13500000, 14750000,
             11700000, 11400000, 11500000, 11610000, 11820000, 11700000, 11500000, 11500000,
             11500000, 11500000, 11500000, 11500000, 11500000, 11500000, 11500000, 11500000,
             11500000, 11500000, 11660000, 11750000, 11720000, 11700000, 11500000, 11500000,
             11500000, 11500000, 11500000, 11600000, 11500000, 11500000, 11500000, 11500000, 11500000,
             11500000, 11500000, 11500000, 11500000, 11500000, 11500000, 11500000, 10000000, 14000000,
             11500000, 11500000, 11500000, 11500000, 11500000, 11500000, 11500000],
      type: 'spline',
      color: '#3098FF',
      marker: {
        symbol: 'circle'
      },
      showInLegend: false
    }, {
      name: 'Investing',
      data: [2200000, 2300000, 2100000, 2300000, 2400000, 2500000, 2200000, 2350000, 3000000, 3000000,
             3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000,
             3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000,
             2200000, 2300000, 2100000, 2300000, 2400000, 2500000, 2200000, 2350000, 3000000, 3000000,
             3000000, 3000000, 3000000, 3000000, 3200000, 3110000, 3050000, 3000000, 3000000, 3000000,
             3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000,
             3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000],
      type: 'spline',
      color: '#F7701D',
      marker: {
        symbol: 'circle'
      },
      showInLegend: false
    }, {
      name: 'Financing',
      data: [1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000,
             1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000,
             1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000,
             1200000, 1200000, 1200000, 1200000, 1300000, 1400000, 1380000, 1420000, 1200000, 1200000,
             1200000, 1200000, 1200000, 1200000, 0800000, 0900000, 1000000, 1200000, 1200000, 1200000,
             1200000, 1200000, 1200000, 1200000, 3000000, 1200000, 1200000, 1200000, 1200000, 1200000,
             1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000],
      type: 'spline',
      color: '#CA1010',
      marker: {
        symbol: 'circle'
      },
      showInLegend: false
    }]
  });
}
