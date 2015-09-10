/* Author: Ryan Fisher
** Created: 09/02/2015
** Description: .js file for Company Page - Balance Sheets
** Associated Files: co_balance_sheet.html, co_balance_sheet.less, co_balance_sheet_logic.js
*/

var companyName = "Facebook, Inc."

Template.co_balance_sheet_secthdr.helpers({
  company: companyName
})

Template.co_balance_sheet.helpers({
  company: companyName,
  currRatio: '1.19',
  currAsset: '358M',
  currLiab: '301M',

  TotAssets:{
    side: 'left',
    title: 'Total Assets',
    isMissing: false,
    data:[
      {label: '2013', num: '$440 Million'},
      {label: '2012', num: '$274 Million'},
      {label: '2011', num: '$1 Billion'},
      {label: '2010', num: '$1 Billion', noBorder: true}
    ],
    average:{
      clr: '#ff4040',
      w: '110px',
      pct: 30
    }
  },

  TotLiab:{
    side: 'right',
    title: 'Total Liabilities',
    isMissing: false,
    data:[
      {label: '2013', num: '$445 Million'},
      {label: '2012', num: '$326 Million'},
      {label: '2011', num: '$345 Million'},
      {label: '2010', num: '$344 Million', noBorder: true}
    ],
    average:{
      clr: '#ff4040',
      w: '90px',
      pct: 20
    }
  },

  TotCash:{
    side: 'left',
    title: 'Total Cash',
    isMissing: false,
    data:[
      {label: '2013', num: '$101 Million'},
      {label: '2012', num: '$36 Million', noBorder: true}
    ],
    average:{
      clr: '#ff4040',
      w: '130px',
      pct: 40
    }
  },

  StockEq:{
    side: 'right',
    title: 'Stockholders\' Equity',
    isMissing: false,
    data:[
      {label: '2013', num: '$-5 Million'},
      {label: '2012', num: '$-80 Million', noBorder: true}
    ],
    average:{
      clr: '#ff4040',
      w: '100px',
      pct: 25
    }
  },

  WorkCap:{
    side: 'left',
    title: 'Working Capital',
    isMissing: false,
    data:[
      {label: '2013', num: '$57 Million'},
      {label: '2012', num: '$70 Million', noBorder: true}
    ],
    average:{
      clr: '#ff4040',
      w: '130px',
      pct: 40
    }
  },

  WorkCapPct:{
    side: 'right',
    twoline: true,
    title: 'Price to Sales',
    title2: 'vs Sector Average',
    isMissing: false,
    data:[
      {label: '2011', num: '7%'},
      {label: '2010', num: '10%', noBorder: true}
    ],
    average:{
      clr: '#ff4040',
      w: '75px',
      pct: 15
    }
  }
});
