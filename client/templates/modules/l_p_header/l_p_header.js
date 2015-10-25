/*   Author: David Wibowo
**** Created: [09/30/2015]
**** Description: Exec profile header
**** Associated Files: l-p_header.html, l-p_header.less, l-p_header_logic.js
*/

var Company_Name = "San Francisco, CA";

Template.l_p_header.helpers({
})

Template.lp_head.helpers({
  LastUpdate   : "4:59:00PM PST",
  Comp_Location: "UNITED STATES",
  Name         : Company_Name,
  locationData: function(){
    var data = Session.get('profile_header');

    if(typeof(data) === 'undefined'){
      return false;
    }

    return data;
  }
});

Template.lp_body.helpers({
  locationData: function(){
    var data = Session.get('profile_header');

    if(typeof(data) === 'undefined'){
      return false;
    }
    //Removed from api due to slowing down api. Will be in rev1b
    //data.total_executives_comp = data.total_executives_comp.replace(' Dollars', '');

    return data;
  }
});
