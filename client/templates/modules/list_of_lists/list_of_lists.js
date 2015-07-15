Template.list_of_lists.onCreated(function(){
  Session.set("list_of_list_count",0);
  Session.set("ListOfListSelected",0);
  if ( typeof Session.get("NumberOfListsDisplay") == "undefined" ) {
    Session.set("NumberOfListsDisplay",4);
    if ( Session.get("IsListOfListPage") ) {
      Session.set("NumberOfListsDisplay",0);
    }
  }
  Session.set("ListOfListDoneArray",[]);
  Session.set("ListOfListUsedArray",[]);
  Meteor.call('GetListOfLists',function(error,result){
    if(!error){
      var listArray = new Array();
      for ( var index = 0; index < result['available_lists'].length; index++ ) {
        listArray[index] = result['available_lists'][index]['method'];
      }
      listArray.sort();
      Session.set("listData",listArray);
    } else {
      console.log("ListOfList ERROR",error);
    };
  });
  this.autorun(function(){
    if ( Session.get("IsListOfListPage") && Session.get("NumberOfListsDisplay") == 0 ) {
      var totalDone = Session.get("ListOfListSelected");
      if ( totalDone > 0 ) {
        return "";
      }
      var listData = Session.get("listData");
      if ( typeof listData == "undefined" ) {
        return "";
      }
      var LocData = Session.get('profile_header');
      if ( typeof LocData == "undefined" ) {
        var city = Session.get("ListMasterCity");
        var state = Session.get("ListMasterState");
        var LocData = {city: city, state: state};
      }
      for ( var index = 0; index < listData.length; index++ ) {
        Session.set("ListOfListSelected",Session.get("ListOfListSelected") + 1);
        Meteor.call('GetAbbrListData',listData[index],index,LocData['city'],LocData['state'],function(error,result){
          if ( !error ) {
            if ( result['Data'].length == 0 ) {
              Session.set("ListOfListSelected",Session.get("ListOfListSelected") - 1);
            } else {
              var listData = Session.get("listData");
              var DoneArray = Session.get("ListOfListDoneArray");
              Session.set(listData[result['index']],result);
              Session.set("list_of_list_count",Session.get("list_of_list_count") + 1);
              DoneArray[DoneArray.length] = result['index'];
              Session.set("ListOfListDoneArray",DoneArray);
            }
          } else {
            console.log("ABBR LIST ERROR",error);
          }
        });
      }
    } else {
      var SelectedIndex = Session.get("ListOfListSelected");
      var NumToGet = Session.get("NumberOfListsDisplay");
      if ( SelectedIndex == NumToGet ) {
        return "";
      }
      var LocData = Session.get('profile_header');
      var listData = Session.get("listData");
      if ( typeof LocData == "undefined" && Session.get("IsListOfListPage") ) {
        var city = Session.get("ListMasterCity");
        var state = Session.get("ListMasterState");
        var LocData = {city: city, state: state};
      }
      if ( typeof listData == "undefined" || typeof LocData == "undefined" ) {
        return "";
      }
      while ( Session.get("ListOfListSelected") < NumToGet ) {
        var randIndex = Math.round(Math.random() * listData.length);
        var isDone = false;
        var UsedArray = Session.get("ListOfListUsedArray");
        if ( UsedArray.length == listData.length ) {
          console.log("Terminal Error: All Lists Tried");
          return "";
        }
        for ( var index = 0; index < UsedArray.length; index++ ) {
          if ( randIndex == UsedArray[index] ) {
            isDone = true;
          }
        }
        if ( !isDone ) {
          UsedArray[UsedArray.length] = randIndex;
          Session.set("ListOfListUsedArray",UsedArray);
          Session.set("ListOfListSelected",Session.get("ListOfListSelected") + 1);
          Meteor.call('GetAbbrListData',listData[randIndex],randIndex,LocData['city'],LocData['state'],function(error,result){
            if ( !error ) {
              if ( result['Data'].length == 0 ) {
                Session.set("ListOfListSelected",Session.get("ListOfListSelected") - 1);
              } else {
                var listData = Session.get("listData");
                var DoneArray = Session.get("ListOfListDoneArray");
                Session.set(listData[result['index']],result);
                Session.set("list_of_list_count",Session.get("list_of_list_count") + 1);
                DoneArray[DoneArray.length] = result['index'];
                Session.set("ListOfListDoneArray",DoneArray);
              }
            } else {
              Session.set("ListOfListSelected",Session.get("ListOfListSelected") - 1);
              console.log("ABBR LIST ERROR",error);
            }
          });
        }
      }
    }
  });
});

Template.list_of_lists.events({
  'click .top_list_mainimg, click .top_list_subimg': function(event) {
    var TargetElem = $(event.target);
    if ( $(event.target).hasClass("top_list-view") || $(event.target).hasClass("top_list-profile") || $(event.target).hasClass("top_list-image-body") || $(event.target).hasClass("top_list-view-profile") ) {
      var loopcount = 0;
      while ( !$(TargetElem).hasClass("top_list_mainimg") ) {
        TargetElem = $(TargetElem)[0].parentElement;
        loopcount++;
        if ( loopcount > 10 ) {
          return;
        }
      }
    }
    ListingRedirect($(TargetElem)[0].id);
    return false;
  },
  'click .top_list-tile-button': function(event) {
    ListViewRedirect(this.ListName,this.ListCity,this.ListState);
  },
  'click #see_whole_list': function() {
    ResetSession();
    Router.go("content.realestate.listoflists",{
      state_id: this.ListState,
      city_id: this.ListCity,
      partner_id: Session.get("partner_id")
    });
  }
});

Template.list_of_lists.helpers({
  MasterLocation: function() {
    var data = Session.get("profile_header");
    var location = Session.get("ListMasterLocation");
    if ( typeof location != "undefined" ) {
      return location;
    }
    if ( typeof data != "undefined" ) {
      return data['city'].toUpperCase() + ", " + data['state'].toUpperCase();
    }
  },
  IsListOfListPage: function(){
    return Session.get("IsListOfListPage");
  },
  List: function(){
    function CreateData(index,realIndex) {
      var LocalData = new Object();
      var totalListData = Session.get(masterListData[index]);
      if ( typeof totalListData == "undefined" ) {
        return false;
      }
      var listData = totalListData['Data'];
      if ( realIndex%2 == 0 ) {
        LocalData['Class'] = "top_list_even";
      } else {
        LocalData['Class'] = "top_list_odd";
      }
      LocalData['ListNum'] = realIndex;
      LocalData['ListTitle'] = masterListData[index].replace(/\_/g," ").toUpperCase();
      if ( typeof listData != 'undefined' ) {
        LocalData['ListingID'] = listData[0]['listing_key'];
        LocalData['MainImage'] = listData[0]['photo'];
        LocalData['MainListingURL'] = ListingURL(listData[0]['listing_key']);
        LocalData['ListLocation'] = totalListData['Location'];
        LocalData['ListName'] = masterListData[index];
        LocalData['ListURL'] = "/listview/" + masterListData[index];
        if ( typeof totalListData['State'] != "undefined" && totalListData['State'] != null ) {
          LocalData['ListURL'] = LocalData['ListURL'] + "/" + totalListData['State'];
          LocalData['ListState'] = totalListData['State'];
          if ( typeof totalListData['City'] != "undefined" && totalListData['City'] != null ) {
            LocalData['ListURL'] = LocalData['ListURL'] + "/" + totalListData['City'];
            LocalData['ListCity'] = totalListData['City'];
          }
        }
        LocalData['Listing'] = new Array();
        for ( var localIndex = 1; localIndex < 6; localIndex++ ) {
          if ( typeof listData[localIndex] != "undefined" ) {
            LocalData['Listing'][localIndex - 1] = new Object();
            LocalData['Listing'][localIndex - 1]['ListingImage'] = listData[localIndex]['photo'];
            LocalData['Listing'][localIndex - 1]['SubListID'] = listData[localIndex]['listing_key'];
            LocalData['Listing'][localIndex - 1]['ListingURL'] = ListingURL(listData[localIndex]['listing_key']);
          }
        }
      }
      return LocalData;
    }

    var ReturnData = new Array();
    if ( Session.get("list_of_list_count") > 0 ) {
      var masterListData = Session.get("listData");
      if ( Session.get("IsListOfListPage") && Session.get("NumberOfListsDisplay") == 0 ) {
        var realIndex = 0;
        for ( var index = 0; index < masterListData.length; index++ ) {
          var localData = CreateData(index,realIndex);
          if ( localData !== false ) {
            ReturnData[realIndex] = localData;
            realIndex++;
          }
        }
      } else {
        var DoneIndexes = Session.get("ListOfListDoneArray");
        for ( var index = 0; index < DoneIndexes.length; index++ ) {
          ReturnData[index] = CreateData(DoneIndexes[index],index);
        }
      }
      return ReturnData;
    }
    return [];
  }
})
