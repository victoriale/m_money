var ToCommaNumber = function(Number) {
  var split = Number.toString().split('.');
  split[0] = split[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return split.join('.');
}

// Create a custom handler for multiple async functions
var async_mult = function(functions, callback) {
  this._functions = functions;
  this._callback = callback;
}

/**
 * Executes the functions passed to the constructor.
 */
async_mult.prototype.execute = function execute() {
    var i;
    var functions = this._functions;
    var length = this._remaining = functions.length;
    this._results = [];

    for (i = 0; i < length; i += 1) {
        functions[i](this);
    }
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

// HTML minifier
var minify = Npm.require('html-minifier').minify;
// Environment Variables
var info_envar = new Meteor.EnvironmentVariable;
var batch_envar = new Meteor.EnvironmentVariable;

// Filter out bot requests
var seoPicker = Picker.filter(function(req, res) {
  // return true;
  if ( /bot/.test(req.headers['user-agent']) || /Webmaster/.test(req.headers['user-agent']) || /Bing/.test(req.headers['user-agent']) || /externalhit/.test(req.headers['user-agent']) ) {
    return true;
  }
  return false;
});

// Company Profile
seoPicker.route('/:partner_id?/company/:company_id',function(params, req, res){
  console.log('***Company Profile SSR***');
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
      data.profile_header.c_hq_city = data.profile_header.c_hq_city.replace(/(.)(.*)/,function(a,b,c){ return b.toUpperCase() + c.toLowerCase(); });

      if ( typeof data.content != "undefined" ) {
        var temp_d = JSON.parse(data.content);
        temp_d.results.name = temp_d.name;
        data.results = temp_d.results;
      }

      // Section specific data
      // Earnings
      var earnings = data.earnings;
      var earnings_report_data = [];
      for ( var m_index = 0; m_index < earnings.length; m_index++ ) {
        var c_data = earnings[m_index];
        earnings_report_data[m_index] = {
          title: c_data.e_report_title
        };
        var localdata = [
          'The ' + c_data.e_report_title + ' was filed on ' + c_data.e_filing_date + '. This is an ' + c_data.e_report_type.toLowerCase() + ' report. This report is for fiscal year ' + c_data.e_fiscal_year + '.'
        ];
        for ( var index = 0; index < c_data.e_report_data.length; index++ ) {
          localdata[localdata.length] = c_data.e_report_data[index].coa_title + ' (' + c_data.e_report_data[index].coa_code + '): $' + ToCommaNumber(c_data.e_report_data[index].coa_data * 1000000);
        }
        earnings_report_data[m_index].content = {line: localdata};
      }
      // Executives
      var executives = data.whos_who;
      var exec_data = [];
      for ( var index = 0; index < executives.length; index++ ) {
        var e_data = executives[index];
        exec_data[index] = '<a href="' + Router.path('content.executiveprofile',{exec_id: e_data.o_id, partner_id: info.params.partner_id}) + '">' + e_data.o_first_name + ' ' + e_data.o_middle_initial + ' ' + e_data.o_last_name + '</a>';
        for ( var t_ind = 0; t_ind < e_data.o_titles.length; t_ind++ ) {
          exec_data[index] = exec_data[index] + '<br>' + e_data.o_titles[t_ind];
        }
      }

      if ( typeof data.results != "undefined" ) {
        var head_data = { // Data to put into the head of the document (partner site)
          description: 'Get financial information for ' + data.profile_header.c_name + ' (' + data.profile_header.c_exchange + ':' + data.profile_header.c_ticker + '), including executive information, SEC documents, news, and more!',
          title: 'All About ' + data.profile_header.c_name + ' | ' + data.results.name + ' Finance',
          url: 'http://www.myinvestkit.com/' + info.params.partner_id + '/company/' + data.profile_header.c_id,
          siteName: data.results.name,
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
      } else {
        var head_data = { // Data to put into the head of the document (regular site)
          description: 'Find out everything you need to know about ' + data.profile_header.c_name + ' (' + data.profile_header.c_exchange + ':' + data.profile_header.c_ticker + '): financial data, SEC documents, news, executive information, and more!',
          title: 'Everything You Need To Know About ' + data.profile_header.c_name + ' | InvestKit.com',
          url: 'http://www.investkit.com/company/' + data.profile_header.c_id,
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
      }

      var page_data = {
        head_data: head_data,
        h1: {
          title: 'Everything You Need To Know About ' + data.profile_header.c_name,
          content: {
            line: [
              data.bio_location.c_desc,
              'Headquarters Location: ' + data.bio_location.c_street_addr + ' ' + data.profile_header.c_hq_city + ', ' + data.profile_header.c_hq_state + ' ' + data.bio_location.c_zip,
              'Company Sector: ' + data.profile_header.c_sector
            ]
          },
          h2: [
            {
              title: data.profile_header.c_name + '\'s Daily Update',
              content: {
                line: [
                  'Share Price: $' + ToCommaNumber(data.daily_update.csi_price),
                  '  Last Updated: ' + data.daily_update.csi_price_last_updated,
                  '  Change: $' + data.daily_update.csi_price_change_since_last + ' (' + data.daily_update.csi_percent_change_since_last + '%)',
                  'Opening Price: $' + ToCommaNumber(data.daily_update.csi_opening_price),
                  'Closing Price: $' + ToCommaNumber(data.daily_update.csi_closing_price),
                  'Total Shares: ' + ToCommaNumber(data.daily_update.csi_total_shares),
                  'Market Cap: ' + ToCommaNumber(data.daily_update.csi_market_cap),
                  'PE Ratio: ' + data.daily_update.csi_pe_ratio,
                  'Trading Volume: ' + ToCommaNumber(data.daily_update.csi_trading_vol)
                ]
              }
            },
            {
              title: data.profile_header.c_name + '\'s Earnings Reports',
              h3: earnings_report_data
            },
            {
              title: 'Who\'s Who at ' + data.profile_header.c_name,
              content: {
                ul: exec_data
              }
            },
            {
              title: data.profile_header.c_name + '\'s Random Facts',
              content: {
                line: data.did_you_know.facts
              }
            }
          ]
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
      console.log("SSRSTAT|\"Company Profile\",\"" + info.params.company_id + "\"," + (Math.round((endTime - info.startTime)/10)/100) + "," + endTime + "|");
      return false;
    });

    var functions = [];
    var method_cb = function(error, data) {
      var batch = batch_envar.get();
      if ( error ) {
        console.log("Batch Error:", error);
        batch.done({});
        return false;
      }
      batch.done(data);
    }

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
});

// Executive Profile
seoPicker.route('/:partner_id?/executive/:exec_id',function(params, req, res){
  console.log('***Executive Profile SSR***');
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
      profile_header = data.profile_header || {};
      profile_header.o_current_title = profile_header.o_current_title || {};
      profile_header.compensation = profile_header.compensation || {};
      comp = profile_header.compensation.o_compensation || '';
      var cmp_reg = new RegExp(profile_header.c_name,'g');
      profile_header.o_bio = (profile_header.o_bio || '').replace(cmp_reg,'<a href="' + Router.path('content.companyprofile',{company_id: profile_header.c_id, partner_id: info.params.partner_id}) + '">' + profile_header.c_name + '</a>');
      profile_header.c_name_orig = profile_header.c_name;
      profile_header.c_name = '<a href="' + Router.path('content.companyprofile',{company_id: profile_header.c_id, partner_id: info.params.partner_id}) + '">' + profile_header.c_name + '</a>';
      data.profile_header.o_full_name = data.profile_header.o_first_name + ' ' + data.profile_header.o_middle_initial + ' ' + data.profile_header.o_last_name;

      if ( typeof data.content != "undefined" ) {
        var temp_d = JSON.parse(data.content);
        temp_d.results.name = temp_d.name;
        data.results = temp_d.results;
      }

      // Section specific data
      // Rivals
      var rival_data = [];
      for ( var index = 0; index < data.college_rivals.rivals.length; index++ ) {
        var localData = data.college_rivals.rivals[index];
        if ( localData != null ) {
          rival_data[rival_data.length] = '<a href="' + Router.path('content.executiveprofile',{exec_id: localData.o_id, partner_id: info.params.partner_id}) + '">' + localData.o_first_name + ' ' + localData.o_middle_initial + ' ' + localData.o_last_name + '</a>: ' + localData.long_title + ' at <a href="' + Router.path('content.companyprofile',{company_id: localData.c_id, partner_id: info.params.partner_id}) + '">' + localData.c_name + '</a><br>' + localData.o_bio;
        }
      }
      // Compensation
      var compensation = [];
      if ( comp != '' ) {
        if ( typeof compensation.Salary != "undefined" ) {
          compensation[compensation.length] = 'Salary: $' + ToCommaNumber(comp.Salary);
        }
        if ( typeof compensation.Bonus != "undefined" ) {
          compensation[compensation.length] = 'Bonus: $' + ToCommaNumber(comp.Bonus);
        }
        if ( typeof compensation.TotalST != "undefined" ) {
          compensation[compensation.length] = 'Total Stock: $' + ToCommaNumber(comp.TotalST);
        }
        if ( typeof compensation.RestrictedStock != "undefined" ) {
          compensation[compensation.length] = 'Restricted Stock: $' + ToCommaNumber(comp.RestrictedStock);
        }
        if ( typeof compensation.TotalComp != "undefined" ) {
          compensation[compensation.length] = 'Total Compensation: $' + ToCommaNumber(comp.TotalComp);
        }
      }
      // Work History
      var work_hist = [];
      if ( typeof data.work_history != "undefined" ) {
        for ( var attr in data.work_history.companies ) {
          var c_data = data.work_history.companies[attr];
          var loc_data = {title: '<a href="' + Router.path('content.companyprofile',{company_id: c_data.company_data.c_id, partner_id: info.params.partner_id}) +  '">' + c_data.company_data.c_name + '</a>'};
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
      for ( var index = 0; index < data.whos_who.length; index++ ) {
        var e_data = data.whos_who[index];
        other_execs[other_execs.length] = '<b>' + e_data.o_first_name + ' ' + e_data.o_middle_initial + ' ' + e_data.o_last_name + '</b>: ' + e_data.o_current_title.long_title;
      }

      if ( typeof data.results != "undefined" ) {
        var head_data = { // Data to put into the head of the document (meta tags/title)
          description: 'Learn about ' + profile_header.o_full_name + ', ' + profile_header.o_current_title.long_title + ' of ' + profile_header.c_name_orig + '.',
          title: 'Learn About ' + profile_header.o_full_name + ' | ' + data.results.name + ' Finance',
          url: 'http://www.investkit.com/' + info.params.partner_id + '/executive/' + profile_header.o_id,
          siteName: data.results.name,
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
      } else {
        var head_data = { // Data to put into the head of the document (meta tags/title)
          description: 'Learn more about ' + profile_header.o_full_name + ', the ' + profile_header.o_current_title.long_title + ' from ' + profile_header.c_name_orig + '.',
          title: 'Everything You Need To Know About ' + profile_header.o_full_name + ' | InvestKit.com',
          url: 'http://www.investkit.com/executive/' + profile_header.o_id,
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
      }

      var page_data = {
        head_data: head_data,
        h1: {
          title: profile_header.o_full_name + ' (' + profile_header.c_name + ')',
          content: {
            line: [
              profile_header.o_bio
            ]
          },
          h2: [
            {
              title: profile_header.o_full_name + ' (' + profile_header.c_name + ') Compensation',
              content: {
                line: compensation
              }
            },
            {
              title: profile_header.o_full_name + '\'s Rivals',
              content: {
                ul: rival_data
              }
            },
            {
              title: profile_header.o_full_name + '\'s Work History',
              h3: work_hist
            },
            {
              title: 'Other Executives at ' + profile_header.c_name,
              content: {line: other_execs}
            }
          ]
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
      console.log("SSRSTAT|\"Executive Profile\",\"" + info.params.exec_id + "\"," + (Math.round((endTime - info.startTime)/10)/100) + "," + endTime + "|");
      return false;
    });

    var functions = [];
    var method_cb = function(error, data) {
      var batch = batch_envar.get();
      if ( error ) {
        console.log("Batch Error:", error);
        batch.done({});
        return false;
      }
      batch.done(data);
    }

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
});

// List of Company Executives
seoPicker.route('/:partner_id?/board-committee/:company_id',function(params, req, res){
  console.log('***Company Executives SSR***');
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
        r_data.title = '<a href="' + Router.path('content.executiveprofile',{partner_id: info.params.partner_id, exec_id: o_data.o_id}) + '">' + o_data.o_first_name + ' ' + o_data.o_middle_initial + ' ' + o_data.o_last_name + '</a>: ' + o_data.o_current_title.long_title;
        r_data.content = {line: [
          o_data.o_bio
        ]};
        comp_execs[comp_execs.length] = r_data;
      }

      if ( typeof data.results != "undefined" ) {
        var head_data = { // Data to put into the head of the document (meta tags/title)
          description: 'Who are the executives for ' + data.profile_header.c_name + ' (' + data.profile_header.c_ticker + ')? Find out and take a look at a personilzed profile for each!',
          title: data.profile_header.c_name + ' Executive List | ' + data.results.name + ' Finance',
          url: 'http://www.myinvestkit.com/' + info.params.partner_id + '/board-committee/' + data.profile_header.c_id,
          siteName: data.results.name,
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
      } else {
        var head_data = { // Data to put into the head of the document (meta tags/title)
          description: 'Find out who the executives for ' + data.profile_header.c_name + ' (' + data.profile_header.c_ticker + ') are and get in-depth information about them',
          title: data.profile_header.c_name + ' Executive List | InvestKit.com',
          url: 'http://www.investkit.com/board-committee/' + data.profile_header.c_id,
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
      }

      var page_data = {
        head_data: head_data,
        h1: {
          title: '<a href="' + Router.path('content.companyprofile',{partner_id: info.params.partner_id, company_id: data.profile_header.c_id}) + '">' + data.profile_header.c_name + '</a> Executives',
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
      console.log("SSRSTAT|\"Company Executives\",\"" + info.params.company_id + "\"," + (Math.round((endTime - info.startTime)/10)/100) + "," + endTime + "|");
      return false;
    });

    var functions = [];
    var method_cb = function(error, data) {
      var batch = batch_envar.get();
      if ( error ) {
        console.log("Batch Error:", error);
        batch.done({});
        return false;
      }
      batch.done(data);
    }

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
})

// Partner Home Page
seoPicker.route('/:partner_id',function(params, req, res){
  console.log('***Partner Home Page SSR***');
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

      if ( typeof data.content != "undefined" ) {
        var temp_d = JSON.parse(data.content);
        temp_d.results.name = temp_d.name;
        data.results = temp_d.results;
      }

      // Section specific data
      // Companies By Sector
      var cbs_h3 = [];
      for ( var attr in data.companies_by_sector ) {
        if ( data.companies_by_sector.hasOwnProperty(attr) && typeof data.companies_by_sector[attr] == "object" ) {
          var locData = data.companies_by_sector[attr];
          var retData = {title: attr};
          var loc_ul = [];
          for ( var loc_attr in locData ) {
            if ( locData.hasOwnProperty(loc_attr) && typeof locData[loc_attr] == "object" ) {
              loc_ul[loc_ul.length] = '<a href="' + Router.path('content.companyprofile',{partner_id: info.params.parnter_id, company_id: locData[loc_attr].c_id}) + '">' + locData[loc_attr].c_name + ' (' + locData[loc_attr].c_ticker + ')</a>:<br>' + locData[loc_attr].c_desc;
            }
          }
          retData.content.ul = loc_ul;
          cbs_h3[cbs_h3.length] = retData;
        }
      }
      // Executives
      var loc_execs = [];
      try {
        for ( var index = 0; index < data.executives.length; index++ ) {
          loc_execs[loc_execs.length] = '<a href="' + Router.path('content.executiveprofile',{partner_id: info.params.partner_id, exec_id: data.executives[index].o_id}) + '">' + data.executives[index].o_first_name + ' ' + data.executives[index].o_middle_initial + ' ' + data.executives[index].o_last_name + '</a> at <a href="' + Router.path('content.companyprofile',{partner_id: info.params.partner_id, company_id: data.executives[index].c_id}) + '">' + data.executives[index].c_name + '</a><br>' + data.executives[index].o_bio;
        }
      } catch (e) {
        console.log('Executives Error',e);
      }

      var head_data = { // Data to put into the head of the document (meta tags/title)
        description: 'Get in-depth information about the ' + ToCommaNumber(data.profile_header.total_companies) + ' companies and ' + ToCommaNumber(data.profile_header.total_executives) + ' executives in ' + data.profile_header.location + ' with ' + info.params.partner_id + ' Finance',
        title: data.results.name + ' Finance',
        url: 'http://www.investkit.com/' + info.params.partner_id,
        siteName: data.results.name,
        other_tags: [
          {
            name: 'og:type',
            content: 'website'
          }
        ]
      };

      var page_data = {
        head_data: head_data,
        h1: {
          title: 'All About ' + data.profile_header.location,
          h2: [
            {
              title: data.profile_header.location + ' Composite Information',
              content: {
                line: [
                  'Total Companies: ' + ToCommaNumber(data.location_daily_update.composite_summary.total_companies),
                  'Current Price: $' + ToCommaNumber(data.location_daily_update.composite_summary.current_price),
                  'Change: $' + ToCommaNumber(data.location_daily_update.composite_summary.price_change) + ' (' + ToCommaNumber(data.location_daily_update.composite_summary.percent_change) + '%)'
                ]
              }
            },
            {
              title: data.profile_header.location + '\'s Companies By Sector',
              h3: cbs_h3
            },
            {
              title: data.profile_header.location + '\'s Executives',
              content: {
                ul: loc_execs
              }
            }
          ]
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
      console.log("SSRSTAT|\"Partner Home Page\",\"" + info.params.partner_id + "\"," + (Math.round((endTime - info.startTime)/10)/100) + "," + endTime + "|");
      return false;
    });

    var functions = [];
    var method_cb = function(error, data) {
      var batch = batch_envar.get();
      if ( error ) {
        console.log("Batch Error:", error);
        batch.done({});
        return false;
      }
      batch.done(data);
    }

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
    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call("GetExecData",params.exec_id,"batch_3", bound_cb);
      });
    });

    functions.push(function(batch){
      batch_envar.withValue(batch, function(){
        var bound_cb = Meteor.bindEnvironment(method_cb);
        Meteor.call('GetPartnerHeader',params.partner_id, bound_cb);
      });
    });

    var company_batch = new async_mult(functions, callback);

    // company_batch.execute();
    res.end('<html><body><h1>Test</h1></body></html>');
  });
});

// Home Page
// NOT DONE
seoPicker.route('/',function(params, req, res){
  console.log('***Home Page SSR***');
  var startTime = (new Date()).getTime(); // Log the start time (normal variable b/c no async)

  info_envar.withValue({params: params, res: res, req: req, startTime: startTime}, function(){
    var render_home = Meteor.bindEnvironment(function(error, data){
      if ( data ) {
        try {
          data = JSON.parse(data.content);
        } catch(e) {
          console.log('JSON parse failed');
        }
      }

      var info = info_envar.get();
      var res = info.res;
      var startTime = info.startTime;

      if ( typeof data != "undefined" && typeof data.results != "undefined" && typeof data.results.header != "undefined" && typeof data.results.header.script != "undefined" ) {
        var head_data = { // Data to put into the head of the document (meta tags/title)
          description: 'Discover your next investment with ' + info.params.partner_id + '\'s unique blend of lists, information, and profiles. Get big data in an easy to digest format with AI generated content, executive profiles, and much more!',
          title: info.params.partner_id + ' Finance',
          url: 'http://www.myinvestkit.com/' + info.params.partner_id,
          siteName: info.params.partner_id
        };
      } else {
        var head_data = { // Data to put into the head of the document (meta tags/title)
          description: 'Discover your next investment with InvesKit\'s unique blend of lists, information, and profiles. Get big data in an easy to digest format with AI generated content, executive profiles, and much more!',
          title: 'InvestKit.com - Discover Your Next Investment',
          url: 'http://www.investkit.com/'
        };
      }
      var page_data = {
        head_data: head_data,
        h1: {
          title: 'InvestKit.com - Discover Your Next Investment',
          content: {
            ul: [
              '<a href="http://google.com">Google</a>'
            ]
          },
          h2: [
            {
              title: 'H2 Title'
            }
          ]
        }
      };

      if ( typeof data != "undefined" && typeof data.results != "undefined" && typeof data.results.header != "undefined" && typeof data.results.header.script != "undefined" ) {
        page_data.partner_header = data.results.header.script;
      }

      res.end(minify(SSR.render('generic_page',page_data), {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true
      })); // Write the pages template
      // Also minifies the HTML string

      // Log how long it took to render the page
      var endTime = (new Date()).getTime();
      console.log("SSRSTAT|Home,,\"" + (Math.round((endTime - startTime)/10)/100) + "s\",\"" + endTime + "\"|");
    });

    if ( typeof params.partner_id != "undefined" ) {
      Meteor.call('GetPartnerHeader',params.partner_id,render_home);
    } else {
      render_home();
    }
  });
});
