/*
  Author : Lutz Lai
  Date: 07/10/2015
  Description: Logic for the directory page
  Associated files: directory.html, directory.less, router.js
*/

Template.directory.onCreated(function(){

  this.autorun(function(){
    //Reset session variables
    Session.set('directory_data', null);
    Session.set('directory_error', null);

    var params = Router.current().params;

    //Client Calls
    if(!params.state && !params.city && !params.zipcode){
      //Country Scope
      HTTP.call('GET', 'http://api.synapsys.us/listhuv/?action=get_all_states', function(err, result){
        if(err){
          //Error code
        }else{
          Session.set('directory_link', result.data);
        }
      })

      var urlString = 'http://api.synapsys.us/listhuv/?action=' + params.list + '&limit=10&skip=' + (params.pageNum - 1) * 10;

      HTTP.call('GET', urlString, function(err, result){
        if(err){
          //Error code
        }else{
          var data = result.data;
          if(data && data.length){
            Session.set('directory_data', {
              list: data,
              total: data[0].total_count
            });
          }else{
            Session.set('directory_error', 'Error: No Listings Found for this Area');
          }
        }//Close else
      });//Close Meteor Call
    }else if(params.state && !params.city && !params.zipcode){
      //State Scope
      HTTP.call('GET', 'http://api.synapsys.us/listhuv/?action=get_all_cities&limit=50&state=' + params.state, function(err, result){
        if(err){
          //Error code
        }else{
          var data = result.data;
          Session.set('directory_link', data.result);
        }
      })

      var urlString = 'http://api.synapsys.us/listhuv/?action=' + params.list + '&limit=10&skip=' + (params.pageNum - 1) * 10 + '&state=' + params.state;

      HTTP.call('GET', urlString, function(err, result){
        if(err){
          //Error code
        }else{
          var data = result.data;

          if(data && data.length){
            Session.set('directory_data', {
              list: data,
              total: data[0].total_count
            });
          }else{
            Session.set('directory_error', 'Error: No Listings Found for this Area');
          }
        }//Close else
      });//Close Meteor Call
    }else if(params.state && params.city && !params.zipcode){
      //City Scope

      //If all cities is clicked, call city data to display in listings directory else display listings for particular city
      if(params.city === 'all-cities'){
        HTTP.call('GET', 'http://api.synapsys.us/listhuv/?action=get_all_cities&limit=25&skip=' + (params.pageNum - 1) * 25 + '&state=' + params.state, function(err, result){
          if(err){
            //Error code
          }else{
            data = result.data;
            Session.set('directory_data', {
              list: data.result,
              total: data.num_of_cities
            });

          }
        })
      }else{

        var urlString = 'http://api.synapsys.us/listhuv/?action=' + params.list + '&limit=10&skip=' + (params.pageNum - 1) * 10 + '&state=' + params.state + '&city=' + params.city;

        HTTP.call('GET', urlString, function(err, result){
          if(err){
            //Error code
          }else{
            var data = result.data;
            //If data found set data to session var
            if(data && data.length){
              Session.set('directory_data', {
                list: data,
                total: data[0].total_count
              });
            }else{
              Session.set('directory_error', 'Error: No Listings Found for this Area');
            }
          }//Close else
        });//Close Meteor Call
      }
    }else if(params.state && params.city && params.zipcode){
      var urlString = 'http://api.synapsys.us/listhuv/?action=' + params.list + '&limit=10&skip=' + (params.pageNum - 1) * 10 + '&zip=' + params.zipcode;

      HTTP.call('GET', urlString, function(err, result){
        if(err){
          //Error code
        }else{
          var data = result.data;

          if(data && data.length){
            Session.set('directory_data', {
              list: data,
              total: data[0].total_count
            });
          }else{
            Session.set('directory_error', 'Error: No Listings Found for this Area');
          }
        }//Close else
      });//Close Meteor Call
    }

    /* Call to backend to make api calls. Currently disabled
    Meteor.call('directoryData', params.list, params.pageNum, function(err, result){
      console.log('result', err, result);
      if(err){
        //Error code
      }else{
        var data = result.data;
        Session.set('directory_data', {
          list: data,
          total: data[0].total_count
        });
      }//Close else
    });//Close Meteor Call*/

  });//Close autorun
})//Close onCreated

Template.directory.helpers({
  //Helper to get links data for DOM
  links: function(){
    //Get Data and params
    var data = Session.get('directory_link');
    var params = Router.current().params;
    if(data){
      //If scope is country display states as links
      if(!params.state && !params.city){
          data.map(function(item, index){
            item.pageNum = 1;
            item.list = params.list;
            item.displayVal = item.full;
            item.listingsNum = undefined;
            item.state = item.abbr;
            item.city = undefined;

            return item;
          })

          return data;
      }else if(params.state && !params.city){
        //If scope is state display city links
        data.map(function(item, index){
          item.pageNum = 1;
          item.list = params.list;
          item.displayVal = item.city;
          item.listingsNum = undefined;
          item.state = params.state;
          item.city = item.city;

          item.navCity = item.city.replace(/ /g, '-');

          return item;
        })

        return data;
      }else{
        return false;
      }
    }
  },
  //Helper to get listing data for DOM
  listings: function(){
    //Get Data
    var data = Session.get('directory_data');
    var params = Router.current().params;

    if(data && data.list && params.city === 'all-cities'){
      data.list.map(function(item, index){
        if(index % 2 === 0){
          item.backgroundClass = 'grey-background';
        }else{
          item.backgroundClass = 'white-background';
        }

        item.navCity = item.city.replace(/ /g, '-');

        return item;
      })
      return data.list;
    }else if(data && data.list){
      data.list.map(function(item, index){
        item.features.rooms.fullBath = item.features.rooms['Full Bath'];
        if(index % 2 === 0){
          item.backgroundClass = 'grey-background';
        }else{
          item.backgroundClass = 'white-background';
        }

        item.navCity = item.city.replace(/ /g, '-');

        return item;
      })
      return data.list;
    }else{
      return false;
    }
  },
  //Helper to determine if an error has occured
  dataError: function(){
    var error = Session.get('directory_error');
    if(error){
      return error;
    }else{
      return false;
    }
  },
  //Helper to determine state navigation
  stateNav: function(){
    var params = Router.current().params;

    var stateName = {
      AL: 'Alabama',
      AK: 'Alaska',
      AZ: 'Arizona',
      AR: 'Arkansas',
      CA: 'California',
      CO: 'Colorado',
      CT: 'Connecticut',
      DC: 'District of Columbia',
      DE: 'Delaware',
      FL: 'Florida',
      GA: 'Georgia',
      HI: 'Hawaii',
      ID: 'Idaho',
      IL: 'Illinois',
      IN: 'Indiana',
      IA: 'Iowa',
      KS: 'Kansas',
      KY: 'Kentucky',
      LA: 'Lousiana',
      ME: 'Maine',
      MD: 'Maryland',
      MA: 'Massachusetts',
      MI: 'Michigan',
      MN: 'Minnesota',
      MS: 'Mississippi',
      MO: 'Missouri',
      MT: 'Montana',
      NE: 'Nebraska',
      NV: 'Nevada',
      NH: 'New Hampshire',
      NJ: 'New Jersey',
      NM: 'New Mexico',
      NY: 'New York',
      NC: 'North Carolina',
      ND: 'North Dakota',
      OH: 'Ohio',
      OK: 'Oklahoma',
      ON: 'Ontario',
      OR: 'Oregon',
      PA: 'Pennsylvania',
      PR: 'Peurto Rico',
      RI: 'Rhode Island',
      SC: 'South Carolina',
      SD: 'South Dakota',
      TN: 'Tennessee',
      TX: 'Texas',
      UT: 'Utah',
      VT: 'Vermont',
      VA: 'Virginia',
      WA: 'Washington',
      WV: 'West Virginia',
      WI: 'Wisconsin',
      WY: 'Wyoming'
    }

    if(params.state){
      return stateName[params.state];
    }else{
      return false;
    }
  },
  //Helper to determine city navigation
  cityNav: function(){
    var params = Router.current().params;

    if(params.city && params.city ==='all-cities'){
      return 'All Cities';
    }else if(params.city){
      var city = params.city.replace(/_/g, ' ').replace(/-/g, ' ');
      return city;
    }else{
      return false;
    }
  },
  //Helper to determine zip navigation
  zipNav: function(){
    var params = Router.current().params;

    if(params.zipcode){
      return params.zipcode;
    }else{
      return false;
    }
  },
  //Helper to determine if more cities link is displayed
  moreCitiesFlag: function(){
    var params = Router.current().params;
    var data = Session.get('directory_link');

    if(params.state && !params.city && !params.zipcode){
      return true;
    }else{
      return false;
    }
  },
  //Helper to determine if listing is composed of all cities for a particular state
  citiesAsListingsFlag: function(){
    var params = Router.current().params;

    if(params.city === 'all-cities'){
      return true;
    }else{
      return false;
    }
  },
  //Helper to determine the current viewing range
  currentRange: function(){
    var data = Session.get('directory_data');
    var params = Router.current().params;

    //Check to see if all-cities is being displayed. If yes increment by 25 else by 10
    if(params.city === 'all-cities'){
      var rangeStart = (params.pageNum -1) * 25;
    }else{
      var rangeStart = (params.pageNum - 1) * 10;
    }

    //If data exists display range
    if(data){
      return (rangeStart + 1).toString() + '-' + (rangeStart + data.list.length).toString();
    }
  },
  //Helper to determine total value of showing
  total: function(){
    var data = Session.get('directory_data');

    if(data && data.total){
      return data.total;
    }else{
      return '';
    }
  },
  //Helper to determine navigation values
  navLink: function(){
    var params = Router.current().params;

    return {
      list: params.list,
      state: params.state,
      city: params.city,
      zipcode: params.zipcode,
      cityNull: undefined,
      zipNull: undefined,
      pageNum: params.pageNum,
      pageRestart: 1,
      nextPage: Number(params.pageNum) + 1,
      backPage: Number(params.pageNum) - 1,
      allCities: 'all-cities'
    }
  },
  //Helper to display what title is displayed
  directoryTitle: function(){
    params = Router.current().params;
    list = params.list.replace(/_/g, ' ').replace(/-/g, ' ');

    return list;
  },
  //Helper to determine if sub directory title is displayed and what title is displayed
  subDirectoryTitle: function(){
    params = Router.current().params;
    if(!params.state && !params.city){
      return 'State Sub Directory';
    }else if(params.state && !params.city){
      return 'City Sub Directory';
    }else{
      return false;
    }
  },
  //Helper to determine if back button has class active to make button blue
  backActive: function(){
    var data = Session.get('directory_data');
    var params = Router.current().params;

    if(data){
      return params.pageNum > 1 ? 'active' : '';
    }
  },
  //Helper to determine if next button has class active to make button blue
  nextActive: function(){
    var data = Session.get('directory_data');
    var params = Router.current().params;

    if(data && data.total){
      //Check to see if all-cities is being displayed. If yes increment by 25 else by 10
      if(params.city === 'all-cities'){
        var maxPage = Math.ceil((Number(data.total) / 25));
      }else{
        var maxPage = Math.ceil((Number(data.total)/ 10));
      }

      if(data && params.pageNum < maxPage){
        return 'active';
      }else{
        return '';
      }
    }
  },
  //Helper to determine if back button is disabled/active
  backShowFlag: function(){
    var data = Session.get('directory_data');
    var params = Router.current().params;

    if(data && params.pageNum > 1){
      return true;
    }else{
      return false;
    }
  },
  //Helper to determine if next button is disabled/active
  nextShowFlag: function(){
    var data = Session.get('directory_data');
    var params = Router.current().params;

    //Prevents helper warning when no total value in session var directory_data
    if(data && data.total){
      var maxPage = Math.ceil((Number(data.total) / 10));

      if(data && params.pageNum < maxPage){
        return true;
      }else{
        return false;
      }
    }
  },
  //Helper to determine if 's' needs to be displayed for a multiple value
  isMultiple: function(val){
    return val > 1 ? 's' : '';
  },
  //Helper to determine if value exists. if yes show, else hidden
  exists: function(val){
    return val ? true : false;
  },
  //Helper to determine if right-angle needs to be displayed.
  bothExists: function(val1, val2){
    return val1 && val2 ? true : false;
  },
  //Helper to return state of data call(loading)
  loadingFlag: function(){
    data = Session.get('directory_data');

    return data ? true : false;
  }
})
