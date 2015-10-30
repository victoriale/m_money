/* Author: meghana yerramilli
** Created: 08/12/2015
** Description: .js file for market_report page
** Associated Files: market_report.html, market_report.less
*/

var ToCommaNumber = function(Number) {
  var split = Number.toString().split('.');
  split[0] = split[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return split.join('.');
}

Template.market_report.onCreated(function(){
  Session.set('market_report_current','NASDAQ');
  Session.set('market_report_company',0);
});

Template.market_report.onRendered( function() {
  Session.set("how_are_markets");
});

Template.market_report.events({
  'click .mreport-mtabs': function(event) {
    $('.mreport-bts_mtabs').find('.mreport-mtabs').each(function(){
      $(this).attr('class','mreport-mtabs mreport-inactive_tab');
      $(this).find('span').removeClass('mreport-underline');
    });

    $(event.currentTarget).attr('class','mreport-mtabs mreport-active_tab');
    $(event.currentTarget).find('span').addClass('mreport-underline');
    Session.set('market_report_current',$(event.currentTarget).find('span')[0].innerHTML);
    Session.set('market_report_company',0);
  },
  'click .mreport-rbb3': function(event) {
    var data = Session.get('market_report');
    var current = Session.get('market_report_current');
    var company = Session.get('market_report_company');
    if ( typeof data == "undefined" || typeof data.market_history[current] == "undefined" ) {
      return {};
    }

    if ( company + 1 == data.biggest_losers[current].top_list_list.length ) {
      Session.set('market_report_company',0);
    } else {
      Session.set('market_report_company',company + 1);
    }
  },
  'click .mreport-lbb3': function(event) {
    var data = Session.get('market_report');
    var current = Session.get('market_report_current');
    var company = Session.get('market_report_company');
    if ( typeof data == "undefined" || typeof data.market_history[current] == "undefined" ) {
      return {};
    }

    if ( company == 0 ) {
      Session.set('market_report_company',data.biggest_losers[current].top_list_list.length - 1);
    } else {
      Session.set('market_report_company',company - 1);
    }
  }
});

Template.market_report.helpers({                   //helper class for adding data to template dictionary
  //default title and subtitle for header and panel
  title: "How Are The Markets Doing Today?",
  subtitle: "Market Report",

  mrURL: function(){
    var data = Session.get('market_report');
    if(typeof data == 'undefined'){
      return '';
    }
    var current = Session.get('market_report_current');
    if(typeof current == 'undefined'){
      return '';
    }
    data = data.biggest_losers;
    var loc = Session.get('loc_id');
    switch(current){
      case 'NASDAQ':
        var URL = Router.path('content.toplist', {
          loc_id: data.NASDAQ.top_list_info.top_list_location,
          l_name: compUrlName(data.NASDAQ.top_list_info.top_list_title),
          list_id: data.NASDAQ.top_list_info.top_list_id
        });
      break;
      case 'NYSE':
        var URL = Router.path('content.toplist', {
          loc_id: data.NYSE.top_list_info.top_list_location,
          l_name: compUrlName(data.NYSE.top_list_info.top_list_title),
          list_id: data.NYSE.top_list_info.top_list_id
        });
      break;
      case 'AMEX':
        var URL = Router.path('content.toplist', {
          loc_id: data.AMEX.top_list_info.top_list_location,
          l_name: compUrlName(data.AMEX.top_list_info.top_list_title),
          list_id: data.AMEX.top_list_info.top_list_id
        });
      break;
      default:
        var URL = Router.path('content.toplist', {
          loc_id: data.NASDAQ.top_list_info.top_list_location,
          l_name: compUrlName(data.NASDAQ.top_list_info.top_list_title),
          list_id: data.NASDAQ.top_list_info.top_list_id
        });
      break;
    }
    return URL;
  },

  mreport_tiles:function(){
    //Create an object holding the default lists for exchange Tiles in Market_report modules
    var loc_id = Session.get('loc_id');
    if(typeof loc_id == 'undefined'){
      return false;
    }
    var data = Session.get('market_report');
    if(typeof data == 'undefined'){
      return '';
    }
    data = data.biggest_losers;
    tileURL = [
      {open_page:'OPEN PAGE',tile_name:'NASDAQ Companies', image:'/exchange/NASDAQ.png',
        url: Router.path('content.toplist', {
          loc_id: data.NASDAQ.top_list_info.top_list_location,
          l_name: compUrlName(data.NASDAQ.top_list_info.top_list_title),
          list_id: data.NASDAQ.top_list_info.top_list_id
        })
      },
      {open_page:'OPEN PAGE',tile_name:'NYSE Companies', image:'/exchange/NYSE.png',
        url: Router.path('content.toplist', {
          loc_id: data.NYSE.top_list_info.top_list_location,
          l_name: compUrlName(data.NYSE.top_list_info.top_list_title),
          list_id: data.NYSE.top_list_info.top_list_id
        })
      },
      {open_page:'OPEN PAGE',tile_name:'AMEX Companies', image:'/exchange/AMEX.png',
        url: Router.path('content.toplist', {
          loc_id: data.AMEX.top_list_info.top_list_location,
          l_name: compUrlName(data.AMEX.top_list_info.top_list_title),
          list_id: data.AMEX.top_list_info.top_list_id
        })
      }
    ];

    return tileURL;
  },

  mr_info: function() {
    if ( typeof Session.get('market_report') != "undefined" ) {
      return true;
    }
    return false;
  },

  stock_info: function() {
    var data = Session.get('market_report');
    var current = Session.get('market_report_current');
    if ( typeof data == "undefined" || typeof data.market_history[current] == "undefined" ) {
      return {};
    }
    data.market_history[current][0].sh_close = Math.round(data.market_history[current][0].sh_close*100)/100
    var percent_change = parseFloat(data.market_history[current][0].percent_change);
    var change_amt = Math.round(data.market_history[current][0].sh_close*percent_change)/100;
    if ( percent_change >= 0 ) {
      var arrow_class = "fa-arrow-circle-o-up";
      var color_class = "mreport_up";
      change_amt = '$' + change_amt;
    } else {
      var arrow_class = "fa-arrow-circle-o-down";
      var color_class = "mreport_down";
      change_amt = '-$' + Math.abs(change_amt);
    }

    // Create graph
    var g_data = [];
    for ( var index = 0; index < data.market_history[current].length; index++ ) {
      g_data[g_data.length] = [
        (new Date(data.market_history[current][index].sh_date)).getTime(), data.market_history[current][index].sh_close
      ];
    }

    return {
      index_name: current + ' Index',
      stock_price: '$' + ToCommaNumber(data.market_history[current][0].sh_close),
      stock_price_number: change_amt,
      stock_price_percent: percent_change + '%',
      arrow_class: arrow_class,
      color_class: color_class,
      image: '/exchange/' + current + '.png'
    };
  },

  market_info: function() {
    var data = Session.get('market_report');
    var current = Session.get('market_report_current');
    if ( typeof data == "undefined" || typeof data.market_history[current] == "undefined" ) {
      return {};
    }
    var retArr = {};
    retArr.top_list_title = data.biggest_losers[current].top_list_title;
    retArr.exchange_name = current;
    return retArr;
  },

  c_info: function() {
    var data = Session.get('market_report');
    var current = Session.get('market_report_current');
    var company = Session.get('market_report_company');
    if ( typeof data == "undefined" || typeof data.market_history[current] == "undefined" ) {
      return {};
    }
    var retArr = {};
    retArr.counter = company + 1;
    retArr.company_name = data.biggest_losers[current].top_list_list[company].c_name;
    retArr.ticker = data.biggest_losers[current].top_list_list[company].c_ticker;
    retArr.lost_percent = Math.round(data.biggest_losers[current].top_list_list[company].stock_percent*100)/100 + '%';
    retArr.logo = data.biggest_losers[current].top_list_list[company].c_logo;
    retArr.url = Router.path('content.companyprofile',
      {
        partner_id: Router.current().params.partner_id,
        ticker:retArr.ticker,
        name:compUrlName(retArr.company_name),
        company_id: data.biggest_losers[current].top_list_list[company].c_id
      });
    return retArr;
  },

  getGraph: function() {
    var data = Session.get('market_report');
    var current = Session.get('market_report_current');
    if ( typeof data == "undefined" || typeof data.market_history[current] == "undefined" ) {
      return {};
    }

    // Create graph
    var g_data = [];
    for ( var index = data.market_history[current].length - 1; index > -1; index-- ) {
      g_data[g_data.length] = [
        (new Date(data.market_history[current][index].sh_date)).getTime(), parseFloat(data.market_history[current][index].sh_close)
      ];
    }

    var data = {
      c_name: current,
      highchartsData: g_data
    };

    var cfoGraphObject = {
      title: {
          text: ''
      },
      chart: {
          type: 'spline',
          events: {
              redraw: function() {}
          },
          height: 100,
          width: 433
      },
      xAxis: {
          type: 'datetime',
          labels: {
              overflow: 'justify'
          }
      },
      yAxis: {
          title: '',
          floor: 0,
          opposite:true,
          gridLineDashStyle: 'longdash',
          minTickInterval: 5,
          plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
          }],
          labels: {
              formatter: function() {
                  return '$' + this.value
              }
          },
      },
      tooltip: {
        pointFormat: "Value: ${point.y:.2f}"
      },
      plotOptions: {
          spline: {
              lineWidth: 2,
              states: {
                  hover: {
                      lineWidth: 3
                  }
              },
              marker: {
                  enabled: false
              },
              pointInterval: 3600000, // one hour
              pointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
          }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
          name: data.c_name,
          data: data.highchartsData
      }]
    };

    return cfoGraphObject;
  }
});

//Function to render the spline chart
function mreportgraph() {
  var seriesOptions = [],
  seriesCounter = 0,
  //Placeholder data labels
  names = ['', 'AAPL', 'GOOG'],

  //Chart options
  createChart = function () {
    $('#markreportid').highcharts({
      exporting:{
        enabled:false
      },

      credits:{
        enabled:false
      },

      chart:{
        type:'spline',
        width:453,
        height:125,

      },

      xAxis:{
        type:'datetime',
        tickPositioner: function () {
          var positions = [],
          tick = Math.floor(this.dataMin),
          increment = Math.ceil((this.dataMax - this.dataMin) / 6);

          for (tick; tick - increment <= this.dataMax; tick += increment) {
            positions.push(tick);
          }
          return positions * 1000;
        },
        tickPixelInterval: 60,
        title: '',
        labels:{
          autoRotation:false,
          step: 1
        },
      },

      yAxis:{
        opposite:true,
        title:'',
      },
      scrollbar:{
        enabled:false
      },
      rangeSelector: {
        selected: 4,
        inputEnabled: false,
        buttonTheme: {
          visibility: 'hidden'
        },
        labelStyle: {
          visibility: 'hidden'
        }
      },
      title: {
        text: ''
      },
      legend:{
        enabled:false
      },
      series: seriesOptions
    });
  };

  //Populate chart with data
  $.each(names, function (i, name) {

    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?',    function (data) {

      seriesOptions[i] = {
        name: name,
        data: data,
        type:'spline'
      };

      // As we're loading the data asynchronously, we don't know what order it will arrive. So
      // we keep a counter and create the chart when all the data is loaded.
      seriesCounter += 1;

      if (seriesCounter === names.length) {
        // createChart();
      }
    });
  });
}

Template.market_report.rendered=function() {
  mreportgraph();
}
