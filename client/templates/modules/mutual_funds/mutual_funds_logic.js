/*Author: Kyle Toom
Created: [07/20/2015]
Description: Mutual Funds Frame
Associated Files: mutual_funds.less,mutual_funds.html
*/
//render function to set the data
Template.mutual_funds.onRendered( function() {
  Session.set("funds_data",
  [
    {
      trust_name:"SPDR S&P 500 ETF Trust",
      period:"1",
      percentage:"+24.30%",
      title:"Funds with FB Stock",
      icon2_none:'none',
      icon3_none:'none',
      fund_name:"Vangaurd Total Stock Market Fund",
      stockpercentage:"+33.69%",
      location:"San Fransisco, CA",
    },
    {
      trust_name:"PowerShares Exchange Traded Fd",
      period:"1",
      percentage:"+22.87%",
      title:"Funds with FB Stock",
      icon1_none:'none',
      icon3_none:'none',
    },
    {
      trust_name:"Fidelity Contafraud Inc",
      period:"1",
      percentage:"+24.30%",
      title:"Funds with FB Stock",
      icon2_none:'none',
      icon1_none:'none',
    },

  ]);

});
//retrieving the data from array
Template.mutual_funds.helpers({
  getinfo: function() {
    var data = Session.get("funds_data");
    return data;
  },
  fund_name:function() {
    var data = Session.get("funds_data");
    return data[0].fund_name;
  },
  stockpercentage:function() {
    var data = Session.get("funds_data");
    return data[0].stockpercentage;
  },
  location:function() {
    var data = Session.get("funds_data");
    return data[0].location;
  },
})
