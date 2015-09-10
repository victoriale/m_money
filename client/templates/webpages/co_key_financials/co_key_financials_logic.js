/* Author: Ryan Fisher
** Created: 08/10/2015
** Description: .js file for Company Page - Key Financials
** Associated Files: co_key_financials.html, co_key_financials.less, co_key_financials_logic.js
*/

var companyName = "Facebook, Inc."

Template.co_key_financials_secthdr.helpers({
  company: companyName
})

Template.co_key_financials.helpers({
  company: companyName,

  PriceMet:{
    side: 'left',
    title: 'Price Metrics',
    isMissing: false,
    data:[
      {label: 'Open Price', num: '$64.69'},
      {label: 'Today\'s High Price', num: '$67.12'},
      {label: 'Today\'s Low Price', num: '$57.92'},
      {label: 'Close Price', num: '$60.05'},
      {label: 'Volume', num: '13,000,123'},
      {label: 'Average Volume', num: '10,001,987'},
      {label: '52 Week Low', num: '$28.65'},
      {label: '52 Week High', num: '$49.90'},
      {label: 'Market Capitalization', num: '$8,000,500,456'},
      {label: 'Shares Outstanding', num: '126,000,076', noBorder: true}
    ]
  },

  CashDiv:{
    side: 'right',
    title: 'Cash Dividends',
    isMissing: true,
    data:[
      {label: 'Open Price', num: 'N/A'},
      {label: 'Today\'s High Price', num: 'N/A'},
      {label: 'Today\'s Low Price', num: 'N/A'},
      {label: 'Something', num: 'N/A'},
      {label: 'Something else', num: 'N/A'},
      {label: 'Something else entirely', num: 'N/A', noBorder: true}
    ],
    isDividend: true
  },

  PriceEarn:{
    side: 'left',
    title: 'Price to Earn',
    isMissing: false,
    data:[
      {label: 'Price to earnings', num: '238.1'}
    ],
    average:{
      clr: '#3098ff',
      w: '225px',
      pct: 75
    }
  },

  PriceBook:{
    side: 'right',
    title: 'Price to Book',
    isMissing: false,
    data:[
      {label: 'Price to Book', num: '21.7'}
    ],
    average:{
      clr: '#3098ff',
      w: '250px',
      pct: 80
    }
  },

  PriceCash:{
    side: 'left',
    title: 'Price to Cash Flow',
    isMissing: false,
    data:[
      {label: 'Price to Cash Flow', num: '2.8'}
    ],
    average:{
      clr: '#ff4040',
      w: '105px',
      pct: 25
    }
  },

  PriceSales:{
    side: 'right',
    title: 'Price to Sales',
    isMissing: false,
    data:[
      {label: 'Price to Sales', num: '7.7'}
    ],
    average:{
      clr: '#3098ff',
      w: '210px',
      pct: 66
    }
  },

  GrowthCash:{
    side: 'left',
    twoline: true,
    title: 'Growth in Cash Flow',
    title2: '1 Year Average',
    isMissing: false,
    data:[
      {label: '2014', num: 'N/A'}
    ]
  },

  GrowthEquity:{
    side: 'right',
    twoline: true,
    title: 'Growth in Equity',
    title2: '3 Year Average',
    isMissing: false,
    data:[
      {label: '2014', num: '1%'},
      {label: '2013', num: '8%'},
      {label: '2012', num: '16%', noBorder: true}
    ]
  },

  GrowthRev:{
    side: 'left',
    twoline: true,
    title: 'Growth in Revenue',
    title2: '3 Year Average',
    isMissing: false,
    data:[
      {label: '2014', num: '7%'},
      {label: '2013', num: '10%'},
      {label: '2012', num: '15%', noBorder: true}
    ]
  },

  GrowthNet:{
    side: 'right',
    twoline: true,
    title: 'Growth in Net Income',
    title2: '3 Year Average',
    isMissing: false,
    data:[
      {label: '2014', num: 'N/A'},
      {label: '2013', num: 'N/A'},
      {label: '2012', num: 'N/A', noBorder: true}
    ]
  },

  GrossMargin:{
    side: 'left',
    title: 'Gross Margin',
    isMissing: false,
    data:[
      {label: '2013', num: '37%'},
      {label: '2012', num: '43%', noBorder: true}
    ],
    average:{
      clr: '#3098ff',
      w: '245px',
      pct: 80
    }
  },

  OpMargin:{
    side: 'right',
    title: 'Operating Margin',
    isMissing: false,
    data:[
      {label: '2014', num: '10%'},
      {label: '2013', num: '10%'},
      {label: '2012', num: '22%'},
      {label: '2011', num: '25%', noBorder: true}
    ],
    average:{
      clr: '#3098ff',
      w: '225px',
      pct: 75
    }
  },

  NetMargin:{
    side: 'left',
    title: 'Net Margin',
    isMissing: false,
    data:[
      {label: '2013', num: '4%'},
      {label: '2012', num: '-15%', noBorder: true}
    ],
    average:{
      clr: '#3098ff',
      w: '255px',
      pct: 90
    }
  },

  RetEq:{
    side: 'left',
    title: 'R.O.E. - Return of Equity',
    isMissing: false,
    data:[
      {label: '2013', num: '7%'},
      {label: '2012', num: '13%', noBorder: true}
    ]
  },

  RetAsset:{
    side: 'right',
    title: 'Return on Assets',
    isMissing: false,
    data:[
      {label: '2013', num: '13%'},
      {label: '2012', num: '-32%', noBorder: true}
    ],
    average:{
      clr: '#3098ff',
      w: '225px',
      pct: 75
    }
  },

  DebtToCap:{
    side: 'left',
    title: 'Debt to Capital Ratio',
    isMissing: true,
    data:[
      {label: 'Who knows', num: 'N/A'}
    ]
  },

  DebtToEq:{
    side: 'right',
    title: 'Debt to Equity Ratio',
    isMissing: true,
    data:[
      {label: 'Placeholder', num: 'N/A'}
    ]
  }
});

///////Chart Creation ///////////
Template.co_key_financials.cokeyChart =  function(){
  var url = ''; //"http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?";
  $.getJSON(url,  function(data) {
    //options.series[0].data = data;
    var chart = new Highcharts.Chart(options);
  });
  var options = {
    chart: {
        type: 'column',
        backgroundColor: '#f2f2f2'
    },
    title: {
        text: null
    },
    xAxis: {
        categories: ['December 2014']
    },
    yAxis: {
        title: {
            enabled: false
        },
        tickInterval: 0.2,
        gridLineDashStyle: 'dash',
        gridLineZIndex: 0,
        plotLines: [{
            color: '#505050',
            dashStyle: 'solid',
            width: 1,
            value: 0,
            zIndex: 4
           }]
    },
    plotOptions: {
        series: {
            pointWidth: 60,
            groupPadding: 0.15
        }
    },
    colors: ['#3193ff', '#ffc600', '#ff3131'],
    legend: {
			enabled: false
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Facebook, Inc.',
        data: [0.66],
        zIndex: 1
    }, {
        name: 'Sector',
        data: [-0.4],
        zIndex: 2
    }, {
        name: 'Industry',
        data: [0.3],
        zIndex: 3
    }]
  };
  return options;
};
