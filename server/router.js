// HTML minifier
var minify = Npm.require('html-minifier').minify;
// Environment Variables
var info_envar = new Meteor.EnvironmentVariable;
var batch_envar = new Meteor.EnvironmentVariable;

// Robots.txt filter
var robotsPicker = Picker.filter(function(req, res) {
  return true;
});

// Robots.txt
robotsPicker.route('/robots.txt',function(params, req, res){
  res.end('User-agent: *\nDisallow: /');
  return false;

  // Code for when the robots are allowed in
  if ( /myinvestkit/.test(req.headers.host) ) {
    res.end('User-agent: *\nDisallow: /$\nAllow: /');
  } else {
    res.end('User-agent: *\nAllow: /');
  }
});

// Filter out bot requests
var seoPicker = Picker.filter(function(req, res) {
  // return true;
  if ( /bot/.test(req.headers['user-agent']) || /Webmaster/.test(req.headers['user-agent']) || /Bing/.test(req.headers['user-agent']) || /externalhit/.test(req.headers['user-agent']) ) {
    return true;
  }
  return false;
});

// Favicon.ico
seoPicker.route('/favicon.ico',function(params, req, res){
  res.writeHead(404);
  res.end('Not Found');
})

// Company Profile
seoPicker.route('/:ticker/:name/company/:company_id',company_profile);
seoPicker.route('/:partner_id/:name/:ticker/c/:company_id',company_profile);
function company_profile(params, req, res){
  var startTime = (new Date()).getTime(); // Log the start time (normal variable b/c no async)

  // Get the data
  info_envar.withValue({params: params, res: res, req: req, startTime: startTime}, function(){
    var callback = Meteor.bindEnvironment(function(results){
      var res_arr = {};
      for ( var index = 0; index < results.length; index++ ) {
        for ( var attr in results[index] ) {
          if ( results[index].hasOwnProperty(attr) ) {
            res_arr[attr] = results[index][attr];
          }
        }
      }

      var info = info_envar.get();
      var res = info.res;
      var data = res_arr;

      if ( typeof data.profile_header == "undefined" ) {
        console.log("SSRSTAT|\"Company Profile - Timeout\",\"" + info.params.company_id + "\",," + (new Date()).getTime() + ",\"" + info.params.partner_id + "\"|");
        RenderTimeoutError(res);
        return false;
      }

      try {
        data.profile_header.c_hq_city = data.profile_header.c_hq_city.replace(/(.)(.*)/,function(a,b,c){ return b.toUpperCase() + c.toLowerCase(); });
        data.profile_header.comp_name = data.profile_header.c_name + ' (' + data.profile_header.c_exchange + ':' + data.profile_header.c_ticker + ')';
        data.profile_header.comp_name2 = data.profile_header.c_name + ' (<a href="' + Router.pick_path('content.toplist',getListID(data.profile_header.c_exchange, compUrlName(fullstate(data.profile_header.c_hq_state))), info.params) + '">' + data.profile_header.c_exchange + '</a>:' + data.profile_header.c_ticker + ')';
        var ticker_link = data.profile_header.c_exchange + ':' + data.profile_header.c_ticker;
        var ticker_link2 = '<a href="' + Router.pick_path('content.toplist',getListID(data.profile_header.c_exchange, compUrlName(fullstate(data.profile_header.c_hq_state))), info.params) + '">' + data.profile_header.c_exchange + '</a>:' + data.profile_header.c_ticker;

        // AI parse:
        if ( typeof data.ai == "object" ) {
          data.ai = '';
        } else {
          data.ai = data.ai.match(/<y.txt[^\n]*/)[0].replace(/<y.txt[^>]*>/,'');
        }

        if ( typeof data.content != "undefined" ) {
          var temp_d = JSON.parse(data.content);
          temp_d.results.name = temp_d.name;
          data.results = temp_d.results;
        }

        // Section specific data
        // Earnings
        var earnings = data.earnings || [];
        var earnings_report_data = [];
        if ( typeof earnings == "string" ) {
          earnings = [];
        }
        for ( var m_index = 0; m_index < earnings.length; m_index++ ) {
          var c_data = earnings[m_index];
          earnings_report_data[m_index] = {
            title: data.profile_header.comp_name + ' ' + c_data.e_report_title
          };
          var localdata = [
            'The ' + c_data.e_report_title + ' was filed on ' + c_data.e_filing_date + ' to ' + data.profile_header.c_exchange + '. This is an ' + c_data.e_report_type + ' report. This report is for fiscal year ' + c_data.e_fiscal_year + '.'
          ];
          for ( var index = 0; index < c_data.e_report_data.length; index++ ) {
            localdata[localdata.length] = ticker_link + ' - ' + c_data.e_report_data[index].coa_title + ' (' + c_data.e_report_data[index].coa_code + '): $' + ToCommaNumber(c_data.e_report_data[index].coa_data * 1000000);
          }
          earnings_report_data[m_index].content = {line: localdata};
        }
        // Executives
        var executives = data.whos_who ? data.whos_who.officers || [] : [];
        var exec_data = [];
        for ( var index = 0; index < executives.length; index++ ) {
          var e_data = executives[index];
          exec_data[index] = data.profile_header.comp_name + ' <a href="' + Router.pick_path('content.executiveprofile',{exec_id: e_data.o_id, partner_id: info.params.partner_id, fname: e_data.o_first_name, lname: e_data.o_last_name, ticker: data.whos_who.company.c_ticker},info.params) + '">' + e_data.o_first_name + ' ' + e_data.o_middle_initial + ' ' + e_data.o_last_name + '</a>';
          for ( var t_ind = 0; t_ind < e_data.o_titles.length; t_ind++ ) {
            exec_data[index] = exec_data[index] + '<br>' + e_data.o_titles[t_ind];
          }
        }
        // Featured Lists
        var featured_lists = [];
        var flist_data = data.list_of_lists ? data.list_of_lists.list_rankings || [] : [];
        for ( var index = 0; index < flist_data.length; index++ ) {
          var ldata = {};
          ldata.title = '<a href="' + Router.pick_path('content.toplist',{partner_id: info.params.partner_id, l_name: compUrlName(flist_data[index].top_list_list[0].list_of_lists_title), list_id: flist_data[index].tli_id},info.params) + '">' + flist_data[index].top_list_list[0].list_of_lists_title.toTitleCase() + ' As Of ' + (new Date(flist_data[index].tle_last_updated)).toSNTFormTime() + '</a>';
          ldata.content = {ul: []};
          for ( var i = 0; i < flist_data[index].top_list_list[0].list_of_lists_data.length; i++ ) {
            var c_cmp = flist_data[index].top_list_list[0].list_of_lists_data[i];
            ldata.content.ul[ldata.content.ul.length] = 'Number ' + (i + 1) + ': <a href="' + Router.pick_path('content.companyprofile',{partner_id: params.partner_id, company_id: c_cmp.c_id, ticker: c_cmp.c_ticker, name: compUrlName(c_cmp.c_name)},info.params) + '">' + c_cmp.c_name + ' (' + c_cmp.c_exchange + ':' + c_cmp.c_ticker + ')</a>';
          }
          ldata.content.ul[ldata.content.ul.length] = 'Number ' + flist_data[index].tle_ranking + ': ' + data.profile_header.comp_name;
          featured_lists[featured_lists.length] = ldata;
        }
        // News
        var news = [];
        if ( typeof data.news != "undefined" ) {
          for ( var index = 0; index < data.news.length; index++ ) {
            var n_data = {
              title: data.profile_header.c_name + ' (' + ticker_link + ') ' + (new Date(parseInt(data.news[index].pubDate_ut)*1000)).toSNTFormTime() + ': <a href="' + data.news[index].link + '">' + data.news[index].title + '</a>',
              content: {
                line: [
                  data.news[index].description,
                  'Article Keywords: ' + data.news[index].tags
                ]
              }
            };
            news.push(n_data);
          }
        }

        var published = (new Date()).toSNTForm();
        var updated = (new Date(data.daily_update.csi_price_last_updated)).toSNTFormTime();

        // Get HQ state
        var location = '';
        data.bio_location = data.bio_location || {};
        if ( typeof data.profile_header.c_hq_state != "undefined" ) {
          if ( typeof fullstate(data.profile_header.c_hq_state) != "undefined" ) {
            location = data.profile_header.comp_name2 + ' headquarters are located in ' + data.bio_location.c_street_addr + ' ' + data.profile_header.c_hq_city + ', <a href="' + Router.pick_path('content.locationprofile',{partner_id: info.params.partner_id, loc_id: fullstate(data.profile_header.c_hq_state)}, info.params) + '">' + data.profile_header.c_hq_state + '</a> ' + data.bio_location.c_zip;
          } else {
            location = data.profile_header.comp_name + ' headquarters are located in ' + data.bio_location.c_street_addr + ' ' + data.profile_header.c_hq_city + ', <a href="' + Router.pick_path('content.locationprofile',{partner_id: info.params.partner_id, loc_id: fullstate(data.profile_header.c_hq_state)}, info.params) + '">' + data.profile_header.c_hq_state + '</a> ' + data.bio_location.c_zip;
          }
        } else {
          location = data.profile_header.comp_name2 + ' headquarters are located in ' + data.bio_location.c_street_addr + ' ' + data.profile_header.c_hq_city;
        }

        // Save all the parts into different objects
        var h1content = {
          line: [
            'Written By: ' + author(info.params.company_id),
            'Page Published on ' + published + '<br>Page Updated on ' + updated,
            '',
            data.ai,
            '',
            location,
            data.profile_header.comp_name2 + ' is in the <a href="' + Router.pick_path('content.sector',{sector_id: compUrlName(data.profile_header.c_sector), loc_id: data.profile_header.c_hq_state}, info.params) + '">' + data.profile_header.c_sector.toLowerCase() + '</a> sector.',
            '',
            'Thomson Reuters Summary:',
            data.bio_location.c_desc
          ]
        };
        var todayAt = {
          title: '<a href="' + Router.pick_path('content.finoverview',{partner_id: info.params.partner_id, company_id: data.profile_header.c_id, name: compUrlName(data.profile_header.c_name), ticker: data.profile_header.c_ticker}, info.params) + '">Today At ' + data.profile_header.comp_name + '</a>',
          content: {
            line: [
              'Last Updated: ' + (new Date(data.daily_update.csi_price_last_updated)).toSNTFormTime(),
              ticker_link2 + ' Share Price: $' + ToCommaNumber(data.daily_update.csi_price),
              ticker_link + ' <a href="' + Router.pick_path('content.toplist',getListID(undefined, data.profile_header.c_hq_state), info.params) + '">Change</a>: $' + data.daily_update.csi_price_change_since_last + ' (' + data.daily_update.csi_percent_change_since_last + '%)',
              ticker_link + ' Opening Price: $' + ToCommaNumber(data.daily_update.csi_opening_price),
              ticker_link + ' Closing Price: $' + ToCommaNumber(data.daily_update.csi_closing_price),
              ticker_link + ' Total Shares: ' + ToCommaNumber(data.daily_update.csi_total_shares),
              ticker_link + ' <a href="' + Router.pick_path('content.toplist',{l_name: 'Top-companies-with-highest-market-cap', list_id: '5222', loc_id: data.profile_header.c_hq_state}) + '">Market Cap</a>: ' + ToCommaNumber(data.daily_update.csi_market_cap),
              ticker_link + ' <a href="' + Router.pick_path('content.toplist',{l_name: 'Top-companies-with-highest-PE-ratio', list_id: '5223', loc_id: data.profile_header.c_hq_state}) + '">PE Ratio</a>: ' + data.daily_update.csi_pe_ratio,
              ticker_link + ' <a href="' + Router.pick_path('content.toplist',{l_name: 'Top-companies-with-highest-volume', list_id: '5226', loc_id: data.profile_header.c_hq_state}) + '">Trading Volume</a>: ' + ToCommaNumber(data.daily_update.csi_trading_vol)
            ]
          }
        };
        var whosWho = {
          title: '<a href="' + Router.pick_path('content.boardcommittee',{partner_id: info.params.partner_id, ticker: data.profile_header.c_ticker, name: compUrlName(data.profile_header.c_name), company_id: data.profile_header.c_id}, info.params) + '">Who\'s Who at ' + data.profile_header.comp_name + '</a>'
        };
        if ( exec_data.length != 0 ) {
          var whosWho = {
            title: '<a href="' + Router.pick_path('content.boardcommittee',{partner_id: info.params.partner_id, ticker: data.profile_header.c_ticker, name: compUrlName(data.profile_header.c_name), company_id: data.profile_header.c_id}, info.params) + '">Who\'s Who at ' + data.profile_header.comp_name + '</a>',
            content: {
              ul: exec_data
            }
          };
        }
        var featList = {};
        if ( featured_lists.length != 0 ) {
          var featList = {
            title: 'Featured Lists of ' + data.profile_header.comp_name2,
            h3: featured_lists
          };
        }
        var earnings = {};
        if ( earnings_report_data.length != 0 ) {
          var earnings = {
            title: 'Earnings Reports for ' + data.profile_header.comp_name2,
            h3: earnings_report_data
          };
        }
        var ran_facts = {};
        if ( typeof data.did_you_know == "object" && data.did_you_know.facts.length != 0 ) {
          var ran_facts = {
            title: 'Random Facts About ' + data.profile_header.comp_name2,
            content: {
              line: data.did_you_know.facts
            }
          };
        }
        var innews = {};
        if ( news.length != 0 ) {
          var innews = {
            title: '<a href="' + Router.pick_path('content.articlenews',{name: compUrlName(data.profile_header.c_name), ticker: data.profile_header.c_ticker, company_id: data.profile_header.c_id}, info.params) + '">' + data.profile_header.comp_name + ' In The News</a>',
            h3: news
          };
        }

        var head_data = { // Data to put into the head of the document (regular site)
          description: 'SEC Documents, financial data, news, executive details and other valuable information about ' + data.profile_header.comp_name,
          title: 'An Investor\'s Guide To ' + data.profile_header.c_name + ' | InvestKit.com',
          url: 'http://www.investkit.com' + Router.pick_path('content.companyprofile', {partner_id: info.params.partner_id, company_id: data.profile_header.c_id, name: compUrlName(data.profile_header.c_name), ticker: data.profile_header.c_ticker},info.params),
          other_tags: [
            {
              name: 'og:image',
              content: data.profile_header.c_logo
            },
            {
              name: 'og:type',
              content: 'website'
            }
          ]
        };

        if ( typeof data.results != "undefined" ) {
          h1content.line[0] = 'Written By: ' + author(info.params.company_id + 2);
          head_data.siteName = data.results.name + ' Finance';
          head_data.title = 'Everything You Need To Know About ' + data.profile_header.c_name + ' | ' + data.results.name + ' Finance';
          head_data.description = data.profile_header.comp_name + ' SEC documents, financial data, news, executive details and other valuable information for investors.';
          head_data.url = 'http://www.myinvestkit.com' + Router.pick_path('content.companyprofile', {partner_id: info.params.partner_id, company_id: data.profile_header.c_id, name: compUrlName(data.profile_header.c_name), ticker: data.profile_header.c_ticker},info.params);
          todayAt.title = '<a href="' + Router.pick_path('content.finoverview',{partner_id: info.params.partner_id, company_id: data.profile_header.c_id, name: compUrlName(data.profile_header.c_name), ticker: data.profile_header.c_ticker}, info.params) + '">' + data.profile_header.comp_name + '\'s Daily Update</a>';
          whosWho.title = '<a href="' + Router.pick_path('content.boardcommittee',{partner_id: info.params.partner_id, ticker: data.profile_header.c_ticker, name: compUrlName(data.profile_header.c_name), company_id: data.profile_header.c_id}, info.params) + '">Meet the Executives For ' + data.profile_header.comp_name + '</a>';
          featList.title = data.profile_header.comp_name2 + '\'s Featured Lists';
          earnings.title = data.profile_header.comp_name2 + '\'s Earnings Reports';
          ran_facts.title = data.profile_header.comp_name2 + '\' Random Facts';
          var h2Data = [todayAt, featList, ran_facts, whosWho, innews, earnings];
          var h1 = {
            title: 'Everything You Need To Know About ' + data.profile_header.comp_name2,
            content: h1content,
            h2: h2Data
          };
        } else {
          var h2Data = [todayAt, whosWho, featList, earnings, ran_facts, innews];
          var h1 = {
            title: 'An Investor\'s Guide To ' + data.profile_header.comp_name2,
            content: h1content,
            h2: h2Data
          };
        }

        var page_data = {
          head_data: head_data,
          h1: h1
        };

        if ( typeof data.results != "undefined" ) {
          page_data.partner_header = data.results.header.script;
        }

        // res.end(JSON.stringify(res_arr, null, 2));

        // res.end(SSR.render('generic_page',page_data));
        res.end(minify(SSR.render('generic_page',page_data), {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true
        })); // Write the pages template
        // Also minifies the HTML string

        // Log how long it took to render the page
        var endTime = (new Date()).getTime();
        console.log("SSRSTAT|\"Company Profile\",\"" + info.params.company_id + "\"," + (endTime - info.startTime) + "," + endTime + ",\"" + info.params.partner_id + "\"|");
        return false;
      } catch(e) {
        console.log("SSRSTAT|\"Company Profile - Error\",\"" + info.params.company_id + "\",," + (new Date()).getTime() + ",\"" + info.params.partner_id + "\"|");
        RenderError(res);
      }
    });

    var functions = [];

    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetCompanyData",params.company_id,"batch_1", bound_cb);
      });
    });
    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetCompanyData",params.company_id,"batch_2", bound_cb);
      });
    });
    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetCompanyData",params.company_id,"batch_3", bound_cb);
      });
    });

    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = function(error, data) {
          batch_envar.get().done({ai: data});
        }
        Meteor.call("GetAIContent",params.company_id, bound_cb);
      });
    });

    functions.push(function(batch){
      batch_envar.withValue(batch,function(){
        var bound_cb = function(error, data) {
          if ( error ) {
            batch_envar.get().done({});
          } else {
            batch_envar.get().done({news: data.data});
          }
        }
        Meteor.http.get('http://api.synapsys.us/news/?action=get_finance_news&ticker=' + params.ticker,bound_cb);
      });
    });

    if ( typeof params.partner_id != "undefined" ) {
      functions.push(function(batch){
        batch_envar.withValue(batch, function(){
          var bound_cb = Meteor.bindEnvironment(method_cb);
          Meteor.call('GetPartnerHeader',params.partner_id, bound_cb);
        });
      });
    }

    var company_batch = new async_mult(functions, callback);

    company_batch.execute();
  });
}

// Executive Profile
seoPicker.route('/:name/:ticker/executive/:exec_id',executive_profile);
seoPicker.route('/:partner_id/:ticker/:name/e/:exec_id',executive_profile);
function executive_profile(params, req, res){
  var startTime = (new Date()).getTime(); // Log the start time (normal variable b/c no async)

  // Get the data
  info_envar.withValue({params: params, res: res, req: req, startTime: startTime}, function(){
    var callback = Meteor.bindEnvironment(function(results){
      var res_arr = {};
      for ( var index = 0; index < results.length; index++ ) {
        for ( var attr in results[index] ) {
          if ( results[index].hasOwnProperty(attr) ) {
            res_arr[attr] = results[index][attr];
          }
        }
      }

      var info = info_envar.get();
      var res = info.res;

      var data = res_arr;

      if ( typeof data.profile_header == "undefined" ) {
        console.log("SSRSTAT|\"Executive Profile - Timeout\",\"" + info.params.exec_id + "\",," + (new Date()).getTime() + ",\"" + info.params.partner_id + "\"|");
        RenderTimeoutError(res);
        return false;
      }

      try {
        profile_header = data.profile_header || {};
        profile_header.o_current_title = profile_header.o_current_title || {};
        profile_header.compensation = profile_header.compensation || {};
        var cmp_reg = new RegExp(profile_header.c_name,'g');
        profile_header.o_bio = (profile_header.o_bio || '').replace(cmp_reg,'<a href="' + Router.pick_path('content.companyprofile',{company_id: profile_header.c_id, partner_id: info.params.partner_id, name: compUrlName(profile_header.c_name), ticker: profile_header.c_ticker}, info.params) + '">' + profile_header.c_name + '</a>');
        profile_header.c_name_orig = profile_header.c_name;
        profile_header.c_name = '<a href="' + Router.pick_path('content.companyprofile',{company_id: profile_header.c_id, partner_id: info.params.partner_id, name: compUrlName(profile_header.c_name), ticker: profile_header.c_ticker}, info.params) + '">' + profile_header.c_name + ' (' + profile_header.c_ticker + ')</a>';
        data.profile_header.o_full_name = data.profile_header.o_first_name + ' ' + data.profile_header.o_middle_initial + ' ' + data.profile_header.o_last_name;

        if ( typeof data.content != "undefined" ) {
          var temp_d = JSON.parse(data.content);
          temp_d.results.name = temp_d.name;
          data.results = temp_d.results;
        }

        // Section specific data
        // Rivals
        var rival_data = [];
        if ( typeof data.college_rivals != "object" ) {
          data.college_rivals = {
            rivals: []
          };
        }
        for ( var index = 0; index < data.college_rivals.rivals.length; index++ ) {
          var localData = data.college_rivals.rivals[index];
          if ( localData != null ) {
            rival_data[rival_data.length] = '<a href="' + Router.pick_path('content.executiveprofile',{exec_id: localData.o_id, partner_id: info.params.partner_id, fname: localData.o_first_name, lname: localData.o_last_name, ticker: localData.c_ticker}, info.params) + '">' + localData.o_first_name + ' ' + localData.o_middle_initial + ' ' + localData.o_last_name + '</a>: ' + localData.long_title + ' at <a href="' + Router.pick_path('content.companyprofile',{company_id: localData.c_id, partner_id: info.params.partner_id, name: compUrlName(localData.c_name), ticker: localData.c_ticker}, info.params) + '">' + localData.c_name + '</a><br>' + localData.o_bio;
          }
        }
        // Compensation
        var compensation = {};
        var c_data = data.compensation ? data.compensation.compensation_periods || [] : [];
        var trans_arr = {
          Salary: 'Salary',
          Bonus: 'Bonus',
          TotalST: 'Total Short Term',
          RestrictedStock: 'Restricted Stock',
          AllOtherLT: 'All Other Long Term',
          TotalComp: 'Total Compensation'
        };
        if ( c_data.length > 0 ) {
          var period = c_data[0].o_period_end_date;
          compensation.title = '<a href="' + Router.pick_path('content.compensation',{fname: profile_header.o_first_name, lname: profile_header.o_last_name, ticker: profile_header.c_ticker, exec_id: profile_header.o_id}, info.params) + '">Compensation for ' + profile_header.o_full_name + '</a> For ' + (new Date(c_data[0].o_period_end_date)).getFullYear();
          compensation.h3 = [];
        }
        for ( var index = 0; index < c_data.length; index++ ) {
          if ( c_data[index].o_period_end_date != period ) {
            break;
          }
          var l_data = {};
          l_data.title = profile_header.o_full_name + ' at <a href="' + Router.pick_path('content.companyprofile',{company_id: c_data[index].c_id, ticker: c_data[index].c_ticker, name: compUrlName(c_data[index].c_name)}, info.params) + '">' + c_data[index].c_name + '</a> For ' + (new Date(c_data[index].o_period_end_date)).getFullYear();
          l_data.content = {line: []};
          if ( c_data[index].o_compensation != "" ) {
            for ( var attr in c_data[index].o_compensation ) {
              if ( c_data[index].o_compensation.hasOwnProperty(attr) ) {
                if ( typeof trans_arr[attr] != "undefined" ) {
                  l_data.content.line[l_data.content.line.length] = profile_header.o_full_name + ' at <a href="' + Router.pick_path('content.companyprofile',{company_id: c_data[index].c_id, ticker: c_data[index].c_ticker, name: compUrlName(c_data[index].c_name)}, info.params) + '">' + c_data[index].c_name + '</a> ' + (new Date(c_data[index].o_period_end_date)).getFullYear() + ' ' + trans_arr[attr] + ': $' + ToCommaNumber(c_data[index].o_compensation[attr]);
                }
              }
            }
          }
          if ( l_data.content.line.length == 0 ) {
            l_data.content.line[l_data.content.line.length] = 'No Compensation Information Found';
          }
          if ( l_data.content.line.length > 0 ) {
            compensation.h3[compensation.h3.length] = l_data;
          }
        }
        // Work History
        var work_hist = [];
        if ( typeof data.work_history != "undefined" ) {
          for ( var attr in data.work_history.companies ) {
            var c_data = data.work_history.companies[attr];
            var loc_data = {title: profile_header.o_full_name + ' at <a href="' + Router.pick_path('content.companyprofile',{company_id: c_data.company_data.c_id, partner_id: info.params.partner_id, ticker: c_data.company_data.c_ticker, name: compUrlName(c_data.company_data.c_name)}, info.params) +  '">' + c_data.company_data.c_name + ' (' + c_data.company_data.c_ticker + ')</a>: ' + c_data.officer_positions[0].LongTitle};
            loc_data.content = {};
            loc_data.content.line = [c_data.company_data.c_desc];
            var ul = [];
            for ( var index = 0; index < c_data.officer_positions.length; index++ ) {
              var p_data = c_data.officer_positions[index];
              if ( typeof p_data.end_year != "undefined" ) {
                ul[ul.length] = '<b>' + p_data.LongTitle + '</b>: ' + p_data.start_year + '-' + p_data.end_year;
              } else {
                ul[ul.length] = '<b>' + p_data.LongTitle + '</b>: ' + p_data.start_year + '-Now';
              }
            }
            loc_data.content.ul = ul;
            work_hist[work_hist.length] = loc_data;
          }
        }
        // Other executives
        var other_execs = [];
        data.whos_who = data.whos_who || [];
        for ( var index = 0; index < data.whos_who.length; index++ ) {
          var e_data = data.whos_who[index];
          other_execs[other_execs.length] = profile_header.c_name_orig + '\'s <a href="' + Router.pick_path('content.executiveprofile',{fname: e_data.o_first_name, lname: e_data.o_last_name, ticker: e_data.c_ticker, exec_id: e_data.o_id}, info.params) + '">' + e_data.o_first_name + ' ' + e_data.o_middle_initial + ' ' + e_data.o_last_name + '</a>: ' + e_data.o_current_title.long_title;
        }

        var published = (new Date()).toSNTForm();
        var updated = (new Date(profile_header.o_last_updated)).toSNTFormTime();

        var h1content = {
          line: [
            'Written By: ' + author(parseInt(info.params.exec_id)),
            'Page Published on ' + published + '<br>Page Updated on ' + updated,
            '',
            profile_header.o_bio
          ]
        };
        var rivals = {};
        if ( rival_data.length != 0 ) {
          var rivals = {
            title: profile_header.o_full_name + '\'s College Rivals',
            content: {
              ul: rival_data
            }
          };
        }
        var wrk_hist = {};
        if ( work_hist.length != 0 ) {
          var wrk_hist = {
            title: profile_header.o_full_name + '\'s Work History',
            h3: work_hist
          };
        }
        var other_exec = {};
        if ( other_execs.length != 0 ) {
          var other_exec = {
            title: 'Other Executives at ' + profile_header.c_name,
            content: {ul: other_execs}
          };
        }


        var head_data = { // Data to put into the head of the document (meta tags/title)
          description: 'Find out everything you need to know about ' + profile_header.o_full_name + ', an executive at ' + profile_header.c_name_orig + ' (' + profile_header.c_ticker + '): Insider activity, compensation details, history with the company and more.',
          title: 'An Investors Guide To ' + profile_header.o_full_name + ' From ' + profile_header.c_name_orig + ' | InvestKit.com',
          url: 'http://www.investkit.com' + Router.pick_path('content.executiveprofile',{partner_id: info.params.partner_id, exec_id: profile_header.o_id, fname: profile_header.o_first_name, lname: profile_header.o_last_name, ticker: profile_header.c_ticker}, info.params),
          other_tags: [
            {
              name: 'og:image',
              content: profile_header.o_pic
            },
            {
              name: 'og:type',
              content: 'profile'
            },
            {
              name: 'profile:first_name',
              content: profile_header.o_first_name
            },
            {
              name: 'profile:last_name',
              content: profile_header.o_last_name
            }
          ]
        };

        if ( typeof data.results != "undefined" ) {
          h1content.line[0] = 'Written By: ' + author(parseInt(info.params.exec_id) + 2);
          head_data.siteName = data.results.name + ' Finance';
          head_data.title = 'Everything You Need To Know About ' + profile_header.c_name_orig + '\'s ' + profile_header.o_full_name + ' | ' + data.results.name + ' Finance';
          head_data.description = 'Compensation details, insider activity and other information about ' + profile_header.c_name_orig + '\'s executive ' + profile_header.o_full_name + '.';
          head_data.url = 'http://www.myinvestkit.com' + Router.pick_path('content.executiveprofile',{partner_id: info.params.partner_id, exec_id: profile_header.o_id, fname: profile_header.o_first_name, lname: profile_header.o_last_name, ticker: profile_header.c_ticker}, info.params);
          rivals.title = 'Other Executives Who Went To College With ' + profile_header.o_full_name;
          wrk_hist.title = 'Other Places ' + profile_header.o_full_name + ' Has Worked';
          other_exec.title = profile_header.c_name + '\'s Other Executives';
          var h2Data = [wrk_hist, rivals, compensation, other_exec];
          var h1 = {
            title: 'Everything You Need To Know About ' + profile_header.c_name + '\'s ' + profile_header.o_full_name,
            content: h1content,
            h2: h2Data
          };
        } else {
          var h2Data = [compensation, rivals, wrk_hist, other_exec];
          var h1 = {
            title: 'An Investors Guide To ' + profile_header.o_full_name + ' From ' + profile_header.c_name,
            content: h1content,
            h2: h2Data
          };
        }

        var page_data = {
          head_data: head_data,
          h1: h1
        };

        if ( typeof data.results != "undefined" ) {
          page_data.partner_header = data.results.header.script;
        }

        // res.end(JSON.stringify(res_arr, null, 2));

        // res.end(SSR.render('generic_page',page_data));
        res.end(minify(SSR.render('generic_page',page_data), {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true
        })); // Write the pages template
        // Also minifies the HTML string

        // Log how long it took to render the page
        var endTime = (new Date()).getTime();
        console.log("SSRSTAT|\"Executive Profile\",\"" + info.params.exec_id + "\"," + (endTime - info.startTime) + "," + endTime + ",\"" + info.params.partner_id + "\"|");
        return false;
      } catch(e) {
        console.log("SSRSTAT|\"Executive Profile - Error\",\"" + info.params.exec_id + "\",," + (new Date()).getTime() + ",\"" + info.params.partner_id + "\"|");
        RenderError(res);
      }
    });

    var functions = [];

    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetExecData",params.exec_id,"batch_1", bound_cb);
      });
    });
    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetExecData",params.exec_id,"batch_2", bound_cb);
      });
    });
    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetExecData",params.exec_id,"batch_3", bound_cb);
      });
    });

    if ( typeof params.partner_id != "undefined" ) {
      functions.push(function(batch){
        batch_envar.withValue(batch, function(){
          var bound_cb = Meteor.bindEnvironment(method_cb);
          Meteor.call('GetPartnerHeader',params.partner_id, bound_cb);
        });
      });
    }

    var company_batch = new async_mult(functions, callback);

    company_batch.execute();
  });
}

// Location Profile
seoPicker.route('/:loc_id/:city?/location',location_profile);
seoPicker.route('/:partner_id/:city?/:loc_id/loc',location_profile);
function location_profile(params, req, res){
  var startTime = (new Date()).getTime(); // Log the start time (normal variable b/c no async)

  var loc_id = params.loc_id;
  if ( typeof fullstate(params.loc_id) != "undefined" ) {
    params.loc_id = fullstate(params.loc_id);
  } else if ( typeof abbrstate(params.loc_id.toLowerCase()) != "undefined" ) {
    loc_id = abbrstate(params.loc_id.toLowerCase());
  }

  // Get the data
  info_envar.withValue({params: params, res: res, req: req, startTime: startTime}, function(){
    var callback = Meteor.bindEnvironment(function(results){
      var res_arr = {};
      for ( var index = 0; index < results.length; index++ ) {
        for ( var attr in results[index] ) {
          if ( results[index].hasOwnProperty(attr) ) {
            res_arr[attr] = results[index][attr];
          }
        }
      }

      var info = info_envar.get();
      var res = info.res;

      var data = res_arr;

      if ( typeof data.profile_header == "undefined" ) {
        console.log("SSRSTAT|\"Location Profile - Timeout\",\"" + info.params.loc_id + "\",," + (new Date()).getTime() + ",\"" + info.params.partner_id + "\"|");
        RenderTimeoutError(res);
        return false;
      }

      try {
        if ( typeof data.content != "undefined" ) {
          var temp_d = JSON.parse(data.content);
          temp_d.results.name = temp_d.name;
          data.results = temp_d.results;
        }

        // Section specific data
        if ( typeof data.location_daily_update == "undefined" || typeof data.location_daily_update.composite_summary == "undefined" ) {
          data.location_daily_update = {composite_summary: {}};
        }
        // Companies by Sector
        var cmp_sector = [];
        for ( var attr in data.companies_by_sector ) {
          if ( data.companies_by_sector.hasOwnProperty(attr) && attr != "total_company_count" ) {
            var ldata = {};
            ldata.title = '<a href="' + Router.pick_path('content.sector',{sector_id: compUrlName(attr), loc_id: data.profile_header.location},info.params) + '">' + attr + ' (' + (Math.round(data.companies_by_sector[attr].percentage*1000)/10) + '% of companies in ' + data.profile_header.location + ')</a>';
            var arr = [];
            for ( var index = 0; index < data.companies_by_sector[attr].count; index++ ) {
              c_data = data.companies_by_sector[attr][index];
              arr.push('<a href="' + Router.pick_path('content.companyprofile',{partner_id: info.params.partner_id, company_id: c_data.c_id, ticker: c_data.c_ticker, name: compUrlName(c_data.c_name)}, info.params) + '">' + c_data.c_name + ' (' + c_data.c_ticker + ')</a><br>' + c_data.c_desc);
            }
            ldata.content = {ul: arr};
            cmp_sector[cmp_sector.length] = ldata;
          }
        }
        // Earnings Reports
        var earnings = [];
        if ( typeof data.earnings != "array" ) {
          data.earnings = [];
        }
        for ( var index = 0; index < data.earnings.length; index++ ) {
          var ldata = {};
          var cdata = data.earnings[index];
          ldata.title = '<a href="' + Router.pick_path('content.companyprofile',{partner_id: info.params.partner_id, company_id: cdata.c_id, name: compUrlName(cdata.c_name), ticker: cdata.c_ticker}, info.params) + '">' + cdata.c_name + ' (' + cdata.c_exchange + ':' + cdata.c_ticker + ')</a> ' + cdata.e_report_title;
          ldata.content = {line: [cdata.c_desc]};
          earnings[earnings.length] = ldata;
        }
        // Lists
        var lists = [];
        if ( typeof data.market_movers != "object" ) {
          data.market_movers = [];
        }
        for ( var index = 0; index < data.market_movers.length; index++ ) {
          var t_data = data.market_movers[index];
          var items = [];
          for ( var i = 0; i < t_data.data.top_list_list.length; i++ ) {
            items.push('<a href="' + Router.pick_path('content.companyprofile',{company_id: t_data.data.top_list_list[i].c_id, ticker: t_data.data.top_list_list[i].c_ticker, name: t_data.data.top_list_list[i].c_name}) + '">' + t_data.data.top_list_list[i].c_name + ' (' + t_data.data.top_list_list[i].c_exchange + ':' + t_data.data.top_list_list[i].c_ticker + ')</a> as of ' + (new Date(t_data.data.top_list_list[i].csi_price_last_updated)).toSNTFormTime());
          }
          var l_data = {
            title: '<a href="' + Router.pick_path('content.toplist',{l_name: compUrlName(t_data.data.top_list_info.top_list_title), list_id: t_data.data.top_list_info.top_list_id, loc_id: data.profile_header.location}, info.params) + '">' + t_data.data.top_list_info.top_list_title + '</a>',
            content: {
              ul: items
            }
          };
          lists.push(l_data);
        }

        var published = (new Date()).toSNTForm();
        var updated = (new Date(data.location_daily_update.composite_summary.last_updated)).toSNTFormTime();

        var h1content = {
          line: [
            'Written By: ' + author(info.params.loc_id.length),
            'Page Published on ' + published,
            'Page Updated on ' + updated,
            '',
            data.profile_header.location + ' is home to <a href="' + Router.pick_path('content.toplist',getListID(undefined,data.profile_header.location), info.params) + '">' + data.profile_header.total_companies + ' companies</a> with a total market cap of $' + data.profile_header.total_market_cap + '. ' + data.profile_header.location + ' is also home to ' + data.profile_header.total_executives + ' executives.',
            data.profile_header.location + ' Current Aggragate Price: $' + ToCommaNumber(data.location_daily_update.composite_summary.current_price),
            data.profile_header.location + ' Previous Close: $' + ToCommaNumber(data.location_daily_update.composite_summary.previous_close),
            data.profile_header.location + ' <a href="' + Router.pick_path('content.toplist',getListID(undefined, data.profile_header.location), info.params) + '">Percent Change</a>: ' + data.location_daily_update.composite_summary.percent_change + '%',
            data.profile_header.location + ' Price Change: $' + ToCommaNumber(data.location_daily_update.composite_summary.price_change),
            data.profile_header.location + ' Today\'s High: $' + ToCommaNumber(data.location_daily_update.composite_summary.todays_high),
            data.profile_header.location + ' Today\'s Low: $' + ToCommaNumber(data.location_daily_update.composite_summary.todays_low),
            data.profile_header.location + ' Total Companies: ' + ToCommaNumber(data.location_daily_update.composite_summary.total_companies)
          ]
        };
        var bysect = {};
        if ( cmp_sector.length != 0 ) {
          var bysect = {
            title: data.profile_header.location + ' Companies By Sector',
            h3: cmp_sector
          };
        }
        var earn = {};
        if ( earnings.length != 0 ) {
          var earn = {
            title: data.profile_header.location + ' Earnings Reports',
            h3: earnings
          };
        }
        var l_lists = {};
        if ( lists.length != 0 ) {
          l_lists = {
            title: 'Lists About ' + data.profile_header.location,
            h3: lists
          };
        }

        var head_data = { // Data to put into the head of the document (meta tags/title)
          description: 'SEC documents, financial data, executive details and more valuable information for investors about companies in ' + data.profile_header.location + '.',
          title: 'An Investor\'s Guide to Public Companies in ' + data.profile_header.location + ' | InvestKit.com',
          url: 'http://www.investkit.com' + Router.pick_path('content.locationprofile',{partner_id: info.params.partner_id, loc_id: info.params.loc_id}, info.params)
        };

        if ( typeof data.results != "undefined" ) {
          h1content.line[0] = 'Written By: ' + author(info.params.loc_id.length + 1);
          head_data.siteName = data.results.name + ' Finance';
          head_data.title = 'Everything You Need To Know About Public Companies in ' + data.profile_header.location + ' | ' + data.results.name + ' Finance';
          head_data.description = 'Find out everything you need to know about publicly traded companies in ' + data.profile_header.location + ': Financial data, SEC documents, news, executive information and more.';
          head_data.url = 'http://www.myinvestkit.com' + Router.pick_path('content.locationprofile',{partner_id: info.params.partner_id, loc_id: info.params.loc_id}, info.params);
          bysect.title = 'Companies By Sector in ' + data.profile_header.location;
          earn.title = 'Earnings Reports for Companies in ' + data.profile_header.location;
          l_lists.title = data.profile_header.location + ' Lists';
          var h2Data = [earn, l_lists, bysect];
          var h1 = {
            title: 'Everything You Need To Know About Public Companies in ' + data.profile_header.location,
            content: h1content,
            h2: h2Data
          };
        } else {
          var h2Data = [bysect, l_lists, earn];
          var h1 = {
            title: 'An Investor\'s Guide to Public Companies in ' + data.profile_header.location,
            content: h1content,
            h2: h2Data
          };
        }

        var page_data = {
          head_data: head_data,
          h1: h1
        };

        if ( typeof data.results != "undefined" ) {
          page_data.partner_header = data.results.header.script;
        }

        // res.end(JSON.stringify(res_arr, null, 2));

        // res.end(SSR.render('generic_page',page_data));
        res.end(minify(SSR.render('generic_page',page_data), {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true
        })); // Write the pages template
        // Also minifies the HTML string

        // Log how long it took to render the page
        var endTime = (new Date()).getTime();
        console.log("SSRSTAT|\"Location Profile\",\"" + info.params.loc_id + "\"," + (endTime - info.startTime) + "," + endTime + ",\"" + info.params.partner_id + "\"|");
        return false;
      } catch(e) {
        console.log("SSRSTAT|\"Location Profile - Error\",\"" + info.params.loc_id + "\",," + (new Date()).getTime() + ",\"" + info.params.partner_id + "\"|");
        RenderError(res);
      }
    });

    var functions = [];

    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetLocationData",loc_id,"batch_1", bound_cb);
      });
    });
    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetLocationData",loc_id,"batch_2", bound_cb);
      });
    });
    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetLocationData",loc_id,"batch_3", bound_cb);
      });
    });
    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetLocationData",loc_id,"batch_4", bound_cb);
      });
    });

    if ( typeof params.partner_id != "undefined" ) {
      functions.push(function(batch){
        batch_envar.withValue(batch, function(){
          var bound_cb = Meteor.bindEnvironment(method_cb);
          Meteor.call('GetPartnerHeader',params.partner_id, bound_cb);
        });
      });
    }

    var company_batch = new async_mult(functions, callback);

    company_batch.execute();
  });
}

// List Page
seoPicker.route('/:l_name/:list_id/list/:loc_id?',list_page);
seoPicker.route('/:partner_id/:l_name/:loc_id?/:list_id/list',list_page);
function list_page(params, req, res){
  var startTime = (new Date()).getTime(); // Log the start time (normal variable b/c no async)

  if ( typeof params.loc_id != "undefined" ) {
    params.loc_id = params.loc_id.replace(/-/g,' ');
  }

  var loc_id = params.loc_id;
  if ( typeof params.loc_id != "undefined" && typeof fullstate(params.loc_id) != "undefined" ) {
    params.loc_id = fullstate(params.loc_id);
  } else if ( typeof params.loc_id != "undefined" && typeof abbrstate(params.loc_id.toLowerCase()) != "undefined" ) {
    loc_id = abbrstate(params.loc_id.toLowerCase());
  }

  // Get the data
  info_envar.withValue({params: params, res: res, req: req, startTime: startTime}, function(){
    var callback = Meteor.bindEnvironment(function(results){
      var res_arr = {};
      for ( var index = 0; index < results.length; index++ ) {
        for ( var attr in results[index] ) {
          if ( results[index].hasOwnProperty(attr) ) {
            res_arr[attr] = results[index][attr];
          }
        }
      }

      var info = info_envar.get();
      var res = info.res;

      var data = res_arr;

      try {
        if ( typeof data.content != "undefined" ) {
          var temp_d = JSON.parse(data.content);
          temp_d.results.name = temp_d.name;
          data.results = temp_d.results;
        }

        // Section specific data
        // List Information
        var l_info = [];
        for ( var index = 0; index < data.top_list_gen.top_list_list.length; index++ ) {
          var cdata = data.top_list_gen.top_list_list[index];
          var line = (index + 1) + ': <a href="' + Router.pick_path('content.companyprofile',{partner_id: info.params.partner_id, company_id: cdata.c_id, ticker: cdata.c_ticker, name: compUrlName(cdata.c_name)}, info.params) + '">' + cdata.c_name + ' (' + cdata.c_exchange + ':' + cdata.c_ticker + ')</a>: ' + cdata.c_name + ' stock is ';
          if ( cdata.csi_price_last_operator == 0 ) {
            line = line + 'down ';
          } else {
            line = line + 'up ';
          }
          line = line + ToCommaNumber(cdata.csi_percent_change_since_last) + '% or $' + ToCommaNumber(cdata.csi_price_change_since_last) + ' to $' + ToCommaNumber(cdata.csi_price);
          line = line + ' as of ' + (new Date(cdata.latest_date)).toSNTFormTime();
          l_info.push(line);
        }

        var head_data = { // Data to put into the head of the document (meta tags/title)
          description: data.top_list_gen.top_list_info.top_list_title,
          title: data.top_list_gen.top_list_info.top_list_title + ' | InvestKit.com',
          url: 'http://www.investkit.com' + Router.pick_path('content.toplist', {l_name: compUrlName(data.top_list_gen.top_list_info.top_list_title), list_id: data.top_list_gen.top_list_info.top_list_id, loc_id: compUrlName(info.params.loc_id)}, info.params)
        };

        if ( typeof data.results != "undefined" ) {
          head_data.siteName = data.results.name + ' Finance';
          head_data.title = data.top_list_gen.top_list_info.top_list_title + ' | ' + data.results.name + ' Finance';
          head_data.url = 'http://www.investkit.com' + Router.pick_path('content.toplist', {l_name: compUrlName(data.top_list_gen.top_list_info.top_list_title), list_id: data.top_list_gen.top_list_info.top_list_id, loc_id: compUrlName(info.params.loc_id)}, info.params);
        }

        var page_data = {
          head_data: head_data,
          h1: {
            title: data.top_list_gen.top_list_info.top_list_title,
            content: {
              ul: l_info
            }
          }
        };

        if ( typeof data.results != "undefined" ) {
          page_data.partner_header = data.results.header.script;
        }

        // res.end(SSR.render('generic_page',page_data));
        res.end(minify(SSR.render('generic_page',page_data), {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true
        })); // Write the pages template
        // Also minifies the HTML string

        // Log how long it took to render the page
        var endTime = (new Date()).getTime();
        console.log("SSRSTAT|\"List Page\",\"" + info.params.list_id + "\"," + (endTime - info.startTime) + "," + endTime + ",\"" + info.params.partner_id + "\"|");
        return false;
      } catch(e) {
        console.log("SSRSTAT|\"List Page - Error\",\"" + info.params.list_id + "\",," + (new Date()).getTime() + ",\"" + info.params.partner_id + "\"|");
        RenderError(res);
      }
    });

    var functions = [];

    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("topListData", params.list_id, loc_id, bound_cb);
      });
    });

    if ( typeof params.partner_id != "undefined" ) {
      functions.push(function(batch){
        batch_envar.withValue(batch, function(){
          var bound_cb = Meteor.bindEnvironment(method_cb);
          Meteor.call('GetPartnerHeader',params.partner_id, bound_cb);
        });
      });
    }

    var company_batch = new async_mult(functions, callback);

    company_batch.execute();
  });
}

// Executive List Page
seoPicker.route('/:ticker/:name/executives/:company_id',exec_list);
seoPicker.route('/:partner_id/:name/:ticker/execs/:company_id',exec_list);
function exec_list(params, req, res){
  var startTime = (new Date()).getTime(); // Log the start time (normal variable b/c no async)

  // Get the data
  info_envar.withValue({params: params, res: res, req: req, startTime: startTime}, function(){
    var callback = Meteor.bindEnvironment(function(results){
      var res_arr = {};
      for ( var index = 0; index < results.length; index++ ) {
        for ( var attr in results[index] ) {
          if ( results[index].hasOwnProperty(attr) ) {
            res_arr[attr] = results[index][attr];
          }
        }
      }

      var info = info_envar.get();
      var res = info.res;

      var data = res_arr;

      try {
        if ( typeof data.content != "undefined" ) {
          var temp_d = JSON.parse(data.content);
          temp_d.results.name = temp_d.name;
          data.results = temp_d.results;
        }

        // Get Exec Data
        var comp_execs = [];
        for ( var index = 0; index < data.officers.length; index++ ) {
          var o_data = data.officers[index];
          var r_data = {};
          r_data.title = data.profile_header.c_name + ' (' + data.profile_header.c_exchange + ':' + data.profile_header.c_ticker + ') <a href="' + Router.pick_path('content.executiveprofile',{partner_id: info.params.partner_id, exec_id: o_data.o_id, ticker: data.profile_header.c_ticker, fname: o_data.o_first_name, lname: o_data.o_last_name}, info.params) + '">' + o_data.o_first_name + ' ' + o_data.o_middle_initial + ' ' + o_data.o_last_name + '</a>: ' + o_data.o_current_title.long_title;
          r_data.content = {line: [
            o_data.o_bio
          ]};
          comp_execs[comp_execs.length] = r_data;
        }

        var head_data = { // Data to put into the head of the document (meta tags/title)
          description: 'Find out who the executives for ' + data.profile_header.c_name + ' (' + data.profile_header.c_exchange + ':' + data.profile_header.c_ticker + ') are and get in-depth information about them',
          title: 'An Investor\'s Guide to ' + data.profile_header.c_name + ' Executives | InvestKit.com',
          url: 'http://www.investkit.com' + Router.pick_path('content.boardcommittee',{name: compUrlName(data.profile_header.c_name), ticker: data.profile_header.c_ticker, company_id: data.profile_header.c_id}, info.params),
          other_tags: [
            {
              name: 'og:image',
              content: data.profile_header.c_logo
            },
            {
              name: 'og:type',
              content: 'website'
            }
          ]
        };

        if ( typeof data.results != "undefined" ) {
          head_data.title = 'List of the Executives for ' + data.profile_header.c_name + ' | ' + data.results.name + ' Finance';
          head_data.url = 'http://www.myinvestkit.com' + Router.pick_path('content.boardcommittee',{name: compUrlName(data.profile_header.c_name), ticker: data.profile_header.c_ticker, company_id: data.profile_header.c_id}, info.params);
          head_data.siteName = data.results.name + ' Finance';
        }

        var page_data = {
          head_data: head_data,
          h1: {
            title: '<a href="' + Router.pick_path('content.companyprofile',{partner_id: info.params.partner_id, company_id: data.profile_header.c_id, ticker: data.profile_header.c_ticker, name: compUrlName(data.profile_header.c_name)}, info.params) + '">' + data.profile_header.c_name + ' (' + data.profile_header.c_exchange + ':' + data.profile_header.c_ticker + ')</a> Executives',
            h2: comp_execs
          }
        };

        if ( typeof data.results != "undefined" ) {
          page_data.partner_header = data.results.header.script;
        }

        // res.end(JSON.stringify(res_arr, null, 2));

        // res.end(SSR.render('generic_page',page_data));
        res.end(minify(SSR.render('generic_page',page_data), {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true
        })); // Write the pages template
        // Also minifies the HTML string

        // Log how long it took to render the page
        var endTime = (new Date()).getTime();
        console.log("SSRSTAT|\"Company Executives\",\"" + info.params.company_id + "\"," + (endTime - info.startTime) + "," + endTime + ",\"" + info.params.partner_id + "\"|");
        return false;
      } catch (e) {
        console.log("SSRSTAT|\"Company Executives - Error\",\"" + info.params.company_id + "\",," + (new Date()).getTime() + ",\"" + info.params.partner_id + "\"|");
        RenderError(res);
      }
    });

    var functions = [];

    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("CompWebPageData",params.company_id,"officers", bound_cb);
      });
    });
    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("CompIndie",params.company_id,"profile_header", bound_cb);
      });
    });

    if ( typeof params.partner_id != "undefined" ) {
      functions.push(function(batch){
        batch_envar.withValue(batch, function(){
          var bound_cb = Meteor.bindEnvironment(method_cb);
          Meteor.call('GetPartnerHeader',params.partner_id, bound_cb);
        });
      });
    }

    var company_batch = new async_mult(functions, callback);

    company_batch.execute();
  });
}

// Sector page
seoPicker.route('/:loc_id/sector/:sector_id',sector_page);
seoPicker.route('/:partner_id/sector/:loc_id/:sector_id',sector_page);
function sector_page(params, req, res) {
  var startTime = (new Date()).getTime(); // Log the start time (normal variable b/c no async)

  var loc_id = params.loc_id;
  if ( typeof fullstate(params.loc_id) != "undefined" ) {
    params.loc_id = fullstate(params.loc_id);
  } else if ( typeof abbrstate(params.loc_id.toLowerCase()) != "undefined" ) {
    loc_id = abbrstate(params.loc_id.toLowerCase());
  }

  params.sector_id = params.sector_id.replace(/_/g,'%5C%2F').replace(/-/g,' ');

  // Get the data
  info_envar.withValue({params: params, res: res, req: req, startTime: startTime}, function(){
    var callback = Meteor.bindEnvironment(function(results){
      var res_arr = {};
      for ( var index = 0; index < results.length; index++ ) {
        for ( var attr in results[index] ) {
          if ( results[index].hasOwnProperty(attr) ) {
            res_arr[attr] = results[index][attr];
          }
        }
      }

      var info = info_envar.get();
      var res = info.res;

      try {
        var data = res_arr;

        if ( typeof data.content != "undefined" ) {
          var temp_d = JSON.parse(data.content);
          temp_d.results.name = temp_d.name;
          data.results = temp_d.results;
        }

        // Make the company list
        var c_list = [];
        if ( typeof data.sector_companies.companies == "array" || typeof data.sector_companies.companies == "object" ) {
          for ( var index = 0; index < data.sector_companies.companies.length; index++ ) {
            c_list.push('<a href="' + Router.pick_path('content.companyprofile',{name: compUrlName(data.sector_companies.companies[index].c_name), ticker: data.sector_companies.companies[index].c_ticker, company_id: data.sector_companies.companies[index].c_id}, info.params) + '">' + data.sector_companies.companies[index].c_name + ' (' + data.sector_companies.companies[index].c_exchange + ':' + data.sector_companies.companies[index].c_ticker + ')');
          }
        }

        var head_data = { // Data to put into the head of the document (meta tags/title)
          description: 'Get a list of all the companies in ' + info.params.loc_id + ' in the ' + data.sector_companies.sector + ' sector.',
          title: 'An Investor\'s Guide to ' + data.sector_companies.sector + ' Companies in ' + info.params.loc_id + ' | InvestKit.com',
          url: 'http://www.investkit.com' + Router.pick_path('content.sector',{sector_id: compUrlName(info.params.sector_id), loc_id: info.params.loc_id}, info.params)
        };

        if ( typeof data.results != "undefined" ) {
          head_data.title = 'Everything You Need To Know About ' + data.sector_companies.sector + ' Companies in ' + info.params.loc_id + ' | ' + data.results.name + ' Finance';
          head_data.url = 'http://www.myinvestkit.com' + Router.pick_path('content.sector',{sector_id: compUrlName(info.params.sector_id), loc_id: info.params.loc_id}, info.params);
          head_data.siteName = data.results.name + ' Finance';
        }

        var page_data = {
          head_data: head_data,
          h1: {
            title: data.sector_companies.sector + ' Companies in <a href="' + Router.pick_path('content.locationprofile',{loc_id: info.params.loc_id}, info.params) + '">' + info.params.loc_id + '</a>',
            content: {
              ul: c_list
            }
          }
        };

        if ( typeof data.results != "undefined" ) {
          page_data.partner_header = data.results.header.script;
        }

        // res.end(JSON.stringify(res_arr, null, 2));

        // res.end(SSR.render('generic_page',page_data));
        res.end(minify(SSR.render('generic_page',page_data), {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true
        })); // Write the pages template
        // Also minifies the HTML string

        // Log how long it took to render the page
        var endTime = (new Date()).getTime();
        console.log("SSRSTAT|\"Sector Page\",\"" + info.params.sector_id + "\"," + (endTime - info.startTime) + "," + endTime + ",\"" + info.params.partner_id + "\"|");
        return false;
      } catch(e) {
        console.log("SSRSTAT|\"Sector Page - Error\",\"" + info.params.sector_id + "\",," + (new Date()).getTime() + ",\"" + info.params.partner_id + "\"|");
        RenderError(res);
      }
    });

    var functions = [];

    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("sectorData", loc_id, params.sector_id, bound_cb);
      });
    });

    if ( typeof params.partner_id != "undefined" ) {
      functions.push(function(batch){
        batch_envar.withValue(batch, function(){
          var bound_cb = Meteor.bindEnvironment(method_cb);
          Meteor.call('GetPartnerHeader',params.partner_id, bound_cb);
        });
      });
    }

    var company_batch = new async_mult(functions, callback);

    company_batch.execute();
  });
}

// Company News Pages
seoPicker.route('/:ticker/:name/news/:company_id',cmp_news);
seoPicker.route('/:partner_id/:name/:ticker/n/:company_id',cmp_news);
function cmp_news(params, req, res) {
  var startTime = (new Date()).getTime(); // Log the start time (normal variable b/c no async)

  // Get the data
  info_envar.withValue({params: params, res: res, req: req, startTime: startTime}, function(){
    var callback = Meteor.bindEnvironment(function(results){
      var res_arr = {};
      for ( var index = 0; index < results.length; index++ ) {
        for ( var attr in results[index] ) {
          if ( results[index].hasOwnProperty(attr) ) {
            res_arr[attr] = results[index][attr];
          }
        }
      }

      var info = info_envar.get();
      var res = info.res;

      try {
        var data = res_arr;

        if ( typeof data.content != "undefined" ) {
          var temp_d = JSON.parse(data.content);
          temp_d.results.name = temp_d.name;
          data.results = temp_d.results;
        }

        // Process News
        var news_list = [];
        if ( typeof data.news != "undefined" ) {
          for ( var index = 0; index < data.news.length; index++ ) {
            var n_data = {
              title: '<a href="' + Router.pick_path('content.companyprofile',{company_id: data.profile_header.c_id, name: compUrlName(data.profile_header.c_name), ticker: data.profile_header.c_ticker}, info.params) + '">' + data.profile_header.c_name + ' (' + data.profile_header.c_exchange + ':' + data.profile_header.c_ticker + ')</a> ' + (new Date(parseInt(data.news[index].pubDate_ut)*1000)).toSNTFormTime() + ': <a href="' + data.news[index].link + '">' + data.news[index].title + '</a>',
              content: {
                line: [
                  data.news[index].description,
                  'Article Keywords: ' + data.news[index].tags
                ]
              }
            };
            news_list.push(n_data);
          }
        }

        var head_data = { // Data to put into the head of the document (meta tags/title)
          description: 'Get all of the news about ' + data.profile_header.c_name + '.',
          title: 'An Investor\'s Guide to ' + data.profile_header.c_name + ' In The News | InvestKit.com',
          url: 'http://www.investkit.com' + Router.pick_path('content.articlenews',{company_id: data.profile_header.c_id, name: compUrlName(data.profile_header.c_name), ticker: data.profile_header.c_ticker}, info.params)
        };

        if ( typeof data.results != "undefined" ) {
          head_data.title = 'All The News About ' + data.profile_header.c_name + ' | ' + data.results.name + ' Finance';
          head_data.url = 'http://www.myinvestkit.com' + Router.pick_path('content.articlenews',{company_id: data.profile_header.c_id, name: compUrlName(data.profile_header.c_name), ticker: data.profile_header.c_ticker}, info.params);
          head_data.siteName = data.results.name + ' Finance';
        }

        var page_data = {
          head_data: head_data,
          h1: {
            title: 'News About <a href="' + Router.pick_path('content.companyprofile',{company_id: data.profile_header.c_id, name: compUrlName(data.profile_header.c_name), ticker: data.profile_header.c_ticker}, info.params) + '">' + data.profile_header.c_name + ' (' + data.profile_header.c_exchange + ':' + data.profile_header.c_ticker + ')</a>',
            h2: news_list
          }
        };

        if ( typeof data.results != "undefined" ) {
          page_data.partner_header = data.results.header.script;
        }

        // res.end(JSON.stringify(res_arr, null, 2));

        // res.end(SSR.render('generic_page',page_data));
        res.end(minify(SSR.render('generic_page',page_data), {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true
        })); // Write the pages template
        // Also minifies the HTML string

        // Log how long it took to render the page
        var endTime = (new Date()).getTime();
        console.log("SSRSTAT|\"Company News Page\",\"" + info.params.company_id + "\"," + (endTime - info.startTime) + "," + endTime + ",\"" + info.params.partner_id + "\"|");
        return false;
      } catch(e) {
        var endTime = (new Date()).getTime();
        console.log("SSRSTAT|\"Company News Page - Error\",\"" + info.params.company_id + "\",," + endTime + ",\"" + info.params.partner_id + "\"|");
        RenderError(res);
      }
    });

    var functions = [];

    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetCompanyData",params.company_id,"batch_1", bound_cb);
      });
    });

    functions.push(function(batch){
      batch_envar.withValue(batch,function(){
        var bound_cb = function(error, data) {
          if ( error ) {
            batch_envar.get().done({});
          } else {
            batch_envar.get().done({news: data.data});
          }
        }
        Meteor.http.get('http://api.synapsys.us/news/?action=get_finance_news&ticker=' + params.ticker,bound_cb);
      });
    });

    if ( typeof params.partner_id != "undefined" ) {
      functions.push(function(batch){
        batch_envar.withValue(batch, function(){
          var bound_cb = Meteor.bindEnvironment(method_cb);
          Meteor.call('GetPartnerHeader',params.partner_id, bound_cb);
        });
      });
    }

    var company_batch = new async_mult(functions, callback);

    company_batch.execute();
  });
}

// Executive Compensation Page
seoPicker.route('/:lname-:fname/:ticker/compensation/:exec_id',exec_comp);
seoPicker.route('/:partner_id/:ticker/:lname-:fname/comp/:exec_id',exec_comp);
function exec_comp(params, req, res){
  var startTime = (new Date()).getTime(); // Log the start time (normal variable b/c no async)

  // Get the data
  info_envar.withValue({params: params, res: res, req: req, startTime: startTime}, function(){
    var callback = Meteor.bindEnvironment(function(results){
      var res_arr = {};
      for ( var index = 0; index < results.length; index++ ) {
        for ( var attr in results[index] ) {
          if ( results[index].hasOwnProperty(attr) ) {
            res_arr[attr] = results[index][attr];
          }
        }
      }

      var info = info_envar.get();
      var res = info.res;

      try {
        var data = res_arr;
        profile_header = data.profile_header || {};
        profile_header.o_current_title = profile_header.o_current_title || {};
        profile_header.compensation = profile_header.compensation || {};
        var cmp_reg = new RegExp(profile_header.c_name,'g');
        profile_header.o_bio = (profile_header.o_bio || '').replace(cmp_reg,'<a href="' + Router.pick_path('content.companyprofile',{company_id: profile_header.c_id, partner_id: info.params.partner_id, name: compUrlName(profile_header.c_name), ticker: profile_header.c_ticker}, info.params) + '">' + profile_header.c_name + '</a>');
        profile_header.c_name_orig = profile_header.c_name;
        profile_header.c_name = '<a href="' + Router.pick_path('content.companyprofile',{company_id: profile_header.c_id, partner_id: info.params.partner_id, name: compUrlName(profile_header.c_name), ticker: profile_header.c_ticker}, info.params) + '">' + profile_header.c_name + ' (' + profile_header.c_ticker + ')</a>';
        data.profile_header.o_full_name = data.profile_header.o_first_name + ' ' + data.profile_header.o_middle_initial + ' ' + data.profile_header.o_last_name;

        if ( typeof data.content != "undefined" ) {
          var temp_d = JSON.parse(data.content);
          temp_d.results.name = temp_d.name;
          data.results = temp_d.results;
        }

        // Section specific data
        // Compensation
        var compensation = [];
        var c_data = data.compensation.compensation_periods;
        var period = '';
        var loc_data = {h3: []};
        var trans_arr = {
          Salary: 'Salary',
          Bonus: 'Bonus',
          TotalST: 'Total Short Term',
          RestrictedStock: 'Restricted Stock',
          AllOtherLT: 'All Other Long Term',
          TotalComp: 'Total Compensation'
        };
        for ( var index = 0; index < c_data.length; index++ ) {
          if ( c_data[index].o_period_end_date != period ) {
            if ( loc_data.h3.length != 0 ) {
              compensation[compensation.length] = loc_data;
            }
            var loc_data = {h3: []};
            var period = c_data[index].o_period_end_date;
            loc_data.title = '<a href="' + Router.pick_path('content.executiveprofile', {fname: profile_header.o_first_name, lname: profile_header.o_last_name, exec_id: profile_header.o_id, ticker: profile_header.c_ticker}, info.params) + '">' + profile_header.o_full_name + '</a>\'s Compensation For ' + (new Date(c_data[index].o_period_end_date)).getFullYear();
          }
          var l_data = {};
          l_data.title = profile_header.o_full_name + ' at <a href="' + Router.pick_path('content.companyprofile',{company_id: c_data[index].c_id, ticker: c_data[index].c_ticker, name: compUrlName(c_data[index].c_name)}, info.params) + '">' + c_data[index].c_name + '</a> in ' + (new Date(c_data[index].o_period_end_date)).getFullYear();
          l_data.content = {line: []};
          if ( c_data[index].o_compensation != "" ) {
            for ( var attr in c_data[index].o_compensation ) {
              if ( c_data[index].o_compensation.hasOwnProperty(attr) ) {
                if ( typeof trans_arr[attr] != "undefined" ) {
                  l_data.content.line[l_data.content.line.length] = profile_header.o_full_name + ' at <a href="' + Router.pick_path('content.companyprofile',{company_id: c_data[index].c_id, ticker: c_data[index].c_ticker, name: compUrlName(c_data[index].c_name)}, info.params) + '">' + c_data[index].c_name + '</a> ' + trans_arr[attr] + ': $' + ToCommaNumber(c_data[index].o_compensation[attr]);
                }
              }
            }
          } else {
            l_data.content.line[l_data.content.line.length] = 'No Compensation Information Found';
          }
          if ( c_data[index].c_name != null && l_data.content.line.length > 0 ) {
            loc_data.h3[loc_data.h3.length] = l_data;
          }
        }

        var published = (new Date()).toSNTForm();
        var updated = (new Date(profile_header.o_last_updated)).toSNTFormTime();

        var h1content = {
          line: [
            'Written By: ' + author(parseInt(info.params.exec_id)),
            'Page Published on ' + published + '<br>Page Updated on ' + updated,
            '',
            profile_header.o_bio
          ]
        };

        var head_data = { // Data to put into the head of the document (meta tags/title)
          description: 'Executive Compensation for ' + profile_header.o_full_name,
          title: 'An Investors Guide To ' + profile_header.o_full_name + '\'s Executive Compensation | InvestKit.com',
          url: 'http://www.investkit.com' + Router.pick_path('content.compensation',{partner_id: info.params.partner_id, exec_id: profile_header.o_id, fname: profile_header.o_first_name, lname: profile_header.o_last_name, ticker: profile_header.c_ticker}, info.params),
          other_tags: [
            {
              name: 'og:image',
              content: profile_header.o_pic
            },
            {
              name: 'og:type',
              content: 'profile'
            },
            {
              name: 'profile:first_name',
              content: profile_header.o_first_name
            },
            {
              name: 'profile:last_name',
              content: profile_header.o_last_name
            }
          ]
        };

        if ( typeof data.results != "undefined" ) {
          h1content.line[0] = 'Written By: ' + author(parseInt(info.params.exec_id) + 2);
          head_data.siteName = data.results.name + ' Finance';
          head_data.title = 'Everything You Need To Know About ' + profile_header.o_full_name + '\'s Executive Compensation | ' + data.results.name + ' Finance';
          head_data.description = 'Compensation details about ' + profile_header.c_name_orig;
          head_data.url = 'http://www.myinvestkit.com' + Router.pick_path('content.compensation',{partner_id: info.params.partner_id, exec_id: profile_header.o_id, fname: profile_header.o_first_name, lname: profile_header.o_last_name, ticker: profile_header.c_ticker}, info.params);
          var h1 = {
            title: 'Everything You Need To Know About ' + profile_header.c_name + '\'s Compensation',
            content: h1content,
            h2: compensation
          };
        } else {
          var h1 = {
            title: 'An Investors Guide To ' + profile_header.o_full_name + '\'s Compensation',
            content: h1content,
            h2: compensation
          };
        }

        var page_data = {
          head_data: head_data,
          h1: h1
        };

        if ( typeof data.results != "undefined" ) {
          page_data.partner_header = data.results.header.script;
        }

        // res.end(JSON.stringify(res_arr, null, 2));

        // res.end(SSR.render('generic_page',page_data));
        res.end(minify(SSR.render('generic_page',page_data), {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true
        })); // Write the pages template
        // Also minifies the HTML string

        // Log how long it took to render the page
        var endTime = (new Date()).getTime();
        console.log("SSRSTAT|\"Executive Compensation\",\"" + info.params.exec_id + "\"," + (endTime - info.startTime) + "," + endTime + ",\"" + info.params.partner_id + "\"|");
        return false;
      } catch(e) {
        var endTime = (new Date()).getTime();
        console.log("SSRSTAT|\"Executive Compensation - Error\",\"" + info.params.exec_id + "\",," + endTime + ",\"" + info.params.partner_id + "\"|");
        RenderError(res);
      }
    });

    var functions = [];

    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetExecData",params.exec_id,"batch_1", bound_cb);
      });
    });

    if ( typeof params.partner_id != "undefined" ) {
      functions.push(function(batch){
        batch_envar.withValue(batch, function(){
          var bound_cb = Meteor.bindEnvironment(method_cb);
          Meteor.call('GetPartnerHeader',params.partner_id, bound_cb);
        });
      });
    }

    var company_batch = new async_mult(functions, callback);

    company_batch.execute();
  });
}

// Financial Overview
seoPicker.route('/:ticker/:name/financial-overview/:company_id',fin_ovw);
seoPicker.route('/:partner_id/:name/:ticker/fin-view/:company_id',fin_ovw);
function fin_ovw(params, req, res) {
  var startTime = (new Date()).getTime();

  info_envar.withValue({params: params, res: res, req: req, startTime: startTime}, function(){
    var callback = Meteor.bindEnvironment(function(results){
      var res_arr = {};
      for ( var index = 0; index < results.length; index++ ) {
        for ( var attr in results[index] ) {
          if ( results[index].hasOwnProperty(attr) ) {
            res_arr[attr] = results[index][attr];
          }
        }
      }

      var info = info_envar.get();
      var res = info.res;

      try {
        var data = res_arr;

        if ( typeof data.content != "undefined" ) {
          var temp_d = JSON.parse(data.content);
          temp_d.results.name = temp_d.name;
          data.results = temp_d.results;
        }

        // AI String
        if ( typeof data.ai == "object" ) {
          data.ai = '';
        } else {
          data.ai = data.ai.match(/<y.txt[^\n]*/)[0].replace(/<y.txt[^>]*>/,'');
        }
        // Financial Data
        function areDefined(data, array) {
          try{
            for ( var i = 0; i < array.length; i++ ) {
              if ( typeof data[array[i]] == "undefined" || data[array[i]] == null ) {
                return false;
              }
            }
            return true;
          } catch(e) {
            return false;
          }
        }
        var cdata = data.fin_overview.company_data;
        var c_name1 = '<a href="' + Router.pick_path('content.companyprofile',{company_id: cdata.c_id, name: compUrlName(cdata.c_name), ticker: cdata.c_ticker}, info.params) + '">' + cdata.c_name + ' (ticker: ' + cdata.c_ticker + ')</a>';
        var c_name = '<a href="' + Router.pick_path('content.companyprofile',{company_id: cdata.c_id, name: compUrlName(cdata.c_name), ticker: cdata.c_ticker}, info.params) + '">' + cdata.c_name + '</a>';
        var line = [];
        line[line.length] = 'Page Updated on ' + (new Date(data.fin_overview.company_data.csi_price_last_updated)).toSNTFormTime();
        line[line.length] = '';
        line[line.length] = data.ai;
        var l_line = '';
        if ( areDefined(cdata,['c_hq_city','c_hq_state']) ) {
          l_line = l_line + c_name1 + ' is headquartered in ' + cdata.c_hq_city.toTitleCase() + ', <a href="' + Router.pick_path('content.locationprofile',{loc_id: fullstate(cdata.c_hq_state)}, info.params) + '">' + cdata.c_hq_state + '</a>. ';
        }
        if ( areDefined(cdata,['csi_price','csi_price_change_since_last','csi_percent_change_since_last','csi_price_last_operator']) ) {
          l_line = l_line + 'The stock for ' + c_name + ' is currently trading at $' + ToCommaNumber(cdata.csi_price) + ', which is ';
          if ( cdata.csi_price_last_operator == 0 ) {
            l_line = l_line + ' down';
          } else {
            l_line = l_line + ' up';
          }
          l_line = l_line + ' $' + ToCommaNumber(cdata.csi_price_change_since_last) + ' or ' + ToCommaNumber(cdata.csi_percent_change_since_last) + '%. '
        }
        if ( areDefined(cdata,['csi_opening_price','csi_closing_price','csi_high','csi_low']) ) {
          l_line = l_line + c_name + ' most recently opened at $' + ToCommaNumber(cdata.csi_opening_price) + ' and closed at $' + ToCommaNumber(cdata.csi_closing_price) + '. ';
          l_line = l_line + 'In ' + c_name + '\'s most recent trading day, ' + c_name + ' hit a high of $' + ToCommaNumber(cdata.csi_high) + ' and a low of $' + ToCommaNumber(cdata.csi_low) + '. ';
        }
        if ( areDefined(cdata,['avg_volume','csi_total_shares','csi_market_cap']) ) {
          l_line = l_line + 'There are ' + ToCommaNumber(cdata.csi_total_shares) + ' shares of ' + c_name + ', while the <a href="' + Router.pick_path('content.toplist',{l_name: 'Top-companies-with-highest-volume', list_id: '5226', loc_id: data.fin_overview.company_data.c_hq_state}, info.params) + '">trading volume</a> averages ' + ToCommaNumber(Math.round(cdata.avg_volume)) + ' shares. The <a href="' + Router.pick_path('content.toplist',{l_name: 'Top-companies-with-highest-market-cap', list_id: '5222', loc_id: data.fin_overview.company_data.c_hq_state}, info.params) + '">total market cap</a> of ' + c_name + ' is $' + ToCommaNumber(cdata.csi_market_cap) + '. ';
        }
        line[line.length] = l_line;
        line[line.length] = '';
        line[line.length] = 'Summary By Thomson Reuters:';
        line[line.length] = cdata.c_desc;

        var head_data = { // Data to put into the head of the document (meta tags/title)
          description: 'A daily stock update for ' + cdata.c_name,
          title: 'An Investors Guide To ' + cdata.c_name + ': Daily Report | InvestKit.com',
          url: 'http://www.investkit.com' + Router.pick_path('content.finoverview',{company_id: cdata.c_id, name: compUrlName(cdata.c_name), ticker: cdata.c_ticker}, info.params)
        };

        var h1 = {
          title: 'An Investors Guide To ' + c_name1 + ': Daily Report',
          content: {
            line: line
          }
        };

        if ( typeof data.results != "undefined" ) {
          head_data.siteName = data.results.name;
          head_data.title = 'Everything You Need To Know About ' + cdata.c_name + ': Daily Report | ' + data.results.name + ' Finance';
          h1.title = 'Everything You Need To Know About ' + c_name1 + ': Daily Report';
        }

        var page_data = {
          head_data: head_data,
          h1: h1
        };

        if ( typeof data.results != "undefined" ) {
          page_data.partner_header = data.results.header.script;
        }

        // res.end(JSON.stringify(res_arr, null, 2));

        // res.end(SSR.render('generic_page',page_data));
        res.end(minify(SSR.render('generic_page',page_data), {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true
        })); // Write the pages template
        // Also minifies the HTML string

        // Log how long it took to render the page
        var endTime = (new Date()).getTime();
        console.log("SSRSTAT|\"Financial Overview\",\"" + info.params.company_id + "\"," + (endTime - info.startTime) + "," + endTime + ",\"" + info.params.partner_id + "\"|");
        return false;
      } catch(e) {
        var endTime = (new Date()).getTime();
        console.log("SSRSTAT|\"Financial Overview - Error\",\"" + info.params.company_id + "\",," + endTime + ",\"" + info.params.partner_id + "\"|");
        RenderError(res);
      }
    });

    var functions = [];

    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("CompWebPageData",params.company_id,"fin_overview", bound_cb);
      });
    });
    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = function(error, data) {
          batch_envar.get().done({ai: data});
        }
        Meteor.call("GetAIContent",params.company_id, bound_cb);
      });
    });

    if ( typeof params.partner_id != "undefined" ) {
      functions.push(function(batch){
        batch_envar.withValue(batch, function(){
          var bound_cb = Meteor.bindEnvironment(method_cb);
          Meteor.call('GetPartnerHeader',params.partner_id, bound_cb);
        });
      });
    }

    var company_batch = new async_mult(functions, callback);

    company_batch.execute();
  });
}

//**********************STATIC PAGES**********************
// Disclaimer
seoPicker.route('/disclaimer',disclaimer);
seoPicker.route('/:partner_id/disclaimer',disclaimer);
function disclaimer(params, req, res) {
  var startTime = (new Date()).getTime();

  if ( typeof params.partner_id != "undefined" ) {
    var page_data = {
      head_data: {
        title: 'Disclaimer',
        url: 'http://www.myinvestkit.com/' + params.partner_id + '/disclaimer',
        siteName: params.partner_id
      },
      privacy: '/' + params.partner_id + '/privacy-policy',
      tos: '/' + params.partner_id + '/terms-of-service',
      dmca: '/' + params.partner_id + '/copyright',
      stock: '/' + params.partner_id + '/stock-disclaimer'
    };
  } else {
    var page_data = {
      head_data: {
        title: 'Disclaimer | InvestKit.com',
        url: 'http://www.investkit.com/disclaimer'
      },
      privacy: '/privacy-policy',
      tos: '/terms-of-service',
      dmca: '/copyright',
      stock: '/stock-disclaimer'
    };
  }

  res.end(minify(SSR.render('disclaimer',page_data), {
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    collapseWhitespace: true
  })); // Write the pages template

  // Log how long it took to render the page
  var endTime = (new Date()).getTime();
  console.log("SSRSTAT|\"Disclaimer\",," + (endTime - info.startTime) + "," + endTime + ",\"" + info.params.partner_id + "\"|");
  return false;
}

// Copyright
seoPicker.route('/copyright',copyright);
seoPicker.route('/:partner_id/copyright',copyright);
function copyright(params, req, res) {
  var startTime = (new Date()).getTime();

  if ( typeof params.partner_id != "undefined" ) {
    var page_data = {
      head_data: {
        title: 'Copyright Page',
        url: 'http://www.myinvestkit.com/' + params.partner_id + '/copyright',
        siteName: params.partner_id
      }
    };
  } else {
    var page_data = {
      head_data: {
        title: 'Copyright Page | InvestKit.com',
        url: 'http://www.investkit.com/copyright'
      }
    };
  }

  res.end(minify(SSR.render('copyright',page_data), {
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    collapseWhitespace: true
  })); // Write the pages template

  // Log how long it took to render the page
  var endTime = (new Date()).getTime();
  console.log("SSRSTAT|\"Copyright Page\",," + (endTime - info.startTime) + "," + endTime + ",\"" + info.params.partner_id + "\"|");
  return false;
}

// Privacy Policy
seoPicker.route('/privacy-policy',privacypolicy);
seoPicker.route('/:partner_id/privacy-policy',privacypolicy);
function privacypolicy(params, req, res) {
  var startTime = (new Date()).getTime();

  if ( typeof params.partner_id != "undefined" ) {
    var page_data = {
      head_data: {
        title: 'Privacy Policy',
        url: 'http://www.myinvestkit.com/' + params.partner_id + '/privacy-policy',
        siteName: params.partner_id
      }
    };
  } else {
    var page_data = {
      head_data: {
        title: 'Privacy Policy | InvestKit.com',
        url: 'http://www.investkit.com/privacy-policy'
      }
    };
  }

  res.end(minify(SSR.render('privacypolicy',page_data), {
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    collapseWhitespace: true
  })); // Write the pages template

  // Log how long it took to render the page
  var endTime = (new Date()).getTime();
  console.log("SSRSTAT|\"Privacy Policy Page\",," + (endTime - info.startTime) + "," + endTime + ",\"" + info.params.partner_id + "\"|");
  return false;
}

// Stock Disclaimer
seoPicker.route('/stock-disclaimer',stockdisclaimer);
seoPicker.route('/:partner_id/stock-disclaimer',stockdisclaimer);
function stockdisclaimer(params, req, res) {
  var startTime = (new Date()).getTime();

  if ( typeof params.partner_id != "undefined" ) {
    var page_data = {
      head_data: {
        title: 'Stock Disclaimer',
        url: 'http://www.myinvestkit.com/' + params.partner_id + '/stock-disclaimer',
        siteName: params.partner_id
      }
    };
  } else {
    var page_data = {
      head_data: {
        title: 'Stock Disclaimer | InvestKit.com',
        url: 'http://www.investkit.com/stock-disclaimer'
      }
    };
  }

  res.end(minify(SSR.render('stockdisclaimer',page_data), {
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    collapseWhitespace: true
  })); // Write the pages template

  // Log how long it took to render the page
  var endTime = (new Date()).getTime();
  console.log("SSRSTAT|\"Stock Disclaimer\",," + (endTime - info.startTime) + "," + endTime + ",\"" + info.params.partner_id + "\"|");
  return false;
}

// Terms of Service
seoPicker.route('/terms-of-service',termsofservice);
seoPicker.route('/:partner_id/terms-of-service',termsofservice);
function termsofservice(params, req, res) {
  var startTime = (new Date()).getTime();

  if ( typeof params.partner_id != "undefined" ) {
    var page_data = {
      head_data: {
        title: 'Terms Of Service',
        url: 'http://www.myinvestkit.com/' + params.partner_id + '/terms-of-service',
        siteName: params.partner_id
      }
    };
  } else {
    var page_data = {
      head_data: {
        title: 'Terms Of Service | InvestKit.com',
        url: 'http://www.investkit.com/terms-of-service'
      }
    };
  }

  res.end(minify(SSR.render('termsofservice',page_data), {
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    collapseWhitespace: true
  })); // Write the pages template

  // Log how long it took to render the page
  var endTime = (new Date()).getTime();
  console.log("SSRSTAT|\"Terms Of Service\",," + (endTime - info.startTime) + "," + endTime + ",\"" + info.params.partner_id + "\"|");
  return false;
}
//**********************END STATIC PAGES**********************

// Partner Home Page
seoPicker.route('/:partner_id',function(params, req, res){
  var startTime = (new Date()).getTime(); // Log the start time (normal variable b/c no async)

  // Get the data
  info_envar.withValue({params: params, res: res, req: req, startTime: startTime}, function(){
    var callback = Meteor.bindEnvironment(function(results){
      var res_arr = {};
      for ( var index = 0; index < results.length; index++ ) {
        for ( var attr in results[index] ) {
          if ( results[index].hasOwnProperty(attr) ) {
            res_arr[attr] = results[index][attr];
          }
        }
      }

      var info = info_envar.get();
      var res = info.res;

      try {
        var data = res_arr;

        if ( typeof data.content != "undefined" ) {
          var temp_d = JSON.parse(data.content);
          temp_d.results.name = temp_d.name;
          data.results = temp_d.results;
        }

        // Section specific data
        data.location_daily_update = typeof data.location_daily_update == "undefined" ? {composite_summary: {}} : typeof data.location_daily_update.composite_summary == "undefined" ? {composite_summary: {}} : data.location_daily_update;
        // Companies by Sector
        var cmp_sector = [];
        data.companies_by_sector = data.companies_by_sector || {};
        for ( var attr in data.companies_by_sector ) {
          if ( data.companies_by_sector.hasOwnProperty(attr) && attr != "total_company_count" ) {
            var ldata = {};
            ldata.title = '<a href="' + Router.pick_path('content.sector',{sector_id: compUrlName(attr), loc_id: data.profile_header.location},info.params) + '">' + attr + ' (' + (Math.round(data.companies_by_sector[attr].percentage*1000)/10) + '% of companies in ' + data.profile_header.location + ')</a>';
            var arr = [];
            for ( var index = 0; index < data.companies_by_sector[attr].count; index++ ) {
              c_data = data.companies_by_sector[attr][index];
              arr.push('<a href="' + Router.pick_path('content.companyprofile',{partner_id: info.params.partner_id, company_id: c_data.c_id, ticker: c_data.c_ticker, name: compUrlName(c_data.c_name)}, info.params) + '">' + c_data.c_name + ' (' + c_data.c_ticker + ')</a><br>' + c_data.c_desc);
            }
            ldata.content = {ul: arr};
            cmp_sector[cmp_sector.length] = ldata;
          }
        }
        // Earnings Reports
        var earnings = [];
        data.earnings = data.earnings || [];
        for ( var index = 0; index < data.earnings.length; index++ ) {
          var ldata = {};
          var cdata = data.earnings[index];
          ldata.title = '<a href="' + Router.pick_path('content.companyprofile',{partner_id: info.params.partner_id, company_id: cdata.c_id, name: compUrlName(cdata.c_name), ticker: cdata.c_ticker}, info.params) + '">' + cdata.c_name + ' (' + cdata.c_exchange + ':' + cdata.c_ticker + ')</a> ' + cdata.e_report_title;
          ldata.content = {line: [cdata.c_desc]};
          earnings[earnings.length] = ldata;
        }
        // Lists
        var lists = [];
        data.market_movers = data.market_movers || [];
        for ( var index = 0; index < data.market_movers.length; index++ ) {
          var t_data = data.market_movers[index];
          var items = [];
          for ( var i = 0; i < t_data.data.top_list_list.length; i++ ) {
            items.push('<a href="' + Router.pick_path('content.companyprofile',{comapny_id: t_data.data.top_list_list[i].c_id, ticker: t_data.data.top_list_list[i].c_ticker, name: t_data.data.top_list_list[i].c_name}) + '">' + t_data.data.top_list_list[i].c_name + ' (' + t_data.data.top_list_list[i].c_exchange + ':' + t_data.data.top_list_list[i].c_ticker + ')</a> as of ' + (new Date(t_data.data.top_list_list[i].csi_price_last_updated)).toSNTFormTime());
          }
          var l_data = {
            title: '<a href="' + Router.pick_path('content.toplist',{l_name: compUrlName(t_data.data.top_list_info.top_list_title), list_id: t_data.data.top_list_info.top_list_id, loc_id: data.profile_header.location}, info.params) + '">' + t_data.data.top_list_info.top_list_title + '</a>',
            content: {
              ul: items
            }
          };
          lists.push(l_data);
        }

        var published = (new Date()).toSNTForm();
        var updated = (new Date(data.location_daily_update.composite_summary.last_updated)).toSNTFormTime();

        var h1content = {
          line: [
            'Written By: ' + author(info.params.partner_id.length),
            'Page Published on ' + published,
            'Page Updated on ' + updated,
            '',
            data.profile_header.location + ' is home to ' + data.profile_header.total_companies + ' companies with a total market cap of $' + data.profile_header.total_market_cap + '. ' + data.profile_header.location + ' is also home to ' + data.profile_header.total_executives + ' executives.',
            data.profile_header.location + ' Current Aggragate Price: $' + ToCommaNumber(data.location_daily_update.composite_summary.current_price),
            data.profile_header.location + ' Previous Close: $' + ToCommaNumber(data.location_daily_update.composite_summary.previous_close),
            data.profile_header.location + ' Percent Change: ' + data.location_daily_update.composite_summary.percent_change + '%',
            data.profile_header.location + ' Price Change: $' + ToCommaNumber(data.location_daily_update.composite_summary.price_change),
            data.profile_header.location + ' Today\'s High: $' + ToCommaNumber(data.location_daily_update.composite_summary.todays_high),
            data.profile_header.location + ' Today\'s Low: $' + ToCommaNumber(data.location_daily_update.composite_summary.todays_low),
            data.profile_header.location + ' Total Companies: ' + ToCommaNumber(data.location_daily_update.composite_summary.total_companies)
          ]
        };
        var bysect = {};
        if ( cmp_sector.length != 0 ) {
          var bysect = {
            title: data.profile_header.location + ' Companies By Sector',
            h3: cmp_sector
          };
        }
        var earn = {};
        if ( earnings.length != 0 ) {
          var earn = {
            title: data.profile_header.location + ' Earnings Reports',
            h3: earnings
          };
        }
        var l_lists = {};
        if ( lists.length != 0 ) {
          l_lists = {
            title: 'Lists About ' + data.profile_header.location,
            h3: lists
          };
        }

        var head_data = { // Data to put into the head of the document (meta tags/title)
          description: 'SEC documents, financial data, executive details and more valuable information for investors about companies in ' + data.profile_header.location + '.',
          title: 'An Investor\'s Guide to Public Companies in ' + data.profile_header.location + ' | InvestKit.com',
          url: 'http://www.investkit.com' + Router.pick_path('content.locationprofile',{partner_id: info.params.partner_id, loc_id: info.params.loc_id}, info.params)
        };

        if ( typeof data.results != "undefined" ) {
          h1content.line[0] = 'Written By: ' + author(info.params.partner_id.length + 1); // CHANGE TO DIFF AUTHOR WHEN CONST
          head_data.siteName = data.results.name + ' Finance';
          head_data.title = 'Everything You Need To Know About Public Companies in ' + data.profile_header.location + ' | ' + data.results.name + ' Finance';
          head_data.description = 'Find out everything you need to know about publicly traded companies in ' + data.profile_header.location + ': Financial data, SEC documents, news, executive information and more.';
          head_data.url = 'http://www.myinvestkit.com' + Router.pick_path('content.locationprofile',{partner_id: info.params.partner_id, loc_id: info.params.loc_id}, info.params);
          bysect.title = 'Companies By Sector in ' + data.profile_header.location;
          earn.title = 'Earnings Reports for Companies in ' + data.profile_header.location;
          l_lists.title = data.profile_header.location + ' Lists';
          var h2Data = [earn, l_lists, bysect];
          var h1 = {
            title: 'Everything You Need To Know About Public Companies in ' + data.profile_header.location,
            content: h1content,
            h2: h2Data
          };
        } else {
          var h2Data = [bysect, l_lists, earn];
          var h1 = {
            title: 'An Investor\'s Guide to Public Companies in ' + data.profile_header.location,
            content: h1content,
            h2: h2Data
          };
        }

        var page_data = {
          head_data: head_data,
          h1: h1
        };

        if ( typeof data.results != "undefined" ) {
          page_data.partner_header = data.results.header.script;
        }

        // res.end(JSON.stringify(res_arr, null, 2));

        // res.end(SSR.render('generic_page',page_data));
        res.end(minify(SSR.render('generic_page',page_data), {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true
        })); // Write the pages template
        // Also minifies the HTML string

        // Log how long it took to render the page
        var endTime = (new Date()).getTime();
        console.log("SSRSTAT|\"Partner Profile\",\"" + info.params.partner_id + "\"," + (endTime - info.startTime) + "," + endTime + ",\"" + info.params.partner_id + "\"|");
        return false;
      } catch(e) {
        var endTime = (new Date()).getTime();
        console.log("SSRSTAT|\"Partner Profile - Error\",\"" + info.params.partner_id + "\",," + endTime + ",\"" + info.params.partner_id + "\"|");
        RenderError(res);
      }
    });

    var functions = [];

    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetPartnerProfile",params.partner_id,"batch_1", bound_cb);
      });
    });
    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetPartnerProfile",params.partner_id,"batch_2", bound_cb);
      });
    });
    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetPartnerProfile",params.partner_id,"batch_3", bound_cb);
      });
    });
    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetPartnerProfile",params.partner_id,"batch_4", bound_cb);
      });
    });

    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call('GetPartnerHeader',params.partner_id, bound_cb);
      });
    });

    var company_batch = new async_mult(functions, callback);

    company_batch.execute();
  });
});

// Home Page
seoPicker.route('/',function(params, req, res){
  if ( isMyInvestKit(req) ) {
    var endTime = (new Date()).getTime();
    console.log("SSRSTAT|\"Home Page - MyInvestKit\",,," + endTime + ",|");
    res.writeHead(404);
    res.end('404 Error: Page Not Found');
    return false;
  }
  var startTime = (new Date()).getTime(); // Log the start time (normal variable b/c no async)

  var states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Lousiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  var states_list = [];
  for ( var index = 0; index < states.length; index++ ) {
    states_list.push('<a href="' + Router.pick_path('content.locationprofile',{loc_id: states[index]}) + '">' + states[index] + '</a>');
  }

  var head_data = { // Data to put into the head of the document (meta tags/title)
    description: 'Get an investor\'s guide to companies, executives, locations, and more. Browse lists of top performing companies, see what investments might have gained, and access news about companies.',
    title: 'InvestKit.com - The Investor\'s Guide To The Market',
    url: 'http://www.investkit.com/'
  };

  var page_data = {
    head_data: head_data,
    h1: {
      title: 'InvestKit.com - The Investor\'s Guide To The Market',
      h2: [
        {
          title: 'Take A Look At Our State Profiles',
          content: {
            ul: states_list
          }
        }
      ]
    }
  };

  // res.end(JSON.stringify(res_arr, null, 2));

  // res.end(SSR.render('generic_page',page_data));
  res.end(minify(SSR.render('generic_page',page_data), {
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    collapseWhitespace: true
  })); // Write the pages template
  // Also minifies the HTML string

  // Log how long it took to render the page
  var endTime = (new Date()).getTime();
  console.log("SSRSTAT|\"Home Page\",," + (endTime - startTime) + "," + endTime + ",|");
  return false;
});

var ToCommaNumber = function(Number) {
  if ( typeof Number == "undefined" || Number == null ) {
    return '';
  }
  var split = Number.toString().split('.');
  split[0] = split[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return split.join('.');
}

function getListID(exchange, location) {
  var retArr = {loc_id: location};
  retArr.l_name = 'Top-companies-with-stock-percent-gain';
  retArr.list_id = 5233;
  if ( typeof exchange == "undefined" ) {
    return retArr;
  }
  exchange = exchange.toLowerCase();
  var ids = {
    'nasdaq': 5191,
    'nyse': 5205,
    'amex': 5219
  };
  var name = {
    'nasdaq': 'Top-companies-on-NASDAQ-with-stock-percent-gain',
    'nyse': 'Top-companies-on-NYSE-with-stock-percent-gain',
    'amex': 'Top-companies-on-AMEX-with-stock-percent-gain'
  };
  if ( typeof ids[exchange] != "undefined" ) {
    retArr.l_name = name[exchange];
    retArr.list_id = ids[exchange];
  }
  return retArr;
}

// Used as async callback function
var method_cb = function(error, data) {
  var batch = batch_envar.get();
  if ( error ) {
    // console.log("Batch Error:", error);
    batch.done({});
    return false;
  }
  batch.done(data);
}

function isMyInvestKit(req) {
  if ( req.headers.host.indexOf('myinvestkit') != -1 ) {
    return true;
  }
  return false;
}

function author(num) {
  var authors = [
    'Kevin Owens',
    'Emily Behlmann',
    'William Klausmeyer',
    'Tommy Lofgren',
    'Larry Pham',
    'Lutz Lai',
    'Taewook Kang',
    'Vance Banks',
    'Adam Clyde',
    'Cameron Brocksen',
    'Catherine Janzen',
    'Christine Ridge',
    'Daniel Vernon',
    'Grant Gillespie',
    'James Mason'
  ];

  if ( typeof num != "number" ) {
    var rand = Math.floor(Math.random()*authors.length);
  } else {
    var rand = num % authors.length;
  }

  return authors[rand];
}

// Create a custom handler for multiple async functions
var async_mult = function(functions, callback) {
  this._functions = functions;
  function cback(results){
    if ( this._isDone == false ) {
      results = results || this._results;
      this._isDone = true;
      callback(results, this._remaining);
    }
  };
  this._timeout = 100000;
  this._callback = cback.bind(this);
  this._isDone = false;
}

var async_env = new Meteor.EnvironmentVariable;

/**
 * Executes the functions passed to the constructor.
 */
async_mult.prototype.execute = function execute() {
    var i;
    var functions = this._functions;
    var length = functions.length;
    this._remaining = functions.length;
    this._results = [];

    for (i = 0; i < length; i++) {
      async_env.withValue({func: functions[i], batch: this}, function(){
        var callback = Meteor.bindEnvironment(function(){
          var async = async_env.get();
          async.func(async.batch);
        });
        Meteor.setTimeout(callback,0);
      });
    }

    Meteor.setTimeout(this._callback.bind(this), this._timeout);
};

/**
 * Signifies that another function has finished executing. Can be provided with
 * a value to store in the results array which is passed to the completion
 * handler.
 *
 * All functions in the batch must call this when done.
 *
 * @param {*} [result] Optional value to store and pass back to the completion handler when done.
 */
async_mult.prototype.done = function done(result) {
    this._remaining -= 1;

    if (typeof result !== 'undefined') {
        this._results.push(result);
    }

    if (this._remaining === 0) {
        this._callback(this._results);
    }
};

function RenderTimeoutError(res) {
  res.writeHead(503);
  res.end('Server Time Limit Reached');
}

function RenderError(res) {
  res.writeHead(500);
  res.end('Unknown Server Error');
}
