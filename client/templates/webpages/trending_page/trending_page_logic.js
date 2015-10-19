/* Author: Navya Eetaram
** Created: 08/14/2015
** Description: .less file for trending_page
** Associated Files: trending_page.html, trending_page.less, trending_page_logic.js, portfolio_watchlist.less
*/
var backgroundStyle = "white";
Template.trending_page.helpers({

  company: 'Apple, Inc.',
  price: '$856 Billion USDs',
  nm: "[Profile]",
  featt_p:[
    {name: 'Exxon Mobil Corp.', stockprice: '46.69', stockdiff: '+0.39 (+0.85%)'},
    {name: 'Johnson & Johnson', stockprice: '99.55', stockdiff: '+0.18 (+0.18%)'},
    {name: 'Facebook Inc', stockprice: '94.31', stockdiff: '+2.68 (+2.76%)'},
    {name: 'Wells Fargo & Co', stockprice: '58.07', stockdiff: '+0.18 (+0.13%)'}
  ],
  gettrending_page: function() {
    var data = Session.get("trending_page_list");
    console.log(typeof data);
    return data;
  },
  gettrending_page2: function() {
    var data = Session.get("trending_page_list2");
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
Template.trending_page.onRendered( function() {
  Session.set("trending_page_list",
  [
    {
      Top_trending:"Top 100 Most Actively Traded Public Stocks in United States Today",
      t_location:"United states",
    },

    {
      Top_trending:"Top 100 Largest Percentage gaining Public Stocks in United States Today",
      t_location:"United states",
    },

    {
      Top_trending:"Top 100 Largest Percentage Losing Public Stocks in United States Today",
      t_location:"United states",
    },


  ]);
  Session.set("trending_page_list2",
  [
    {
      Top_trending:"Top Largest Market Cap. Public Companies Over $1 in United States Today",
      t_location:"United states",
    },

    {
      Top_trending:"Top Most Actively Traded Public Stocks over $1 in United States Today",
      t_location:"United states",
    }
  ]);
});
