/* Author: Ryan Fisher
** Created: 10/19/2015
** Description: .js file for Quarterly EIS
** Associated Files: quarterly_EIS.html, quarterly_EIS.less, quarterly_EIS_logic.js
*/

Template.quarterly_EIS.onCreated(function(){
  Meteor.http.get('http://apifin.synapsys.us/call_controller.php?action=company_page&option=income_statement&param=3330',
    function(error, data){
    Session.set("quarterly_eis",data);
  });
})

Template.quarterly_EIS.onRendered(function(){
  quarterlyEISgraph();
})

function quarterlyEISgraph() {
 $('#quarterlyEISgraph').highcharts({
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

Template.quarterly_EIS.helpers({
  company: function(){
    var data = Session.get('quarterly_eis');
    return data['data']['income_statement']['company_info']['c_name'];
  },
  updated: function(){
    var data = Session.get('quarterly_eis');
    return data['data']['income_statement']['company_info']['c_tr_last_updated'];
  },
  location: function(){
    return "The United States of America";
  },
  data: function(){
    var data = Session.get('quarterly_eis');
    var borderArray = ["d","s","d","s","d","d","d","d","d","d","s","s","d","d","d","s","s","d","d","s","d","d","d","s","d","s","s","d","d","s","d","d","s","s","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","e"];
    var incomedata = data['data']['income_statement']['income_data'];
    returnArray = [];
    for(var i = 0; i < Object.keys(incomedata).length; i++){
      returnArray[i] = {};
      returnArray[i]['metric'] = Object.keys(incomedata)[i];
      //Set initial styles
      returnArray[i]['style1'] = "font-family:HN-B;";
      returnArray[i]['style2'] = "";
      returnArray[i]['style3'] = "";
      returnArray[i]['style4'] = "";
      returnArray[i]['style5'] = "";

      //Set amounts
      returnArray[i]['amnt1'] = incomedata[Object.keys(incomedata)[i]]['2015'];
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
      returnArray[i]['amnt2'] = incomedata[Object.keys(incomedata)[i]]['2014'];
      if(returnArray[i]['amnt2'] == undefined){
        returnArray[i]['amnt2'] = "-";
      }
      else if(parseInt(returnArray[i]['amnt2']) != NaN){
        if(parseInt(returnArray[i]['amnt2']) < 0){
          returnArray[i]['style2'] += "color:#ca1010;";
        }
      }
      returnArray[i]['amnt3'] = incomedata[Object.keys(incomedata)[i]]['2013'];
      if(returnArray[i]['amnt3'] == undefined){
        returnArray[i]['amnt3'] = "-";
      }
      else if(parseInt(returnArray[i]['amnt3']) != NaN){
        if(parseInt(returnArray[i]['amnt3']) < 0){
          returnArray[i]['style3'] += "color:#ca1010;";
        }
      }
      returnArray[i]['amnt4'] = incomedata[Object.keys(incomedata)[i]]['2012'];
      if(returnArray[i]['amnt4'] == undefined){
        returnArray[i]['amnt4'] = "-";
      }
      else if(parseInt(returnArray[i]['amnt4']) != NaN){
        if(parseInt(returnArray[i]['amnt4']) < 0){
          returnArray[i]['style4'] += "color:#ca1010;";
        }
      }
      returnArray[i]['amnt5'] = incomedata[Object.keys(incomedata)[i]]['2011'];
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
  },

  //For styles, the column of quarter the page is for should be bolded, and negative numbers should be red
  //IE if the page is 2015 Q2 Income Statement, all numbers in the Q2 - 2015 column should be bold
  // data:[
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"solid",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Total Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"solid",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"dashed",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"dashed",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"dashed",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"solid",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"solid",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"dashed",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"solid",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"solid",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"dashed",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"solid",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"dashed",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"solid",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"solid",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"solid",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"dashed",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"solid",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"dashed",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"solid",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"solid",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"dashed",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"dashed",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"dashed",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"dashed",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"dashed",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"4,042.00",amnt2:"3,543.00",amnt3:"3,851.00",amnt4:"8,615.00",amnt5:"2,910.00",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"dashed",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"dashed",metric:"Other Revenue, Total",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"white",border:"dashed",metric:"Revenue",amnt1:"-",amnt2:"-",amnt3:"-",amnt4:"-",amnt5:"-",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  //   {color:"grey",border:"end",metric:"Other Revenue, Total",amnt1:"0.25",amnt2:"0.18",amnt3:"0.25",amnt4:"0.82",amnt5:"0.30",style1:"font-family:HN-B",style2:"",style3:"",style4:"",style5:""},
  // ]
})