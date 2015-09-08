/*
Author: Kyle Toom
Date: 8/30/2015
Decription: A page for showing statistics of an area
Associated Files: statistics_page.html, statistics_page.less, statistics_page.js
*/

statGraphObject = { //the pie graph used in this page
    chart: {
        type: 'pie',
        height: 180,
        width: 180,
        margin: [0,0,0,0],
        spacingBottom: 0,
        spacing: [0,0,0,0]
    },
    title: {
        text: ''
    },
    plotOptions: {
      pie: {
        innerSize: '60%',
        dataLabels: {
          enabled: false
        }
      }
    },
    credits: {
        enabled: false
    },
    series: [
      {
        borderWidth: 0,
        data: [
          {name:"Utilities", y:50, color:"#3193ff"},
          {name:"Financials", y:15, color:"#64adfe"},
          {name:"Energy", y:5, color:"#82bdff"},
          {name:"Consumer Cyclicals", y:5, color:"#a1cdfe"},
          {name:"Healthcare", y:5, color:"#b8daff"},
          {name:"Basic Materials", y:5, color:"#cee4fd"},
          {name:"Industrials", y:5, color:"#ddecfc"},
          {name:"Consumer Non-Cyclicals", y:5, color:"#cfddeb"},
          {name:"Telecommunications Services", y:2.5, color:"#c5d1de"},
          {name:"Technology", y:2.5, color:"#d3d4d5"}
        ]
      }
    ]
};

statOverviewStats = [ //stats for overview part of page
  [ //stats on left
    {
      value: "$63.3 Billion", //the bold text on top
      label: "Total Executive Compensation" //the text on bottom
    },
    {
      value: "$26.23 Trillion",
      label: "Total Market Cap"
    }
  ],
  [ //stats on right
    {
      value: "$625,687",
      label: "Avg. Exectuvie Compensation"
    },
    {
      value: "$2.83 Billion",
      label: "Avg. Market Cap"
    }
  ]
];

statPopulationStats = [ //stats for the population overview part of page
  [ //stats on left
    {
      value: "9,768", //the bold text on top
      label: "Companies", //the text on bottom
      fa: "building-o" //the fa icon in the tile
    },
    {
      value: "3,456",
      label: "Brokerage Firms",
      fa: "university"
    },
    {
      value: "67",
      label: "News Sources",
      fa: "newspaper-o"
    }
  ],
  [ //stats on right
    {
      value: "101,168",
      label: "Execiutives",
      fa: "suitcase"
    },
    {
      value: "460,120",
      label: "Advisors",
      fa: "money"
    },
    {
      value: "132,381",
      label: "Authors",
      fa: "pencil"
    }
  ]
];

statGreyTile = true; //used to determine whether a list item is grey or not

Template.statistics_page.helpers(
    {
        location: function()
        {
            //object used throughout the html
            var c = {
                name: "the United States",
                fullName: "United States of America",
            };
            return c;
        },

        overviewStatsL: function() //returns the left side of the overview stats
        {
          return statOverviewStats[0];
        },

        overviewStatsR: function() //returns the right side of the overview stats
        {
          return statOverviewStats[1];
        },

        populationStatsL: function() //returns the left side of the population stats
        {
          return statPopulationStats[0];
        },

        populationStatsR: function() //returns the right side of the population stats
        {
          return statPopulationStats[1];
        },

        getGraphObject: function() //returns the graph object
        {
          return statGraphObject;
        },

        getGraphTable: function() //returns the data for the list that functions as a legend for the graph
        {
          return statGraphObject.series[0].data;
        },

        getGrey: function() //returns a class to make the list item grey if it is to be grey
        {
          if(statGreyTile)
          {
            statGreyTile = false;
            return " stat-btm-data-graph-lst-g";
          } else {
            statGreyTile = true;
            return "";
          }
        }
    }
);

Template.statistics_page.onRendered(function(){
  //used to stick the circle in the graph
  $('#statGraph').highcharts(statGraphObject, function (chart) {
          chart.renderer.label('<div class="stat-btm-data-graph-circle-o"><div class="stat-btm-data-graph-circle" id="statGraphCircle"></div></div>', 36, 36,"rect",0,0,true,false,"").add();
  });
  //set graph circle's image here
  document.getElementById('statGraphCircle').style.backgroundImage = "";
});
