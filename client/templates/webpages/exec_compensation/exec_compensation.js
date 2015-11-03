/*
Author: Prashanth Diddi
Date: 09/02/2015
Decription: A page for showing executive compensation
Associated Files: exec_compensation.html, exec_compensation.less, exec_compensation.js
*/

Template.exec_compensation.onCreated(function(){
  this.autorun(function(){
    /***************COMPENSATION SORTING***************/
    var compensation = Session.get('compensation');
    if(typeof compensation == 'undefined'){
      return '';
    }
    var compYear = {};
    var yearArray = [];
    //takes all the historic compensation data and toss them into a yearly object array
    $.map(compensation.compensation_periods, function(data, index){
      var result = PHcheck(data);
      if(typeof result['o_period_end_date'] != 'undefined'){
        var year = result['o_period_end_date'].split('-');
        if(typeof compYear[year[0]] == 'undefined'){
          compYear[year[0]] = result.o_compensation;
        }else{
          for(key in compYear[year[0]]){
            compYear[year[0]][key] += result.o_compensation[key];
          }//end for
        }//end else
      }//endif
    });
    //push into new array for the select option in compensation module
    for (key in compYear){
      yearArray.push(key);
    }

    compYear['full_name'] = compensation['officer'].o_first_name + " " + compensation['officer'].o_middle_initial + " " + compensation['officer'].o_last_name;
    compensation['comp_array'] = compYear;
    compensation['select_year'] = yearArray.sort(function(a, b){return b-a});
    //Set first value of year chosen
    Session.set('compensation_year_chosen', compensation.select_year[0]);
    Session.set('new_compensation', compensation);
    /***************COMPENSATION SORTING END***************/
  })

});

excmpIsGrey = false;  //Boolean for alternate colors of tiles
borderCount = 0;      //Variable for removing border for last row in tile
arrCount = 0;         //Vaiable for checking the loop count
itemCount = 0;        //Variable for checking items count in loop
isDolHidden = false;  //Boolean for hiding dollar if amount is empty
upArrowShow = false;  //Boolean for showing and hiding uparrow
downArrowShow = false;//Boolean for showing and hiding downarrow

//Helpers for exec_compensation template
Template.exec_compensation.helpers({
  //Helper to determine path back to executive profile
  backToExec: function(){
    var params = Router.current().getParams();

    return Router.pick_path('content.executiveprofile', {
      fname:params.fname,
      lname:params.lname,
      ticker:params.ticker,
      exec_id: params.exec_id
    });
  },
  //Helper to display total compensation
  totalCompensation: function(){
    var chosen = Session.get('compensation_year_chosen');
    var data = Session.get('new_compensation');
    //If dependencies are undefined exit helper
    if(typeof(chosen) === 'undefined' || typeof(data) === 'undefined'){
      return false;
    }
    return dNumberToCommaNumber(data.comp_array[chosen].TotalComp);
  },

  //Helper to display year chosen
  yearChosen: function(){
    var chosen = Session.get('compensation_year_chosen');
    return typeof(chosen) !== 'undefined' ? chosen : false;
  },
  //Helper to display all years for dropdown
  years: function(){
    var data = Session.get('new_compensation');
    return typeof(data) !== 'undefined' && typeof(data.select_year) !== 'undefined' ? data.select_year : false;
  },
  //Helper to get info for executive header
  execHeader: function(){
    var data = Session.get('new_compensation');

    if(typeof(data) === 'undefined'){
      return false;
    }
    //Get most recent year
    var year = data.select_year[0];
    var officerData = data.officer;

    officerData.salary = dNumberToCommaNumber(data.comp_array[year].Salary);
    officerData.company = data.compensation_periods[0].c_name;
    officerData.totalComp = dNumberToCommaNumber(data.comp_array[year].TotalComp);

    var date = new Date(officerData.o_last_updated);

    officerData.lastUpdated = (date.getMonth() + 1) + '/' + (date.getDay() + 1) + '/' + (date.getFullYear());
    console.log(officerData);
    return officerData;
  },
  //Helper to draw graph
  getExecCompGraphObject: function(){
    var data = Session.get('new_compensation');
    var option = Session.get('compensation_year_chosen');

    //Exit helper if data or option is not defined (option should be defined in onCreated if exists)
    if(typeof(data) === 'undefined' || typeof(option) === 'undefined'){
      return '';
    }

    //Get specified year data
    var compData = data.comp_array[option];

    //Initialize arrays
    var valArr = [];
    var nameArr = [];
    //Seperate values and names into separate arrays
    for(name in compData){
      valArr.push(compData[name]);
      nameArr.push(name);
    }

    //Graph Starts
    var execGraphObject = {
      chart: {
        type: 'column'
      },
      title: {
        text: '',
        style: {
          display: 'none'
        }
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '12px',
              fontFamily: 'HN-B'
            },
            formatter: function () {
              var ret =this.y;
              if(ret>1000)
              {
                var ret = '',
                multi,
                axis = this.series.yAxis,
                numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
                i = numericSymbols.length;
                while (i-- && ret === '') {
                  multi = Math.pow(1000, i + 1);
                  if (axis.tickInterval >= multi && numericSymbols[i] !== null) {
                    ret = Highcharts.numberFormat(this.y / multi, -1) + numericSymbols[i];
                  }
                }
              }
              return '$'+ret;
            }
          }
        }
      },

      xAxis: {
        categories: nameArr,
        labels: {
          style: {
            color: '#999999',
            fontSize: '10px',
            fontFamily: 'HN'
          }
        }
      },
      yAxis: [{
        min: 0,
        tickInterval: 100000,
        lineWidth: 0,
        opposite: true,
        labels: {
          align: 'left',
          x: 6,
          style: {
            color: '#999999',
            fontSize: '10px',
            fontFamily: 'HN'
          }
        },
        title: {
          text: null
        }
      }],
      tooltip: {
        formatter: function() {
          var val = this.y;
          if (val >= 1000000000) {
            val = (val / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
          }
          else if (val >= 1000000) {
            val = (val / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
          }
          else if (val >= 1000) {
            val = (val / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
          }
          return this.x +': $'+ val;
        },
        style: {
          fontSize: '12px',
          fontFamily: 'HN'
        }
      },

      series: [{
        showInLegend: false,
        name: 'Compensation',
        data: valArr

      }],
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color:'gray'
        }
      },
      credits: {
        enabled: false
      },
      exporting: { enabled: false }
    };

    return execGraphObject;
  },
  //Helper to determine tile contents
  tiles: function(){
    var data = Session.get('new_compensation');

    //If data is undefined exit helper
    if(typeof(data) === 'undefined'){
      return false;
    }
    //Get most recent year available
    var mostRecentYear = Number(data.select_year[0]);
    var results = {};

    //Loop through data 4 times to get all necessary values
    for(var i = 0; i < 4; i++){
      //Initialize results array with year
      results[mostRecentYear - i] = {};
      //Get compensation data for specific year
      var compData = data.comp_array[mostRecentYear - i];
      var prevCompData = data.comp_array[mostRecentYear - (i + 1)];
      //If data for year exists push to results object, else push dashes (N/A)
      if(typeof(compData) !== 'undefined'){
        //Loop through each type of data and push into results
        for(comp_type in compData){
          //Initialize space for value and perecent
          results[mostRecentYear - i][comp_type] = {
            value: '',
            percent: ''
          }
          //If value equals 0 push dash, else push value
          if(compData[comp_type] === 0){
            results[mostRecentYear - i][comp_type].value = '-';
          }else{
            results[mostRecentYear - i][comp_type].value = dNumberToCommaNumber(compData[comp_type]);
          }

          //If current year value does not equal 0 and previous year value is defined and does not equal 0, then find percentage, else push dashes
          if(compData[comp_type] !== 0 && typeof(prevCompData) !== 'undefined' && prevCompData[comp_type] !== 0 && compData[comp_type] !== prevCompData[comp_type]){
            //Pass values to function to find percentage change
            var percent = findPercentageChange(compData[comp_type], prevCompData[comp_type]);
            results[mostRecentYear - i][comp_type].percent = percent;
          }else{
            results[mostRecentYear - i][comp_type].percent = '--';
          }
        }
      }else{
        results[mostRecentYear - i] = {
          Salary: {
            value: '-',
            percent: '--'
          },
          Bonus: {
            value: '-',
            percent: '--'
          },
          RestrickedStock: {
            value: '-',
            percent: '--'
          },
          AllOtherLT: {
            value: '-',
            percent: '--'
          },
          TotalComp: {
            value: '-',
            percent: '--'
          },
          TotalSt: {
            value: '-',
            percent: '--'
          }
        }
      }//Close else
    }

    //Data to be loaded in tiles
    excmpTiles = [
      {
        left: {
          title: "Salary",
          item: [
            {
              text: mostRecentYear,
              value: results[mostRecentYear].Salary.value,
              changePercent: results[mostRecentYear].Salary.percent
            },
            {
              text: mostRecentYear - 1,
              value: results[mostRecentYear - 1].Salary.value,
              changePercent: results[mostRecentYear - 1].Salary.percent
            },
            {
              text: mostRecentYear - 2,
              value: results[mostRecentYear - 2].Salary.value,
              changePercent: results[mostRecentYear - 2].Salary.percent
            },
            {
              text: mostRecentYear - 3,
              value: results[mostRecentYear - 3].Salary.value,
              changePercent: '--'
            }
          ]
        },
        right: {
          title: "Bonus",
          item: [
            {
              text: mostRecentYear,
              value: results[mostRecentYear].Bonus.value,
              changePercent: results[mostRecentYear].Bonus.percent
            },
            {
              text: mostRecentYear - 1,
              value: results[mostRecentYear - 1].Bonus.value,
              changePercent: results[mostRecentYear - 1].Bonus.percent
            },
            {
              text: mostRecentYear - 2,
              value: results[mostRecentYear - 2].Bonus.value,
              changePercent: results[mostRecentYear - 2].Bonus.percent
            },
            {
              text: mostRecentYear - 3,
              value: results[mostRecentYear - 3].Bonus.value,
              changePercent: "--"
            }
          ]
        }
      },
      {
        left: {
          title: "All Other Compensation",
          item: [
            {
              text: mostRecentYear,
              value: results[mostRecentYear].AllOtherLT.value,
              changePercent: results[mostRecentYear].AllOtherLT.percent
            },
            {
              text: mostRecentYear - 1,
              value: results[mostRecentYear - 1].AllOtherLT.value,
              changePercent: results[mostRecentYear - 1].AllOtherLT.percent
            },
            {
              text: mostRecentYear - 2,
              value: results[mostRecentYear - 2].AllOtherLT.value,
              changePercent: results[mostRecentYear - 2].AllOtherLT.percent
            },
            {
              text: mostRecentYear - 3,
              value: results[mostRecentYear - 3].AllOtherLT.value,
              changePercent: "--"
            }
          ]
        },
        right: {
          title: "Restricted Stock Award",
          item: [
            {
              text: mostRecentYear,
              value: results[mostRecentYear].RestrictedStock.value,
              changePercent: results[mostRecentYear].RestrictedStock.percent
            },
            {
              text: mostRecentYear - 1,
              value: results[mostRecentYear - 1].RestrictedStock.value,
              changePercent: results[mostRecentYear - 1].RestrictedStock.percent
            },
            {
              text: mostRecentYear - 2,
              value: results[mostRecentYear - 2].RestrictedStock.value,
              changePercent: results[mostRecentYear - 2].RestrictedStock.percent
            },
            {
              text: mostRecentYear - 3,
              value: results[mostRecentYear - 3].RestrictedStock.value,
              changePercent: "--"
            }
          ]
        }
      },
      {
        left: {
          title: "SEC Underlying Options",
          item: [
            {
              text: mostRecentYear,
              value: "-",
              changePercent:"--"
            },
            {
              text: mostRecentYear - 1,
              value: "-",
              changePercent:"--"
            },
            {
              text: mostRecentYear - 2,
              value: "-",
              changePercent:"--"
            },
            {
              text: mostRecentYear - 3,
              value: "-",
              changePercent:"--"
            }
          ]
        },
        right: {
          title: "Option Awards",
          item: [
            {
              text: mostRecentYear,
              value: "-",
              changePercent:"--"
            },
            {
              text: mostRecentYear - 1,
              value: "-",
              changePercent:"--"
            },
            {
              text: mostRecentYear - 2,
              value: "-",
              changePercent:"--"
            },
            {
              text: mostRecentYear - 3,
              value: "-",
              changePercent:"--"
            }
          ]
        }
      },
      {
        left: {
          title: "Total Compensation",
          item: [
            {
              text: mostRecentYear,
              value: results[mostRecentYear].TotalComp.value,
              changePercent: results[mostRecentYear].TotalComp.percent
            },
            {
              text: mostRecentYear - 1,
              value: results[mostRecentYear - 1].TotalComp.value,
              changePercent: results[mostRecentYear - 1].TotalComp.percent
            },
            {
              text: mostRecentYear - 2,
              value: results[mostRecentYear - 2].TotalComp.value,
              changePercent: results[mostRecentYear - 2].TotalComp.percent
            },
            {
              text: mostRecentYear - 3,
              value: results[mostRecentYear - 3].TotalComp.value,
              changePercent: "--"
            }
          ]
        },
        right: {
        }
      }
    ];

    return excmpTiles;
  },
  isTileHidden: function()//Function to hide the last right tile
  {
    if(arrCount==3)
    {
      arrCount = 0;
      return "hide";
    }
    else
    return "show";
  },
  getTileColor: function()//Function for tiles background color
  {
    if(excmpIsGrey)
    {
      excmpIsGrey = false;
      return "excmp-btm-data-tile-grey";
    } else {
      excmpIsGrey = true;
      return "excmp-btm-data-tile";
    }
  },
  noBorder: function()//Function for removing border for last row in tiles
  {
    if(borderCount == 3){
      borderCount = 0;
      return "stat-noborder";
    }
    else{
      borderCount++;
      return "stat";
    }
  },
  leftPercColor: function()//Fucntion for colors in percentage in left tiles
  {
    var retValue = "";
    if(isNumber(excmpTiles[arrCount].left.item[itemCount].value))
    {
      isDolHidden = true;
    }
    if(excmpTiles[arrCount].left.item[itemCount].changePercent>0)
    {
      upArrowShow = true;
      downArrowShow = false;
      retValue = "-greencolor";
      itemCount++;
    }
    else if(excmpTiles[arrCount].left.item[itemCount].changePercent<0)
    {
      upArrowShow = false;
      downArrowShow = true;
      retValue = "-redcolor";
      itemCount++;
    }
    else if(excmpTiles[arrCount].left.item[itemCount].changePercent == 0)
    {
      upArrowShow = false;
      downArrowShow = false;
      retValue = "";
      itemCount++;
    }
    else
    {
      upArrowShow = false;
      downArrowShow = false;
      retValue = "";
      itemCount++;
      isHidden = true;
    }

    if(itemCount == 4)
    {
      itemCount = 0;
    }
    return retValue;
  },
  rightPercColor: function()//Fucntion for colors in percentage in right tiles
  {
    var retValue = "";
    if(isNumber(excmpTiles[arrCount].right.item[itemCount].value))
    {
      isDolHidden = true;
    }
    if(excmpTiles[arrCount].right.item[itemCount].changePercent > 0)
    {
      upArrowShow = true;
      downArrowShow = false;
      retValue = "-greencolor";
      itemCount++;
    }
    else if(excmpTiles[arrCount].right.item[itemCount].changePercent < 0)
    {
      upArrowShow = false;
      downArrowShow = true;
      retValue = "-redcolor";
      itemCount++;
    }
    else if(excmpTiles[arrCount].right.item[itemCount].changePercent == 0)
    {
      upArrowShow = false;
      downArrowShow = false;
      retValue = "";
      itemCount++;
    }
    else
    {
      upArrowShow = false;
      downArrowShow = false;
      retValue = "";
      itemCount++;
      isHidden = true;
    }
    if(itemCount == 4)
    {
      itemCount = 0;
      arrCount++;
    }

    return retValue;
  },
  isDollarHidden: function()//Function for hiding the dollar sign
  {
    if(isDolHidden)
    {
      isDolHidden = false;
      return "hide";
    }
    else
      return "show";
  },
  upArrow: function()//Function for hiding and showing up arrow
  {
    if(upArrowShow)
      return "show";
    else
      return "hide";
  },
  downArrow: function()//Function for hiding and showing down arrow
  {
    if(downArrowShow)
      return "show";
    else
      return "hide";
  }
  }
);

Template.exec_compensation.events({
  //Event that sets year chosen variable
  'change #year-chosen': function(e, t){
    Session.set('compensation_year_chosen', t.$('#year-chosen').val());
  },
  //Event to hide tooltip
  'click .excmp-btm-what-top-x': function(e, t){
    t.$('.excmp-btm-what').hide();
  }
})

//function for validating the number
function isNumber(n) {
  n = n.replace(/\,/g,'');
  return isNaN(n);
}

//Finds percentage increase or decrease (ex. increase from val 2 to val 1)
 function findPercentageChange(val1, val2){
  //If recent value is greater than or equal to old value
  if(val1 >= val2){
    var percent = ((((val1 / val2) - 1) * 100)).toFixed(1);
    return percent
  //Else if recent value is less than old value
  }else if(val1 < val2){
    var percent = (((1 - (val1 / val2)) * 100) * -1).toFixed(1);
    //Return decrease object
    return percent
  }
}
