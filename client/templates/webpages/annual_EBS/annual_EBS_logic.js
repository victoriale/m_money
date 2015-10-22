Template.annual_EBS.onCreated(function(){
  Meteor.http.get('http://apifin.synapsys.us/call_controller.php?action=company_page&option=balance_sheet&param=3330',
    function(error, data) {
        Session.set("annual_EBS",data);
    }
  );
})

Template.annual_EBS.onRendered(function() {
  annualEBSgraph();
});

Template.annual_EBS.helpers({
  company: "Facebook, Inc",
  upd: "10/24/2014, 12:36PM EDT",
  loc: "The United States Of America",
  year: "2014",
  money1: "0",
  money2: "12.46 Million",
  money3: "0",

  data: function(){
    var data = Session.get('annual_EBS');
    var borderArray = ["d","d","d","d","d","d","d","d","s","d","d","d","d","d","d","s","d","d","d","d","d","s","d","d","s","s","d","d","d","s","d","d","d","d","d","d","d","s","s","d","s","d","d","d","d","d"];
    var balancedata = data['data']['balance_sheet']['balance_sheet_data'];
    returnArray = [];
    for(var i = 0; i < Object.keys(balancedata).length; i++){
      returnArray[i] = {};
      returnArray[i]['metric'] = Object.keys(balancedata)[i];
      //Set initial styles
      returnArray[i]['style1'] = "font-family:HN-B;";
      returnArray[i]['style2'] = "";
      returnArray[i]['style3'] = "";
      returnArray[i]['style4'] = "";

      //Set amounts
      returnArray[i]['amnt1'] = balancedata[Object.keys(balancedata)[i]]['2014'];
      //If no amount, set it to -
      if(returnArray[i]['amnt1'] == undefined){
        returnArray[i]['amnt1'] = "-";
      }
      //If amount is negative, color it red
      else {
        if(parseFloat(returnArray[i]['amnt1']) != NaN){
          returnArray[i]['amnt1'] = parseFloat(returnArray[i]['amnt1']).toFixed(2);
          if(parseFloat(returnArray[i]['amnt1']) < 0){
            returnArray[i]['style1'] += "color:#ca1010  ;";
          }
        }
      }
      returnArray[i]['amnt2'] = balancedata[Object.keys(balancedata)[i]]['2013'];
      if(returnArray[i]['amnt2'] == undefined){
        returnArray[i]['amnt2'] = "-";
      }
      else {
      if(parseFloat(returnArray[i]['amnt2']) != NaN){
        returnArray[i]['amnt2'] = parseFloat(returnArray[i]['amnt2']).toFixed(2);
        if(parseFloat(returnArray[i]['amnt2']) < 0){
          returnArray[i]['style2'] += "color:#ca1010  ;";
        }
      }
    }
      returnArray[i]['amnt3'] = balancedata[Object.keys(balancedata)[i]]['2012'];
      if(returnArray[i]['amnt3'] == undefined){
        returnArray[i]['amnt3'] = "-";
      }
      else {
      if(parseFloat(returnArray[i]['amnt3']) != NaN){
        returnArray[i]['amnt3'] = parseFloat(returnArray[i]['amnt3']).toFixed(2);
        if(parseFloat(returnArray[i]['amnt3']) < 0){
          returnArray[i]['style3'] += "color:#ca1010  ;";
        }
      }
    }
      returnArray[i]['amnt4'] = balancedata[Object.keys(balancedata)[i]]['2011'];
      if(returnArray[i]['amnt4'] == undefined){
        returnArray[i]['amnt4'] = "-";
      }
      else {
      if(parseFloat(returnArray[i]['amnt4']) != NaN){
        returnArray[i]['amnt4'] = parseFloat(returnArray[i]['amnt4']).toFixed(2);
        if(parseFloat(returnArray[i]['amnt4']) < 0){
          returnArray[i]['style4'] += "color:#ca1010  ;";
        }
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

function annualEBSgraph() {
  $('#annualEBSgraph').highcharts({
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
      categories: ['2010', '2011', '2012', '2013', '2014']
    },

    yAxis: {
      tickInterval: 2.5
    },

    series: [{
      type: 'column',
      name: 'Debt',
      data: [2.4, 2.6, 5, 7.3, 5.9],
      showInLegend: false,
      color: '#434348'
    }, {
      type: 'column',
      name: 'Assets',
      data: [4.2, 2.6, 2.6, 8.5, 3.1],
      showInLegend: false,
      color: '#3098FF'
    }, {
      type: 'spline',
      name: 'Average',
      data: [3, 2.67, 3, 6.33, 3.33],
      showInLegend: false,
      marker: {
        lineWidth: 2,
        lineColor: '#F8A354',
        fillColor: 'white'
      },
      color: '#F8A354',

    }]
  });
}
