Template.myinvestkit_home.helpers({
  partners: function() {
    var partners = [
      {
      	name: "Altus Times",
      	url: Router.path('content.partnerhome',{partner_id: "altustimes.com"})
      },
      {
      	name: "Amherst News Times",
      	url: Router.path('content.partnerhome',{partner_id: "theamherstnewstimes.com"})
      },
      {
      	name: "Anson Record",
      	url: Router.path('content.partnerhome',{partner_id: "ansonrecord.com"})
      },
      {
      	name: "Arkansas Democrat",
      	url: Router.path('content.partnerhome',{partner_id: "arkansasonline.com"})
      },
      {
      	name: "Baltimore Sun",
      	url: Router.path('content.partnerhome',{partner_id: "baltimoresun.com"})
      },
      {
      	name: "Beaver Creek News Current",
      	url: Router.path('content.partnerhome',{partner_id: "beavercreeknewscurrent.com"})
      },
      {
      	name: "Bellbrook Times",
      	url: Router.path('content.partnerhome',{partner_id: "bellbrooktimes.com"})
      },
      {
      	name: "Bellville Star",
      	url: Router.path('content.partnerhome',{partner_id: "thebellvillestar.com"})
      },
      {
      	name: "Bellvue Gazette",
      	url: Router.path('content.partnerhome',{partner_id: "thebellevuegazette.com"})
      },
      {
      	name: "Bladen Journal",
      	url: Router.path('content.partnerhome',{partner_id: "bladenjournal.com/"})
      },
      {
      	name: "Brentwood Press",
      	url: Router.path('content.partnerhome',{partner_id: "thepress.net"})
      },
      {
      	name: "Carroll News",
      	url: Router.path('content.partnerhome',{partner_id: "thecarrollnews.com"})
      },
      {
      	name: "Cheraw Chronicle",
      	url: Router.path('content.partnerhome',{partner_id: "thecherawchronicle.com"})
      },
      {
      	name: "Chicago Tribune",
      	url: Router.path('content.partnerhome',{partner_id: "chicagotribune.com"})
      },
      {
      	name: "Citizens Voice",
      	url: Router.path('content.partnerhome',{partner_id: "citizensvoice.com"})
      },
      {
      	name: "Claiborne Progress",
      	url: Router.path('content.partnerhome',{partner_id: "claiborneprogress.net"})
      },
      {
      	name: "Clyde Enterprise",
      	url: Router.path('content.partnerhome',{partner_id: "clydeenterprise.com"})
      },
      {
      	name: "Coal Valley News",
      	url: Router.path('content.partnerhome',{partner_id: "coalvalleynews.com"})
      },
      {
      	name: "Community Common",
      	url: Router.path('content.partnerhome',{partner_id: "communitycommon.com"})
      },
      {
      	name: "Contra Costa Times",
      	url: Router.path('content.partnerhome',{partner_id: "contracostatimes.com"})
      },
      {
      	name: "Daily Advocate",
      	url: Router.path('content.partnerhome',{partner_id: "dailyadvocate.com"})
      },
      {
      	name: "Daily Press",
      	url: Router.path('content.partnerhome',{partner_id: "dailypress.com"})
      },
      {
      	name: "Daily Review",
      	url: Router.path('content.partnerhome',{partner_id: "thedailyreview.com"})
      },
      {
      	name: "Delaware Gazette",
      	url: Router.path('content.partnerhome',{partner_id: "delgazette.com"})
      },
      {
      	name: "Easley Progress",
      	url: Router.path('content.partnerhome',{partner_id: "theeasleyprogress.com"})
      },
      {
      	name: "Englewood Independent",
      	url: Router.path('content.partnerhome',{partner_id: "englewoodindependent.com"})
      },
      {
      	name: "Exponent News",
      	url: Router.path('content.partnerhome',{partner_id: "exponentnews.com"})
      },
      {
      	name: "Fairborn Daily Herald",
      	url: Router.path('content.partnerhome',{partner_id: "fairborndailyherald.com"})
      },
      {
      	name: "Fairmont Bugle",
      	url: Router.path('content.partnerhome',{partner_id: "fairmontbugle.com"})
      },
      {
      	name: "Floyd County Times",
      	url: Router.path('content.partnerhome',{partner_id: "floydcountytimes.com"})
      },
      {
      	name: "Fulton County Expositor/Swanton",
      	url: Router.path('content.partnerhome',{partner_id: "fcnews.org"})
      },
      {
      	name: "Galion Inquirer",
      	url: Router.path('content.partnerhome',{partner_id: "galioninquirer.com"})
      },
      {
      	name: "Gallipolis Daily Tribune",
      	url: Router.path('content.partnerhome',{partner_id: "mydailytribune.com"})
      },
      {
      	name: "Gilbert Times",
      	url: Router.path('content.partnerhome',{partner_id: "gilberttimes.net"})
      },
      {
      	name: "Go Lackawanna",
      	url: Router.path('content.partnerhome',{partner_id: "golackawanna.com"})
      },
      {
      	name: "Grayson County News Gazette",
      	url: Router.path('content.partnerhome',{partner_id: "gcnewsgazette.com"})
      },
      {
      	name: "Harlan Daily Enterprise",
      	url: Router.path('content.partnerhome',{partner_id: "harlandaily.com"})
      },
      {
      	name: "Hartford Courant",
      	url: Router.path('content.partnerhome',{partner_id: "courant.com"})
      },
      {
      	name: "Hazard Herald",
      	url: Router.path('content.partnerhome',{partner_id: "hazard-herald.com"})
      },
      {
      	name: "Herald Independent",
      	url: Router.path('content.partnerhome',{partner_id: "heraldindependent.com"})
      },
      {
      	name: "Huber Heights Courier",
      	url: Router.path('content.partnerhome',{partner_id: "hhcourier.com"})
      },
      {
      	name: "Independent Herald",
      	url: Router.path('content.partnerhome',{partner_id: "independentherald.com"})
      },
      {
      	name: "Inside Bay Area",
      	url: Router.path('content.partnerhome',{partner_id: "insidebayarea.com"})
      },
      {
      	name: "Inside NoVa",
      	url: Router.path('content.partnerhome',{partner_id: "insidenova.com"})
      },
      {
      	name: "Journal Courier",
      	url: Router.path('content.partnerhome',{partner_id: "myjournalcourier.com"})
      },
      {
      	name: "Knox County Citizen",
      	url: Router.path('content.partnerhome',{partner_id: "knoxcountycitizen.com"})
      },
      {
      	name: "LA Times",
      	url: Router.path('content.partnerhome',{partner_id: "latimes.com"})
      },
      {
      	name: "LaGrange Daily News",
      	url: Router.path('content.partnerhome',{partner_id: "lagrangedailynews.com"})
      },
      {
      	name: "Laurinburg Echange",
      	url: Router.path('content.partnerhome',{partner_id: "laurinburgexchange.com"})
      },
      {
      	name: "Leesburg Today",
      	url: Router.path('content.partnerhome',{partner_id: "leesburgtoday.com"})
      },
      {
      	name: "Logan Banner",
      	url: Router.path('content.partnerhome',{partner_id: "loganbanner.com"})
      },
      {
      	name: "Macon County Times",
      	url: Router.path('content.partnerhome',{partner_id: "maconcountytimes.com"})
      },
      {
      	name: "Madison Press",
      	url: Router.path('content.partnerhome',{partner_id: "Madison-press.com"})
      },
      {
      	name: "Mechanicsburg Telegram",
      	url: Router.path('content.partnerhome',{partner_id: "burgtelegram.com"})
      },
      {
      	name: "Middlesboro Daily News",
      	url: Router.path('content.partnerhome',{partner_id: "middlesborodailynews.com"})
      },
      {
      	name: "Morning Call",
      	url: Router.path('content.partnerhome',{partner_id: "mcall.com"})
      },
      {
      	name: "Morrow County Sentinel",
      	url: Router.path('content.partnerhome',{partner_id: "morrowcountysentinel.com"})
      },
      {
      	name: "Mt. Airy News",
      	url: Router.path('content.partnerhome',{partner_id: "mtairynews.com"})
      },
      {
      	name: "Mt. Sterling Tribune",
      	url: Router.path('content.partnerhome',{partner_id: "themtsterlingtribune.com"})
      },
      {
      	name: "MyPembroke NC",
      	url: Router.path('content.partnerhome',{partner_id: "mypembrokenc.com"})
      },
      {
      	name: "NBC Bay Area",
      	url: Router.path('content.partnerhome',{partner_id: "nbcbayarea.com"})
      },
      {
      	name: "NBC Chicago",
      	url: Router.path('content.partnerhome',{partner_id: "nbcchicago.com"})
      },
      {
      	name: "NBC Connecticut",
      	url: Router.path('content.partnerhome',{partner_id: "nbcconnecticut.com"})
      },
      {
      	name: "NBC DFW",
      	url: Router.path('content.partnerhome',{partner_id: "nbcdfw.com"})
      },
      {
      	name: "NBC Los Angeles",
      	url: Router.path('content.partnerhome',{partner_id: "nbclosangeles.com"})
      },
      {
      	name: "NBC Miami",
      	url: Router.path('content.partnerhome',{partner_id: "nbcmiami.com"})
      },
      {
      	name: "NBC New York",
      	url: Router.path('content.partnerhome',{partner_id: "nbcnewyork.com"})
      },
      {
      	name: "NBC Philadelphia",
      	url: Router.path('content.partnerhome',{partner_id: "nbcphiladelphia.com"})
      },
      {
      	name: "NBC San Diego",
      	url: Router.path('content.partnerhome',{partner_id: "nbcsandiego.com"})
      },
      {
      	name: "NBC Washington",
      	url: Router.path('content.partnerhome',{partner_id: "nbcwashington.com"})
      },
      {
      	name: "New England Cable News",
      	url: Router.path('content.partnerhome',{partner_id: "necn.com"})
      },
      {
      	name: "Newberry Observer",
      	url: Router.path('content.partnerhome',{partner_id: "newberryobserver.com"})
      },
      {
      	name: "News Democrat",
      	url: Router.path('content.partnerhome',{partner_id: "newsdemocrat.com"})
      },
      {
      	name: "News Democrat Leader",
      	url: Router.path('content.partnerhome',{partner_id: "newsdemocratleader.com"})
      },
      {
      	name: "News Item",
      	url: Router.path('content.partnerhome',{partner_id: "newsitem.com"})
      },
      {
      	name: "News Journal",
      	url: Router.path('content.partnerhome',{partner_id: "wnewsj.com"})
      },
      {
      	name: "Northwest Arkansas Times",
      	url: Router.path('content.partnerhome',{partner_id: "nwadg.com"})
      },
      {
      	name: "Oberlin News Tribune",
      	url: Router.path('content.partnerhome',{partner_id: "theoberlinnewstribune.com"})
      },
      {
      	name: "Odessa American",
      	url: Router.path('content.partnerhome',{partner_id: "oaoa.com"})
      },
      {
      	name: "Orlando Sentinel",
      	url: Router.path('content.partnerhome',{partner_id: "orlandosentinel.com"})
      },
      {
      	name: "Peoples Defender",
      	url: Router.path('content.partnerhome',{partner_id: "peoplesdefender.com"})
      },
      {
      	name: "Pickens Sentinel",
      	url: Router.path('content.partnerhome',{partner_id: "pickenssentinel.com"})
      },
      {
      	name: "Pilot Mountain News",
      	url: Router.path('content.partnerhome',{partner_id: "pilotmountainnews.com"})
      },
      {
      	name: "Piqua Daily Call",
      	url: Router.path('content.partnerhome',{partner_id: "dailycall.com"})
      },
      {
      	name: "Pomeroy Daily Sentinel",
      	url: Router.path('content.partnerhome',{partner_id: "mydailysentinel.com"})
      },
      {
      	name: "Portsmouth Daily Times",
      	url: Router.path('content.partnerhome',{partner_id: "portsmouth-dailytimes.com"})
      },
      {
      	name: "Press-Leader",
      	url: Router.path('content.partnerhome',{partner_id: "press-leader.com"})
      },
      {
      	name: "Red Springs Citizen",
      	url: Router.path('content.partnerhome',{partner_id: "redspringscitizen.com"})
      },
      {
      	name: "Register Herald",
      	url: Router.path('content.partnerhome',{partner_id: "registerherald.com"})
      },
      {
      	name: "Republican Herald ",
      	url: Router.path('content.partnerhome',{partner_id: "republicanherald.com"})
      },
      {
      	name: "Richmond County Daily Journal",
      	url: Router.path('content.partnerhome',{partner_id: "yourdailyjournal.com"})
      },
      {
      	name: "Ripley Bee",
      	url: Router.path('content.partnerhome',{partner_id: "ripleybee.com"})
      },
      {
      	name: "Robesonian",
      	url: Router.path('content.partnerhome',{partner_id: "robesonian.com"})
      },
      {
      	name: "Sampson Independent",
      	url: Router.path('content.partnerhome',{partner_id: "clintonnc.com"})
      },
      {
      	name: "San Jose Mercury News",
      	url: Router.path('content.partnerhome',{partner_id: "mercurynews.com"})
      },
      {
      	name: "Sedalia Democrat",
      	url: Router.path('content.partnerhome',{partner_id: "sedaliademocrat.com"})
      },
      {
      	name: "Sidney Daily News",
      	url: Router.path('content.partnerhome',{partner_id: "sidneydailynews.com"})
      },
      {
      	name: "Silicon Valley",
      	url: Router.path('content.partnerhome',{partner_id: "siliconvalley.com"})
      },
      {
      	name: "St. Pauls Review",
      	url: Router.path('content.partnerhome',{partner_id: "stpaulsreview.com"})
      },
      {
      	name: "Standard Speaker",
      	url: Router.path('content.partnerhome',{partner_id: "standardspeaker.com"})
      },
      {
      	name: "Sun-Sentinel",
      	url: Router.path('content.partnerhome',{partner_id: "Sun-sentinel.com"})
      },
      {
      	name: "Sunbury News",
      	url: Router.path('content.partnerhome',{partner_id: "sunburynews.com"})
      },
      {
      	name: "Swanton Enterprise",
      	url: Router.path('content.partnerhome',{partner_id: "swantonenterprise.com"})
      },
      {
      	name: "Tampa Bay Times",
      	url: Router.path('content.partnerhome',{partner_id: "tampabay.com"})
      },
      {
      	name: "The Abington Journal",
      	url: Router.path('content.partnerhome',{partner_id: "theabingtonjournal.com"})
      },
      {
      	name: "The Alton Telegraph",
      	url: Router.path('content.partnerhome',{partner_id: "thetelegraph.com"})
      },
      {
      	name: "The Dallas Post",
      	url: Router.path('content.partnerhome',{partner_id: "mydallaspost.com"})
      },
      {
      	name: "The Durant Daily Democrat",
      	url: Router.path('content.partnerhome',{partner_id: "durantdemocrat.com"})
      },
      {
      	name: "The Elkin Tribune",
      	url: Router.path('content.partnerhome',{partner_id: "elkintribune.com"})
      },
      {
      	name: "The Jefferson Post",
      	url: Router.path('content.partnerhome',{partner_id: "jeffersonpost.com"})
      },
      {
      	name: "The Lima News",
      	url: Router.path('content.partnerhome',{partner_id: "limaohio.com"})
      },
      {
      	name: "The Peninsula News",
      	url: Router.path('content.partnerhome',{partner_id: "thepennews.com"})
      },
      {
      	name: "The Plain City Advocate",
      	url: Router.path('content.partnerhome',{partner_id: "plaincity-advocate.com"})
      },
      {
      	name: "The Point Pleasant Register",
      	url: Router.path('content.partnerhome',{partner_id: "mydailyregister.com"})
      },
      {
      	name: "The Powdersville Post",
      	url: Router.path('content.partnerhome',{partner_id: "powdersvillepost.com"})
      },
      {
      	name: "The Record Herald",
      	url: Router.path('content.partnerhome',{partner_id: "recordherald.com"})
      },
      {
      	name: "The Stokes News",
      	url: Router.path('content.partnerhome',{partner_id: "thestokesnews.com"})
      },
      {
      	name: "The Sunday Dispatch",
      	url: Router.path('content.partnerhome',{partner_id: "psdispatch.com"})
      },
      {
      	name: "The Times Leader",
      	url: Router.path('content.partnerhome',{partner_id: "timesleader.com"})
      },
      {
      	name: "The Wellington Enterprise",
      	url: Router.path('content.partnerhome',{partner_id: "thewellingtonenterprise.com"})
      },
      {
      	name: "The Williamson Daily News",
      	url: Router.path('content.partnerhome',{partner_id: "williamsondailynews.com"})
      },
      {
      	name: "Thomaston Times",
      	url: Router.path('content.partnerhome',{partner_id: "thomastontimes.com"})
      },
      {
      	name: "Times Gazette",
      	url: Router.path('content.partnerhome',{partner_id: "timesgazette.com"})
      },
      {
      	name: "Times Tribune",
      	url: Router.path('content.partnerhome',{partner_id: "thetimes-tribune.com"})
      },
      {
      	name: "Troy Daily News",
      	url: Router.path('content.partnerhome',{partner_id: "tdn-net.com"})
      },
      {
      	name: "Union Daily Times",
      	url: Router.path('content.partnerhome',{partner_id: "uniondailytimes.com"})
      },
      {
      	name: "Urbana Daily Citizen",
      	url: Router.path('content.partnerhome',{partner_id: "urbanacitizen.com"})
      },
      {
      	name: "Vandailia Drummer News",
      	url: Router.path('content.partnerhome',{partner_id: "vandaliadrummernews.com"})
      },
      {
      	name: "Weekly Currents",
      	url: Router.path('content.partnerhome',{partner_id: "weeklycurrents.com"})
      },
      {
      	name: "Weekly Record Herald",
      	url: Router.path('content.partnerhome',{partner_id: "weeklyrecordherald.com"})
      },
      {
      	name: "Xenia Gazette",
      	url: Router.path('content.partnerhome',{partner_id: "xeniagazette.com"})
      },
      {
      	name: "Yadkin Ripple",
      	url: Router.path('content.partnerhome',{partner_id: "yadkinripple.com"})
      }
    ];

    for ( var index = 0; index < partners.length; index++ ) {
      if ( index % 2 == 0 ) {
        partners[index].class = "mik_partner_2";
      } else {
        partners[index].class = "mik_partner_1";
      }
    }
    return partners;
  }
})
