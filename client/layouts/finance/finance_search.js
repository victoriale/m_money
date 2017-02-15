Finance_Search = function(quer){

  /*==== SET UP THE CLEAN VARIABLES  ====*/

        var toss = {};
        //Session.set('p_search', undefined);

        var words = new Array();
        var quer_ngrams = nlp.ngram(quer, {max_size:2});
        var pos = nlp.pos(quer, {dont_combine: true}).sentences[0]; //makes sure no 'double word' strings are returned
        var nouns = pos.nouns() //var of just the nouns

        for(i=0;i<pos.tokens.length;i++){
         words[i] = pos.tokens[i].text;      //sets each word of query into spot in new array
        }


  /*******************************************/




  /*==== PARSING ALL UPPER CASE WORDS ====*/


  //var skipper = 0;
  //var AllCapped = [];
  //var TickerPurgeWords = ['I', 'A', 'N'];
  //var TickerPurgeSymbols = ['!','?','.','>'];

  //this loop parses out all possible tickers (words in all upper case)
  /*for(i=0;i<words.length;i++){
    for(j=0;j<words[i].length;j++){

      if(words[i][j] !== words[i][j].toUpperCase()){
        break;
      }
      skipper ++;
    }
    if(skipper == words[i].length){
      AllCapped[AllCapped.length] = words[i];
    }
    skipper = 0;
  }*/

  //this loop runs the possible tickers against the words to be purged from the possibilities array
  /*for(i=0;i<TickerPurgeWords.length;i++){
    if(isInArray(TickerPurgeWords[i],AllCapped)){
      AllCapped.remove(i);
    }
  }*/

  //this loop takes out all special characters that could be at the end of the possible tickers( ! ? , . ( ) # )
  /*for(i=0;i<AllCapped.length;i++){
    for(j=0;j<AllCapped[i].length;j++){
      if(isInArray(AllCapped[i][j], TickerPurgeSymbols)){
        AllCapped[i].replaceAt(AllCapped[i].indexOf(AllCapped[i][j]), '');
      }
    }
  }*/

  //console.log(AllCapped);

  /*****************************************************/

  Session.set('TickCheck', false);
  Session.set('NameCheck', false);
  Session.set('LocCheck', false);
  Session.set('MarkRoute', false);



      function isInArray(value, array){
        return array.indexOf(value) > -1;
      }

      Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
      };

      String.prototype.replaceAt = function(index, character) {
        return this.substr(0, index) + character + this.substr(index+character.length);
      };

  function abbrState(input, to){

    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    if (to == 'abbr'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(i = 0; i < states.length; i++){
            if(states[i][0] == input){
                return(states[i][1]);
            }
        }
    } else if (to == 'name'){
        input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] == input){
                return(states[i][0]);
            }
        }
    }
}


    function RouterSwitcher(route, paramObj){
      if(route == 'wild'){
        if(Session.get('isPartner')) {
          Router.go('partner.search', paramObj);
        } else {
          Router.go('content.search', paramObj);
        }
        return false;
      }else if(route == 'comp'){
        if(Session.get('isPartner')) {
          Router.go('partner.companyprofile', paramObj);
        } else {
          Router.go('content.companyprofile', paramObj);
        }
        return false;
      }else if(route == 'exec'){
        if(Session.get('isPartner')) {
          Router.go('partner.executiveprofile', paramObj);
        } else {
          Router.go('content.executiveprofile', paramObj);
        }
        return false;
      }else if(route == 'loc' || route == 'location'){
        if(Session.get('isPartner')) {
          Router.go('partner.locationprofile', paramObj);
        } else {
          Router.go('content.locationprofile', paramObj);
        }
        return false;
      }else if(route == 'tick'){
        if(Session.get('isPartner')) {
          Router.go('partner.companyprofile', paramObj);
        } else {
          Router.go('content.companyprofile', paramObj);
        }
        return false;
      }else if(route == 'none'){
        if(Session.get('isPartner')) {
          Router.go('partner.search', {partner_id: Session.get('partner_id'), search_results: quer.replace(/\s+/g, '-')});
        } else {
          Router.go('content.search', {partner_id: Session.get('partner_id'), search_results: quer.replace(/\s+/g, '-')});
        }
        return false;
      }
    }


    /*==== CLEAN CALL ====*/
    $.ajax({
      url: 'http://apifin.investkit.com/call_controller.php?action=search&option=batch&wild=true&param=' + quer,
      dataType: 'json',
      async: false,
      success: function(r){
        var wildObj = {partner_id: Session.get('partner_id'), search_results: quer.replace(/\s+/g, '-')};

        if(r['name']['func_success'] == true){
          Session.set('NameCheck', r['name']['func_data']['search_data']);
          if(r['name']['func_data']['search_data'].length > 1){
            RouterSwitcher('wild', wildObj)
          }
        }

        if(r['ticker']['func_success'] == true){
          Session.set('TickCheck', r['ticker']['func_data']['search_data']);
          if(r['ticker']['func_data']['search_data'].length > 1){
            RouterSwitcher('wild', wildObj);
          }
        }

        if(r['location']['func_success'] == true){
          Session.set('LocCheck', r['location']['func_data']['search_data']);
          if(r['location']['func_data']['search_data'].length > 1){
            RouterSwitcher('wild', wildObj);
          }
        }

        if(r['name']['func_success'] !== false && Session.get('NameCheck').length == 1 && r['ticker']['func_success'] == false && r['location']['func_success'] == false){
          if(Session.get('NameCheck')[0]['name_type'] == 'company'){
            RouterSwitcher('comp', {ticker: Session.get('NameCheck')[0]['c_ticker'], name: Session.get('NameCheck')[0]['c_name'].replace(/\s+/g, '-'), company_id: Session.get('NameCheck')[0]['c_id']});
          }else if(Session.get('NameCheck')[0]['name_type'] == 'officer'){
          RouterSwitcher('exec', {lname: Session.get('NameCheck')[0]['o_last_name'], fname: Session.get('NameCheck')[0]['o_first_name'], ticker: Session.get('NameCheck')[0]['c_ticker'], exec_id: Session.get('NameCheck')[0]['o_id']});
          }
        }else if(r['name']['func_success'] == false && r['ticker']['func_success'] !== false && Session.get('TickCheck').length == 1 && r['location']['func_success'] == false){
          RouterSwitcher('tick', {ticker: Session.get('TickCheck')[0]['c_ticker'], name: Session.get('TickCheck')[0]['c_name'].replace(/\s+/g, '-'), company_id: Session.get('TickCheck')[0]['c_id']});
        }else if(r['name']['func_success'] == false && r['ticker']['func_success'] == false &&  r['location']['func_success'] !== false && Session.get('LocCheck').length == 1){
          RouterSwitcher('loc', {loc_id: abbrState(Session.get('LocCheck')[0]['c_hq_state'],'name'), city: Session.get('LocCheck')[0]['c_hq_city'].replace(/\s+/g, '-')});
        }

        else if(r['name']['func_success'] == false && r['ticker']['func_success'] == false && r['location']['func_success'] == false){
            RouterSwitcher('none', {partner_id: Session.get('partner_id')});
        }

      }
    });

  } //end Finance_Search function
