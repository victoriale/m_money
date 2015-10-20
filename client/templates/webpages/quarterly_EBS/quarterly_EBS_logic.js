/* Author: Ryan Fisher
** Created: 10/19/2015
** Description: .js file for Quarterly EIS
** Associated Files: quarterly_EBS.html, quarterly_EBS.less, quarterly_EBS_logic.js
*/

Template.quarterly_EBS.onCreated(function(){
  Meteor.http.get('http://apifin.synapsys.us/call_controller.php?action=company_page&option=balance_sheet&param=3330',
    function(error, data){
    Session.set("quarterly_EBS",data);
  });
})

Template.quarterly_EBS.onRendered(function(){
  quarterlyEBSgraph();
})

function quarterlyEBSgraph() {
 $('#quarterlyEBSgraph').highcharts({
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
     tickInterval: 2.5,
   },

   series: [{
     type: 'column',
     name: 'Debt',
     data: [2.4, 2.6, 5, 7.3, 5.9],
     showInLegend: false,
     color: '#434348 '
   }, {
     type: 'column',
     name: 'Assets',
     data: [4.2, 2.6, 2.6, 8.5, 3.1],
     showInLegend: false,
     color: '#3098FF '
   }, {
     type: 'spline',
     name: 'Average',
     data: [3, 2.67, 3, 6.33, 3.33],
     showInLegend: false,
     marker: {
       lineWidth: 2,
       lineColor: '#F8A354 ',
       fillColor: 'white'
     },
     color: '#F8A354 ',

   }]
 });
}

Template.quarterly_EBS.helpers({
  company: function(){
    var data = Session.get('quarterly_EBS');
    return data['data']['balance_sheet']['company_info']['c_name'];
  },
  updated: function(){
    var data = Session.get('quarterly_EBS');
    return data['data']['balance_sheet']['company_info']['c_tr_last_updated'];
  },
  location: function(){
    return "The United States of America";
  },
  data: function(){
    var data = Session.get('quarterly_EBS');
    var borderArray = ["d","d","d","d","d","d","d","d","s","d","d","d","d","d","d","s","d","d","d","d","d","s","d","d","s","s","d","d","d","s","d","d","d","d","d","d","d","s","s","d","s","e"];
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
      returnArray[i]['style5'] = "";

      //Set amounts
      returnArray[i]['amnt1'] = balancedata[Object.keys(balancedata)[i]]['2015'];
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
      returnArray[i]['amnt2'] = balancedata[Object.keys(balancedata)[i]]['2014'];
      if(returnArray[i]['amnt2'] == undefined){
        returnArray[i]['amnt2'] = "-";
      }
      else if(parseInt(returnArray[i]['amnt2']) != NaN){
        if(parseInt(returnArray[i]['amnt2']) < 0){
          returnArray[i]['style2'] += "color:#ca1010;";
        }
      }
      returnArray[i]['amnt3'] = balancedata[Object.keys(balancedata)[i]]['2013'];
      if(returnArray[i]['amnt3'] == undefined){
        returnArray[i]['amnt3'] = "-";
      }
      else if(parseInt(returnArray[i]['amnt3']) != NaN){
        if(parseInt(returnArray[i]['amnt3']) < 0){
          returnArray[i]['style3'] += "color:#ca1010;";
        }
      }
      returnArray[i]['amnt4'] = balancedata[Object.keys(balancedata)[i]]['2012'];
      if(returnArray[i]['amnt4'] == undefined){
        returnArray[i]['amnt4'] = "-";
      }
      else if(parseInt(returnArray[i]['amnt4']) != NaN){
        if(parseInt(returnArray[i]['amnt4']) < 0){
          returnArray[i]['style4'] += "color:#ca1010;";
        }
      }
      returnArray[i]['amnt5'] = balancedata[Object.keys(balancedata)[i]]['2011'];
      if(returnArray[i]['amnt5'] == undefined){
        returnArray[i]['amnt5'] = "-";
      }
      else if(parseInt(returnArray[i]['amnt5']) != NaN){
        if(parseInt(returnArray[i]['amnt5']) < 0){
          returnArray[i]['style5'] += "color:#ca1010;";
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
})
