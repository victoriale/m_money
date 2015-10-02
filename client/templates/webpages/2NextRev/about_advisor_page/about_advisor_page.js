/*
Author: Prashanth Diddi
Date: 09/08/2015
Decription: A page for showing executive compensation
Associated Files: about_advisor_page.html, about_advisor_page.less, about_advisor_page.js
*/
Template.about_advisor_page.helpers(
  {
    advisor: function()//Contains details of the executive
    {
      var advisor = {
        execName: "[Person's Profile Name]",
        location: "San Francisco, CA",
        college1:"[College Rival 1]",
        college2:"[College Rival 2]",
        college3:"[College Rival 3]",
        profLstUpdate:"07/29/2015",
        lastUpdated:"06/24/2015, 8:00 AM EST"
      };
      return advisor;
    }
  }
);
