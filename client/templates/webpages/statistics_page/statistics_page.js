/*
Author: Kyle Toom
Date: 8/30/2015
Decription: A page for showing statistics of an area
Associated Files: statistics_page.html, statistics_page.less, statistics_page.js
*/

statGreyTile = true; //used to determine whether a list item is grey or not

Template.statistics_page.helpers(
    {

      image: function(){
        var data = Session.get('loc_id');
        var state = fullstate(data).replace(/ /g, '_');
        return "background-image: url('/StateImages/Location_"+ state +".jpg');";
      },

      back_url: function(){
        if ( Router.current().params.partner_id == Router.current().params.loc_id ) {
          return Router.pick_path('content.partnerhome',{});
        }
        return Router.pick_path('content.locationprofile',{
          loc_id: Session.get('loc_id')
        });
      },

      statistics: function(){
          var data = Session.get('statistics');
          if(typeof data == 'undefined'){
            return '';
          }
          var loc = Session.get('loc_id');
          data['fullName'] = fullstate(loc);
          if ( typeof Session.get('profile_header') != "undefined" ) {
            data['fullName'] = Session.get('profile_header').location;
          }
          data['global_url'] = Router.pick_path('content.locationprofile',{
            loc_id: 'National',
          });
          data['market_cap'] = dNumberToCommaNumber(data.aggregates['market_cap']);
          data['average_market_cap'] = dNumberToCommaNumber(data.aggregates['average_market_cap']);

          return data;
      },

      statOverview: function(){
        var data = Session.get('statistics')['aggregates'];
        if(typeof data == 'undefined'){
          return '';
        }
        var params = Router.current().getParams();
        data['overviewStatsL'] =
          [ //stats on left
            {
              value: nFormatter2(data.market_cap),
              label: "Total Market Cap",
              font: 'fa-money'
            },
            {
              value: nFormatter2(data.average_market_cap), //the bold text on top
              label: "Average Market Cap", //the text on bottom
              font: 'fa-dollar '
            },
          ];
          data['overviewStatsR'] = [ //stats on right
            {
              value: data.officer_count,
              label: "Officer Count",
              font: 'fa-suitcase ',
              url: Router.pick_path('content.executivelocation',{
                loc_id: params.loc_id,
                page_num:1
              })
            },
            {
              value: data.total_companies,
              label: "Total Companies",
              font: 'fa-bank',
              url:Router.pick_path('content.sector',{
                loc_id: params.loc_id,
                page_num:1
              })
            }
          ];
          if ( Router.current().params.partner_id == Router.current().params.loc_id ) {
            data['overviewStatsR'] = [ //stats on right
              {
                value: data.officer_count,
                label: "Officer Count",
                font: 'fa-suitcase ',
                url: Router.pick_path('content.executivelocation',{
                  loc_id: 'default',
                  page_num:1
                })
              },
              {
                value: data.total_companies,
                label: "Total Companies",
                font: 'fa-bank',
                url:Router.pick_path('content.sector',{
                  loc_id: 'default',
                  page_num:1
                })
              }
            ];
          }

          return data;
      },

        getGraphObject: function() //returns the graph object
        {
          var data = Session.get('statistics');
          if(typeof data == 'undefined'){
            return '';
          }
          var count = 0;
          var colors = ["#3193ff","#64adfe","#82bdff","#a1cdfe","#b8daff","#cee4fd","#ddecfc","#cfddeb","#c5d1de","#d3d4d5",'#cacaca'];
          var sectors = data.sectors;
          var dataArray = [];
          for(key in sectors){
            dataArray.push(
              {
                name:key,
                y: Number(sectors[key].percentage * 100),
                color:colors[count]
              }
            );
            count++;
          }

          var statGraphObject = { //the pie graph used in this page
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
                  data: dataArray
                }
              ]
          };
          return statGraphObject;
        },

        getGraphTable: function() //returns the data for the list that functions as a legend for the graph
        {
          var data = Session.get('statistics');
          if(typeof data == 'undefined'){
            return '';
          }
          var count = 0;
          var colors = ["#3193ff","#64adfe","#82bdff","#a1cdfe","#b8daff","#cee4fd","#ddecfc","#cfddeb","#c5d1de","#d3d4d5",'#cacaca'];
          var sectors = data.sectors;
          var dataArray = [];
          for(key in sectors){
            dataArray.push(
              {
                name:key,
                y: Number(sectors[key].percentage * 100).toFixed(1),
                color:colors[count],
                sectUrl: Router.pick_path('content.sector', {sector_id: compUrlName(key), loc_id: fullstate(Router.current().params.loc_id),page_num:1})
              }
            );
            if ( Router.current().params.partner_id == Router.current().params.loc_id ) {
              dataArray[dataArray.length - 1].sectUrl = Router.pick_path('content.sector', {sector_id: compUrlName(key), loc_id: 'default',page_num:1})
            }
            count++;
          }

          return dataArray;
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

Template.statistics_page.events({
  //Event to close tooltip
  'click .stat-btm-what-top-x': function(e, t){
    t.$('.stat-btm-what').hide();
  }
})

Template.statistics_page.onRendered(function(){
  //used to stick the circle in the graph
  $('#statGraph').highcharts(statGraphObject, function (chart) {
          chart.renderer.label('<div class="stat-btm-data-graph-circle-o"><div class="stat-btm-data-graph-circle" id="statGraphCircle"></div></div>', 36, 36,"rect",0,0,true,false,"").add();
  });
  //set graph circle's image here
  document.getElementById('statGraphCircle').style.backgroundImage = "";
});
