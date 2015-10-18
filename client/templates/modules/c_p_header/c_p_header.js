/*   Author: David Wibowo
**** Created: [09/30/2015]
**** Description: Exec profile header
**** Associated Files: c-p_header.html, c-p_header.less, c-p_header_logic.js
*/
Template.cp_head.onRendered(function(){
  /*
  **make sure title stays correct size to fit div
  **max div is the max width before text needs to resizetext
  **cur div is the container containing the text-align
  **cursize is the cur font-size of the container that needs to decrease
  */
  this.autorun(function(){
    resizetext(".p-head-top-name", ".p-head-top-name-txt", "44px");
  })
})

Template.cp_body.onCreated(function(){
  this.autorun(function(){
    //actual time of data coming in which is 5 hours and 15 mins
    var data = Session.get('daily_update');
    //date comparison
    if(typeof data != 'undefined'){
      //grab date
      var apiDate = data['csi_price_last_updated'].split(' ')[0];

      //grab time
      curTime = data['csi_price_last_updated'].split(' ')[1];
      curTime = (Number(curTime.split(':')[0]) % 12) - 5;
      var today = [new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()];
      //year month day
      apiDate = apiDate.split('-');
      var year = today[0] - Number(apiDate[0]);
      var month = today[1] - Number(apiDate[1]);
      var day = today[2] - Number(apiDate[2]);

      if(typeof lastUpdated == 'undefined'){
        //global scope
        lastUpdated = "test";
        if(day > 0){
          if(day == 1){
            lastUpdated = "Yesterday";
          }else{
            lastUpdated = day+" Days ago";
          }
        }else{
          if((curTime) > 0){
            lastUpdated = "Few Hours Ago";
          }else{
            lastUpdated = "Few Mins Ago";
          }
        }
        if(month > 0){
          lastUpdated = month+" Months ago";
        }
        if(year > 0){
          lastUpdated = year+" Months ago";
        }
      }//end nested if
    }
  })
})


Template.cp_head.helpers({
  topInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data;
  },
  text: function(){
    var data = Session.get('bio_location');
    if(typeof data == 'undefined'){
      return '';
    }
    return data.c_desc;
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

  stockInfo: function(){
    var data = Session.get('daily_update');
    if(typeof data == 'undefined'){
      return '';
    }
    //data is being returned as string so convert to numbers and round to fit design
    data['csi_percent_change_since_last'] = Number(data['csi_percent_change_since_last']).toFixed(2);
    data['csi_price'] = Number(data['csi_price']).toFixed(2);
    data['csi_price_change_since_last'] = Number(data['csi_price_change_since_last']).toFixed(2);
    data['lastUpdated'] = lastUpdated;
    Session.set('daily_update',data);
    return data;
  },

});

Template.cp_rdr.helpers({
  rdrInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data;
  },
});
