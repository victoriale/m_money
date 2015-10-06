/* Author: Ryan Fisher
** Created: 08/04/2015
** Description: .js file for Advisor Page - Core Information
** Associated Files: core_info_page.html, core_info_page.less, core_info_page_logic.js
*/

Template.core_info_page.helpers({
  name: 'Brian Pfeifler',

  category:[
    {
      title: 'Registered Titles',
      line:[
        {text: 'Investor Advisory Prep', isLink: false}
      ]
    },
    {
      title: 'Current Firm',
      line:[
        {text: 'Morgan Stanley, Inc.', isLink: true}
      ]
    },
    {
      title: 'Individual CRD#',
      line:[
        {text: '1428054', isLink: false}
      ]
    },
    {
      title: 'Independent Contractor',
      line:[
        {text: 'No', isLink: false}
      ]
    },
    {
      title: 'Compensation Options',
      line:[
        {text: 'Commision', isLink: false},
        {text: 'Fixed Fee', isLink: false},
        {text: 'Other Fee', isLink: false},
        {text: 'Percentage of Assets', isLink: false}
      ]
    },
    {
      title: 'Advisory Services Offered',
      line:[
        {text: 'Financial Planning', isLink: false},
        {text: 'Portfolio Management for Businesses or Insitutional Clients', isLink: false},
        {text: 'Portfolio Management for Individuals and/or Small Businesses', isLink: false},
        {text: 'Security Portfolios Management', isLink: false},
        {text: 'Selection of Other Advisors', isLink: false}
      ]
    },
  ]
});
