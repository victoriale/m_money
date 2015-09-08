/*
Author: Prashanth Diddi
Date: 09/02/2015
Decription: A page for showing executive compensation
Associated Files: exec_compensation.html, exec_compensation.less, exec_compensation.js
*/

//Data to be loaded in tiles
excmpTiles = [
  {
    left: {
      title: "Salary",
      item: [
        {
          text: "2014",
          value: "1",
          changePercent:"--"
        },
        {
          text: "2013",
          value: "1",
          changePercent:"-24.2"
        },
        {
          text: "2012",
          value: "1,346,257",
          changePercent:"28.2"
        },
        {
          text: "2011",
          value: "1,049,999",
          changePercent:"--"
        }
      ]
    },
    right: {
      title: "Bonus",
      item: [
        {
          text: "2013",
          value: "-",
          changePercent:"--"
        },
        {
          text: "2012",
          value: "-",
          changePercent:"--"
        },
        {
          text: "2011",
          value: "1,346,257",
          changePercent:"28.2"
        },
        {
          text: "2010",
          value: "1,049,999",
          changePercent:"--"
        }
      ]
    }
  },
  {
    left: {
      title: "All Other Compensation",
      item: [
        {
          text: "2014",
          value: "2,080,168",
          changePercent:"103.8"
        },
        {
          text: "2013",
          value: "1,020,907",
          changePercent:"-24.2"
        },
        {
          text: "2012",
          value: "1,346,257",
          changePercent:"28.2"
        },
        {
          text: "2011",
          value: "1,049,999",
          changePercent:"--"
        }
      ]
    },
    right: {
      title: "Restricted Stock Award",
      item: [
        {
          text: "2013",
          value: "-",
          changePercent:"--"
        },
        {
          text: "2012",
          value: "-",
          changePercent:"--"
        },
        {
          text: "2011",
          value: "-",
          changePercent:"--"
        },
        {
          text: "2010",
          value: "-",
          changePercent:"--"
        }
      ]
    }
  },
  {
    left: {
      title: "SEC Underlying Options",
      item: [
        {
          text: "2014",
          value: "-",
          changePercent:"--"
        },
        {
          text: "2013",
          value: "-",
          changePercent:"--"
        },
        {
          text: "2012",
          value: "-",
          changePercent:"--"
        },
        {
          text: "2011",
          value: "-",
          changePercent:"--"
        }
      ]
    },
    right: {
      title: "Option Awards",
      item: [
        {
          text: "2013",
          value: "-",
          changePercent:"--"
        },
        {
          text: "2012",
          value: "-",
          changePercent:"--"
        },
        {
          text: "2011",
          value: "-",
          changePercent:"--"
        },
        {
          text: "2010",
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
          text: "2014",
          value: "2,080,168",
          changePercent:"103.8"
        },
        {
          text: "2013",
          value: "1,020,907",
          changePercent:"-24.2"
        },
        {
          text: "2012",
          value: "1,346,257",
          changePercent:"28.2"
        },
        {
          text: "2011",
          value: "1,049,999",
          changePercent:"--"
        }
      ]
    },
    right: {
    }
  }
];

//Graph Starts
execGraphObject = {
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
    data: [1, 0, 0, 0, 0, 610000]

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
//Graph Ends

excmpIsGrey = false;  //Boolean for alternate colors of tiles
borderCount = 0;      //Variable for removing border for last row in tile
arrCount = 0;         //Vaiable for checking the loop count
itemCount = 0;        //Variable for checking items count in loop
isDolHidden = false;  //Boolean for hiding dollar if amount is empty
upArrowShow = false;  //Boolean for showing and hiding uparrow
downArrowShow = false;//Boolean for showing and hiding downarrow

//Helpers for exec_compensation template
Template.exec_compensation.helpers(
  {
    getExecCompGraphObject: function()
    {
      return execGraphObject;
    },
    company: function()//Contains details of the executive
    {
      var company = {
        execName: "Mark Zuckerberg",
        formalName: "Facebook, Inc.",
        informalName: "Facebook",
        ticker: "FB",
        lastUpdated: "06/24/2015, 8:00 AM EST",
        annualSalary: "1",
        otherIncome: "610K",
        profLstUpdate: "07/29/2015",
        totalCompensation:"610.46K"
      };
      return company;
    },
    tiles: function()
    {
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

//function for validating the number
function isNumber(n) {
  n = n.replace(/\,/g,'');
  return isNaN(n);
}
