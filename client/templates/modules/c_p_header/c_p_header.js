/*   Author: David Wibowo
**** Created: [09/30/2015]
**** Description: Exec profile header
**** Associated Files: c-p_header.html, c-p_header.less, c-p_header_logic.js
*/

var Company_Name = "Apple, Inc.";

Template.cp_head.helpers({
  topInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data;
  },
});

Template.cp_body.helpers({
  bodyInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data;
  },
  Symbol       : "AAPL",
  Sector       : "ICT",
  Price        : "109.34",
  Color        : "#ca1010",
  Change       : "-3.41",
  Percent      : "-3.03%",
  As_Of        : "2:30PM EST"
});

Template.cp_rdr.helpers({
  rdrInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data;
  },
  url          : "#",
  Name         : Company_Name
});
