/*
Author: Meghana yerramilli
Created: [8-06-2015]
Description:insider_t
Associated Files: insider_t.html,insider_t.less
*/
//render function for the data set in arrays
Template.insider_t.onRendered( function() {
  Session.set("insider_t",
  [
    {
      companyname:"Apple",
    },

  ]);
});

insiderTransactions = [
  {
    name: "Luca Maestri",
    company: "Apple, Inc.",
    message: "On March 18th, 2015, Luca Maestri sold <i class='in_bold'>10,823</i> shares of NASDAQ:AAPL at $128.82 per security. A value of <i class='in_green'>$1,394,219.</i>",
    time: "March 18th, 2015",
    location: "Cupertino, CA"
  },
  {
    name: "Craig Federighi",
    company: "Apple, Inc.",
    message: "On Mar 15th, 2015, Craig Federighi made a <i class='in_bold'>payment of $123.59</i> per share on <i class='in_bold'>20,842 shares</i> for the purposes of exercising options or vesting Apple Inc. NASDAQ:AAPL.",
    time: "March 18th, 2015",
    location: "Cupertino, CA"
  },
  {
    name: "Luca Maestri",
    company: "Apple, Inc.",
    message: "On March 18th, 2015, Luca Maestri sold <i class='in_bold'>2,800 shares</i> of NASDAQ:AAPL at $128.82 per security. A value of <i class='in_green'>$361,116.</i>",
    time: "March 18th, 2015",
    location: "Cupertino, CA"
  }
];
//variable
insiderTransactionsWhite = true;
//helpers to retrieve data in array
Template.insider_t.helpers (
  {
    companyname: function() {

      var data = Session.get("insider_t");
      return data[0].companyname;
    },

    transactions: function() {
      return insiderTransactions;
    },

    getColor: function() {
      if(insiderTransactionsWhite)
      {
        insiderTransactionsWhite = false;
        return "white";
      } else {
        insiderTransactionsWhite = true;
        return "grey";
      }
    }

  })
  //for active and inactive tabs
  insidertTabNames = [
    "All Transactions",
    "Private Purchase",
    "Private Sale",
    "Voluntarily Reported",
    "Other"
  ];

  test = function(a) {
    for(var i = 0; i < 5; i++)
    {
      var e = document.getElementById('in_tab' + i);
      if(i==a)
      {
        e.className = "in_eachtab_act" + i;
        e.innerHTML = '<span class="in_blueicon" id="in_activeicn"><i class="fa fa-circle"></i></span><span class="in_space" ></span>' + insidertTabNames[i];
      } else {
        e.className = "in_eachtab_inact" + i;
        e.innerHTML = insidertTabNames[i];
      }
    }

  }
