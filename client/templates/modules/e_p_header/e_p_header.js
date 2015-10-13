/*   Author: David Wibowo
**** Created: [09/30/2015]
**** Description: Exec profile header
**** Associated Files: e-p_header.html, e-p_header.less, e-p_header_logic.js
*/
Template.ep_head.onCreated(function(){
  this.autorun(function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    Session.set('profile_header',PHcheck(data));
  })
});

Template.ep_head.helpers({
  execInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    data['e_name'] = data.o_first_name + " " + data.o_middle_initial + " " + data.o_last_name;
    Session.set('profile_header', data);
    return data;
  },

});

Template.ep_body.helpers({

  compensationInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data;
  },

});

Template.ep_rdr.helpers({
  execInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data;
  },

});
