function sqftToAcre(x){
  var ans = x / 43560;
	return ans;
} //End Square Foot to Acre function

function SearchGo(){
  GetFilterValues();

$.get("http://ipinfo.io", function (response) {
  Session.set('ABCResponse', response);
}, "jsonp");



Response = Session.get('CityInfo');
FilterArray = Session.get('FilterArray');

bednum = parseInt(FilterArray["Beds"]);
bathnum = parseInt(FilterArray["Baths"]);
minyearnum = parseInt(FilterArray["MinYear"]);
maxyearnum = parseInt(FilterArray["MaxYear"]);
minpricenum = parseInt(FilterArray["MinPrice"]);
maxpricenum = parseInt(FilterArray["MaxPrice"]);
lotsize = parseInt(FilterArray["LotSize"]);
livingarea = parseInt(FilterArray["SqareFeet"]) //Correct Spelling?
mlsid = FilterArray["mls"];


cityandstate = FilterArray["CitySearch"];
if( cityandstate == null){
  city = Response['city'];
  state = {$exists: true};
}
else{
  citstatarr = cityandstate.split(',');
  city = citstatarr[0].trim();
  state = citstatarr[1].trim();
}
if(city == null || city == undefined){
  location.reload();
  alert('invalid query');
}

console.log(city);
console.log(state);
yourcity = Response["city"];

console.log("Your City: " + yourcity);

construction = FilterArray['ListingType']['NewConstruction'];
if(FilterArray['ListingType']['NewConstruction'] == false){
  construction = {$exists: true};
}else if(FilterArray['ListingType']['NewConstruction'] == true){
  construction = 'true';
}

opens = FilterArray['ListingType']['OpenHouse'];
if(FilterArray['ListingType']['OpenHouses'] == false){
    opens = {$exists: false};//{$and: [{$exists: true}, {$exists: false}]};
}else if(FilterArray['ListingType']['OpenHouses'] == true){
    opens = {$exists: true};
}

/*  FilterObjectArray = {  DONT USE ME!
      bednum:  parseInt(FilterArray["Beds"]),
      bathnum: parseInt(FilterArray["Baths"]),
      minyearnum: parseInt(FilterArray["MinYear"]),
      maxyearnum: parseInt(FilterArray["MaxYear"]),
      minpricenum: parseInt(FilterArray["MinPrice"]),
      maxpricenum: parseInt(FilterArray["MaxPrice"]),
      lotsize: parseInt(FilterArray["LotSize"]),
      mlsid: FilterArray["mls"]
  }
*/

if(isNaN(bednum) == true){
  bednum = {$exists: true};
}
if(isNaN(bathnum) == true){
  bathnum = {$exists: true};
}
if( mlsid == null){
  mlsid = {$exists: true};
}
if(isNaN(minyearnum) == true){
  minyearnum = 1000;
}
if(isNaN(maxyearnum) == true){
  maxyearnum = 3005;
}
if(isNaN(minpricenum) == true){
  minpricenum = 100;
}
if(isNaN(maxpricenum) == true){
  maxpricenum = 10000000;
}
if(isNaN(lotsize) == true){
  lotsize = sqftToAcre(2);
}else if(isNaN(lotsize) == false){
  lotsize = sqftToAcre(lotsize)
}
if(isNaN(livingarea) == true){
  livingarea = 3000;
}



Meteor.subscribe('listings', opens, construction, city, state, bednum, bathnum, minyearnum, maxyearnum, minpricenum, maxpricenum, lotsize, livingarea, mlsid);

Router.go('content.realestate.search');
}

function ToggleActiveDropdown(DivToToggle) {
  $(DivToToggle).toggleClass('active');
  if ( $(DivToToggle).hasClass('active') ) {
    DivToToggle.innerHTML = DivToToggle.innerHTML.replace("fa-caret-down","fa-caret-up");
  } else {
    DivToToggle.innerHTML = DivToToggle.innerHTML.replace("fa-caret-up","fa-caret-down");
  }
} // END ToggleActiveDropdown

function CloseFilterMenu() {
  $('.realestate-header-submenu-filters span').text("More Filters");
  $('.realestate-header-submenu-filters .fa').removeClass('fa-times').addClass('fa-gear');
  $('.realestate-header-submenu-filters').removeClass('active');
} // END CloseFilterMenu

function OpenFilterMenu() {
  $('.realestate-header-submenu-filters span').text("Close Filters");
  $('.realestate-header-submenu-filters .fa').addClass('fa-times').removeClass('fa-gear');
  $('.realestate-header-submenu-filters').addClass('active');
} // END CloseFilterMenu

function CloseMenu(Context) {
  if ( $(Context).hasClass('realestate-header-submenu-filters') ) {
    CloseFilterMenu();
  } else {
    $(Context).removeClass('active');
    $(Context).find('.fa-caret-up').each(function(){
      $(this).removeClass('fa-caret-up').addClass('fa-caret-down');
    });
  }
} // END CloseMenu

function CloseDropDowns(ParentElem) {
  // Set to null if default
  ParentElem = ParentElem || '.realestate-header-submenu';

  $(ParentElem).find('[class*="realestate-header-submenu-dropdown"]').each(function(){
    CloseMenu(this);
  });

  $(ParentElem).find('.realestate-header-submenu-filters').each(function(){
    CloseFilterMenu(this);
  });
} // End CloseDropDowns

function OpenDropdown(Element) {
  $(Element).addClass('active');
  $(Element).find('.fa-caret-down').each(function(){
    $(this).removeClass('fa-caret-down').addClass('fa-caret-up');
  });
} // END OpenDropdown

function CloseSubmenus() {
  $('.realestate-header-bar').find('.realestate-header-button').each(function(){
    $(this).removeClass('active');
  });

  $('.realestate-header-bar').find('.realestate-header-social').each(function(){
    $(this).removeClass('active');
  })
} // End CloseSubmenus

function OpenSubmenu(SubmenuButton) {
  $(SubmenuButton).addClass('active');
  $(SubmenuButton).find('.realestate-header-submenu').each(function(){
    if ( $(this).offset().left > 0 ) {
      var newLeft = -1 * $(this).offset().left;
      $(this).css({left: newLeft + 'px'});
    }
    $(this).css({width: $("#realestate-header-bar").width() + 3});
  });
} // End OpenSubmenu

function GetFilterValues(){
  var ForSaleSold = $('.realestate-header-filters-leftcol input[type="radio"]');
  var ListingType = $('.realestate-header-filters-leftcol ul .search-dropdown-selector-property input');
  var PropertySize = $('.realestate-header-filters-col .center-dropdown-large span');
  var BuiltYears = $('.realestate-header-filters-col .center-year-input input');
  var KeywordArray = $('.realestate-header-filters-col .filter-keyword-list .item');
  var MLSArray = $('.realestate-header-filters-col .mls-id-list .item');
  var CitySearch = $('.realestate-header-submenu .realestate-header-submenu-search input')[0];

  var FilterArray = new Object();

  // City Searched
  if ( CitySearch.value != "" ) {
    FilterArray['CitySearch'] = CitySearch.value;
  } else {
    FilterArray['CitySearch'] = null;
  }

  // Property Type
  FilterArray['PropertyType'] = {};
  $('#PropertyType input[type="checkbox"]').each(function(){
    if ( $(this)[0].checked ) {
      FilterArray['PropertyType'][$(this)[0].id] = true;
    } else {
      FilterArray['PropertyType'][$(this)[0].id] = false;
    }
  });
  if ( FilterArray['PropertyType'].length == 0 ) {
    FilterArray['PropertyType'].push('All');
  }

  // Price and Bed/Bath
  var MainOptions = new Array("MinPrice","MaxPrice","Beds","Baths");
  var Pattern = new RegExp("[0-9]");
  for ( var index = 0; index < MainOptions.length; index++ ) {
    var StringFind = '#' + MainOptions[index];
    var ValueOfElem = $(StringFind)[0].innerHTML.match(/^[^\<]*/);
    if ( Pattern.test(ValueOfElem[0]) ) {
      FilterArray[MainOptions[index]] = ValueOfElem[0];
      FilterArray[MainOptions[index]] = FilterArray[MainOptions[index]].replace('$','');
      FilterArray[MainOptions[index]] = FilterArray[MainOptions[index]].replace(',','');
      FilterArray[MainOptions[index]] = FilterArray[MainOptions[index]].replace('+','');
      FilterArray[MainOptions[index]] = FilterArray[MainOptions[index]].replace('M','000000');
    } else {
      FilterArray[MainOptions[index]] = null;
    }
  }

  // For Sale/Sold
  for ( var index = 0; index < ForSaleSold.length; index++ ) {
    if ( ForSaleSold[index].checked ) {
      FilterArray['ForSaleSold'] = ForSaleSold[index].id;
    }
  }

  // Listing Types
  var ListingTypeArray = {};
  for ( var index = 0; index < ListingType.length; index++ ) {
    if ( ListingType[index].checked ) {
      ListingTypeArray[ListingType[index].id] = true;
    } else {
      ListingTypeArray[ListingType[index].id] = false;
    }
  }
  FilterArray['ListingType'] = ListingTypeArray;

  // Square feet/Lot Size
  for ( var index = 0; index < PropertySize.length; index++ ) {
    FilterArray[PropertySize[index].id] = PropertySize[index].innerHTML.match(/^[^\<]*/);
    FilterArray[PropertySize[index].id] = FilterArray[PropertySize[index].id][0];

    if ( FilterArray[PropertySize[index].id].trim() != "Square Feet" && FilterArray[PropertySize[index].id].trim() != "Lot Size" && FilterArray[PropertySize[index].id].trim() != "Any Lot Size" && FilterArray[PropertySize[index].id].trim() != "All Square Footage" ) {
      FilterArray[PropertySize[index].id] = FilterArray[PropertySize[index].id].match(/^[^\+]*/);
      FilterArray[PropertySize[index].id] = FilterArray[PropertySize[index].id][0];
      FilterArray[PropertySize[index].id] = FilterArray[PropertySize[index].id].replace(',','');
    } else {
      FilterArray[PropertySize[index].id] = null;
    }
  }

  // Years Built
  for ( var index = 0; index < BuiltYears.length; index++ ) {
    if ( BuiltYears[index].value != "" ) {
      FilterArray[BuiltYears[index].id] = BuiltYears[index].value;
    } else {
      FilterArray[BuiltYears[index].id] = null;
    }
  }

  /*// Keywords
  if ( KeywordArray.length > 0 ) {
    FilterArray['keywords'] = new Array();
    for ( var index = 0; index < KeywordArray.length; index++ ) {
      FilterArray['keywords'].push(KeywordArray[index].innerText);
    }
  } else {
    FilterArray['keywords'] = null;
  }*/

  // MLS ID's
  if ( MLSArray.length > 0 ) {
    FilterArray['mls'] = new Array();
    for ( var index = 0; index < MLSArray.length; index++ ) {
      var TextToUse = MLSArray[index].innerHTML.match(/^[^\<]*/);
      TextToUse = TextToUse[0];
      FilterArray['mls'].push(TextToUse);
    }
  } else {
    FilterArray['mls'] = null;
  }

  console.log(FilterArray,'Array of Filters');

  Session.set('FilterArray',FilterArray);

  //Meteor.call('ApplyFilters',FilterArray);

  CloseFilterMenu();
}

Template.navbar.events({
  //TEMPORARY LOGOUT Button
  'click .logout_button': function(){
    Meteor.logout();
  },



  // Top Level Actions
  'click .realestate-header-button, click .realestate-header-social': function(event) {
    // Make sure not clicked on a child
    var ClickedElem = event.target;

    if ( !$(ClickedElem).hasClass('realestate-header-button') && !$(ClickedElem).hasClass('realestate-header-social') && !$(ClickedElem).hasClass('fa-user-plus') ) {
      return;
    }

    var LoopNum = 0;
    while ( !$(ClickedElem).hasClass("realestate-header-button") && !$(ClickedElem).hasClass("realestate-header-social") ) {
      ClickedElem = $(ClickedElem)[0].parentElement;
      LoopNum++;
      if ( LoopNum > 10 ) {return;}
    }

    // Determine if submenu is currently open
    var DoOpen = true;
    if ( $(ClickedElem).hasClass('active') ) {
      DoOpen = false;
    }

    // Hide other menus
    CloseSubmenus();

    // Open the submenu
    if ( DoOpen ) {
      OpenSubmenu(ClickedElem);
    }
  },
  // END Top Level Actions

  // Submenu Actions
  // Clicked on the fa-caret on the dropdowns
  'click [class*="realestate-header-submenu-dropdown"] .fa-caret-up, click [class*="realestate-header-submenu-dropdown"] .fa-caret-down': function(event){
    // Check for correct element
    var ClickedElem = event.target;
    if ( !$(ClickedElem).hasClass("fa-caret-down") && !$(ClickedElem).hasClass("fa-caret-up") ) {
      return;
    }

    var LoopCount = 0;
    while ( !$(ClickedElem).is('[class*="realestate-header-submenu-dropdown"]') ) {
      ClickedElem = $(ClickedElem)[0].parentElement;
      LoopCount++;
      if ( LoopCount > 10 ) {return;}
    }

    var DoOpen = true;
    if ( $(ClickedElem).hasClass('active') ) {
      DoOpen = false;
    }

    CloseDropDowns('.realestate-header-submenu');

    if ( DoOpen ) {
      OpenDropdown(ClickedElem);
    }
  },
  // Clicked on the actual dropdown menu
  'click [class*="realestate-header-submenu-dropdown"]': function(event){
    // Check for correct element
    var ClickedElem = event.target;
    if ( !$(ClickedElem).is('[class*="realestate-header-submenu-dropdown"]') ) {
      return;
    }

    var DoOpen = true;
    if ( $(ClickedElem).hasClass('active') ) {
      DoOpen = false;
    }

    CloseDropDowns('.realestate-header-submenu');

    if ( DoOpen ) {
      OpenDropdown(ClickedElem);
    }
  },
  // Filters Button
  'click .realestate-header-submenu-filters': function(event) {
    var ClickedElem = $(event.target);

    var LoopCount = 0;
    while ( !$(ClickedElem).hasClass('realestate-header-submenu-filters') ) {
      ClickedElem = $(ClickedElem)[0].parentElement;
      LoopCount++;
      if ( LoopCount > 10 ) {return;}
    }

    var DoOpen = true;
    if ( $(ClickedElem).hasClass('active') ) {
      DoOpen = false;
    }

    CloseDropDowns('.realestate-header-submenu');

    if ( DoOpen ) {
      OpenFilterMenu();
    }
  },
  //END Submenu Actions

  'click .search-dropdown-selector-property': function(event) {
    var ClickedElem = event.target;
    var LoopNum = 0;
    while ( !$(ClickedElem).hasClass('search-dropdown-selector-property') ) {
      ClickedElem = $(ClickedElem)[0].parentElement;
      LoopNum++;
      if ( LoopNum > 10 ) {
        return;
      }
    }

    $(ClickedElem).find('input[type="checkbox"]').each(function(){
      if ( $(this)[0].checked ) {
        $(this)[0].checked = false;
      } else {
        $(this)[0].checked = true;
      }
    });

    return;
  },

  'click .search-dropdown-selector-item': function(event) {
    var ParentElement = event.target;
    var LoopNum = 0;
    while ( !($(ParentElement).is('[class*="realestate-header-submenu-dropdown"]') || $(ParentElement).hasClass('center-dropdown-large')) ) {
      ParentElement = $(ParentElement)[0].parentElement;
      LoopNum++;
      if ( LoopNum > 10 ) {return;}
    }

    if ( $(ParentElement).hasClass('center-dropdown-large') ) {
      var ClickedElem = event.target;
      var LoopNum = 0;
      while ( !$(ClickedElem).hasClass('search-dropdown-selector-item') ) {
        ClickedElem = $(ClickedElem).parentElement;
        LoopNum++;
        if ( LoopNum > 10 ) {return;}
      }

      $('.center-dropdown-large.active').find('.search-dropdown-selector-item').each(function() {
        if ( this != ClickedElem ) {
          $(this).find('input')[0].checked = false;
        } else {
          $(this).find('input')[0].checked = true;
        }
      });
      var TextToUse = $(ClickedElem)[0].innerText;
      if ( typeof(TextToUse) == 'undefined' ) {
        TextToUse = $(ClickedElem)[0].innerHTML.match(/[^\>]*$/);
        TextToUse = TextToUse[0].trim();
      }
      $(ParentElement).find('span')[0].innerHTML = TextToUse;
    } else {
      var ClickedElem = event.target;
      var TextToUse = $(ClickedElem)[0].innerHTML;
      $(ParentElement)[0].innerHTML = $(ParentElement)[0].innerHTML.replace(/^[^\<]*/,TextToUse);
    }

    CloseMenu(ParentElement);
  },
  'click .realestate-header-filters-leftcol table tr td': function(event) {
    var ParentElement = event.target;
    while ( !$(ParentElement).is('td') && $(ParentElement)[0].parentElement !== null ) {
      ParentElement = $(ParentElement)[0].parentElement;
    }
    $(ParentElement).find("input[type='radio']").each(function(){
      $(this)[0].checked = true;
    });
  },
  'click .center-dropdown-large': function(event){
    var TargetElem = $(event.target);
    if ( !$(TargetElem).hasClass('center-dropdown-large') && !$(TargetElem).hasClass('fa-caret-down') && !$(TargetElem).is('span') ) {
      return;
    }

    var DoOpen = true;
    if ( $(TargetElem).hasClass('active') ) {
      DoOpen = false;
    }

    var LoopNum = 0;
    while ( !$(TargetElem).hasClass('center-dropdown-large') ) {
      TargetElem = $(TargetElem)[0].parentElement;
      LoopNum++;
      if ( LoopNum > 10 ) {return;}
    }

    $('.center-dropdown-large').each(function(){
      CloseMenu(this);
    });

    if ( DoOpen ) {
      OpenDropdown(TargetElem);
    }
  },
  'keypress .realestate-header-filters-col input': function(event) {
    if ( event.which === 13 ) {
      var ParentClass = $(event.target)[0].parentElement.className;
      var ParentElement = $('.realestate-header-filters-col');
      if ( ParentClass == "filter-keyword-input" ) {
        var KeywordArray = $(event.target)[0].value.toString().toLowerCase().split(',');
        var DivString = "";
        for ( var index = 0; index < KeywordArray.length; index++ ) {
          DivString = DivString + '<div class="item">' + KeywordArray[index].trim() + '<i class="fa fa-times"></i></div>';
        }
        var ListElement = $('.realestate-header-filters-col .filter-keyword-list');
        ListElement[0].innerHTML = ListElement[0].innerHTML + DivString;
        $(event.target)[0].value = "";
      } else if ( ParentClass == "filter-mls-id" ) {
        var DivString = '<div class="item">' + $(event.target)[0].value + '<i class="fa fa-times"></i></div>';
        var ListElement = $('.realestate-header-filters-col .mls-id-list');
        ListElement[0].innerHTML = ListElement[0].innerHTML + DivString;
        $(event.target)[0].value = "";
      } else {
        console.log("Error processing enter press on this input. Invalid parent element");
      }
    }
  },
  'keypress .realestate-header-submenu-search input': function(event) {
    if ( event.which === 13 ) {
      SearchGo();
    /*  var LocationText = $('.realestate-header-submenu-search input')[0].value;
      GetFilterValues();
      if ( LocationText.match(/^\d*$/) ) {
        location_id = LocationText;
      } else if ( LocationText.match(/^[^\,]*\,[^\,]*$/) ) {
        LocationText = LocationText.split(',');
        LocationText[0] = LocationText[0].trim();
        LocationText[1] = LocationText[1].trim();
        LocationText[0] = LocationText[0].replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        LocationText[1] = LocationText[1].toUpperCase();
        if ( LocationText[1].length != 2 ) {
          console.log("Incorrect state length");
          return;
        }
        var location_id = LocationText[0] + "_" + LocationText[1];
      } else {
        console.log('Other');
        return;
      }
      LocationRedirect(location_id);
      $(event.target)[0].value = "";*/
    }
  },
  'keypress .submenu-buy-search input': function(event) {
    if ( event.which === 13 ) {
      var LocationText = $('.realestate-header-submenu-search input')[0].value;
      GetFilterValues();
      if ( LocationText.match(/^\d*$/) ) {
        location_id = LocationText;
      } else if ( LocationText.match(/^[^\,]*\,[^\,]*$/) ) {
        LocationText = LocationText.split(',');
        LocationText[0] = LocationText[0].trim();
        LocationText[1] = LocationText[1].trim();
        LocationText[0] = LocationText[0].replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        LocationText[1] = LocationText[1].toUpperCase();
        if ( LocationText[1].length != 2 ) {
          console.log("Incorrect state length");
          return;
        }
        var location_id = LocationText[0] + "_" + LocationText[1];
      } else {
        console.log('Other');
        return;
      }
      LocationRedirect(location_id);
      $(event.target)[0].value = "";
    }
  },
  'click .realestate-header-filters-col .fa-times': function(event) {
    var DeleteElem = $(event.target)[0].parentElement;
    var DeleteString = $(DeleteElem)[0].outerHTML;
    var ParentElem = $(DeleteElem)[0].parentElement;
    $(ParentElem)[0].innerHTML = $(ParentElem)[0].innerHTML.replace(DeleteString,"");
  },
  'click .realestate-header-filters-col .rightcol-buttons-done': function(event) {
  SearchGo();
},
  'click .border-li': function(event){
    return;
  },
  'click .submenu-buy-share': function(event){
    if ( !$(event.target).hasClass("submenu-buy-share") && !$(event.target).hasClass("fa-share-alt") && !$(event.target).is("span") && !$(event.target).hasClass("fa-times") ) {
      return;
    }

    var ClickedElem = event.target;
    var LoopNum = 0;
    while ( !$(ClickedElem).hasClass("submenu-buy-share") ) {
      ClickedElem = $(ClickedElem)[0].parentElement;
      LoopNum++;
      if ( LoopNum > 10 ) {return;}
    }

    $(ClickedElem).toggleClass('active');
  },
  'click .rightcol-buttons-reset': function(event) {
    $('.realestate-header-filters-leftcol table tr td input[type="radio"]').each(function(){
      if ( this.id == "ForSale" ) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    });

    $('.realestate-header-filters-leftcol .search-dropdown-selector-property input[type="checkbox"]').each(function(){
      this.checked = false;
    });

    $('.realestate-header-filters-col .center-dropdown-large').each(function(){
      $(this).find('span').each(function(){
        if ( this.id == "SquareFeet" ) {
          this.innerHTML = "Square Feet";
        } else {
          this.innerHTML = "Lot Size";
        }
      });

      $(this).find('.search-dropdown-selector-item input').each(function(){
        if ( this.name == 'AllFoot' ) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      });
    });

    $('.realestate-header-filters-col .center-year-input input').each(function(){
      this.value = "";
    });

    $('.realestate-header-filters-col .mls-id-list')[0].innerHTML = "";
  },

  'click .realestate-header-logo': function(){
    ResetSession();
    Router.go("content.realestate.homepage",{
      partner_id: Session.get("partner_id")
    });
  },

});

Template.navbar.onRendered(function(){
  $(window).resize(function(){
    $('.realestate-header-button.active').each(function(){
      OpenSubmenu(this);
    });
  });
  OpenSubmenu($('#BuyButton'));
})
