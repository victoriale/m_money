/*
Author: snehalatha pappu
Created: [07-21-2015]
Description: portfolio watchlist
Associated Files: portfolio_watchlist.html, portfolio_watchlist.less, portfolio_watchlist-logic.js
*/


Template.portfolio_watchlist.onRendered( function() {
  Session.set("portfolio_watchlist_list",
  [
    {
      portfolio_earners:"Top 100 Portfolio Earners by people who invested $100 or less this month",
      portfolio_location:"United states",
    },

    {
      portfolio_earners:"Top 100 portfolios better than Warren Buff",
      portfolio_location:"United states",
    },

    {
      portfolio_earners:"Top 100 Executive who have donated over 1 million USDs in 2014",
      portfolio_location:"United states",
    }

  ]);

});
var backgroundStyle = "white";
Template.portfolio_watchlist.helpers (
  {
    getPortfolioList: function() {
      var data = Session.get("portfolio_watchlist_list");
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
  })
