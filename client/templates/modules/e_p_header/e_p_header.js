/*   Author: David Wibowo
**** Created: [09/30/2015]
**** Description: Exec profile header
**** Associated Files: e-p_header.html, e-p_header.less, e-p_header_logic.js
*/

var Exec_Name = "Mark Zuckerberg";

Template.ep_head.helpers({
  LastUpdate   : "4:59:00PM PST",
  Comp_Location: "MENLOPARK, CA",
  Company      : "FACEBOOK, INC.",
  Name         : Exec_Name
});

Template.ep_body.helpers({
  An_comp      : "1",
  An_comp_d    : "10/17/2014",
  Ot_comp      : "610,000",
  Ot_comp_d    : "10/17/2014",
  Company      : "FB",
  Company_since: "August 2002",
  Share        : "AAPL",
  Share_number : "64,000",
  Share_since  : "Yesterday"
});

Template.ep_rdr.helpers({
  url          : "#",
  Name         : Exec_Name
});
