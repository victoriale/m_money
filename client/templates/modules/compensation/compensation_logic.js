/*
  Author: Jerek Shoemaker
  Created: 10/1/2015
  Description: compensation Module
  Associated Files: compensation.html, compensation.less, compensation_logic.js
*/

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
                ret = '$' + (ret / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
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
      credits: {
        enabled: false
      },
      exporting: { enabled: false }
    });
  };
  createGraph();
}

Template.compensation.rendered=function() {
  compensationgraph();
}

Template.compensation.helpers ({
  exec: "Mark Zuckerberg",
  year: 2014,
  comp: "610.46K"
});
