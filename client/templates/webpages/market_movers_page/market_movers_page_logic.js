/* Author: Navya Eetaram
** Created: 08/14/2015
** Description: .less file for market_movers_page
** Associated Files: market_movers_page.html, market_movers_page.less, market_movers_page_logic.js, portfolio_watchlist.less
*/
var backgroundStyle = "white";
Template.market_movers_page.helpers({

  company: 'Apple, Inc.',
  price: '$856 Billion USDs',

  feat1:[
    {name: 'Exxon Mobil Corp.', stockprice: '46.69', stockdiff: '+0.39 (+0.85%)'},
    {name: 'Johnson & Johnson', stockprice: '99.55', stockdiff: '+0.18 (+0.18%)'},
    {name: 'Facebook Inc', stockprice: '94.31', stockdiff: '+2.68 (+2.76%)'},
    {name: 'Wells Fargo & Co', stockprice: '58.07', stockdiff: '+0.18 (+0.13%)'}
  ],
  getmarketmoverspageList: function() {
    var data = Session.get("market_movers_page_list");
    console.log(typeof data);
    return data;
  },
  getmarketmoverspageList2: function() {
    var data = Session.get("market_movers_page_list2");
    console.log(typeof data);
    return data;
  },
  getBackgroundStyle: function() {
    if (backgroundStyle === "grey")
    {
      backgroundStyle="white";
      return backgroundStyle;
    } else {
      backgroundStyle = "grey";
      return backgroundStyle;
    }
  }

});
Template.market_movers_page.onRendered( function() {
  Session.set("market_movers_page_list",
  [
    {
      Top_hundred:"Top 100 Most Actively Traded Public Stocks in United States Today",
      m_location:"United states",
    },

    {
      Top_hundred:"Top 100 Largest Percentage gaining Public Stocks in United States Today",
      m_location:"United states",
    },

    {
      Top_hundred:"Top 100 Largest Percentage Losing Public Stocks in United States Today",
      m_location:"United states",
    },


  ]);
  Session.set("market_movers_page_list2",
  [
    {
      Top_hundred:"Top Largest Market Cap. Public Companies Over $1 in United States Today",
      m_location:"United states",
    },

    {
      Top_hundred:"Top Most Actively Traded Public Stocks over $1 in United States Today",
      m_location:"United states",
    }
  ]);
});
