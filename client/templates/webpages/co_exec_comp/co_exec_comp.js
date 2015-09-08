/*
Author: Prashanth Diddi
Date: 09/04/2015
Decription: A page for showing company executive compensation
Associated Files: co_exec_comp.html, co_exec_comp.less, co_exec_comp.js
*/

//Data to be loaded in tiles
coExcmpTiles = [
  {
    left: {
      title: "Salary",
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
      title: "Bonus",
      item: [
        {
          text: "2013",
          value: "2,080,168",
          changePercent:"103.8"
        },
        {
          text: "2012",
          value: "1,020,907",
          changePercent:"-24.2"
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
      title: "Salary",
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
      title: "Bonus",
      item: [
        {
          text: "2013",
          value: "2,080,168",
          changePercent:"103.8"
        },
        {
          text: "2012",
          value: "1,020,907",
          changePercent:"-24.2"
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
coExecGraphObject = {
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
          var ret = this.y;
          if (ret >= 1000000000) {
            ret = (ret / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
          }
          else if (ret >= 1000000) {
            ret = (ret / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
          }
          else if (ret >= 1000) {
            ret = (ret / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
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
    tickInterval: 15000000,
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
    data: [2000000, 3000000, 47000000, 0, 0, 642000]

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

coExcmpIsGrey = false;  //Boolean for alternate colors of tiles
coBorderCount = 0;      //Variable for removing border for last row in tile
coArrCount = 0;         //Vaiable for checking the loop count
coItemCount = 0;        //Variable for checking items count in loop
coIsDolHidden = false;  //Boolean for hiding dollar if amount is empty
coUpArrowShow = false;  //Boolean for showing and hiding uparrow
coDownArrowShow = false;//Boolean for showing and hiding downarrow

//Helpers for co_exec_comp template
Template.co_exec_comp.helpers(
  {
    getCoExecCompGraphObject: function()
    {
      return coExecGraphObject;
    },
    company: function()//Contains details of the executive
    {
      var company = {
        execName: "Mark Zuckerberg",
        formalName: "Facebook, Inc.",
        informalName: "Facebook",
        ticker: "FB",
        lastUpdated: "06/24/2015, 8:00 AM EST",
        stockStatus: "$20 increase",
        annualFinancial: "up 10%",
        profLstUpdate: "07/29/2015",
        sharePrice:"$94.01",
        currentPrice:"$94.31",
        percIncrease:"+0.22 (+0.23%)"
      };
      return company;
    },
    tiles: function()
    {
      return coExcmpTiles;
    },
    isTileHidden: function()//Function to hide the last right tile
    {
      if(coArrCount==3)
      {
        coArrCount = 0;
        return "hide";
      }
      else
        return "show";
    },
    getTileColor: function()//Function for tiles background color
    {
      if(coExcmpIsGrey)
      {
        coExcmpIsGrey = false;
        return "excmp-btm-data-tile-grey";
      } else {
        coExcmpIsGrey = true;
        return "excmp-btm-data-tile";
      }
    },
    noBorder: function()//Function for removing border for last row in tiles
    {
      if(coBorderCount == 3){
        coBorderCount = 0;
        return "stat-noborder";
      }
      else{
        coBorderCount++;
        return "stat";
      }
    },
    leftPercColor: function()//Fucntion for colors in percentage in left tiles
    {
      var retValue = "";
      if(isNumber(coExcmpTiles[coArrCount].left.item[coItemCount].value))
      {
        coIsDolHidden = true;
      }
      if(coExcmpTiles[coArrCount].left.item[coItemCount].changePercent>0)
      {
        coUpArrowShow = true;
        coDownArrowShow = false;
        retValue = "-greencolor";
        coItemCount++;
      }
      else if(coExcmpTiles[coArrCount].left.item[coItemCount].changePercent<0)
      {
        coUpArrowShow = false;
        coDownArrowShow = true;
        retValue = "-redcolor";
        coItemCount++;
      }
      else if(coExcmpTiles[coArrCount].left.item[coItemCount].changePercent == 0)
      {
        coUpArrowShow = false;
        coDownArrowShow = false;
        retValue = "";
        coItemCount++;
      }
      else
      {
        coUpArrowShow = false;
        coDownArrowShow = false;
        retValue = "";
        coItemCount++;
        isHidden = true;
      }

      if(coItemCount == 4)
      {
        coItemCount = 0;
      }
      return retValue;
    },
    rightPercColor: function()//Fucntion for colors in percentage in right tiles
    {
      var retValue = "";
      if(isNumber(coExcmpTiles[coArrCount].right.item[coItemCount].value))
      {
        coIsDolHidden = true;
      }
      if(coExcmpTiles[coArrCount].right.item[coItemCount].changePercent > 0)
      {
        coUpArrowShow = true;
        coDownArrowShow = false;
        retValue = "-greencolor";
        coItemCount++;
      }
      else if(coExcmpTiles[coArrCount].right.item[coItemCount].changePercent < 0)
      {
        coUpArrowShow = false;
        coDownArrowShow = true;
        retValue = "-redcolor";
        coItemCount++;
      }
      else if(coExcmpTiles[coArrCount].right.item[coItemCount].changePercent == 0)
      {
        coUpArrowShow = false;
        coDownArrowShow = false;
        retValue = "";
        coItemCount++;
      }
      else
      {
        coUpArrowShow = false;
        coDownArrowShow = false;
        retValue = "";
        coItemCount++;
        isHidden = true;
      }
      if(coItemCount == 4)
      {
        coItemCount = 0;
        coArrCount++;
      }

      return retValue;
    },
    isDollarHidden: function()//Function for hiding the dollar sign
    {
      if(coIsDolHidden)
      {
        coIsDolHidden = false;
        return "hide";
      }
      else
        return "show";
    },
    upArrow: function()//Function for hiding and showing up arrow
    {
      if(coUpArrowShow)
        return "show";
      else
        return "hide";
    },
    downArrow: function()//Function for hiding and showing down arrow
    {
      if(coDownArrowShow)
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
