/*Author: [William Klausmeyer]
Created: [10/22/2015]
Description: [.js file for Sector Breakdown Module where pie chart code and logic related to Sector Breakdown module is written]
Associated Files: [area_composite.html,area_composite.less,area_composite.js]
*/

Template.area_composite.helpers({


  module_info: function() {
    var data = Session.get('companies_by_sector');
    if ( typeof data == "undefined" ) {
      return false;
    }
    var RetArr = {};
    // Titles and Info
    RetArr.title = "Companies Sorted By Sectors";
    RetArr.subtitle = "Area Composite";

    // Graph information
    var sect_arr = [];
    for ( var attr in data ) {
      if ( data.hasOwnProperty(attr) ) {
        sect_arr[sect_arr.length] = {
          title: attr,
          count: data[attr].count,
          percentage: data[attr].percentage * 100
        };
      }
    }
    for ( var subind = 0; subind < sect_arr.length; subind++ ) {
      var position = 0;
      for ( var index = 0; index < sect_arr.length; index++ ) {
        if ( sect_arr[index].percentage > sect_arr[subind].percentage || (sect_arr[index].percentage == sect_arr[subind].percentage && subind < index ) ) {
          position = position + 1;
        }
      }
      if ( typeof sect_arr[subind].count == 'undefined' ) {
        position = sect_arr.length - 1;
      }
      sect_arr[subind].position = position;
    }
    var sect_arr_uns = sect_arr;
    var sect_arr = [];
    var cmp_arr = [];
    var colors = ['redidt','yellowidt','purpleidt'];
    var other = {count: 0, title: 'Other', percentage: 0, color: 'blueidt'};
    for ( var index = 0; index < sect_arr_uns.length; index++ ) {
      if ( sect_arr_uns[index].position > 2 ) {
        if ( typeof sect_arr_uns[index].count != "undefined" ) {
          other.count = other.count + sect_arr_uns[index].count;
          other.percentage = other.percentage + sect_arr_uns[index].percentage;
        }
      } else {
        sect_arr_uns[index].percentage = Math.round(sect_arr_uns[index].percentage);
        sect_arr_uns[index].color = colors[sect_arr_uns[index].position];
        sect_arr[sect_arr_uns[index].position] = sect_arr_uns[index];
      }
      if ( sect_arr_uns[index].position < 4 ) {
        cmp_arr[sect_arr_uns[index].position] = sect_arr_uns[index];
      }
    }
    other.percentage = Math.round(other.percentage);
    sect_arr[3] = other;
    RetArr.sectors = sect_arr;

    // Company list
    var images = {
      'Basic Materials': 'fa-flask',
      'Conglomerates': 'fa-building-o',
      'Consumer Goods': 'fa-opencart',
      'Financial': 'fa-line-chart',
      'Healthcare': 'fa-heartbeat',
      'Industrial Goods': 'fa-truck',
      'Services': 'fa-phone',
      'Technology': 'fa-database',
      'Utilities': 'fa-lightbulb-o'
    };
    for ( var index = 0; index < cmp_arr.length; index++ ) {
      var loc_arr = [];
      var limit = 3;
      if ( data[cmp_arr[index].title].count < 3 ) {
        limit = data[cmp_arr[index].title].count;
      }
      for ( var subind = 0; subind < limit; subind++ ) {
        loc_arr[subind] = {
          url: Router.path('content.companyprofile',
          {
            partner_id: Router.current().params.partner_id,
            ticker: data[cmp_arr[index].title][subind].c_ticker,
            name: compUrlName(data[cmp_arr[index].title][subind].c_name),
            company_id: data[cmp_arr[index].title][subind].c_id
          }),
          logo: data[cmp_arr[index].title][subind].c_logo,
          index: subind
        }
      }
      cmp_arr[index].comp = loc_arr;
      cmp_arr[index].image = images[cmp_arr[index].title];
    }
    RetArr.companies = cmp_arr;

    // Chart data
    var chart_sector = [];
    for ( var index = 0; index < sect_arr.length; index++ ) {
      chart_sector[index] = {
        name: sect_arr[index].title,
        y: sect_arr[index].percentage
      };
    }
    Highcharts.getOptions().plotOptions.pie.colors = (function () {
      var colors = ['#ca1010', '#FFBD2F', '#6D0E77', '#3098ff'];
      return colors;
    }());
    var chartdata = {
      chart: {
        type: 'pie',
        backgroundColor:'rgba(255, 255, 255, 0.1)'
      },
      title: {
        useHTML:true,
        text: "",
        verticalAlign: 'middle',
      },
      plotOptions: {
        pie: {
          shadow: false,
          cursor: 'pointer',
          dataLabels:{
            enabled: false,
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          },
        },
        series: {
          allowPointSelect: true
        }
      },
      tooltip: {
        valueSuffix: '%'
      },
      series: [{
        name: 'Sector Breakdown',
        data: chart_sector,
        borderWidth: 0,
        size: '100%',
        innerSize: '59%'
      }],
      credits: {
        enabled: false
      }
    };
    RetArr.sector_breakdown = chartdata;

    // Tiles
    var tiles = [];
    for ( var index = 0; index < sect_arr.length; index++ ) {
      if ( index < 3 ) {
        tiles[index] = {
          name: sect_arr[index].title + ' Sector',
          fnt: images[sect_arr[index].title],
          url: Router.path('content.sector',{
            loc_id:Session.get('loc_id'),
            sector_id: sect_arr[index].title
          })
        };
      }
    }
    //tiles[2] = {name:"All Sectors",fnt:"fa-th"};
    RetArr.tiles = tiles;

    return RetArr;
  },

});
