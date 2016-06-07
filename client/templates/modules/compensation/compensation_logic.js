/*
  Author: Jerek Shoemaker
  Created: 10/1/2015
  Description: compensation Module
  Associated Files: compensation.html, compensation.less, compensation_logic.js
*/
Template.compensation.onCreated(function(){
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
      console.log('ORIGINAL COMPENSATION',data);
      var result = PHcheck(data);
      console.log('AFTER PHCHECK',result);
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
      if(key != 0000){ // comes from database this way and need to filter it out.(prob needs to be done backend)
        yearArray.push(key);
      }
    }

    compYear['full_name'] = compensation['officer'].o_first_name + " " + compensation['officer'].o_middle_initial + " " + compensation['officer'].o_last_name;
    compensation['comp_array'] = compYear;
    compensation['select_year'] = yearArray.sort(function(a, b){return b-a});
    //Set first value of year chosen
    Session.set('compensation_year_chosen', compensation.select_year[0]);
    //console.log('COMPENSATION DONE!',compensation);
    Session.set('new_compensation', compensation);
    /***************COMPENSATION SORTING END***************/
  })

});

Template.compensation.helpers({
  //Helper to display executive name
  execName: function(){
    var data = Session.get('new_compensation');

    return typeof(data) !== 'undefined' ? data.officer.o_first_name + ' ' + data.officer.o_last_name : '';
  },
  //Helper to display all years for dropdown
  years: function(){
    var data = Session.get('new_compensation');

    return typeof(data) !== 'undefined' && typeof(data.select_year) !== 'undefined' ? data.select_year : false;
  },
  //Helper to display year chosen
  yearChosen: function(){
    var chosen = Session.get('compensation_year_chosen');

    return typeof(chosen) !== 'undefined' ? chosen : false;
  },
  //Helper to display total compensation
  totalCompensation: function(){
    var chosen = Session.get('compensation_year_chosen');
    var data = Session.get('new_compensation');

    //If dependencies are undefined exit helper
    if(typeof(chosen) === 'undefined' || typeof(data) === 'undefined'){
      return false;
    }

    return nFormatter(data.comp_array[chosen].TotalComp);

  },
  //Helper to draw graph
  getCompGraphObject: function(){
    var data = Session.get('new_compensation');
    var option = Session.get('compensation_year_chosen');

    //console.log('graph object', data, option);

    //Exit helper if data or option is not defined (option should be defined in onCreated if exists)
    if(typeof(data) === 'undefined'){
      console.log('return because no data');
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
      nameArr.push(compensationTranslate(name));
    }

    //console.log('THE ORGANIZED DATA', valArr, nameArr);

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
              if(ret>1000) {
                if ( ret > 1000000 ) {
                  ret = (Math.round(ret/10000)/100) + 'M';
                } else if ( ret > 1000 ) {
                  ret = (Math.round(ret/10)/100) + 'K';
                }
              } else {
                ret = (Math.round(ret*100)/100);
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
          var ret =this.y;
          if(ret>1000) {
            if ( ret > 1000000 ) {
              ret = (Math.round(ret/10000)/100) + 'M';
            } else if ( ret > 1000 ) {
              ret = (Math.round(ret/10)/100) + 'K';
            }
          } else {
            ret = (Math.round(ret*100)/100);
          }
          return this.x + ': $' + ret;
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
  //Helper to determine url link to compensation page
  compURL: function(){
    var params = Router.current().getParams();

    return Router.pick_path('content.compensation', {
      lname:params.lname,
      fname:params.fname,
      ticker:params.ticker,
      exec_id: params.exec_id
    });
  },
});

Template.compensation.events({
  //Event that sets year chosen variable
  'change #year-chosen': function(e, t){
    Session.set('compensation_year_chosen', t.$('#year-chosen').val());
  }
})

//Function to render the spline chart
function compensationgraph() {
  //Chart options
  createGraph = function () {
    $('#comp_graph').highcharts({
      exporting:{
        enabled:false
      },

      credits:{
        enabled:false
      },

      chart:{
        type: 'column'
      },
      xAxis:{
        title: '',
        categories: [
          'Salary',
          'Bonus',
          'Restricted Stock Reward',
          'Security Underlying Options',
          'Option Award',
          'Other Compensation'
        ],
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
        tickAmount: 6,
        lineWidth: 0,
        opposite: true,
        labels: {
          align: 'left',
          x: 6,
          style: {
            color: '#999999',
            fontSize: '10px',
            fontFamily: 'HN'
          },
          formatter: function() {
            var val = this.value;
            if(this.value == 0)
            {
              val = "0";
            }
            else if(this.value >= 1000000)
            {
              val = (val / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
            }
            else if(this.value >= 1000)
            {
              val = (val / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
            }
            return val;
          }
        },
        title: {
          text: null
        }
      }],
      scrollbar:{
        enabled:false
      },
      title: {
        text: ''
      },
      legend:{
        enabled:false
      },
      series:[{
        name: 'Compensation',
        data: [1.00, 0.00, 0.00, 0.00, 0.00, 610000.00 ]
      }],
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color:'gray'
        }
      },
      plotOptions: {
        column: {
          minPointLength: 2
        },
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
              var ret = this.y;
              if (ret >= 1000000000) {
                ret = '$' + (ret / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
              }
              else if (ret >= 1000000) {
                ret = '$' + (ret / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
              }
              else if (ret >= 1000) {
                ret = '$' + (ret / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
              }
              else if (ret == 0) {
                ret = 'NA';
              }
              else if (ret < 1000)
              {
                ret = '$' + ret;
              }
              return ret;
            }
          }
        }
      },
      tooltip: {
        formatter: function() {
          var val = this.y;
          if (val >= 1000000000) {
            val = (val / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
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
      credits: {
        enabled: false
      },
      exporting: { enabled: false }
    });
  };
  createGraph();
}

Template.compensation.rendered=function() {
  //compensationgraph();
}
