/*
Author: jyothyswaroop
Created: 07/20/2015
Description: US securities and exchange commision documents
Associated Files: sec_finance.less and sec_finance.html
*/
/* Declared a global varibale for the color*/
var backgroundStyle = "fillbox_grey";
Template.sec_finance.helpers({
  /*used helpers for items and called data*/
  items:[
    {money_data:"8-K"},
    {money_data:"8-K"},
    {money_data:"SC 13G/A"},
    {money_data:"4"},
    {money_data:"SC 13D/A"}
  ],
  /* used another helper for color change*/
  getBackgroundStyle: function() {
    if (backgroundStyle === "fillbox_grey")
    {
      backgroundStyle="fillbox_white";
      return backgroundStyle;
    } else {
      backgroundStyle = "fillbox_grey";
      return backgroundStyle;
    }
  }
});
